import type { HomeContent } from '@/content/home'
import { homeContentSeed } from '@/content/home'
import { resolveCmsImage, resolveCmsImageAlt } from '@/utilities/cmsImage'
import type { ColorToken, SectionAppearance } from '@/utilities/theme'

export type HomeSectionType =
  | 'hero'
  | 'prose'
  | 'offers'
  | 'pricing'
  | 'featureSplit'
  | 'cardGrid'
  | 'steps'
  | 'serviceArea'
  | 'blogTeaser'
  | 'faq'
  | 'reviews'
  | 'contact'
  | 'trustBadges'
  | 'gallery'
  | 'listColumns'
  | 'include'

export type ServiceAreaRegion = {
  name: string
  cities: string[]
  href?: string | null
  linkLabel?: string | null
  emptyLinkLabel?: string | null
}

export type SectionBadge = {
  src: string
  alt: string
  width?: number
  height?: number
}

export type HomeSection = {
  type: HomeSectionType
  anchorId?: string
  tone?: 'white' | 'muted' | 'dark'
  eyebrow?: string
  heading?: string
  subheadline?: string
  intro?: string
  paragraphs?: string[]
  highlights?: string[]
  items?: Array<{ title: string; text: string }>
  steps?: Array<{ title: string; text: string }>
  stepsLayout?: 'list' | 'cards'
  gridCols?: 2 | 3 | 4
  faqItems?: Array<{ q: string; a: string }>
  image?: string
  imageAlt?: string
  imagePosition?: 'left' | 'right'
  ctaLabel?: string
  ctaHref?: string
  phoneDisplay?: string
  phoneHref?: string
  formId?: number
  closingText?: string
  viewAllLabel?: string
  viewAllHref?: string
  cardLinkLabel?: string
  phoneSuffix?: string
  appearance?: SectionAppearance
  mapEmbedUrl?: string
  mapTitle?: string
  regions?: ServiceAreaRegion[]
  badges?: SectionBadge[]
  photos?: Array<{ src: string; alt: string }>
  listColumns?: Array<{ heading: string; items: string[] }>
  partialId?: number | string
  includedSections?: HomeSection[]
}

function texts(rows?: Array<{ text?: string | null } | null> | null): string[] {
  return (rows || []).map((row) => row?.text || '').filter(Boolean)
}

function items(rows?: Array<{ item?: string | null } | null> | null): string[] {
  return (rows || []).map((row) => row?.item || '').filter(Boolean)
}

function mapAppearance(raw: unknown): SectionAppearance | undefined {
  if (!raw || typeof raw !== 'object') return undefined
  const value = raw as Record<string, unknown>
  const appearance: SectionAppearance = {
    background: (value.background as ColorToken) || 'inherit',
    backgroundCustom: value.backgroundCustom ? String(value.backgroundCustom) : undefined,
    headingColor: (value.headingColor as ColorToken) || 'inherit',
    headingCustom: value.headingCustom ? String(value.headingCustom) : undefined,
    bodyColor: (value.bodyColor as ColorToken) || 'inherit',
    bodyCustom: value.bodyCustom ? String(value.bodyCustom) : undefined,
    cardStyle: (value.cardStyle as SectionAppearance['cardStyle']) || 'inherit',
    radius: (value.radius as SectionAppearance['radius']) || 'inherit',
    listStyle: (value.listStyle as SectionAppearance['listStyle']) || 'inherit',
    ctaVariant: (value.ctaVariant as SectionAppearance['ctaVariant']) || 'inherit',
    padding: (value.padding as SectionAppearance['padding']) || 'inherit',
    divider: (value.divider as SectionAppearance['divider']) || 'none',
  }
  return appearance
}

export function mapServiceAreaRegions(raw: unknown): ServiceAreaRegion[] {
  return ((raw as unknown[]) || [])
    .map((row) => {
      const r = row as {
        name?: string
        cities?: Array<{ name?: string } | string>
        href?: string | null
        linkLabel?: string | null
        emptyLinkLabel?: string | null
      }
      return {
        name: r.name || '',
        cities: (r.cities || [])
          .map((c) => (typeof c === 'string' ? c : c?.name || ''))
          .filter(Boolean),
        href: r.href || null,
        linkLabel: r.linkLabel || null,
        emptyLinkLabel: r.emptyLinkLabel || null,
      }
    })
    .filter((r) => r.name)
}

