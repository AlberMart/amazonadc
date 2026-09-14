import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import config from '@payload-config'
import { getAllBlogSlugs } from '@/utilities/blog'
import { getAllLocationSlugs } from '@/utilities/locations'
import { absoluteUrl } from '@/utilities/seo'

export const dynamic = 'force-dynamic'

/** Runtime sitemap: published pages, posts, services, and locations. NoIndex documents are skipped. */

function isNoIndex(meta: unknown): boolean {
  if (!meta || typeof meta !== 'object') return false
  return Boolean((meta as { noIndex?: boolean | null }).noIndex)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const now = new Date()

  const [services, locations, posts, pages] = await Promise.all([
    payload.find({ collection: 'services', limit: 100, pagination: false, depth: 0 }),
    payload.find({ collection: 'locations', limit: 100, pagination: false, depth: 0 }),
    payload.find({
      collection: 'posts',
      limit: 200,
      pagination: false,
      depth: 0,
      where: { _status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'pages',
      limit: 100,
      pagination: false,
      depth: 0,
      where: { _status: { equals: 'published' } },
    }),
  ])

  const entries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/locations'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  for (const service of services.docs) {
    if (!service.slug || isNoIndex(service.meta)) continue
    entries.push({
      url: absoluteUrl(`/${service.slug}`),
      lastModified: service.updatedAt ? new Date(service.updatedAt) : now,
      changeFrequency: 'monthly',
      priority: 0.9,
    })
  }

  for (const location of locations.docs) {
    if (!location.slug || isNoIndex(location.meta)) continue
    entries.push({
      url: absoluteUrl(`/locations/${location.slug}`),
      lastModified: location.updatedAt ? new Date(location.updatedAt) : now,
      changeFrequency: 'monthly',
      priority: 0.85,
    })
  }

  for (const post of posts.docs) {
    if (!post.slug || isNoIndex(post.meta)) continue
    entries.push({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  for (const page of pages.docs) {
    if (!page.slug || page.slug === 'home' || isNoIndex(page.meta)) continue
    entries.push({
      url: absoluteUrl(`/${page.slug}`),
      lastModified: page.updatedAt ? new Date(page.updatedAt) : now,
      changeFrequency: 'yearly',
      priority: 0.4,
    })
  }

  const have = new Set(entries.map((entry) => entry.url))
  const [locationSlugs, postSlugs] = await Promise.all([getAllLocationSlugs(), getAllBlogSlugs()])
  for (const slug of locationSlugs) {
    const url = absoluteUrl(`/locations/${slug}`)
    if (have.has(url)) continue
    have.add(url)
    entries.push({
      url,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    })
  }
  for (const slug of postSlugs) {
    const url = absoluteUrl(`/blog/${slug}`)
    if (have.has(url)) continue
    have.add(url)
    entries.push({
      url,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  return entries
}
