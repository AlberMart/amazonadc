"""Apply additive Postgres schema for Partials + page sections."""

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
        [docker, "compose", "exec", "-T", "postgres", "psql", "-U", user, "-d", db, "-v", "ON_ERROR_STOP=1", "-c", sql],
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


def add_enum_values(typ: str, values: list[str]) -> None:
    for value in values:
        psql(f"ALTER TYPE {typ} ADD VALUE IF NOT EXISTS '{value}';", abort=False)


NEW_TYPES = ["trustBadges", "gallery", "listColumns", "include"]
add_enum_values("enum_pages_home_sections_type", NEW_TYPES)
add_enum_values("enum__pages_v_version_home_sections_type", NEW_TYPES)

for name, values in [
    (
        "enum_partials_sections_type",
        [
            "hero",
            "prose",
            "offers",
            "pricing",
            "featureSplit",
            "cardGrid",
            "steps",
            "serviceArea",
            "blogTeaser",
            "faq",
            "reviews",
            "contact",
            "trustBadges",
            "gallery",
            "listColumns",
        ],
    ),
    ("enum_partials_sections_tone", ["white", "muted", "dark"]),
    ("enum_partials_sections_image_position", ["left", "right"]),
]:
    psql(
        f"""DO $$ BEGIN CREATE TYPE {name} AS ENUM ({", ".join("'" + v + "'" for v in values)}); EXCEPTION WHEN duplicate_object THEN NULL; END $$;"""
    )

for prefix in ["services", "locations"]:
    psql(
        f"""DO $$ BEGIN CREATE TYPE enum_{prefix}_sections_type AS ENUM (
        'hero','prose','offers','pricing','featureSplit','cardGrid','steps','serviceArea',
        'blogTeaser','faq','reviews','contact','trustBadges','gallery','listColumns','include'
        ); EXCEPTION WHEN duplicate_object THEN NULL; END $$;"""
    )
    psql(
        f"""DO $$ BEGIN CREATE TYPE enum_{prefix}_sections_tone AS ENUM ('white','muted','dark');
        EXCEPTION WHEN duplicate_object THEN NULL; END $$;"""
    )
    psql(
        f"""DO $$ BEGIN CREATE TYPE enum_{prefix}_sections_image_position AS ENUM ('left','right');
        EXCEPTION WHEN duplicate_object THEN NULL; END $$;"""
    )

psql(
    """
CREATE TABLE IF NOT EXISTS partials (
  id serial PRIMARY KEY,
  title character varying NOT NULL,
  generate_slug boolean DEFAULT true,
  slug character varying NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
"""
)
psql("CREATE UNIQUE INDEX IF NOT EXISTS partials_slug_idx ON partials USING btree (slug);")
psql("CREATE INDEX IF NOT EXISTS partials_created_at_idx ON partials USING btree (created_at);")
psql("CREATE INDEX IF NOT EXISTS partials_updated_at_idx ON partials USING btree (updated_at);")

psql("ALTER TABLE payload_locked_documents_rels ADD COLUMN IF NOT EXISTS partials_id integer;")
psql(
    """
DO $$ BEGIN
  ALTER TABLE payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_partials_fk
    FOREIGN KEY (partials_id) REFERENCES partials(id) ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
"""
)

EXTRA_COLS = [
    ("partial_id", "integer"),
    ("grid_cols", "character varying"),
    ("steps_layout", "character varying"),
    ("map_embed_url", "character varying"),
    ("map_title", "character varying"),
]


def add_extra_cols(table: str) -> None:
    for col, typ in EXTRA_COLS:
        psql(f"ALTER TABLE {table} ADD COLUMN IF NOT EXISTS {col} {typ};")


add_extra_cols("pages_home_sections")
add_extra_cols("_pages_v_version_home_sections")

psql(
    """
DO $$ BEGIN
  ALTER TABLE pages_home_sections
    ADD CONSTRAINT pages_home_sections_partial_id_partials_id_fk
    FOREIGN KEY (partial_id) REFERENCES partials(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
"""
)
psql(
    """
DO $$ BEGIN
  ALTER TABLE _pages_v_version_home_sections
    ADD CONSTRAINT _pages_v_version_home_sections_partial_id_partials_id_fk
    FOREIGN KEY (partial_id) REFERENCES partials(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
"""
)


