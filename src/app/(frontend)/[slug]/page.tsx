import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { LegalPage } from '@/components/LegalPage'
import { ServicePage } from '@/components/ServicePage'
import { generateMeta } from '@/utilities/generateMeta'
import { getAllLegalSlugs, getLegalPage } from '@/utilities/legal'
import { getAllServiceSlugs, getServiceContent } from '@/utilities/services'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

function getSlugValue(slug: unknown): string {
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

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  const pageParams =
    pages.docs
      ?.filter((doc) => doc.slug !== 'home')
      .map(({ slug }) => ({ slug })) || []

  const [serviceSlugs, legalSlugs] = await Promise.all([
    getAllServiceSlugs(),
    getAllLegalSlugs(),
  ])
  const serviceParams = serviceSlugs.map((slug) => ({ slug }))
  const legalParams = legalSlugs.map((slug) => ({ slug }))

  return [...pageParams, ...serviceParams, ...legalParams]
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug

  const serviceContent = await getServiceContent(decodedSlug)
  if (serviceContent) {
    const payload = await getPayload({ config: configPromise })
    const locations = await payload.find({
      collection: 'locations',
      limit: 10,
      pagination: false,
    })

    const areaLocations = locations.docs.map((loc) => ({
      id: loc.id,
      title: loc.title,
      slug: getSlugValue(loc.slug),
      city: loc.city,
      state: loc.state,
      streetAddress: loc.streetAddress,
      postalCode: loc.postalCode,
      phone: loc.phone,
    }))

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: serviceContent.title,
          description: serviceContent.description,
          image: `https://amazonadc.com${serviceContent.heroImage}`,
          url: `https://amazonadc.com/${serviceContent.slug}`,
          provider: {
            '@type': 'HVACBusiness',
            name: 'Amazon Air Duct Cleaning',
            url: 'https://amazonadc.com',
            telephone: '+18006063334',
          },
          offers: {
            '@type': 'Offer',
            price: String(serviceContent.price),
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: serviceContent.orderUrl,
          },
          areaServed: ['Virginia', 'Maryland', 'Washington DC'],
        },
        {
          '@type': 'FAQPage',
          mainEntity: serviceContent.faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        },
      ],
    }

    return (
      <>
        <PageClient />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ServicePage service={serviceContent} locations={areaLocations} />
      </>
    )
  }

  const legalContent = await getLegalPage(decodedSlug)
  if (legalContent) {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: legalContent.title,
      description: legalContent.description,
      url: `https://amazonadc.com/${legalContent.slug}`,
      isPartOf: { '@id': 'https://amazonadc.com/#website' },
      publisher: {
        '@type': 'Organization',
        name: 'Amazon Air Duct Cleaning',
        url: 'https://amazonadc.com/',
      },
    }

    return (
      <>
        <PageClient />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LegalPage page={legalContent} />
      </>
    )
  }

  let page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug: decodedSlug,
  })

  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const serviceContent = await getServiceContent(decodedSlug)
  if (serviceContent) {
    const title = `${serviceContent.title} – $${serviceContent.price} | Amazon Air Duct Cleaning`
    return {
      title,
      description: serviceContent.description,
      openGraph: {
        title,
        description: serviceContent.description,
        images: [{ url: serviceContent.heroImage }],
        type: 'website',
      },
    }
  }

  const legalContent = await getLegalPage(decodedSlug)
  if (legalContent) {
    const title = `${legalContent.title} | Amazon Air Duct Cleaning`
    return {
      title,
      description: legalContent.description,
      openGraph: {
        title,
        description: legalContent.description,
        images: [{ url: '/img/Amazon.webp' }],
        type: 'website',
      },
    }
  }

  const page = await queryPageBySlug({ slug: decodedSlug })
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
