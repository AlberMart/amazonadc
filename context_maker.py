"""Export db_schema.txt + project_context.txt for the Cursor agent.

Reads live Postgres when Docker / psql / DATABASE_URL is available.
Falls back to Payload collection/global configs under src/.

Run: python context_maker.py
"""
from __future__ import annotations

import os
import re
import shutil
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

PROJECT_DIR = Path(__file__).parent.resolve()
CONTEXT_OUTPUT = PROJECT_DIR / "project_context.txt"
SCHEMA_OUTPUT = PROJECT_DIR / "db_schema.txt"

RULES_DIR = PROJECT_DIR / ".cursor" / "rules"

TARGET_DIRS = [
    "src/collections",
    "src/globals",
    "src/app/(frontend)",
    "src/components",
    "src/content",
    "src/seed",
    "src/utilities",
    "src/fields",
    "src/Header",
    "src/Footer",
    "src/plugins",
]
CODE_EXTENSIONS = {".ts", ".tsx", ".js", ".jsx", ".json", ".css", ".scss", ".md"}
SPECIFIC_FILES = {
    "package.json",
    "next.config.ts",
    "redirects.ts",
    "docker-compose.yml",
    "fly.toml",
    ".env.example",
    "context_maker.py",
    "src/payload.config.ts",
}
IGNORE_DIR_NAMES = {
    "node_modules",
    ".git",
    ".next",
    ".cursor",
    "tmp-old",
    "public",
    "playwright-report",
    "test-results",
    "__pycache__",
}

SCHEMA_SQL = """
SELECT c.table_name, c.column_name, c.data_type, c.is_nullable, c.column_default
FROM information_schema.columns c
WHERE c.table_schema = 'public'
ORDER BY c.table_name, c.ordinal_position;
"""

INDEX_SQL = """
SELECT tablename, indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
"""


def _load_dotenv() -> dict[str, str]:
    env_path = PROJECT_DIR / ".env"
    out: dict[str, str] = {}
    if not env_path.exists():
        example = PROJECT_DIR / ".env.example"
        env_path = example if example.exists() else env_path
    if not env_path.exists():
        return out
    for line in env_path.read_text(encoding="utf-8", errors="replace").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, val = line.partition("=")
        out[key.strip()] = val.strip().strip('"').strip("'")
    return out


def _db_url(env: dict[str, str]) -> str:
    return (env.get("DATABASE_URL") or os.environ.get("DATABASE_URL") or "").strip()


def _run(cmd: list[str], extra_env: dict[str, str] | None = None) -> subprocess.CompletedProcess[str] | None:
    env = os.environ.copy()
    if extra_env:
        env.update(extra_env)
    try:
        return subprocess.run(
            cmd,
            cwd=str(PROJECT_DIR),
            capture_output=True,
            text=True,
            timeout=60,
            env=env,
        )
    except FileNotFoundError:
        return None
    except Exception as e:
        print(f"command failed ({cmd[0]}): {e}")
        return None


def _psql_cmd(sql: str, env: dict[str, str]) -> subprocess.CompletedProcess[str] | None:
    url = _db_url(env)
    psql = shutil.which("psql")
    if psql and url:
        return _run([psql, url, "-At", "-F", "\t", "-c", sql])

    docker = shutil.which("docker")
    if docker:
        parsed = urlparse(url) if url else None
        db = (parsed.path.lstrip("/") if parsed and parsed.path else "") or "amazonadc"
        user = parsed.username if parsed and parsed.username else "payload"
        r = _run(
            [
                docker,
                "compose",
                "exec",
                "-T",
                "postgres",
                "psql",
                "-U",
                user,
                "-d",
                db,
                "-At",
                "-F",
                "\t",
                "-c",
                sql,
            ]
        )
        if r is not None:
            return r
    return None


def _parse_psql_rows(stdout: str) -> list[list[str]]:
    rows: list[list[str]] = []
    for line in (stdout or "").splitlines():
        line = line.strip()
        if not line or line.startswith("("):
            continue
        rows.append(line.split("\t"))
    return rows