def child_tables(section_table: str, parent_id_type: str) -> None:
    specs = [
        (
            f"{section_table}_regions",
            f"""
            CREATE TABLE IF NOT EXISTS {section_table}_regions (
              _order integer NOT NULL,
              _parent_id {parent_id_type} NOT NULL,
              id character varying PRIMARY KEY,
              name character varying NOT NULL,
              href character varying,
              link_label character varying,
              empty_link_label character varying
            );
            """,
        ),
        (
            f"{section_table}_regions_cities",
            f"""
            CREATE TABLE IF NOT EXISTS {section_table}_regions_cities (
              _order integer NOT NULL,
              _parent_id character varying NOT NULL,
              id character varying PRIMARY KEY,
              name character varying NOT NULL
            );
            """,
        ),
        (
            f"{section_table}_badges",
            f"""
            CREATE TABLE IF NOT EXISTS {section_table}_badges (
              _order integer NOT NULL,
              _parent_id {parent_id_type} NOT NULL,
              id character varying PRIMARY KEY,
              image_id integer,
              src character varying,
              alt character varying,
              width numeric,
              height numeric
            );
            """,
        ),
        (
            f"{section_table}_photos",
            f"""
            CREATE TABLE IF NOT EXISTS {section_table}_photos (
              _order integer NOT NULL,
              _parent_id {parent_id_type} NOT NULL,
              id character varying PRIMARY KEY,
              media_id integer,
              src character varying,
              alt character varying
            );
            """,
        ),
        (
            f"{section_table}_list_columns",
            f"""
            CREATE TABLE IF NOT EXISTS {section_table}_list_columns (
              _order integer NOT NULL,
              _parent_id {parent_id_type} NOT NULL,
              id character varying PRIMARY KEY,
              heading character varying NOT NULL
            );
            """,
        ),
        (
            f"{section_table}_list_columns_items",
            f"""
            CREATE TABLE IF NOT EXISTS {section_table}_list_columns_items (
              _order integer NOT NULL,
              _parent_id character varying NOT NULL,
              id character varying PRIMARY KEY,
              item character varying NOT NULL
            );
            """,
        ),
    ]
    for name, ddl in specs:
        psql(ddl)
        psql(f"CREATE INDEX IF NOT EXISTS {name}_order_idx ON {name} USING btree (_order);")
        psql(f"CREATE INDEX IF NOT EXISTS {name}_parent_id_idx ON {name} USING btree (_parent_id);")

    psql(
        f"""
DO $$ BEGIN
  ALTER TABLE {section_table}_regions
    ADD CONSTRAINT {section_table}_regions_parent_fk
    FOREIGN KEY (_parent_id) REFERENCES {section_table}(id) ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
"""
    )
    psql(
        f"""
DO $$ BEGIN
  ALTER TABLE {section_table}_regions_cities
    ADD CONSTRAINT {section_table}_regions_cities_parent_fk
    FOREIGN KEY (_parent_id) REFERENCES {section_table}_regions(id) ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
"""
    )
    psql(
        f"""
DO $$ BEGIN
  ALTER TABLE {section_table}_badges
    ADD CONSTRAINT {section_table}_badges_parent_fk
    FOREIGN KEY (_parent_id) REFERENCES {section_table}(id) ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
"""
    )
    psql(
        f"""
DO $$ BEGIN
  ALTER TABLE {section_table}_badges
    ADD CONSTRAINT {section_table}_badges_image_fk
    FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
"""
    )
    psql(
        f"""
DO $$ BEGIN
  ALTER TABLE {section_table}_photos
    ADD CONSTRAINT {section_table}_photos_parent_fk
    FOREIGN KEY (_parent_id) REFERENCES {section_table}(id) ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
"""
    )
    psql(
        f"""
DO $$ BEGIN
  ALTER TABLE {section_table}_photos
    ADD CONSTRAINT {section_table}_photos_media_fk
    FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
"""
    )
    psql(
        f"""
DO $$ BEGIN
  ALTER TABLE {section_table}_list_columns
    ADD CONSTRAINT {section_table}_list_columns_parent_fk
    FOREIGN KEY (_parent_id) REFERENCES {section_table}(id) ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
"""
    )
    psql(
        f"""
DO $$ BEGIN
  ALTER TABLE {section_table}_list_columns_items
    ADD CONSTRAINT {section_table}_list_columns_items_parent_fk
    FOREIGN KEY (_parent_id) REFERENCES {section_table}_list_columns(id) ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
"""
    )


child_tables("pages_home_sections", "character varying")

for name in [
    "_pages_v_version_home_sections_regions_cities",
    "_pages_v_version_home_sections_regions",
    "_pages_v_version_home_sections_badges",
    "_pages_v_version_home_sections_photos",
    "_pages_v_version_home_sections_list_columns_items",
    "_pages_v_version_home_sections_list_columns",
]:
    psql(f"DROP TABLE IF EXISTS {name} CASCADE;", abort=False)

