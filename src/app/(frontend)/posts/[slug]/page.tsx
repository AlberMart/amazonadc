import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { BlogArticle } from '@/components/BlogArticle'
import { getAllBlogSlugs, getBlogPost } from '@/utilities/blog'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

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
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await getBlogPost(decodedSlug)

  if (!post) notFound()

  const payload = await getPayload({ config: configPromise })
  const [services, locations] = await Promise.all([
    payload.find({
      collection: 'services',
      limit: 10,
      pagination: false,
      sort: 'price',
    }),
    payload.find({
      collection: 'locations',
      limit: 10,
      pagination: false,
    }),
  ])

  const offerServices = services.docs.map((service) => ({
    id: service.id,
    title: service.title,
    slug: getSlugValue(service.slug),
    price: service.price,
    compareAtPrice: service.compareAtPrice,
    summary: service.summary,
    thumb:
      (typeof service.thumbImage === 'string' && service.thumbImage) ||
      (typeof service.heroImage === 'string' && service.heroImage) ||
      '',
  }))

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
        '@type': 'BlogPosting',
        headline: post.headline || post.title,
        description: post.description,
        image: `https://amazonadc.com${post.heroImage}`,
        author: {
          '@type': 'Organization',
          name: 'Amazon Air Duct Cleaning',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Amazon Air Duct Cleaning',
          url: 'https://amazonadc.com/',
        },
        mainEntityOfPage: `https://amazonadc.com/blog/${post.slug}`,
      },
      ...(post.faq.length
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: post.faq.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <>
      <PageClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticle post={post} services={offerServices} locations={areaLocations} />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await getBlogPost(decodeURIComponent(slug))
  if (!post) return {}

  return {
    title: `${post.title} | Amazon Air Duct Cleaning`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.heroImage }],
      type: 'article',
    },
  }
}
