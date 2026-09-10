import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type ServiceFaq = { q: string; a: string }

export type ServiceContent = {
  slug: string
  title: string
  description: string
  summary: string
  price: number
  compareAtPrice: number
  orderUrl: string
  heroImage: string
  heroAlt: string
  includesIntro?: string
  includesImage: string
  includesImageAlt: string
  includes: string[]
  beforeAfter: Array<{ src: string; alt: string }>
  why?: {
    heading: string
    paragraphs: string[]
    image?: string
    imageAlt?: string
  }
  columns?: Array<{ heading: string; items: string[] }>
  listBlocks?: Array<{ heading: string; items: string[] }>
  process?: {
    heading: string
    intro?: string
    steps: Array<{ title: string; text: string }>
  }
  processAside?: {
    heading: string
    paragraphs: string[]
    steps: Array<{ title: string; text: string }>
  }
  scheduleCta?: {
    heading: string
    paragraphs: string[]
  }
  faqIntro?: string
  faq: ServiceFaq[]
}

export type ServiceCard = {
  slug: string
  title: string
  price: number
  compareAtPrice: number
  thumb: string
  href: string
  summary: string
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

function mapService(doc: Record<string, unknown>): ServiceContent {
  const why = doc.why as
    | {
        heading?: string | null
        paragraphs?: Array<{ text?: string | null } | null> | null
        image?: string | null
        imageAlt?: string | null
      }
    | null
    | undefined
  const process = doc.process as
    | {
        heading?: string | null
        intro?: string | null
        steps?: Array<{ title?: string | null; text?: string | null } | null> | null
      }
    | null
    | undefined
  const processAside = doc.processAside as
    | {
        heading?: string | null
        paragraphs?: Array<{ text?: string | null } | null> | null
        steps?: Array<{ title?: string | null; text?: string | null } | null> | null
      }
    | null
    | undefined
  const scheduleCta = doc.scheduleCta as
    | {
        heading?: string | null
        paragraphs?: Array<{ text?: string | null } | null> | null
      }
    | null
    | undefined

  return {
    slug: slugValue(doc.slug),
    title: String(doc.title || ''),
    description: String(doc.description || ''),
    summary: String(doc.summary || ''),
    price: Number(doc.price || 0),
    compareAtPrice: Number(doc.compareAtPrice || 0),
    orderUrl: String(doc.orderUrl || ''),
    heroImage: String(doc.heroImage || ''),
    heroAlt: String(doc.heroAlt || ''),
    includesIntro: doc.includesIntro ? String(doc.includesIntro) : undefined,
    includesImage: String(doc.includesImage || ''),
    includesImageAlt: String(doc.includesImageAlt || ''),
    includes: items(doc.includes as Array<{ item?: string | null } | null>),
    beforeAfter: (
      (doc.beforeAfter as Array<{ src?: string | null; alt?: string | null } | null>) || []
    )
      .filter(Boolean)
      .map((row) => ({ src: String(row?.src || ''), alt: String(row?.alt || '') })),
    why: why?.heading
      ? {
          heading: String(why.heading),
          paragraphs: texts(why.paragraphs),
          image: why.image || undefined,
          imageAlt: why.imageAlt || undefined,
        }
      : undefined,
    columns: (
      (doc.columns as Array<{
        heading?: string | null
        items?: Array<{ item?: string | null } | null> | null
      } | null>) || []
    )
      .filter(Boolean)
      .map((col) => ({
        heading: String(col?.heading || ''),
        items: items(col?.items),
      })),
    listBlocks: (
      (doc.listBlocks as Array<{
        heading?: string | null
        items?: Array<{ item?: string | null } | null> | null
      } | null>) || []
    )
      .filter(Boolean)
      .map((block) => ({
        heading: String(block?.heading || ''),
        items: items(block?.items),
      })),
    process: process?.heading
      ? {
          heading: String(process.heading),
          intro: process.intro || undefined,
          steps: (process.steps || [])
            .filter(Boolean)
            .map((step) => ({
              title: String(step?.title || ''),
              text: String(step?.text || ''),
            })),
        }
      : undefined,
    processAside: processAside?.heading
      ? {
          heading: String(processAside.heading),
          paragraphs: texts(processAside.paragraphs),
          steps: (processAside.steps || [])
            .filter(Boolean)
            .map((step) => ({
              title: String(step?.title || ''),
              text: String(step?.text || ''),
            })),
        }
      : undefined,
    scheduleCta: scheduleCta?.heading
      ? {
          heading: String(scheduleCta.heading),
          paragraphs: texts(scheduleCta.paragraphs),
        }
      : undefined,
    faqIntro: doc.faqIntro ? String(doc.faqIntro) : undefined,
    faq: ((doc.faq as Array<{ question?: string | null; answer?: string | null } | null>) || [])
      .filter(Boolean)
      .map((item) => ({ q: String(item?.question || ''), a: String(item?.answer || '') })),
  }
}

export async function getServiceContent(slug: string): Promise<ServiceContent | null> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    pagination: false,
    depth: 0,
  })
  const doc = result.docs[0]
  return doc ? mapService(doc as unknown as Record<string, unknown>) : null
}

export async function getAllServiceSlugs(): Promise<string[]> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'services',
    limit: 100,
    pagination: false,
    depth: 0,
    select: { slug: true },
  })
  return result.docs.map((doc) => slugValue(doc.slug)).filter(Boolean)
}

export async function getAllServiceCards(): Promise<ServiceCard[]> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'services',
    limit: 100,
    pagination: false,
    depth: 0,
    sort: 'price',
  })

  return result.docs.map((doc) => {
    const mapped = mapService(doc as unknown as Record<string, unknown>)
    const thumb =
      typeof doc.thumbImage === 'string' && doc.thumbImage ? doc.thumbImage : mapped.heroImage
    return {
      slug: mapped.slug,
      title: mapped.title,
      price: mapped.price,
      compareAtPrice: mapped.compareAtPrice,
      thumb,
      href: `/${mapped.slug}`,
      summary: mapped.summary,
    }
  })
}

export async function getRelatedServices(currentSlug: string): Promise<ServiceCard[]> {
  const cards = await getAllServiceCards()
  return cards.filter((service) => service.slug !== currentSlug)
}
