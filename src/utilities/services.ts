import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { resolveCmsImage, resolveCmsImageAlt } from '@/utilities/cmsImage'
import { mapRawSections, type HomeSection } from '@/utilities/homeSections'
import { loadPageSections } from '@/utilities/partials'
import { withDbRetry } from '@/utilities/dbRetry'

export type ServiceFaq = { q: string; a: string }

export function optionalUsd(value: unknown): number | null {
  if (value == null || value === '') return null
  const n = Number(value)
  if (!Number.isFinite(n) || n <= 0) return null
  return n
}

export type ServiceContent = {
  slug: string
  title: string
  description: string
  summary: string
  price?: number | null
  compareAtPrice?: number | null
  orderUrl?: string
  heroImage: string
  heroAlt: string
  includesIntro?: string
  includesImage: string
  includesImageAlt: string
  includes: string[]
  beforeAfter?: Array<{ src: string; alt: string }>
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
  sections?: HomeSection[]
  meta?: {
    title?: string | null
    description?: string | null
    image?: string | null
    noIndex?: boolean | null
  }
}

export type ServiceCard = {
  slug: string
  title: string
  price?: number | null
  compareAtPrice?: number | null
  thumb: string
  href: string
  summary: string
}

export function servicePrimaryCta(service: { price?: number | null; orderUrl?: string | null }) {
  const href = service.orderUrl?.trim() || '#contact'
  const isCheckout = /^https?:\/\//i.test(href)
  return {
    href,
    isCheckout,
    label: isCheckout ? 'Order now' : 'Get a Free Quote',
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

function mapService(doc: Record<string, unknown>): ServiceContent {
  const why = doc.why as
    | {
        heading?: string | null
        paragraphs?: Array<{ text?: string | null } | null> | null
        image?: string | null
        imageAlt?: string | null
        media?: unknown
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
    price: optionalUsd(doc.price),
    compareAtPrice: optionalUsd(doc.compareAtPrice),
    orderUrl: doc.orderUrl ? String(doc.orderUrl) : undefined,
    heroImage: resolveCmsImage(doc.heroMedia, doc.heroImage ? String(doc.heroImage) : undefined) || '',
    heroAlt: resolveCmsImageAlt(
      doc.heroAlt ? String(doc.heroAlt) : undefined,
      doc.heroMedia,
      String(doc.title || ''),
    ),
    includesIntro: doc.includesIntro ? String(doc.includesIntro) : undefined,
    includesImage: resolveCmsImage(doc.includesMedia, doc.includesImage ? String(doc.includesImage) : undefined) || '',
    includesImageAlt: resolveCmsImageAlt(
      doc.includesImageAlt ? String(doc.includesImageAlt) : undefined,
      doc.includesMedia,
    ),
    includes: items(doc.includes as Array<{ item?: string | null } | null>),
    beforeAfter: (
      (doc.beforeAfter as Array<{ src?: string | null; alt?: string | null; media?: unknown } | null>) || []
    )
      .filter(Boolean)
      .map((row) => ({
        src: resolveCmsImage(row?.media, row?.src) || '',
        alt: String(row?.alt || ''),
      })),
    why: why?.heading
      ? {
          heading: String(why.heading),
          paragraphs: texts(why.paragraphs),
          image: resolveCmsImage(why.media, why.image),
          imageAlt: resolveCmsImageAlt(why.imageAlt, why.media),
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
    sections: mapRawSections(doc.sections),
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

export async function getServiceContent(slug: string): Promise<ServiceContent | null> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    pagination: false,
    depth: 2,
  })
  const doc = result.docs[0]
  if (!doc) return null
  const mapped = mapService(doc as unknown as Record<string, unknown>)
  mapped.sections = await loadPageSections(
    (doc as unknown as Record<string, unknown>).sections,
  )
  return mapped
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
  const result = await withDbRetry(async () => {
    const payload = await getPayload({ config: configPromise })
    return payload.find({
      collection: 'services',
      limit: 100,
      pagination: false,
      depth: 1,
      sort: 'price',
    })
  })

  const cards = result.docs.map((doc) => {
    const mapped = mapService(doc as unknown as Record<string, unknown>)
    const thumb =
      resolveCmsImage(doc.thumbMedia, typeof doc.thumbImage === 'string' ? doc.thumbImage : undefined) ||
      mapped.heroImage
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

  return cards.sort((a, b) => {
    const aPrice = a.price ?? Number.POSITIVE_INFINITY
    const bPrice = b.price ?? Number.POSITIVE_INFINITY
    if (aPrice !== bPrice) return aPrice - bPrice
    return a.title.localeCompare(b.title)
  })
}

export async function getRelatedServices(currentSlug: string): Promise<ServiceCard[]> {
  const cards = await getAllServiceCards()
  return cards.filter((service) => service.slug !== currentSlug)
}