function mapBadges(raw: unknown): SectionBadge[] {
  return ((raw as unknown[]) || [])
    .map((row) => {
      const badge = row as {
        image?: unknown
        src?: string | null
        alt?: string | null
        width?: number | null
        height?: number | null
      }
      const src = resolveCmsImage(badge.image, badge.src) || ''
      const alt = badge.alt || ''
      if (!src || !alt) return null
      return {
        src,
        alt,
        width: badge.width || undefined,
        height: badge.height || undefined,
      }
    })
    .filter((row): row is SectionBadge => Boolean(row))
}

const SECTION_TYPES: HomeSectionType[] = [
  'hero',
  'prose',
  'offers',
  'pricing',
  'featureSplit',
  'cardGrid',
  'steps',
  'serviceArea',
  'blogTeaser',
  'faq',
  'reviews',
  'contact',
  'trustBadges',
  'gallery',
  'listColumns',
  'include',
]

export function mapHomeSection(raw: Record<string, unknown>, nested = false): HomeSection | null {
  const type = String(raw.type || '') as HomeSectionType
  if (!SECTION_TYPES.includes(type)) return null
  if (nested && type === 'include') return null

  const partial = raw.partial
  let partialId: number | string | undefined
  let includedSections: HomeSection[] | undefined
  if (typeof partial === 'number' || typeof partial === 'string') {
    partialId = partial
  } else if (partial && typeof partial === 'object') {
    const doc = partial as { id?: number | string; sections?: unknown[] }
    if (doc.id != null) partialId = doc.id
    includedSections = ((doc.sections as unknown[]) || [])
      .map((row) => mapHomeSection(row as Record<string, unknown>, true))
      .filter((row): row is HomeSection => Boolean(row))
  }

  return {
    type,
    anchorId: raw.anchorId ? String(raw.anchorId) : undefined,
    tone: (raw.tone as HomeSection['tone']) || 'white',
    eyebrow: raw.eyebrow != null ? String(raw.eyebrow) : undefined,
    heading: raw.heading ? String(raw.heading) : undefined,
    subheadline: raw.subheadline ? String(raw.subheadline) : undefined,
    intro: raw.intro ? String(raw.intro) : undefined,
    paragraphs: texts(raw.paragraphs as Array<{ text?: string | null }>),
    highlights: items(raw.highlights as Array<{ item?: string | null }>),
    items: (
      (raw.items as Array<{ title?: string | null; text?: string | null } | null>) || []
    )
      .filter(Boolean)
      .map((item) => ({ title: String(item?.title || ''), text: String(item?.text || '') })),
    steps: (
      (raw.steps as Array<{ title?: string | null; text?: string | null } | null>) || []
    )
      .filter(Boolean)
      .map((item) => ({ title: String(item?.title || ''), text: String(item?.text || '') })),
    stepsLayout: raw.stepsLayout === 'cards' ? 'cards' : 'list',
    gridCols: raw.gridCols === '2' || raw.gridCols === 2 ? 2 : raw.gridCols === '3' || raw.gridCols === 3 ? 3 : 4,
    faqItems: (
      (raw.faqItems as Array<{ question?: string | null; answer?: string | null } | null>) ||
      []
    )
      .filter(Boolean)
      .map((item) => ({ q: String(item?.question || ''), a: String(item?.answer || '') })),
    image: resolveCmsImage(raw.imageUpload, raw.image ? String(raw.image) : undefined),
    imageAlt: resolveCmsImageAlt(
      raw.imageAlt ? String(raw.imageAlt) : undefined,
      raw.imageUpload,
      raw.heading ? String(raw.heading) : '',
    ),
    imagePosition: (raw.imagePosition as 'left' | 'right') || 'right',
    ctaLabel: raw.ctaLabel ? String(raw.ctaLabel) : undefined,
    ctaHref: raw.ctaHref ? String(raw.ctaHref) : undefined,
    phoneDisplay: raw.phoneDisplay ? String(raw.phoneDisplay) : undefined,
    phoneHref: raw.phoneHref ? String(raw.phoneHref) : undefined,
    formId: (() => {
      const form = raw.form
      if (typeof form === 'number') return form
      if (form && typeof form === 'object' && 'id' in form) return Number((form as { id: number }).id)
      return undefined
    })(),
    closingText: raw.closingText ? String(raw.closingText) : undefined,
    viewAllLabel: raw.viewAllLabel ? String(raw.viewAllLabel) : undefined,
    viewAllHref: raw.viewAllHref ? String(raw.viewAllHref) : undefined,
    cardLinkLabel: raw.cardLinkLabel ? String(raw.cardLinkLabel) : undefined,
    phoneSuffix: raw.phoneSuffix ? String(raw.phoneSuffix) : undefined,
    appearance: mapAppearance(raw.appearance),
    mapEmbedUrl: raw.mapEmbedUrl ? String(raw.mapEmbedUrl) : undefined,
    mapTitle: raw.mapTitle ? String(raw.mapTitle) : undefined,
    regions: mapServiceAreaRegions(raw.regions),
    badges: mapBadges(raw.badges),
    photos: (
      (raw.photos as Array<{ src?: string | null; alt?: string | null; media?: unknown } | null>) ||
      []
    )
      .filter(Boolean)
      .map((row) => ({
        src: resolveCmsImage(row?.media, row?.src) || '',
        alt: String(row?.alt || ''),
      }))
      .filter((row) => row.src),
    listColumns: (
      (raw.listColumns as Array<{
        heading?: string | null
        items?: Array<{ item?: string | null } | null> | null
      } | null>) || []
    )
      .filter(Boolean)
      .map((col) => ({
        heading: String(col?.heading || ''),
        items: items(col?.items),
      })),
    partialId,
    includedSections,
  }
}

