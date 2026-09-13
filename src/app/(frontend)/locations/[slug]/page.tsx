import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { LocationPage } from '@/components/LocationPage'
import { getAllLocationSlugs, getLocationContent } from '@/utilities/locations'
import { faqItemsFromSections } from '@/utilities/homeSections'
import {
  absoluteUrl,
  breadcrumb,
  faqNode,
  getSiteSeo,
  jsonLd,
  officeBranchNode,
  organizationNode,
  resolvePageMeta,
  webPageNode,
  websiteNode,
} from '@/utilities/seo'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllLocationSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export default async function Page({ params }: Args) {
  const { slug } = await params
  const [location, site] = await Promise.all([
    getLocationContent(decodeURIComponent(slug)),
    getSiteSeo(),
  ])
  if (!location) notFound()

  const office = location.office
  const path = `/locations/${location.slug}`
  const pageUrl = absoluteUrl(path)
  const officeId = `${absoluteUrl(`/locations/${office.slug}`)}#office`
  const localId = location.isOfficeHub ? `${pageUrl}#office` : `${pageUrl}#local`
  const primaryOffice = office

  const localBusiness = location.isOfficeHub
    ? officeBranchNode(office, site)
    : {
        '@type': ['HVACBusiness', 'LocalBusiness'],
        '@id': localId,
        name: `${site.siteName} — ${location.city}`,
        url: pageUrl,
        telephone: office.phone,
        email: office.email || site.email,
        image: absoluteUrl(location.heroImage),
        parentOrganization: { '@id': `${absoluteUrl('/')}#organization` },
        provider: { '@id': officeId },
        address: {
          '@type': 'PostalAddress',
          streetAddress: office.streetAddress,
          addressLocality: office.city,
          addressRegion: office.state,
          postalCode: office.postalCode,
          addressCountry: 'US',
        },
        areaServed: [
          { '@type': 'City', name: location.city },
          {
            '@type': 'State',
            name: location.state === 'MD' ? 'Maryland' : location.state === 'DC' ? 'Washington DC' : 'Virginia',
          },
          ...office.areaServedCities
            .filter((city) => city.toLowerCase() !== location.city.toLowerCase())
            .slice(0, 12)
            .map((name) => ({ '@type': 'City', name })),
        ],
        priceRange: office.priceRange || '$$',
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
      }

  const crumbs = breadcrumb(
    [
      { name: 'Home', path: '/' },
      { name: 'Locations', path: '/locations' },
      { name: `${location.city}, ${location.state}`, path },
    ],
    path,
  )

  const structuredData = jsonLd([
    organizationNode(site, primaryOffice),
    websiteNode(site),
    webPageNode({
      path,
      name: location.title,
      description: location.description,
      aboutId: localId,
      mainEntityId: localId,
      breadcrumbId: `${pageUrl}#breadcrumb`,
      image: location.heroImage,
    }),
    crumbs,
    localBusiness,
    faqNode(
      faqItemsFromSections(location.sections || []).length
        ? faqItemsFromSections(location.sections || [])
        : location.faq,
      {
      pagePath: path,
      aboutId: location.isOfficeHub ? localId : officeId,
      publisherId: `${absoluteUrl('/')}#organization`,
    }),
  ])

  return (
    <>
      <JsonLd data={structuredData} />
      <LocationPage location={location} />
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const [location, site] = await Promise.all([
    getLocationContent(decodeURIComponent(slug)),
    getSiteSeo(),
  ])
  if (!location) return {}

  return resolvePageMeta(
    {
      path: `/locations/${location.slug}`,
      meta: location.meta,
      fallbackTitle: location.title,
      fallbackDescription: location.description,
      fallbackImage: location.heroImage,
      imageAlt: location.heroAlt,
    },
    site,
  )
}
