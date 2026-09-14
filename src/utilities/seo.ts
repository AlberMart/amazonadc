import type { Metadata } from 'next'
import { createHash } from 'node:crypto'

import { officesSeedSource } from '@/content/offices'
import type { OfficeContent } from './offices'
import { getServerSideURL } from './getURL'
import { getCachedGlobal } from './getGlobals'
import { resolveCmsImage } from './cmsImage'

export type SiteSeo = {
  siteName: string
  phoneDisplay: string
  phone: string
  email: string
  organizationDescription: string
  priceRange: string
  logoPath: string
  defaultOgImage: string
  defaultMetaTitle: string
  defaultMetaDescription: string
  titleSuffix: string
  priceValidUntil: string
  socialSameAs: string[]
}

const FALLBACK_SITE: SiteSeo = {
  siteName: 'Amazon Air Duct Cleaning',
  phoneDisplay: '(800) 606-3334',
  phone: '+18006063334',
  email: 'support@amazonadc.com',
  organizationDescription:
    'Professional air duct, dryer vent, and HVAC cleaning in Virginia, Maryland, and Washington DC.',
  priceRange: '$$-$$$',
  logoPath: '/img/logo.png',
  defaultOgImage: '/img/Amazon.webp',
  defaultMetaTitle: 'Air Duct Cleaning in Virginia, Maryland & Washington DC',
  defaultMetaDescription:
    'Top-rated air duct cleaning in VA, MD & DC. Improve indoor air quality, remove dust and allergens, and clean dryer vents. Flat rates and a 100% satisfaction guarantee.',
  titleSuffix: 'Amazon Air Duct Cleaning',
  priceValidUntil: '2027-12-31',
  socialSameAs: [
    'https://www.facebook.com/amazonductcleaning',
    'https://www.instagram.com/amazonairduct',
  ],
}

const REGION_AREA_SERVED = [
  { '@type': 'State', name: 'Virginia' },
  { '@type': 'State', name: 'Maryland' },
  { '@type': 'AdministrativeArea', name: 'Washington DC' },
]

/** @deprecated Prefer getSiteSeo() — kept for rare sync call sites */
export const SITE_NAME = FALLBACK_SITE.siteName
export const SITE_PHONE = FALLBACK_SITE.phone
export const SITE_EMAIL = FALLBACK_SITE.email
export const DEFAULT_DESCRIPTION = FALLBACK_SITE.defaultMetaDescription
export const OG_IMAGE = FALLBACK_SITE.defaultOgImage

/** Fallback NAP from seed when CMS offices unavailable */
export const OFFICES = officesSeedSource.map((office) => ({
  slug: office.slug,
  name: office.name,
  telephone: office.phone,
  streetAddress: office.streetAddress,
  addressLocality: office.city,
  addressRegion: office.state,
  postalCode: office.postalCode,
}))

export function siteUrl() {
  return getServerSideURL().replace(/\/$/, '')
}