export function flattenPageSections(sections: HomeSection[]): HomeSection[] {
  const out: HomeSection[] = []
  for (const section of sections) {
    if (section.type === 'include') {
      out.push(...flattenPageSections(section.includedSections || []))
      continue
    }
    out.push(section)
  }
  return out
}

export function mapRawSections(raw: unknown, options?: { flatten?: boolean }): HomeSection[] {
  const mapped = ((raw as unknown[]) || [])
    .map((row) => mapHomeSection(row as Record<string, unknown>))
    .filter((row): row is HomeSection => Boolean(row))
  return options?.flatten === false ? mapped : flattenPageSections(mapped)
}

export function faqItemsFromSections(sections: HomeSection[]): Array<{ q: string; a: string }> {
  return flattenPageSections(sections)
    .filter((section) => section.type === 'faq')
    .flatMap((section) => (section.faqItems || []).filter((item) => item.q && item.a))
}

/** Convert legacy flat homeContent into portable sections (seed + fallback). */
export function homeContentToSections(content: HomeContent = homeContentSeed): HomeSection[] {
  return [
    { type: 'trustBadges', tone: 'white', appearance: { padding: 'compact', divider: 'none', background: 'badges' } },
    {
      type: 'hero',
      tone: 'dark',
      eyebrow: content.heroEyebrow || undefined,
      heading: content.heroHeadline,
      subheadline: content.heroSubheadline,
      ctaLabel: content.heroCtaLabel,
      ctaHref: content.heroCtaHref,
      phoneDisplay: content.heroPhoneDisplay,
      phoneHref: content.heroPhoneHref,
      image: content.heroImage,
      imageAlt: content.heroImageAlt,
    },
    {
      type: 'prose',
      anchorId: 'about',
      tone: 'white',
      heading: content.aboutHeading,
      paragraphs: content.aboutParagraphs,
      closingText: content.aboutClosing,
      phoneDisplay: content.aboutPhoneDisplay,
      phoneHref: content.aboutPhoneHref,
    },
    {
      type: 'offers',
      anchorId: 'current_offers',
      tone: 'muted',
      heading: content.offersHeading,
      intro: content.offersIntro,
    },
    {
      type: 'pricing',
      tone: 'white',
      heading: content.pricingHeading,
      intro: content.pricingIntro,
      highlights: content.pricingHighlights,
      paragraphs: content.pricingParagraphs,
    },
    {
      type: 'featureSplit',
      tone: 'muted',
      heading: content.airDuctHeading,
      paragraphs: content.airDuctParagraphs,
      image: content.airDuctImage,
      imageAlt: content.airDuctImageAlt,
      imagePosition: 'right',
      ctaLabel: content.airDuctCtaLabel,
      ctaHref: content.airDuctCtaHref,
    },
    {
      type: 'featureSplit',
      tone: 'white',
      heading: content.dryerHeading,
      paragraphs: content.dryerParagraphs,
      image: content.dryerImage,
      imageAlt: content.dryerImageAlt,
      imagePosition: 'left',
      ctaLabel: content.dryerCtaLabel,
      ctaHref: content.dryerCtaHref,
    },
    {
      type: 'cardGrid',
      tone: 'muted',
      heading: content.whyHeading,
      intro: content.whyIntro,
      phoneDisplay: content.whyPhoneDisplay,
      phoneHref: content.whyPhoneHref,
      items: content.whyItems,
    },
    {
      type: 'steps',
      tone: 'white',
      heading: content.processHeading,
      intro: content.processIntro,
      image: content.processImage,
      imageAlt: content.processImageAlt,
      steps: content.processSteps,
    },
    {
      type: 'cardGrid',
      tone: 'muted',
      heading: content.servicesHeading,
      intro: content.servicesIntro,
      items: content.serviceItems,
    },
    { type: 'serviceArea', anchorId: 'service_area', tone: 'white' },
    {
      type: 'blogTeaser',
      anchorId: 'blog',
      tone: 'muted',
      heading: content.blogHeading,
      intro: content.blogIntro,
      viewAllLabel: content.blogViewAllLabel,
      viewAllHref: '/blog',
      cardLinkLabel: 'Read article',
    },
    {
      type: 'faq',
      tone: 'white',
      heading: content.faqHeading,
      intro: content.faqIntro,
      phoneDisplay: content.faqPhoneDisplay,
      phoneHref: content.faqPhoneHref,
      phoneSuffix: 'or unlock special pricing online.',
      faqItems: content.faqItems,
    },
    {
      type: 'reviews',
      tone: 'muted',
      heading: content.reviewsHeading,
      intro: content.reviewsIntro,
    },
    { type: 'contact', anchorId: 'contact', tone: 'white' },
  ]
}

