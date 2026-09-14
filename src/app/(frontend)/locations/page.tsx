import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { getAllLocations } from '@/utilities/locations'
import {
  absoluteUrl,
  breadcrumb,
  getSiteSeo,
  jsonLd,
  organizationNode,
  resolvePageMeta,
  webPageNode,
  websiteNode,
} from '@/utilities/seo'

export const dynamic = 'force-dynamic'

export default async function LocationsIndexPage() {
  const [locations, site] = await Promise.all([getAllLocations(), getSiteSeo()])
  const path = '/locations'
  const pageUrl = absoluteUrl(path)
  const crumbs = breadcrumb(
    [
      { name: 'Home', path: '/' },
      { name: 'Locations', path },
    ],
    path,
  )

  const structuredData = jsonLd([
    organizationNode(site),
    websiteNode(site),
    webPageNode({
      path,
      name: 'Service locations — Virginia, Maryland & Washington DC',
      description:
        'Find Amazon Air Duct Cleaning offices and city pages across Northern Virginia, Maryland, and Washington DC.',
      breadcrumbId: `${pageUrl}#breadcrumb`,
    }),
    crumbs,
    {
      '@type': 'CollectionPage',
      '@id': `${pageUrl}#collection`,
      name: 'Service locations',
      url: pageUrl,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: locations.map((location, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${location.city}, ${location.state}`,
          url: absoluteUrl(`/locations/${location.slug}`),
        })),
      },
    },
  ])

  const hubs = locations.filter((l) => l.isOfficeHub)
  const cities = locations.filter((l) => !l.isOfficeHub)

  return (
    <div>
      <JsonLd data={structuredData} />
      <section className="site-hero">
        <div
          aria-hidden
          className="site-hero-wash"
        />
        <div className="container relative py-20 md:py-24">
          <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Locations we serve
          </h1>
          <p className="mt-5 max-w-2xl text-base site-copy-on-dark sm:text-lg">
            Two real offices in Burke, VA and Bethesda, MD — plus dedicated city pages for the
            communities we clean every week.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container">
          <h2 className="font-display text-3xl font-semibold text-[var(--site-heading)]">
            Our offices
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {hubs.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="site-card site-card-hover p-6"
              >
                <h3 className="font-display text-xl font-semibold text-[var(--site-heading)]">
                  {location.office.name}
                </h3>
                <p className="mt-2 text-sm site-body">
                  {location.office.streetAddress}, {location.office.city}, {location.office.state}{' '}
                  {location.office.postalCode}
                </p>
                <p className="mt-4 text-sm font-semibold text-[var(--site-link)]">View office page →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {cities.length ? (
        <section className="bg-[var(--site-muted)] py-16 md:py-20">
          <div className="container">
            <h2 className="font-display text-3xl font-semibold text-[var(--site-heading)]">
              City pages
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {cities.map((location) => (
                <Link
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  className="site-card site-card-hover px-5 py-4"
                >
                  <span className="font-semibold">
                    {location.city}, {location.state}
                  </span>
                  <span className="mt-1 block text-sm site-body">
                    Served by {location.office.city} office
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSeo()
  return resolvePageMeta(
    {
      path: '/locations',
      fallbackTitle: 'Service Locations in VA, MD & DC',
      fallbackDescription:
        'Amazon Air Duct Cleaning offices in Burke, VA and Bethesda, MD, plus city pages for Reston, Vienna, Germantown, Potomac, Columbia, Frederick, and communities across the DMV.',
    },
    site,
  )
}
