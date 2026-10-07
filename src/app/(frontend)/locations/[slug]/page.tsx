import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { LocationPage } from '@/components/LocationPage'
import { getAllLocationSlugs, getLocationContent } from '@/utilities/locations'
import { faqItemsFromSections } from '@/utilities/homeSections'
import { resolveLocationPublicPhone } from '@/utilities/locationPhone'
import {
  absoluteUrl,
  breadcrumb,
  faqNode,
  getSiteSeo,
  jsonLd,
  officeBranchNode,
  resolvePageMeta,
  serviceAreaLocationNode,
  webPageNode,
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
  const publicPhone = resolveLocationPublicPhone(location, site)

  const localBusiness = location.isOfficeHub
    ? officeBranchNode(office, site, {
        image: location.heroImage,
        description: location.description,
      })
    : serviceAreaLocationNode({
        city: location.city,
        state: location.state,
        path,
        description: location.description,
        image: location.heroImage,
        telephone: publicPhone.e164,
        email: office.email || site.email,
        officeId,
        site,
        priceRange: office.priceRange,
      })

  const crumbs = breadcrumb(
    [
      { name: 'Home', path: '/' },
      { name: 'Locations', path: '/locations' },
      { name: `${location.city}, ${location.state}`, path },
    ],
    path,
  )

  const structuredData = jsonLd([
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
