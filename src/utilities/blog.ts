import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { resolveCmsImage, resolveCmsImageAlt } from '@/utilities/cmsImage'
import { withDbRetry } from '@/utilities/dbRetry'
import blogIndexSeed from '@/content/blog/index.json'
import howOften from '@/content/blog/how-often-clean-air-ducts.json'
import sevenSigns from '@/content/blog/7-signs-air-ducts-need-cleaning.json'
import whyDryer from '@/content/blog/why-clean-dryer-vents.json'
import energyBills from '@/content/blog/how-dirty-air-ducts-increase-energy-bills.json'
import allergies from '@/content/blog/can-dirty-air-ducts-cause-allergies.json'
import neverClean from '@/content/blog/never-clean-air-ducts.json'
import arlingtonHumidity from '@/content/blog/how-potomac-humidity-affects-arlington-air-quality.json'
import alexandriaHumidity from '@/content/blog/how-potomac-humidity-affects-alexandria-air-quality.json'
import dcHumidity from '@/content/blog/dc-humidity-row-houses-indoor-air.json'
import mcleanPollen from '@/content/blog/mclean-tree-pollen-basement-humidity.json'
import rockvilleBasement from '@/content/blog/rockville-basement-humidity-air-ducts.json'

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

const FILE_POSTS = [
  howOften,
  sevenSigns,
  whyDryer,
  energyBills,
  allergies,
  neverClean,
  arlingtonHumidity,
  alexandriaHumidity,
  dcHumidity,
  mcleanPollen,
  rockvilleBasement,
] as BlogPost[]

function fileBlogIndex(): BlogIndexItem[] {
  return blogIndexSeed as BlogIndexItem[]
}

function mergeBlogIndex(cms: BlogIndexItem[]): BlogIndexItem[] {
  const have = new Set(cms.map((item) => item.slug))
  const extras = fileBlogIndex().filter((item) => !have.has(item.slug))
  return [...extras, ...cms]
}

export async function getBlogIndex(): Promise<BlogIndexItem[]> {
  try {
    const result = await withDbRetry(async () => {
      const payload = await getPayload({ config: configPromise })
      return payload.find({
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
    })

    const cms = result.docs.map((doc) => {
      const mapped = mapPost(doc as unknown as Record<string, unknown>)
      return {
        slug: mapped.slug,
        title: mapped.title,
        description: mapped.description,
        hero: mapped.heroImage,
      }
    })
    return mergeBlogIndex(cms)
  } catch (error) {
    console.error('Blog index unavailable', error)
    return fileBlogIndex()
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
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
    if (doc) return mapPost(doc as unknown as Record<string, unknown>)
  } catch {
    // Fall through to content files when CMS is missing the post.
  }
  return FILE_POSTS.find((post) => post.slug === slug) || null
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const index = await getBlogIndex()
  return index.map((item) => item.slug)
}