export function mapHomeSectionsToSeed(sections: HomeSection[]) {
  return sections.map((section) => ({
    type: section.type,
    anchorId: section.anchorId || undefined,
    tone: section.tone || 'white',
    eyebrow: section.eyebrow || undefined,
    heading: section.heading || undefined,
    subheadline: section.subheadline || undefined,
    intro: section.intro || undefined,
    paragraphs: (section.paragraphs || []).map((text) => ({ text })),
    highlights: (section.highlights || []).map((item) => ({ item })),
    items: section.items || [],
    steps: section.steps || [],
    stepsLayout: section.stepsLayout || 'list',
    gridCols: section.gridCols ? String(section.gridCols) : undefined,
    faqItems: (section.faqItems || []).map((item) => ({
      question: item.q,
      answer: item.a,
    })),
    image: section.image || undefined,
    imageAlt: section.imageAlt || undefined,
    imagePosition: section.imagePosition || 'right',
    ctaLabel: section.ctaLabel || undefined,
    ctaHref: section.ctaHref || undefined,
    phoneDisplay: section.phoneDisplay || undefined,
    phoneHref: section.phoneHref || undefined,
    form: section.formId || undefined,
    closingText: section.closingText || undefined,
    viewAllLabel: section.viewAllLabel || undefined,
    viewAllHref: section.viewAllHref || undefined,
    cardLinkLabel: section.cardLinkLabel || undefined,
    phoneSuffix: section.phoneSuffix || undefined,
    mapEmbedUrl: section.mapEmbedUrl || undefined,
    mapTitle: section.mapTitle || undefined,
    regions: (section.regions || []).map((region) => ({
      name: region.name,
      cities: region.cities.map((name) => ({ name })),
      href: region.href || undefined,
      linkLabel: region.linkLabel || undefined,
      emptyLinkLabel: region.emptyLinkLabel || undefined,
    })),
    badges: (section.badges || []).map((badge) => ({
      src: badge.src,
      alt: badge.alt,
      width: badge.width,
      height: badge.height,
    })),
    photos: (section.photos || []).map((photo) => ({
      src: photo.src,
      alt: photo.alt,
    })),
    listColumns: (section.listColumns || []).map((col) => ({
      heading: col.heading,
      items: col.items.map((item) => ({ item })),
    })),
    partial: section.partialId || undefined,
  }))
}

export const homeSectionsSeed = homeContentToSections(homeContentSeed).map((section) =>
  section.type === 'serviceArea' ? { type: 'include' as const } : section,
)