export function absoluteUrl(path = '/') {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${siteUrl()}${path.startsWith('/') ? path : `/${path}`}`
}

function rollPriceValidUntil(value?: string | null): string {
  const nextYear = new Date().getUTCFullYear() + 1
  const rolled = `${nextYear}-12-31`
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return rolled
  const expiry = Date.parse(`${value}T23:59:59.000Z`)
  if (Number.isNaN(expiry) || expiry < Date.now()) return rolled
  return value
}

export async function getSiteSeo(): Promise<SiteSeo> {
  try {
    const settings = await getCachedGlobal('site-settings', 1)()
    if (!settings) return FALLBACK_SITE
    const social =
      settings.socialLinks?.map((item) => item.url).filter(Boolean) || FALLBACK_SITE.socialSameAs
    return {
      siteName: settings.siteName || FALLBACK_SITE.siteName,
      phoneDisplay: settings.phone || FALLBACK_SITE.phoneDisplay,
      phone: settings.phoneHref || FALLBACK_SITE.phone,
      email: settings.email || FALLBACK_SITE.email,
      organizationDescription:
        settings.organizationDescription || FALLBACK_SITE.organizationDescription,
      priceRange: settings.priceRange || FALLBACK_SITE.priceRange,
      logoPath:
        resolveCmsImage(
          (settings as { logo?: unknown }).logo,
          settings.logoPath,
        ) || FALLBACK_SITE.logoPath,
      defaultOgImage:
        resolveCmsImage(
          (settings as { defaultOgImageUpload?: unknown }).defaultOgImageUpload,
          settings.defaultOgImage,
        ) || FALLBACK_SITE.defaultOgImage,
      defaultMetaTitle: settings.defaultMetaTitle || FALLBACK_SITE.defaultMetaTitle,
      defaultMetaDescription:
        settings.defaultMetaDescription || FALLBACK_SITE.defaultMetaDescription,
      titleSuffix: settings.titleSuffix || FALLBACK_SITE.titleSuffix,
      priceValidUntil: rollPriceValidUntil(
        settings.priceValidUntil || FALLBACK_SITE.priceValidUntil,
      ),
      socialSameAs: social.length ? social : FALLBACK_SITE.socialSameAs,
    }
  } catch {
    return {
      ...FALLBACK_SITE,
      priceValidUntil: rollPriceValidUntil(FALLBACK_SITE.priceValidUntil),
    }
  }
}

export function pageTitle(title: string, suffix = FALLBACK_SITE.titleSuffix) {
  if (!title) return suffix
  return title.includes(suffix) ? title : `${title} | ${suffix}`
}

export type PageMetaInput = {
  path: string
  meta?: {
    title?: string | null
    description?: string | null
    image?: string | null
    noIndex?: boolean | null
  } | null
  fallbackTitle?: string
  fallbackDescription?: string
  fallbackImage?: string
  imageAlt?: string
  type?: 'website' | 'article'
  ogTypeProduct?: boolean
  productPrice?: number | null
  site?: SiteSeo
}

export function resolvePageMeta(input: PageMetaInput, site: SiteSeo = FALLBACK_SITE): Metadata {
  const titleBase =
    input.meta?.title?.trim() || input.fallbackTitle?.trim() || site.defaultMetaTitle
  const description =
    input.meta?.description?.trim() ||
    input.fallbackDescription?.trim() ||
    site.defaultMetaDescription
  const image =
    (typeof input.meta?.image === 'string' && input.meta.image) ||
    input.fallbackImage ||
    site.defaultOgImage
  const fullTitle = pageTitle(titleBase, site.titleSuffix)
  const url = absoluteUrl(input.path)
  const imageUrl = absoluteUrl(image)
  const isProduct = Boolean(input.ogTypeProduct)
  const articleType = input.type === 'article'

  const metadata: Metadata = {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    robots: input.meta?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.siteName,
      locale: 'en_US',
      // Omit type on product pages so we can emit property="og:type" product via <meta> in the page.
      ...(articleType ? { type: 'article' as const } : isProduct ? {} : { type: 'website' as const }),
      images: [
        {
          url: imageUrl,
          alt: input.imageAlt || titleBase,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  }

  return metadata
}

/** Sync helper kept for call sites that already resolved strings */
export function pageMetadata({
  title,
  description,
  path,
  image = OG_IMAGE,
  type = 'website',
  noIndex,
  siteName = SITE_NAME,
}: {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
  siteName?: string
}): Metadata {
  return resolvePageMeta(
    {
      path,
      meta: { title, description, image, noIndex },
      type,
    },
    { ...FALLBACK_SITE, siteName, titleSuffix: siteName, defaultOgImage: image },
  )
}

function faqId(question: string, pageUrl: string) {
  const hash = createHash('md5').update(question).digest('hex').slice(0, 12)
  return `${pageUrl}#faq-${hash}`
}

export function breadcrumb(
  items: Array<{ name: string; path: string }>,
  pagePath?: string,
) {
  const pageUrl = absoluteUrl(pagePath || items[items.length - 1]?.path || '/')
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function websiteNode(site: SiteSeo) {
  const url = absoluteUrl('/')
  return {
    '@type': 'WebSite',
    '@id': `${url}#website`,
    url,
    name: site.siteName,
    description: site.organizationDescription,
    publisher: { '@id': `${url}#organization` },
    inLanguage: 'en-US',
  }
}

export function webPageNode({
  path,
  name,
  description,
  aboutId,
  mainEntityId,
  breadcrumbId,
  image,
  dateModified,
}: {
  path: string
  name: string
  description: string
  aboutId?: string
  mainEntityId?: string
  breadcrumbId?: string
  image?: string
  dateModified?: string
}) {
  const url = absoluteUrl(path)
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': `${absoluteUrl('/')}#website` },
    ...(aboutId ? { about: { '@id': aboutId } } : {}),
    ...(mainEntityId ? { mainEntity: { '@id': mainEntityId } } : {}),
    ...(breadcrumbId ? { breadcrumb: { '@id': breadcrumbId } } : {}),
    ...(image ? { primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(image) } } : {}),
    ...(dateModified ? { dateModified } : {}),
    inLanguage: 'en-US',
  }
}

