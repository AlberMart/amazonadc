import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { resolveCmsImage, resolveCmsImageAlt } from '@/utilities/cmsImage'

export type BlogIndexItem = {
  slug: string
  title: string
  description: string
  hero: string
}

export type BlogSection = {
  id?: string
  heading?: string
  paragraphs: string[]
  listItems: string[]
  image?: string
}

export type BlogFaqItem = {
  q: string
  a: string
}

export type BlogPost = {
  slug: string
  title: string
  headline: string
  description: string
  heroImage: string
  heroImageAlt?: string
  publishedAt?: string | null
  updatedAt?: string | null
  sections: BlogSection[]
  faq: BlogFaqItem[]
  meta?: {
    title?: string | null
    description?: string | null
    image?: string | null
    noIndex?: boolean | null
  }
}

function slugValue(slug: unknown): string {
  if (typeof slug === 'string') return slug
  if (
    slug &&
    typeof slug === 'object' &&
    'slug' in slug &&
    typeof (slug as { slug: unknown }).slug === 'string'
  ) {
    return (slug as { slug: string }).slug
  }
  return ''
}

function texts(rows?: Array<{ text?: string | null } | null> | null): string[] {
  return (rows || []).map((row) => row?.text || '').filter(Boolean)
}

function items(rows?: Array<{ item?: string | null } | null> | null): string[] {
  return (rows || []).map((row) => row?.item || '').filter(Boolean)
}

function mapPost(doc: Record<string, unknown>): BlogPost {
  return {
    slug: slugValue(doc.slug),
    title: String(doc.title || ''),
    headline: String(doc.headline || doc.title || ''),
    description: String(doc.excerpt || (doc.meta as { description?: string } | undefined)?.description || ''),
    heroImage: resolveCmsImage(doc.heroImage, doc.heroImagePath ? String(doc.heroImagePath) : undefined) || '',
    heroImageAlt: resolveCmsImageAlt(
      doc.heroImageAlt ? String(doc.heroImageAlt) : undefined,
      doc.heroImage,
      String(doc.title || ''),
    ),
    publishedAt: doc.publishedAt ? String(doc.publishedAt) : null,
    updatedAt: doc.updatedAt ? String(doc.updatedAt) : null,
    sections: (
      (doc.sections as Array<{
        sectionId?: string | null
        heading?: string | null
        paragraphs?: Array<{ text?: string | null } | null> | null
        listItems?: Array<{ item?: string | null } | null> | null
        image?: string | null
        imageUpload?: unknown
      } | null>) || []
    )
      .filter(Boolean)
      .map((section) => ({
        id: section?.sectionId || undefined,
        heading: section?.heading || undefined,
        paragraphs: texts(section?.paragraphs),
        listItems: items(section?.listItems),
        image: resolveCmsImage(section?.imageUpload, section?.image),
      })),
    faq: ((doc.faq as Array<{ question?: string | null; answer?: string | null } | null>) || [])
      .filter(Boolean)
      .map((item) => ({ q: String(item?.question || ''), a: String(item?.answer || '') })),
    meta: (() => {
      const meta = doc.meta as
        | {
            title?: string | null
            description?: string | null
            image?: unknown
            noIndex?: boolean | null
          }
        | null
        | undefined
      if (!meta) return undefined
      let image: string | null = null
      if (typeof meta.image === 'string') image = meta.image
      else if (meta.image && typeof meta.image === 'object' && 'url' in meta.image) {
        image = String((meta.image as { url?: string | null }).url || '') || null
      }
      return {
        title: meta.title,
        description: meta.description,
        image,
        noIndex: meta.noIndex,
      }
    })(),
  }
}

export async function getBlogIndex(): Promise<BlogIndexItem[]> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 100,
    pagination: false,
    depth: 1,
    where: {
      _status: { equals: 'published' },
    },
    sort: '-publishedAt',
  })

  return result.docs.map((doc) => {
    const mapped = mapPost(doc as unknown as Record<string, unknown>)
    return {
      slug: mapped.slug,
      title: mapped.title,
      description: mapped.description,
      hero: mapped.heroImage,
    }
  })
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1,
    pagination: false,
    depth: 1,
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
    },
  })
  const doc = result.docs[0]
  return doc ? mapPost(doc as unknown as Record<string, unknown>) : null
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const index = await getBlogIndex()
  return index.map((item) => item.slug)
}
