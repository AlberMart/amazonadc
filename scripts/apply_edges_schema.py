"""Additive columns for Header/Footer edges and section padding/dividers."""

from __future__ import annotations

import shutil
import subprocess
from pathlib import Path
from urllib.parse import urlparse

url = None
for line in Path(".env").read_text(encoding="utf-8").splitlines():
    if line.startswith("DATABASE_URL="):
        url = line.split("=", 1)[1].strip().strip('"').strip("'")
        break

parsed = urlparse(url or "")
db = (parsed.path.lstrip("/") if parsed.path else "") or "amazonadc"
user = parsed.username or "payload"
docker = shutil.which("docker")
if not docker:
    raise SystemExit("docker not found")


def psql(sql: str, abort=True) -> str:
    result = subprocess.run(
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
            "-v",
            "ON_ERROR_STOP=1",
            "-c",
            sql,
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        msg = (result.stderr or result.stdout).strip()
        if abort:
            raise SystemExit(msg)
        print("warn:", msg)
        return msg
    print(result.stdout.strip() or "ok")
    return result.stdout


def add_enum(name: str, values: str) -> None:
    psql(
        f"""
DO $$ BEGIN
  CREATE TYPE {name} AS ENUM ({values});
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
""",
        abort=False,
    )


add_enum("enum_header_bottom_edge", "'none','hairline','scrolled'")
add_enum("enum_footer_top_edge", "'none','hairline'")

psql("ALTER TABLE header ADD COLUMN IF NOT EXISTS bottom_edge enum_header_bottom_edge DEFAULT 'none';", abort=False)
psql("ALTER TABLE footer ADD COLUMN IF NOT EXISTS top_edge enum_footer_top_edge DEFAULT 'none';", abort=False)

section_tables = [
    "pages_home_sections",
    "_pages_v_version_home_sections",
    "partials_sections",
    "services_sections",
    "locations_sections",
]
for table in section_tables:
    psql(f"ALTER TABLE {table} ADD COLUMN IF NOT EXISTS appearance_padding character varying;", abort=False)
    psql(f"ALTER TABLE {table} ADD COLUMN IF NOT EXISTS appearance_divider character varying;", abort=False)

print("edges schema apply complete")