export function faqNode(
  items: Array<{ q: string; a: string }>,
  options?: {
    pagePath?: string
    aboutId?: string
    publisherId?: string
  },
) {
  const pageUrl = absoluteUrl(options?.pagePath || '/')
  const mainEntity = items
    .filter((item) => item.q && item.a)
    .map((item) => ({
      '@type': 'Question',
      '@id': faqId(item.q, pageUrl),
      name: item.q,
      ...(options?.aboutId
        ? {
            about: {
              '@type': 'Service',
              name: 'Air Duct Cleaning',
              provider: { '@id': options.aboutId },
            },
          }
        : {}),
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
        ...(options?.aboutId ? { author: { '@id': options.aboutId } } : {}),
      },
    }))
  if (!mainEntity.length) return null
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${pageUrl}#webpage` },
    ...(options?.aboutId ? { about: { '@id': options.aboutId } } : {}),
    ...(options?.publisherId ? { publisher: { '@id': options.publisherId } } : {}),
    mainEntity,
  }
}

function officeSameAs(office: OfficeContent, site: SiteSeo) {
  const links = [
    office.googleBusinessUrl,
    ...office.sameAs,
    ...site.socialSameAs,
  ]
  return [...new Set(links.filter(Boolean))]
}

function officeAddress(office: OfficeContent) {
  return {
    '@type': 'PostalAddress',
    streetAddress: office.streetAddress,
    addressLocality: office.city,
    addressRegion: office.state,
    postalCode: office.postalCode,
    addressCountry: 'US',
  }
}

function officeHours(office: OfficeContent) {
  return [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: office.weekdayOpens || '08:00',
      closes: office.weekdayCloses || '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: office.saturdayOpens || '09:00',
      closes: office.saturdayCloses || '20:00',
    },
  ]
}

function officeReviews(office: OfficeContent) {
  return office.featuredReviews.map((review) => ({
    '@type': 'Review',
    '@id': `${absoluteUrl(`/locations/${office.slug}`)}#review-${review.author
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')}`,
    author: { '@type': 'Person', name: review.author },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(review.rating),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: review.text,
    ...(review.googleUrl ? { url: review.googleUrl } : {}),
    itemReviewed: { '@id': `${absoluteUrl(`/locations/${office.slug}`)}#office` },
  }))
}

function cityAreaServed(office: OfficeContent) {
  const cities = office.areaServedCities.length
    ? office.areaServedCities
    : [office.city]
  const nodes: Array<Record<string, unknown>> = cities.map((name) => ({
    '@type': 'City',
    name,
  }))
  if (office.latitude && office.longitude) {
    nodes.push({
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: office.latitude,
        longitude: office.longitude,
      },
      geoRadius: office.geoRadiusMeters || 30000,
    })
  }
  return nodes
}

export function officeBranchNode(office: OfficeContent, site: SiteSeo) {
  const path = `/locations/${office.slug}`
  const url = absoluteUrl(path)
  const orgId = `${absoluteUrl('/')}#organization`
  const sameAs = officeSameAs(office, site)

  return {
    '@type': ['HVACBusiness', 'HomeAndConstructionBusiness', 'LocalBusiness'],
    '@id': `${url}#office`,
    parentOrganization: { '@id': orgId },
    branchOf: { '@id': orgId },
    name: office.name,
    description: office.description || `${site.siteName} in ${office.city}, ${office.state}`,
    telephone: office.phone,
    email: office.email || site.email,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: absoluteUrl(site.defaultOgImage),
    ...(office.hasMapUrl ? { hasMap: office.hasMapUrl } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    address: officeAddress(office),
    ...(office.latitude && office.longitude
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: office.latitude,
            longitude: office.longitude,
          },
        }
      : {}),
    areaServed: cityAreaServed(office),
    ...(office.weekdayOpens ? { openingHoursSpecification: officeHours(office) } : {}),
    priceRange: office.priceRange || '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card',
    ...(office.aggregateReviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: String(office.aggregateRatingValue),
            reviewCount: String(office.aggregateReviewCount),
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
    ...(office.featuredReviews.length ? { review: officeReviews(office) } : {}),
  }
}

