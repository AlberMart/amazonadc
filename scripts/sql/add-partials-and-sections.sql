-- Additive schema for Partials + portable page sections.
-- Safe to re-run: IF NOT EXISTS / exception handlers.

-- New section type values (home + drafts)
ALTER TYPE enum_pages_home_sections_type ADD VALUE IF NOT EXISTS 'trustBadges';
ALTER TYPE enum_pages_home_sections_type ADD VALUE IF NOT EXISTS 'gallery';
ALTER TYPE enum_pages_home_sections_type ADD VALUE IF NOT EXISTS 'listColumns';
ALTER TYPE enum_pages_home_sections_type ADD VALUE IF NOT EXISTS 'include';

ALTER TYPE enum__pages_v_version_home_sections_type ADD VALUE IF NOT EXISTS 'trustBadges';
ALTER TYPE enum__pages_v_version_home_sections_type ADD VALUE IF NOT EXISTS 'gallery';
ALTER TYPE enum__pages_v_version_home_sections_type ADD VALUE IF NOT EXISTS 'listColumns';
ALTER TYPE enum__pages_v_version_home_sections_type ADD VALUE IF NOT EXISTS 'include';

-- Reusable enums for new collections (clone home section types)
DO $$ BEGIN
  CREATE TYPE enum_partials_sections_type AS ENUM (
    'hero','prose','offers','pricing','featureSplit','cardGrid','steps','serviceArea',
    'blogTeaser','faq','reviews','contact','trustBadges','gallery','listColumns'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE enum_partials_sections_tone AS ENUM ('white','muted','dark');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE enum_partials_sections_image_position AS ENUM ('left','right');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE enum_services_sections_type AS ENUM (
    'hero','prose','offers','pricing','featureSplit','cardGrid','steps','serviceArea',
    'blogTeaser','faq','reviews','contact','trustBadges','gallery','listColumns','include'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE enum_services_sections_tone AS ENUM ('white','muted','dark');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE enum_services_sections_image_position AS ENUM ('left','right');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE enum_locations_sections_type AS ENUM (
    'hero','prose','offers','pricing','featureSplit','cardGrid','steps','serviceArea',
    'blogTeaser','faq','reviews','contact','trustBadges','gallery','listColumns','include'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE enum_locations_sections_tone AS ENUM ('white','muted','dark');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE enum_locations_sections_image_position AS ENUM ('left','right');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
