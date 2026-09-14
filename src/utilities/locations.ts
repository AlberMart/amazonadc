import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { resolveCmsImage, resolveCmsImageAlt } from '@/utilities/cmsImage'
import { alexandria } from '@/content/locations/alexandria'
import { arlington } from '@/content/locations/arlington'
import { bethesda } from '@/content/locations/bethesda'
import { burke } from '@/content/locations/burke'
import { chantilly } from '@/content/locations/chantilly'
import { clarksburg } from '@/content/locations/clarksburg'
import { collegePark } from '@/content/locations/college-park'
import { columbia } from '@/content/locations/columbia'
import { ellicottCity } from '@/content/locations/ellicott-city'
import { fairfax } from '@/content/locations/fairfax'
import { frederick } from '@/content/locations/frederick'
import { fairOaks } from '@/content/locations/fair-oaks'
import { fallsChurch } from '@/content/locations/falls-church'
import { gaithersburg } from '@/content/locations/gaithersburg'
import { germantown } from '@/content/locations/germantown'
import { greatFalls } from '@/content/locations/great-falls'
import { herndon } from '@/content/locations/herndon'
import { hyattsville } from '@/content/locations/hyattsville'
import { kensington } from '@/content/locations/kensington'
import { lorton } from '@/content/locations/lorton'
import { loudoun } from '@/content/locations/loudoun'
import { mclean } from '@/content/locations/mclean'
import { montgomeryVillage } from '@/content/locations/montgomery-village'
import { mountVernon } from '@/content/locations/mount-vernon'
import { oakton } from '@/content/locations/oakton'
import { olney } from '@/content/locations/olney'
import { potomac } from '@/content/locations/potomac'
import { princeWilliam } from '@/content/locations/prince-william'
import { reston } from '@/content/locations/reston'
import { rockville } from '@/content/locations/rockville'
import { silverSpring } from '@/content/locations/silver-spring'
import { springfield } from '@/content/locations/springfield'
import { takomaPark } from '@/content/locations/takoma-park'
import { vienna } from '@/content/locations/vienna'
import { washingtonDc } from '@/content/locations/washington-dc'
import { wheaton } from '@/content/locations/wheaton'
import { getAllOffices, officeFromSeedSlug, type OfficeContent } from './offices'
import { mapRawSections, type HomeSection } from '@/utilities/homeSections'
import { loadPageSections } from '@/utilities/partials'
import { locationContentToSections } from '@/utilities/sectionSeeds'

export type LocationFaq = { q: string; a: string }

export type LocationContent = {
  slug: string
  title: string
  headline: string
  description: string
  intro: string
  heroImage: string
  heroAlt: string
  /** City this SEO page targets */
  city: string
  state: string
  offersTitle: string
  /** True when this page is the hub page for its serving office (slug matches office slug). */
  isOfficeHub: boolean
  office: OfficeContent
  about: {
    heading: string
    paragraphs: string[]
    highlights: string[]
  }
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
  sections?: HomeSection[]
  meta?: {
    title?: string | null
    description?: string | null
    image?: string | null
    noIndex?: boolean | null
  }
}

/** Seed / content-file shape before CMS relation resolve */
export type LocationContentSeed = Omit<LocationContent, 'office' | 'isOfficeHub'> & {
  servedBy: string
}

const LOCATION_SEEDS: LocationContentSeed[] = [
  burke,
  bethesda,
  arlington,
  alexandria,
  mclean,
  washingtonDc,
  rockville,
  fairfax,
  springfield,
  loudoun,
  princeWilliam,
  silverSpring,
  gaithersburg,
  collegePark,
  reston,
  herndon,
  vienna,
  greatFalls,
  fallsChurch,
  chantilly,
  oakton,
  lorton,
  mountVernon,
  fairOaks,
  germantown,
  potomac,
  wheaton,
  takomaPark,
  kensington,
  olney,
  hyattsville,
  columbia,
  ellicottCity,
  frederick,
  montgomeryVillage,
  clarksburg,
]