export function organizationNode(site: SiteSeo, primaryOffice?: OfficeContent | null) {
  const url = absoluteUrl('/')
  const primary =
    primaryOffice ||
    (OFFICES.find((o) => o.slug === 'bethesda')
      ? ({
          streetAddress: OFFICES.find((o) => o.slug === 'bethesda')!.streetAddress,
          city: OFFICES.find((o) => o.slug === 'bethesda')!.addressLocality,
          state: OFFICES.find((o) => o.slug === 'bethesda')!.addressRegion,
          postalCode: OFFICES.find((o) => o.slug === 'bethesda')!.postalCode,
        } as Pick<OfficeContent, 'streetAddress' | 'city' | 'state' | 'postalCode'>)
      : null)

  return {
    '@type': 'Organization',
    '@id': `${url}#organization`,
    name: site.siteName,
    url,
    telephone: site.phone,
    email: site.email,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(site.logoPath),
      width: 512,
      height: 512,
      caption: site.siteName,
    },
    image: absoluteUrl(site.defaultOgImage),
    ...(primary
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: primary.streetAddress,
            addressLocality: primary.city,
            addressRegion: primary.state,
            postalCode: primary.postalCode,
            addressCountry: 'US',
          },
        }
      : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phone,
      contactType: 'customer service',
      areaServed: {
        '@type': 'Country',
        name: 'US',
      },
      availableLanguage: ['English', 'en'],
    },
    sameAs: site.socialSameAs,
  }
}

export function businessNode(
  site: SiteSeo,
  offices: OfficeContent[],
  services?: Array<{ title: string; slug: string; price?: number | null }>,
) {
  const url = absoluteUrl('/')
  const primary = offices.find((o) => o.slug === 'bethesda') || offices[0] || null
  const totalReviews = offices.reduce((sum, office) => sum + (office.aggregateReviewCount || 0), 0)
  const ratingSum = offices.reduce(
    (sum, office) =>
      sum + (office.aggregateRatingValue || 0) * (office.aggregateReviewCount || 0),
    0,
  )
  const avgRating = totalReviews > 0 ? Math.round((ratingSum / totalReviews) * 10) / 10 : 0

  return {
    '@type': ['HVACBusiness', 'HomeAndConstructionBusiness', 'LocalBusiness'],
    '@id': `${url}#business`,
    parentOrganization: { '@id': `${url}#organization` },
    name: site.siteName,
    url,
    image: absoluteUrl(site.defaultOgImage),
    logo: absoluteUrl(site.logoPath),
    description: site.organizationDescription,
    priceRange: site.priceRange,
    telephone: site.phone,
    email: site.email,
    ...(primary ? { address: officeAddress(primary) } : {}),
    ...(primary?.latitude && primary?.longitude
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: primary.latitude,
            longitude: primary.longitude,
          },
        }
      : {}),
    location: offices.map((office) => ({ '@id': `${absoluteUrl(`/locations/${office.slug}`)}#office` })),
    areaServed: REGION_AREA_SERVED,
    sameAs: [...new Set([...site.socialSameAs, ...offices.flatMap((o) => officeSameAs(o, site))])],
    ...(totalReviews > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: String(avgRating || 5),
            reviewCount: String(totalReviews),
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
    ...(services?.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'HVAC Cleaning Services',
            itemListElement: services.map((service) => ({
              '@type': 'Offer',
              name: service.title,
              ...(typeof service.price === 'number'
                ? {
                    price: String(service.price),
                    priceCurrency: 'USD',
                    priceValidUntil: site.priceValidUntil,
                  }
                : {}),
              availability: 'https://schema.org/InStock',
              url: absoluteUrl(`/${service.slug}`),
              itemOffered: {
                '@type': 'Service',
                '@id': `${url}#service-${service.slug}`,
                name: service.title,
              },
              seller: { '@id': `${url}#business` },
            })),
          },
        }
      : {}),
  }
}

