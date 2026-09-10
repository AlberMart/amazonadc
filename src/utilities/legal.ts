import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type LegalSection = {
  heading: string
  intro?: string
  items?: string[]
  paragraphs?: string[]
}

export type LegalPageContent = {
  slug: string
  title: string
  description: string
  intro: string
  detailsHeading: string
  sections: LegalSection[]
  closing?: string
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

function mapLegal(doc: Record<string, unknown>): LegalPageContent {
  const legal = (doc.legalContent || {}) as {
    intro?: string | null
    detailsHeading?: string | null
    closing?: string | null
    sections?: Array<{
      heading?: string | null
      intro?: string | null
      items?: Array<{ item?: string | null } | null> | null
      paragraphs?: Array<{ text?: string | null } | null> | null
    } | null> | null
  }
  const meta = doc.meta as { description?: string | null } | null | undefined

  return {
    slug: slugValue(doc.slug),
    title: String(doc.title || ''),
    description: String(meta?.description || ''),
    intro: String(legal.intro || ''),
    detailsHeading: String(legal.detailsHeading || ''),
    sections: (legal.sections || [])
      .filter(Boolean)
      .map((section) => ({
        heading: String(section?.heading || ''),
        intro: section?.intro || undefined,
        items: items(section?.items),
        paragraphs: texts(section?.paragraphs),
      })),
    closing: legal.closing || undefined,
  }
}

export async function getLegalPage(slug: string): Promise<LegalPageContent | null> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1,
    pagination: false,
    depth: 0,
    where: {
      and: [
        { slug: { equals: slug } },
        { pageKind: { equals: 'legal' } },
        { _status: { equals: 'published' } },
      ],
    },
  })
  const doc = result.docs[0]
  return doc ? mapLegal(doc as unknown as Record<string, unknown>) : null
}

export async function getAllLegalSlugs(): Promise<string[]> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 100,
    pagination: false,
    depth: 0,
    where: {
      and: [{ pageKind: { equals: 'legal' } }, { _status: { equals: 'published' } }],
    },
    select: { slug: true },
  })
  return result.docs.map((doc) => slugValue(doc.slug)).filter(Boolean)
}