export function locationFromSeed(
  seed: LocationContentSeed,
  office: OfficeContent,
): LocationContent {
  return {
    slug: seed.slug,
    title: seed.title,
    headline: seed.headline,
    description: seed.description,
    intro: seed.intro,
    heroImage: seed.heroImage,
    heroAlt: seed.heroAlt,
    city: seed.city,
    state: seed.state,
    offersTitle: seed.offersTitle,
    isOfficeHub: seed.slug === office.slug,
    office,
    about: seed.about,
    services: seed.services,
    why: seed.why,
    communities: seed.communities,
    process: seed.process,
    faqIntro: seed.faqIntro,
    faq: seed.faq,
    sections: locationContentToSections(seed),
    meta: seed.meta || {
      title: seed.title,
      description: seed.description,
    },
  }
}

async function officesForSeeds(): Promise<OfficeContent[]> {
  try {
    const offices = await getAllOffices()
    if (offices.length) return offices
  } catch {
    // Content files still render city pages if Payload is down or incomplete.
  }
  return ['burke', 'bethesda']
    .map((slug) => officeFromSeedSlug(slug))
    .filter((item): item is OfficeContent => Boolean(item))
}

async function locationFromSeedSlug(slug: string): Promise<LocationContent | null> {
  const seed = LOCATION_SEEDS.find((item) => item.slug === slug)
  if (!seed) return null
  const offices = await officesForSeeds()
  const office = offices.find((item) => item.slug === seed.servedBy) || officeFromSeedSlug(seed.servedBy)
  if (!office) return null
  return locationFromSeed(seed, office)
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

function resolveOffice(servedBy: unknown): OfficeContent | null {
  if (!servedBy) return null
  if (typeof servedBy === 'object') {
    return mapOffice(servedBy as Record<string, unknown>)
  }
  return null
}

function officeIdOf(servedBy: unknown): string | number | null {
  if (typeof servedBy === 'number' || typeof servedBy === 'string') return servedBy
  if (servedBy && typeof servedBy === 'object' && 'id' in servedBy) {
    const id = (servedBy as { id?: unknown }).id
    if (typeof id === 'number' || typeof id === 'string') return id
  }
  return null
}

function mapLocation(doc: Record<string, unknown>): LocationContent | null {
  const office = resolveOffice(doc.servedBy)
  if (!office) return null

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

  const slug = slugValue(doc.slug)

  return {
    slug,
    title: String(doc.title || ''),
    headline: String(doc.headline || ''),
    description: String(doc.description || ''),
    intro: String(doc.intro || ''),
    heroImage: resolveCmsImage(doc.heroMedia, doc.heroImage ? String(doc.heroImage) : undefined) || '',
    heroAlt: resolveCmsImageAlt(
      doc.heroAlt ? String(doc.heroAlt) : undefined,
      doc.heroMedia,
      String(doc.headline || doc.title || ''),
    ),
    city: String(doc.city || ''),
    state: String(doc.state || ''),
    offersTitle: String(doc.offersTitle || ''),
    isOfficeHub: slug === office.slug,
    office,
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

function applySeedMedia(location: LocationContent, heroMedia?: unknown): LocationContent {
  const seed = LOCATION_SEEDS.find((item) => item.slug === location.slug)
  if (!seed) return location
  const uploadedUrl =
    heroMedia && typeof heroMedia === 'object' && typeof (heroMedia as { url?: unknown }).url === 'string'
      ? String((heroMedia as { url: string }).url)
      : ''
  if (uploadedUrl && !uploadedUrl.startsWith('/img/')) return location
  return {
    ...location,
    heroImage: seed.heroImage,
    heroAlt: seed.heroAlt,
    meta: {
      ...(location.meta || {}),
      image: seed.heroImage,
    },
  }
}

export async function getLocationContent(slug: string): Promise<LocationContent | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'locations',
      where: { slug: { equals: slug } },
      limit: 1,
      pagination: false,
      depth: 2,
      overrideAccess: true,
    })
    const doc = result.docs[0]
    if (doc) {
      const raw = doc as unknown as Record<string, unknown>
      let mapped = mapLocation(raw)
      if (!mapped) {
        const officeId = officeIdOf(raw.servedBy)
        if (officeId) {
          const officeDoc = await payload.findByID({
            collection: 'offices',
            id: officeId,
            depth: 1,
            overrideAccess: true,
          })
          mapped = mapLocation({ ...raw, servedBy: officeDoc })
        }
      }
      if (mapped) {
        mapped = applySeedMedia(mapped, raw.heroMedia)
        mapped.sections = await loadPageSections(raw.sections)
        return mapped
      }
    }
  } catch {
    // Fall through to content files when CMS is unreachable or the row is missing.
  }
  return locationFromSeedSlug(slug)
}