function inferServiceType(title: string) {
  const lower = title.toLowerCase()
  if (lower.includes('mold') && lower.includes('duct')) return 'Air Duct Mold Remediation'
  if (lower.includes('mold')) return 'Mold Remediation'
  if (lower.includes('dryer') && lower.includes('air duct')) return 'Air Duct and Dryer Vent Cleaning'
  if (lower.includes('dryer')) return 'Dryer Vent Cleaning'
  return 'Air Duct Cleaning'
}

export function serviceOfferNode({
  title,
  slug,
  description,
  price,
  image,
  site,
  priceValidUntil,
  idMode = 'page',
}: {
  title: string
  slug: string
  description: string
  price?: number | null
  image: string
  site: SiteSeo
  priceValidUntil?: string
  /** home = site-root #service-slug; page = /slug#service */
  idMode?: 'home' | 'page'
}) {
  const path = `/${slug}`
  const pageUrl = absoluteUrl(path)
  const businessId = `${absoluteUrl('/')}#business`
  const serviceId =
    idMode === 'home' ? `${absoluteUrl('/')}#service-${slug}` : `${pageUrl}#service`
  const serviceType = inferServiceType(title)
  const validUntil = priceValidUntil || site.priceValidUntil
  const priced =
    typeof price === 'number'
      ? {
          price: String(price),
          priceCurrency: 'USD',
          priceValidUntil: validUntil,
        }
      : {}

  return {
    '@type': 'Service',
    '@id': serviceId,
    name: title,
    description,
    serviceType,
    category: title.toLowerCase().includes('mold') ? 'Mold Remediation' : 'HVAC Cleaning',
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl(image),
      width: 1200,
      height: 800,
    },
    url: pageUrl,
    provider: { '@id': businessId },
    areaServed: REGION_AREA_SERVED,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${serviceType} Services`,
      itemListElement: [
        {
          '@type': 'Offer',
          name: title,
          description,
          ...priced,
          availability: 'https://schema.org/InStock',
          url: pageUrl,
          seller: { '@id': businessId },
        },
      ],
    },
    offers: {
      '@type': 'Offer',
      name: title,
      ...priced,
      availability: 'https://schema.org/InStock',
      url: pageUrl,
      seller: { '@id': businessId },
    },
  }
}

export function blogPostingNode({
  path,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  keywords,
  articleSection = 'Air Duct Cleaning',
  site,
}: {
  path: string
  headline: string
  description: string
  image: string
  datePublished?: string | null
  dateModified?: string | null
  keywords?: string[]
  articleSection?: string
  site?: SiteSeo
}) {
  const url = absoluteUrl(path)
  const brand = site || FALLBACK_SITE
  const orgId = `${absoluteUrl('/')}#organization`
  const businessId = `${absoluteUrl('/')}#business`
  const published = datePublished || undefined
  const modified = dateModified || datePublished || undefined

  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline,
    description,
    image: [absoluteUrl(image)],
    author: {
      '@type': 'Organization',
      '@id': businessId,
      name: brand.siteName,
    },
    publisher: {
      '@type': 'Organization',
      '@id': orgId,
      name: brand.siteName,
      url: absoluteUrl('/'),
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(brand.logoPath),
      },
    },
    ...(published ? { datePublished: published } : {}),
    ...(modified ? { dateModified: modified } : {}),
    inLanguage: 'en-US',
    articleSection,
    ...(keywords?.length ? { keywords } : {}),
    isPartOf: { '@id': `${absoluteUrl('/')}#website` },
  }
}

export function keywordsFromSlug(slug: string, extras: string[] = []) {
  const fromSlug = slug
    .split('-')
    .filter(Boolean)
    .join(' ')
  return [...new Set([fromSlug, 'air duct cleaning', 'HVAC', 'indoor air quality', ...extras])]
}

export function jsonLd(graph: unknown[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': graph.filter(Boolean),
  }
}

/** Sync organization for call sites that cannot await — uses fallbacks */
export function organizationNodeSync() {
  return organizationNode(FALLBACK_SITE)
}
