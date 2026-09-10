import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { LocationPage } from '@/components/LocationPage'
import { getAllLocationSlugs, getLocationContent } from '@/utilities/locations'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllLocationSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function Page({ params }: Args) {
  const { slug } = await params
  const location = await getLocationContent(decodeURIComponent(slug))
  if (!location) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HVACBusiness',
        name: `Amazon Air Duct Cleaning — ${location.city}`,
        url: `https://amazonadc.com/locations/${location.slug}`,
        telephone: location.phone,
        email: location.email,
        image: `https://amazonadc.com${location.heroImage}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: location.streetAddress,
          addressLocality: location.city,
          addressRegion: location.state,
          postalCode: location.postalCode,
          addressCountry: 'US',
        },
        areaServed: [location.city, location.state === 'VA' ? 'Virginia' : 'Maryland', 'Washington DC'],
        priceRange: '$$',
      },
      {
        '@type': 'FAQPage',
        mainEntity: location.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocationPage location={location} />
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const location = await getLocationContent(decodeURIComponent(slug))
  if (!location) return {}

  return {
    title: `${location.title} | Amazon Air Duct Cleaning`,
    description: location.description,
    openGraph: {
      title: location.title,
      description: location.description,
      images: [{ url: location.heroImage }],
      type: 'website',
    },
  }
}
