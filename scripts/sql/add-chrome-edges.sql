DO $$ BEGIN
  CREATE TYPE enum_header_bottom_edge AS ENUM ('none','hairline','scrolled');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE enum_footer_top_edge AS ENUM ('none','hairline');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE header ADD COLUMN IF NOT EXISTS bottom_edge enum_header_bottom_edge DEFAULT 'none';
ALTER TABLE footer ADD COLUMN IF NOT EXISTS top_edge enum_footer_top_edge DEFAULT 'none';

ALTER TABLE pages_home_sections ADD COLUMN IF NOT EXISTS appearance_padding character varying;
ALTER TABLE pages_home_sections ADD COLUMN IF NOT EXISTS appearance_divider character varying;
ALTER TABLE _pages_v_version_home_sections ADD COLUMN IF NOT EXISTS appearance_padding character varying;
ALTER TABLE _pages_v_version_home_sections ADD COLUMN IF NOT EXISTS appearance_divider character varying;
ALTER TABLE partials_sections ADD COLUMN IF NOT EXISTS appearance_padding character varying;
ALTER TABLE partials_sections ADD COLUMN IF NOT EXISTS appearance_divider character varying;
ALTER TABLE services_sections ADD COLUMN IF NOT EXISTS appearance_padding character varying;
ALTER TABLE services_sections ADD COLUMN IF NOT EXISTS appearance_divider character varying;
ALTER TABLE locations_sections ADD COLUMN IF NOT EXISTS appearance_padding character varying;
ALTER TABLE locations_sections ADD COLUMN IF NOT EXISTS appearance_divider character varying;
