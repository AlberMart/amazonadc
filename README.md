# Amazon Air Duct Cleaning (amazonadc)

Modern rebuild of [amazonadc.com](https://amazonadc.com) on **Next.js + Payload CMS 3**, with admin panel, SEO tooling, spam-protected contact form, and Fly.io deployment.

## Stack

- Next.js App Router + TypeScript + Tailwind
- Payload CMS 3 (admin at `/admin`)
- Postgres (`@payloadcms/db-postgres`)
- SEO plugin, redirects plugin, form builder
- Contact API with honeypot + rate limit + optional Cloudflare Turnstile

## Local setup

1. Start Postgres:

```bash
docker compose up -d
```

2. Copy env (already have `.env` for local defaults):

```bash
# DATABASE_URL=postgresql://payload:payload@127.0.0.1:5432/amazonadc
# PAYLOAD_SECRET=...
# NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

3. Install & run:

```bash
npm install
npm run dev
```

4. Open:
- Site: http://localhost:3000
- Admin: http://localhost:3000/admin

## Content model

- `pages` — CMS pages / legal / landing blocks
- `posts` — blog (`/blog/*` via rewrite)
- `services` — service pages at `/{slug}` (e.g. `/air-duct-cleaning`)
- `locations` — `/locations/{slug}`
- `leads` — contact form submissions
- `site-settings` — phone, email, NAP, socials

Seed helpers live in `src/seed/amazonadc.ts`.

## Fly.io

See `fly.toml` (`amazadc-next`, region `iad`, 2GB RAM).

```bash
fly postgres create
fly postgres attach <db-name>
fly secrets set PAYLOAD_SECRET=... NEXT_PUBLIC_SERVER_URL=https://amazonadc.com
fly deploy
```

Cutover: point `amazonadc.com` from current Laravel app `amazadc` to this app after QA.

## Spam protection

Set Turnstile keys for production:

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
```

Without keys, verification is skipped in non-production only.