export async function getAllLocationSlugs(): Promise<string[]> {
  const fromSeed = LOCATION_SEEDS.map((item) => item.slug)
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'locations',
      limit: 100,
      pagination: false,
      depth: 0,
      select: { slug: true },
      overrideAccess: true,
    })
    return [...new Set([...result.docs.map((doc) => slugValue(doc.slug)).filter(Boolean), ...fromSeed])]
  } catch {
    return fromSeed
  }
}

export async function getAllLocations(): Promise<LocationContent[]> {
  const offices = await officesForSeeds()
  const fromSeed = LOCATION_SEEDS.map((seed) => {
    const office = offices.find((item) => item.slug === seed.servedBy) || officeFromSeedSlug(seed.servedBy)
    return office ? locationFromSeed(seed, office) : null
  }).filter((item): item is LocationContent => Boolean(item))
  const seedByCityState = new Map(fromSeed.map((item) => [`${item.city}|${item.state}`, item]))

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'locations',
      limit: 100,
      pagination: false,
      depth: 1,
      sort: 'city',
      overrideAccess: true,
    })
    const mapped: LocationContent[] = []
    for (const doc of result.docs) {
      const raw = doc as unknown as Record<string, unknown>
      let location = mapLocation(raw)
      if (!location) {
        const officeId = officeIdOf(raw.servedBy)
        if (!officeId) continue
        const officeDoc = await payload.findByID({
          collection: 'offices',
          id: officeId,
          depth: 1,
          overrideAccess: true,
        })
        location = mapLocation({ ...raw, servedBy: officeDoc })
      }
      if (!location) continue
      location = applySeedMedia(location, raw.heroMedia)
      const canonical = seedByCityState.get(`${location.city}|${location.state}`)
      if (canonical && canonical.slug !== location.slug) continue
      mapped.push(location)
    }
    const have = new Set(mapped.map((item) => item.slug))
    for (const seedPage of fromSeed) {
      if (!have.has(seedPage.slug)) mapped.push(seedPage)
    }
    return mapped.sort((a, b) => a.city.localeCompare(b.city))
  } catch {
    return fromSeed.sort((a, b) => a.city.localeCompare(b.city))
  }
}

export async function getCityPageLinks(): Promise<Array<{ slug: string; city: string; state: string }>> {
  const fromSeed = LOCATION_SEEDS.map((item) => ({
    slug: item.slug,
    city: item.city,
    state: item.state,
  }))
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'locations',
      limit: 100,
      pagination: false,
      depth: 0,
      select: { slug: true, city: true, state: true },
      sort: 'city',
      overrideAccess: true,
    })
    const fromCms = result.docs
      .map((doc) => ({
        slug: slugValue(doc.slug),
        city: String(doc.city || ''),
        state: String(doc.state || ''),
      }))
      .filter((row) => row.slug)
    const seedByCityState = new Map(fromSeed.map((row) => [`${row.city}|${row.state}`, row]))
    const used = new Set<string>()
    const merged: Array<{ slug: string; city: string; state: string }> = []
    for (const row of fromCms) {
      const canonical = seedByCityState.get(`${row.city}|${row.state}`)
      if (canonical) {
        if (!used.has(canonical.slug)) {
          merged.push(canonical)
          used.add(canonical.slug)
        }
        continue
      }
      merged.push(row)
    }
    for (const row of fromSeed) {
      if (!used.has(row.slug)) merged.push(row)
    }
    return merged.sort((a, b) => a.city.localeCompare(b.city))
  } catch {
    return fromSeed.sort((a, b) => a.city.localeCompare(b.city))
  }
}