child_tables("_pages_v_version_home_sections", "integer")


def create_section_root(table: str, parent: str, type_enum: str, tone_enum: str, pos_enum: str) -> None:
    psql(
        f"""
CREATE TABLE IF NOT EXISTS {table} (
  _order integer NOT NULL,
  _parent_id integer NOT NULL,
  id character varying PRIMARY KEY,
  type {type_enum} NOT NULL,
  anchor_id character varying,
  tone {tone_enum},
  eyebrow character varying,
  heading character varying,
  subheadline character varying,
  intro character varying,
  image character varying,
  image_alt character varying,
  image_position {pos_enum},
  cta_label character varying,
  cta_href character varying,
  phone_display character varying,
  phone_href character varying,
  closing_text character varying,
  view_all_label character varying,
  view_all_href character varying,
  card_link_label character varying,
  phone_suffix character varying,
  image_upload_id integer,
  appearance_background character varying,
  appearance_background_custom character varying,
  appearance_heading_color character varying,
  appearance_heading_custom character varying,
  appearance_body_color character varying,
  appearance_body_custom character varying,
  appearance_card_style character varying,
  appearance_radius character varying,
  appearance_list_style character varying,
  appearance_cta_variant character varying,
  appearance_padding character varying,
  appearance_divider character varying,
  form_id integer,
  partial_id integer,
  grid_cols character varying,
  steps_layout character varying,
  map_embed_url character varying,
  map_title character varying
);
"""
    )
    psql(f"CREATE INDEX IF NOT EXISTS {table}_order_idx ON {table} USING btree (_order);")
    psql(f"CREATE INDEX IF NOT EXISTS {table}_parent_id_idx ON {table} USING btree (_parent_id);")
    psql(
        f"""
DO $$ BEGIN
  ALTER TABLE {table}
    ADD CONSTRAINT {table}_parent_fk
    FOREIGN KEY (_parent_id) REFERENCES {parent}(id) ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
"""
    )
    psql(
        f"""
DO $$ BEGIN
  ALTER TABLE {table}
    ADD CONSTRAINT {table}_image_upload_fk
    FOREIGN KEY (image_upload_id) REFERENCES media(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
"""
    )
    psql(
        f"""
DO $$ BEGIN
  ALTER TABLE {table}
    ADD CONSTRAINT {table}_form_fk
    FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
"""
    )
    psql(
        f"""
DO $$ BEGIN
  ALTER TABLE {table}
    ADD CONSTRAINT {table}_partial_fk
    FOREIGN KEY (partial_id) REFERENCES partials(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
"""
    )

    nested = [
        (
            f"{table}_paragraphs",
            "text character varying NOT NULL",
        ),
        (
            f"{table}_highlights",
            "item character varying NOT NULL",
        ),
        (
            f"{table}_items",
            "title character varying NOT NULL, text character varying NOT NULL",
        ),
        (
            f"{table}_steps",
            "title character varying, text character varying NOT NULL",
        ),
        (
            f"{table}_faq_items",
            "question character varying NOT NULL, answer character varying NOT NULL",
        ),
    ]
    for name, extra in nested:
        psql(
            f"""
CREATE TABLE IF NOT EXISTS {name} (
  _order integer NOT NULL,
  _parent_id character varying NOT NULL,
  id character varying PRIMARY KEY,
  {extra}
);
"""
        )
        psql(f"CREATE INDEX IF NOT EXISTS {name}_order_idx ON {name} USING btree (_order);")
        psql(f"CREATE INDEX IF NOT EXISTS {name}_parent_id_idx ON {name} USING btree (_parent_id);")
        psql(
            f"""
DO $$ BEGIN
  ALTER TABLE {name}
    ADD CONSTRAINT {name}_parent_fk
    FOREIGN KEY (_parent_id) REFERENCES {table}(id) ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
"""
        )

    child_tables(table, "character varying")


create_section_root(
    "partials_sections",
    "partials",
    "enum_partials_sections_type",
    "enum_partials_sections_tone",
    "enum_partials_sections_image_position",
)
create_section_root(
    "services_sections",
    "services",
    "enum_services_sections_type",
    "enum_services_sections_tone",
    "enum_services_sections_image_position",
)
create_section_root(
    "locations_sections",
    "locations",
    "enum_locations_sections_type",
    "enum_locations_sections_tone",
    "enum_locations_sections_image_position",
)

print("schema apply complete")
