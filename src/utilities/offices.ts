import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { officesSeedSource } from '@/content/offices'
import { withDbRetry } from '@/utilities/dbRetry'

export type OfficeReview = {
  initials: string
  author: string
  text: string
  rating: number
  googleUrl: string
}

export type OfficeContent = {
  id: number | string
  slug: string
  name: string
  streetAddress: string
  city: string
  state: string
  postalCode: string
  phone: string
  phoneDisplay: string
  email: string
  description: string
  latitude: number
  longitude: number
  geoRadiusMeters: number
  hasMapUrl: string
  googleBusinessUrl: string
  sameAs: string[]
  areaServedCities: string[]
  aggregateRatingValue: number
  aggregateReviewCount: number
  weekdayOpens: string
  weekdayCloses: string
  saturdayOpens: string
  saturdayCloses: string
  priceRange: string
  featuredReviews: OfficeReview[]
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

function initialsFrom(author: string, explicit?: string | null) {
  if (explicit) return explicit
  return author
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('')
}

export function mapOffice(doc: Record<string, unknown>): OfficeContent {
  const sameAsRows = (doc.sameAs as Array<{ url?: string | null } | null> | null) || []
  const cityRows =
    (doc.areaServedCities as Array<{ name?: string | null } | null> | null) || []
  const reviewRows =
    (doc.featuredReviews as Array<{
      initials?: string | null
      author?: string | null
      text?: string | null
      rating?: number | null
      googleUrl?: string | null
    } | null> | null) || []

  const slug = slugValue(doc.slug)
  const seed = officesSeedSource.find((office) => office.slug === slug)
  const sameAs = [
    ...sameAsRows.map((row) => row?.url || '').filter(Boolean),
    ...(seed?.sameAs.map((row) => row.url) || []),
  ]
  const areaServedCities = [
    ...cityRows.map((row) => row?.name || '').filter(Boolean),
    ...(seed?.areaServedCities || []),
  ]

  return {
    id: (doc.id as number | string) ?? '',
    slug,
    name: String(doc.name || ''),
    streetAddress: String(doc.streetAddress || ''),
    city: String(doc.city || ''),
    state: String(doc.state || ''),
    postalCode: String(doc.postalCode || ''),
    phone: String(doc.phone || ''),
    phoneDisplay: String(doc.phoneDisplay || ''),
    email: String(doc.email || 'support@amazonadc.com'),
    description: String(doc.description || ''),
    latitude: Number(doc.latitude || 0),
    longitude: Number(doc.longitude || 0),
    geoRadiusMeters: Number(doc.geoRadiusMeters || 30000),
    hasMapUrl: String(doc.hasMapUrl || ''),
    googleBusinessUrl: String(doc.googleBusinessUrl || ''),
    sameAs: [...new Set(sameAs)],
    areaServedCities: [...new Set(areaServedCities)],
    aggregateRatingValue: Number(doc.aggregateRatingValue || 5),
    aggregateReviewCount: Number(doc.aggregateReviewCount || 0),
    weekdayOpens: String(doc.weekdayOpens || '08:00'),
    weekdayCloses: String(doc.weekdayCloses || '20:00'),
    saturdayOpens: String(doc.saturdayOpens || '09:00'),
    saturdayCloses: String(doc.saturdayCloses || '20:00'),
    priceRange: String(doc.priceRange || '$$'),
    featuredReviews: reviewRows
      .filter(Boolean)
      .map((row) => {
        const author = String(row?.author || '')
        return {
          initials: initialsFrom(author, row?.initials),
          author,
          text: String(row?.text || ''),
          rating: Number(row?.rating || 5),
          googleUrl: String(row?.googleUrl || ''),
        }
      })
      .filter((row) => row.author && row.text),
  }
}

export function officeFromSeedSlug(slug: string): OfficeContent | null {
  const seed = officesSeedSource.find((office) => office.slug === slug)
  if (!seed) return null
  return mapOffice(seed as unknown as Record<string, unknown>)
}

export async function getAllOffices(): Promise<OfficeContent[]> {
  const result = await withDbRetry(async () => {
    const payload = await getPayload({ config: configPromise })
    return payload.find({
      collection: 'offices',
      limit: 50,
      pagination: false,
      depth: 0,
      sort: 'city',
    })
  })
  return result.docs.map((doc) => mapOffice(doc as unknown as Record<string, unknown>))
}

export async function getOfficeBySlug(slug: string): Promise<OfficeContent | null> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'offices',
    where: { slug: { equals: slug } },
    limit: 1,
    pagination: false,
    depth: 0,
  })
  const doc = result.docs[0]
  return doc ? mapOffice(doc as unknown as Record<string, unknown>) : null
}

/** Flatten featured reviews from all offices for the home carousel */
export function collectOfficeReviews(offices: OfficeContent[]) {
  return offices.flatMap((office) =>
    office.featuredReviews.map((review) => ({
      ...review,
      officeSlug: office.slug,
      officeLabel: `${office.city}, ${office.state}`,
    })),
  )
}