def export_db_schema_from_postgres(env: dict[str, str]) -> bool:
    cols = _psql_cmd(SCHEMA_SQL, env)
    if cols is None:
        return False
    if cols.returncode != 0:
        err = (cols.stderr or cols.stdout or "")[:400]
        if "dockerDesktopLinuxEngine" in err or "daemon is running" in err:
            print("Docker/Postgres is not running - schema from Payload configs")
        else:
            print(f"psql schema error: {err}")
        return False

    idx = _psql_cmd(INDEX_SQL, env)
    index_rows = _parse_psql_rows(idx.stdout) if idx and idx.returncode == 0 else []

    tables: dict[str, list[list[str]]] = {}
    for row in _parse_psql_rows(cols.stdout):
        if len(row) < 4:
            continue
        tables.setdefault(row[0], []).append(row)

    if not tables:
        print("Postgres: no public tables (empty DB or not running?)")
        return False

    indexes_by_table: dict[str, list[list[str]]] = {}
    for row in index_rows:
        if len(row) >= 3:
            indexes_by_table.setdefault(row[0], []).append(row)

    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    url = _db_url(env) or "docker compose postgres"
    parsed = urlparse(url) if "://" in url else None
    host = f"{parsed.hostname}:{parsed.port}" if parsed and parsed.hostname else url

    chunks = [
        "=== DATABASE SCHEMA (PostgreSQL / public) ===\n",
        f"Generated: {now}\n",
        f"Source: live Postgres ({host})\n",
        f"tables: {len(tables)}\n\n",
    ]
    for tname, tcols in tables.items():
        chunks.append(f"--- TABLE: {tname} ---\n")
        for col in tcols:
            name, dtype, nullable = col[1], col[2], col[3]
            default = col[4] if len(col) > 4 else ""
            chunks.append(f"  {name}  {dtype}  null={nullable}  default={default}\n")
        for idx_row in indexes_by_table.get(tname, []):
            chunks.append(f"  INDEX {idx_row[1]}: {idx_row[2]}\n")
        chunks.append("\n")

    SCHEMA_OUTPUT.write_text("".join(chunks), encoding="utf-8")
    print(f"DB schema from Postgres -> {SCHEMA_OUTPUT.name} ({len(tables)} tables)")
    return True


def _iter_payload_configs() -> list[Path]:
    roots = [
        PROJECT_DIR / "src" / "collections",
        PROJECT_DIR / "src" / "globals",
        PROJECT_DIR / "src" / "Header",
        PROJECT_DIR / "src" / "Footer",
    ]
    files: list[Path] = []
    for root in roots:
        if not root.exists():
            continue
        files.extend(
            sorted(
                p
                for p in root.rglob("*.ts")
                if p.is_file() and "hooks" not in p.parts
            )
        )
    payload_cfg = PROJECT_DIR / "src" / "payload.config.ts"
    if payload_cfg.exists():
        files.append(payload_cfg)
    return files


def export_db_schema_from_payload_configs() -> None:
    files = _iter_payload_configs()
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    slug_re = re.compile(r"slug:\s*['\"]([^'\"]+)['\"]")
    name_re = re.compile(r"name:\s*['\"]([^'\"]+)['\"]")
    parts = [
        "=== DATABASE SCHEMA FROM PAYLOAD CONFIGS (fallback) ===\n",
        f"Generated: {now}\n",
        f"(Postgres dump unavailable; {len(files)} config files)\n\n",
        "Canonical schema lives in Payload collections/globals.\n",
        "Live tables are created by @payloadcms/db-postgres on app start.\n\n",
    ]
    for fp in files:
        rel = fp.relative_to(PROJECT_DIR).as_posix()
        text = fp.read_text(encoding="utf-8", errors="replace")
        slugs = slug_re.findall(text)
        names = [] if fp.name == "payload.config.ts" else name_re.findall(text)
        parts.append(f"--- FILE: {rel} ---\n")
        if slugs:
            parts.append(f"slug: {', '.join(dict.fromkeys(slugs))}\n")
        elif fp.name == "payload.config.ts":
            parts.append("collections: pages, posts, services, locations, leads, media, categories, users\n")
            parts.append("globals: header, footer, site-settings\n")
        if names:
            uniq = list(dict.fromkeys(names))[:40]
            parts.append("fields: " + ", ".join(uniq) + "\n")
        parts.append("\n")
    SCHEMA_OUTPUT.write_text("".join(parts), encoding="utf-8")
    print(f"DB schema from Payload configs -> {SCHEMA_OUTPUT.name} ({len(files)} files)")


def export_db_schema() -> None:
    env = _load_dotenv()
    if not export_db_schema_from_postgres(env):
        export_db_schema_from_payload_configs()


