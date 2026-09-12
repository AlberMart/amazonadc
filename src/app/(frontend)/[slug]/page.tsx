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
import { JsonLd } from '@/components/JsonLd'
import { generateMeta } from '@/utilities/generateMeta'
import { getAllLegalSlugs, getLegalPage } from '@/utilities/legal'
import { getAllServiceSlugs, getServiceContent } from '@/utilities/services'
import {
  absoluteUrl,
  breadcrumb,
  faqNode,
  getSiteSeo,
  jsonLd,
  organizationNode,
  pageTitle,
  resolvePageMeta,
  serviceOfferNode,
  webPageNode,
  websiteNode,
} from '@/utilities/seo'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

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
    const site = await getSiteSeo()
    const path = `/${serviceContent.slug}`
    const pageUrl = absoluteUrl(path)
    const serviceId = `${pageUrl}#service`
    const businessId = `${absoluteUrl('/')}#business`
    const crumbs = breadcrumb(
      [
        { name: 'Home', path: '/' },
        { name: serviceContent.title, path },
      ],
      path,
    )
    const structuredData = jsonLd([
      organizationNode(site),
      websiteNode(site),
      webPageNode({
        path,
        name: pageTitle(serviceContent.title, site.titleSuffix),
        description: serviceContent.description,
        aboutId: businessId,
        mainEntityId: serviceId,
        breadcrumbId: `${pageUrl}#breadcrumb`,
        image: serviceContent.heroImage,
      }),
      {
        '@type': ['HVACBusiness', 'HomeAndConstructionBusiness'],
        '@id': businessId,
        name: site.siteName,
        url: absoluteUrl('/'),
        telephone: site.phone,
        email: site.email,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl(site.logoPath),
        },
        image: absoluteUrl(serviceContent.heroImage),
        priceRange: site.priceRange,
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Virginia' },
          { '@type': 'AdministrativeArea', name: 'Maryland' },
          { '@type': 'AdministrativeArea', name: 'Washington DC' },
        ],
      },
      crumbs,
      serviceOfferNode({
        title: serviceContent.title,
        slug: serviceContent.slug,
        description: serviceContent.description,
        price: serviceContent.price,
        image: serviceContent.heroImage,
        site,
        idMode: 'page',
      }),
      faqNode(serviceContent.faq, {
        pagePath: path,
        aboutId: businessId,
        publisherId: `${absoluteUrl('/')}#organization`,
      }),
    ])

    return (
      <>
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={String(serviceContent.price)} />
        <meta property="product:price:currency" content="USD" />
        <meta property="product:availability" content="in stock" />
        <meta property="product:brand" content={site.siteName} />
        <meta property="product:condition" content="new" />
        <PageClient />
        <JsonLd data={structuredData} />
        <ServicePage service={serviceContent} />
      </>
    )
  }

  const legalContent = await getLegalPage(decodedSlug)
  if (legalContent) {
    const site = await getSiteSeo()
    const path = `/${legalContent.slug}`
    const pageUrl = absoluteUrl(path)
    const crumbs = breadcrumb(
      [
        { name: 'Home', path: '/' },
        { name: legalContent.title, path },
      ],
      path,
    )
    const structuredData = jsonLd([
      organizationNode(site),
      websiteNode(site),
      webPageNode({
        path,
        name: legalContent.title,
        description: legalContent.description,
        breadcrumbId: `${pageUrl}#breadcrumb`,
      }),
      crumbs,
    ])

    return (
      <>
        <PageClient />
        <JsonLd data={structuredData} />
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
  const site = await getSiteSeo()

  const serviceContent = await getServiceContent(decodedSlug)
  if (serviceContent) {
    return resolvePageMeta(
      {
        path: `/${serviceContent.slug}`,
        meta: serviceContent.meta,
        fallbackTitle: `${serviceContent.title} – $${serviceContent.price}`,
        fallbackDescription: serviceContent.description,
        fallbackImage: serviceContent.heroImage,
        imageAlt: serviceContent.heroAlt,
        ogTypeProduct: true,
        productPrice: serviceContent.price,
      },
      site,
    )
  }

  const legalContent = await getLegalPage(decodedSlug)
  if (legalContent) {
    return resolvePageMeta(
      {
        path: `/${legalContent.slug}`,
        fallbackTitle: legalContent.title,
        fallbackDescription: legalContent.description,
      },
      site,
    )
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
