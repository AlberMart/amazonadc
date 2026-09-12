import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://amazonadc.com'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const dateFallback = new Date().toISOString()

    const [pages, services, locations] = await Promise.all([
      payload.find({
        collection: 'pages',
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 1000,
        pagination: false,
        where: { _status: { equals: 'published' } },
        select: { slug: true, updatedAt: true, meta: true },
      }),
      payload.find({
        collection: 'services',
        overrideAccess: false,
        depth: 0,
        limit: 100,
        pagination: false,
        select: { slug: true, updatedAt: true, meta: true },
      }),
      payload.find({
        collection: 'locations',
        overrideAccess: false,
        depth: 0,
        limit: 100,
        pagination: false,
        select: { slug: true, updatedAt: true, meta: true },
      }),
    ])

    const skipNoIndex = (meta: unknown) =>
      Boolean(meta && typeof meta === 'object' && (meta as { noIndex?: boolean }).noIndex)

    const entries = [
      { loc: `${SITE_URL}/`, lastmod: dateFallback },
      { loc: `${SITE_URL}/locations`, lastmod: dateFallback },
      { loc: `${SITE_URL}/blog`, lastmod: dateFallback },
    ]

    for (const page of pages.docs || []) {
      if (!page?.slug || page.slug === 'home' || skipNoIndex(page.meta)) continue
      entries.push({
        loc: `${SITE_URL}/${page.slug}`,
        lastmod: page.updatedAt || dateFallback,
      })
    }

    for (const service of services.docs || []) {
      if (!service?.slug || skipNoIndex(service.meta)) continue
      entries.push({
        loc: `${SITE_URL}/${service.slug}`,
        lastmod: service.updatedAt || dateFallback,
      })
    }

    for (const location of locations.docs || []) {
      if (!location?.slug || skipNoIndex(location.meta)) continue
      entries.push({
        loc: `${SITE_URL}/locations/${location.slug}`,
        lastmod: location.updatedAt || dateFallback,
      })
    }

    return entries
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()
  return getServerSideSitemap(sitemap)
}