def build_environment_section() -> str:
    env = _load_dotenv()
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    app_url = env.get("NEXT_PUBLIC_SERVER_URL", "http://localhost:3000")
    db_url = _db_url(env) or "postgresql://payload:payload@127.0.0.1:5433/amazonadc"

    def _which(name: str) -> str:
        return shutil.which(name) or "не найден в PATH"

    return "".join(
        [
            "==================================================\n",
            "0. ENVIRONMENT / HOW TO RUN (auto-generated)\n",
            "==================================================\n\n",
            f"Generated: {now}\n\n",
            "Stack: Next.js 15 + Payload CMS 3 + PostgreSQL + Tailwind. Deploy: Fly.io (amazadc-next).\n\n",
            "Local:\n",
            "  1. docker compose up -d     # Postgres on host :5433\n",
            "  2. npm run dev              # http://localhost:3000  admin /admin\n",
            "  3. npm run seed             # CMS content (optional)\n",
            f"App URL: {app_url}   Admin: {app_url.rstrip('/')}/admin\n",
            f"DATABASE_URL: {db_url}\n\n",
            "Detected tooling:\n",
            f"  node   : {_which('node')}\n",
            f"  npm    : {_which('npm')}\n",
            f"  docker : {_which('docker')}\n",
            f"  psql   : {_which('psql')}\n",
            f"  python : {_which('python')}\n\n",
            "After schema changes: npm run generate:types && python context_maker.py\n",
            "Never commit .env.\n\n",
        ]
    )


def build_pointers_section() -> str:
    parts = [
        "==================================================\n",
        "0.1 RULES / SCHEMA POINTERS\n",
        "==================================================\n\n",
        "Do NOT paste full source dumps into agent context. Open files on demand.\n\n",
        "Rules (read only when relevant):\n",
        "  - .cursorrules\n",
    ]
    if RULES_DIR.exists():
        for fp in sorted(RULES_DIR.glob("*.mdc")):
            parts.append(f"  - .cursor/rules/{fp.name}\n")
    parts.append("\nDatabase:\n")
    parts.append("  - db_schema.txt  (live Postgres or Payload config fallback)\n")
    parts.append("  - src/payload.config.ts\n")
    parts.append("  - src/collections, src/globals, src/payload-types.ts\n\n")
    return "".join(parts)


def build_domain_map() -> str:
    return (
        "==================================================\n"
        "1. DOMAIN ENTRY POINTS\n"
        "==================================================\n\n"
        "- Public home: src/app/(frontend)/page.tsx + HomePageView\n"
        "- Catch-all pages/services/legal: src/app/(frontend)/[slug]/page.tsx\n"
        "- Locations: src/app/(frontend)/locations/[slug]/page.tsx\n"
        "- Blog: /blog rewrite -> /posts (src/app/(frontend)/posts)\n"
        "- Contact API: src/app/(frontend)/api/contact/route.ts -> collection leads\n"
        "- Payload admin: /admin (src/app/(payload))\n"
        "- CMS config: src/payload.config.ts\n"
        "- Collections: pages, posts, services, locations, leads, media, categories, users\n"
        "- Globals: header, footer, site-settings\n"
        "- Seed: npm run seed  (src/seed/run.ts)\n"
        "- Copy defaults: src/content/{home,services,locations,blog,legal}\n"
        "- Mappers: src/utilities/{home,services,locations,legal,blog}.ts\n\n"
        "For DB work open db_schema.txt + the collection config.\n"
        "For UI work open the frontend page + matching component only.\n\n"
    )


def _should_skip(path: Path) -> bool:
    return any(p in IGNORE_DIR_NAMES for p in path.parts)


def build_project_tree() -> str:
    lines = ["=== PROJECT TREE (index only) ===\n"]
    for dir_name in TARGET_DIRS:
        root = PROJECT_DIR / dir_name
        if not root.exists():
            continue
        lines.append(f"\n[{dir_name}/]\n")
        count = 0
        for p in sorted(root.rglob("*")):
            if not p.is_file() or _should_skip(p):
                continue
            if p.suffix.lower() not in CODE_EXTENSIONS:
                continue
            rel = p.relative_to(PROJECT_DIR).as_posix()
            lines.append(f"  {rel}\n")
            count += 1
            if count > 800:
                lines.append("  ... (truncated)\n")
                break
    for name in sorted(SPECIFIC_FILES):
        if (PROJECT_DIR / name).exists():
            lines.append(f"\n[{name}]\n")
    return "".join(lines)


def build_project_context() -> None:
    with CONTEXT_OUTPUT.open("w", encoding="utf-8") as out:
        out.write("=== AMAZONADC PROJECT CONTEXT FOR CURSOR (COMPACT) ===\n\n")
        out.write(build_environment_section())
        out.write(build_pointers_section())
        out.write(build_domain_map())
        out.write(build_project_tree())
        out.write("\n\n// End of compact context. Use targeted Read/Grep for source bodies.\n")
    size = CONTEXT_OUTPUT.stat().st_size
    print(f"Context done (compact): {CONTEXT_OUTPUT.name} ({size} bytes)")


if __name__ == "__main__":
    export_db_schema()
    build_project_context()
