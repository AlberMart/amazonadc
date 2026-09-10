import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type LocationFaq = { q: string; a: string }

export type LocationContent = {
  slug: string
  title: string
  headline: string
  description: string
  intro: string
  heroImage: string
  heroAlt: string
  phone: string
  phoneDisplay: string
  email: string
  streetAddress: string
  city: string
  state: string
  postalCode: string
  about: {
    heading: string
    paragraphs: string[]
    highlights: string[]
  }
  offersTitle: string
  services: {
    heading: string
    intro: string
    items: Array<{ title: string; text: string }>
  }
  why: {
    heading: string
    items: Array<{ title: string; text: string }>
  }
  communities: {
    heading: string
    intro: string
    groups: Array<{ title: string; places: string }>
  }
  process: {
    heading: string
    intro: string
    steps: Array<{ title: string; text: string }>
  }
  faqIntro: string
  faq: LocationFaq[]
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

function mapLocation(doc: Record<string, unknown>): LocationContent {
  const about = (doc.about || {}) as {
    heading?: string | null
    paragraphs?: Array<{ text?: string | null } | null> | null
    highlights?: Array<{ item?: string | null } | null> | null
  }
  const services = (doc.services || {}) as {
    heading?: string | null
    intro?: string | null
    items?: Array<{ title?: string | null; text?: string | null } | null> | null
  }
  const why = (doc.why || {}) as {
    heading?: string | null
    items?: Array<{ title?: string | null; text?: string | null } | null> | null
  }
  const communities = (doc.communities || {}) as {
    heading?: string | null
    intro?: string | null
    groups?: Array<{ title?: string | null; places?: string | null } | null> | null
  }
  const process = (doc.process || {}) as {
    heading?: string | null
    intro?: string | null
    steps?: Array<{ title?: string | null; text?: string | null } | null> | null
  }

  return {
    slug: slugValue(doc.slug),
    title: String(doc.title || ''),
    headline: String(doc.headline || ''),
    description: String(doc.description || ''),
    intro: String(doc.intro || ''),
    heroImage: String(doc.heroImage || ''),
    heroAlt: String(doc.heroAlt || ''),
    phone: String(doc.phone || ''),
    phoneDisplay: String(doc.phoneDisplay || ''),
    email: String(doc.email || ''),
    streetAddress: String(doc.streetAddress || ''),
    city: String(doc.city || ''),
    state: String(doc.state || ''),
    postalCode: String(doc.postalCode || ''),
    offersTitle: String(doc.offersTitle || ''),
    about: {
      heading: String(about.heading || ''),
      paragraphs: texts(about.paragraphs),
      highlights: items(about.highlights),
    },
    services: {
      heading: String(services.heading || ''),
      intro: String(services.intro || ''),
      items: (services.items || [])
        .filter(Boolean)
        .map((item) => ({
          title: String(item?.title || ''),
          text: String(item?.text || ''),
        })),
    },
    why: {
      heading: String(why.heading || ''),
      items: (why.items || [])
        .filter(Boolean)
        .map((item) => ({
          title: String(item?.title || ''),
          text: String(item?.text || ''),
        })),
    },
    communities: {
      heading: String(communities.heading || ''),
      intro: String(communities.intro || ''),
      groups: (communities.groups || [])
        .filter(Boolean)
        .map((group) => ({
          title: String(group?.title || ''),
          places: String(group?.places || ''),
        })),
    },
    process: {
      heading: String(process.heading || ''),
      intro: String(process.intro || ''),
      steps: (process.steps || [])
        .filter(Boolean)
        .map((step) => ({
          title: String(step?.title || ''),
          text: String(step?.text || ''),
        })),
    },
    faqIntro: String(doc.faqIntro || ''),
    faq: ((doc.faq as Array<{ question?: string | null; answer?: string | null } | null>) || [])
      .filter(Boolean)
      .map((item) => ({ q: String(item?.question || ''), a: String(item?.answer || '') })),
  }
}

export async function getLocationContent(slug: string): Promise<LocationContent | null> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'locations',
    where: { slug: { equals: slug } },
    limit: 1,
    pagination: false,
    depth: 0,
  })
  const doc = result.docs[0]
  return doc ? mapLocation(doc as unknown as Record<string, unknown>) : null
}

export async function getAllLocationSlugs(): Promise<string[]> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'locations',
    limit: 100,
    pagination: false,
    depth: 0,
    select: { slug: true },
  })
  return result.docs.map((doc) => slugValue(doc.slug)).filter(Boolean)
}
