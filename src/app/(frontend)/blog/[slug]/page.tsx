import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { BlogArticle } from '@/components/BlogArticle'
import { JsonLd } from '@/components/JsonLd'
import { getAllBlogSlugs, getBlogPost } from '@/utilities/blog'
import {
  absoluteUrl,
  blogPostingNode,
  breadcrumb,
  faqNode,
  getSiteSeo,
  jsonLd,
  keywordsFromSlug,
  organizationNode,
  resolvePageMeta,
  webPageNode,
  websiteNode,
} from '@/utilities/seo'
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
  try {
    const slugs = await getAllBlogSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const [post, site] = await Promise.all([getBlogPost(decodedSlug), getSiteSeo()])

  if (!post) notFound()

  const payload = await getPayload({ config: configPromise })
  const services = await payload.find({
    collection: 'services',
    limit: 10,
    pagination: false,
    sort: 'price',
  })

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

  const path = `/blog/${post.slug}`
  const pageUrl = absoluteUrl(path)
  const crumbs = breadcrumb(
    [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path },
    ],
    path,
  )

  const structuredData = jsonLd([
    organizationNode(site),
    websiteNode(site),
    webPageNode({
      path,
      name: post.title,
      description: post.description,
      mainEntityId: `${pageUrl}#article`,
      breadcrumbId: `${pageUrl}#breadcrumb`,
      image: post.heroImage,
      dateModified: post.updatedAt || post.publishedAt || undefined,
    }),
    crumbs,
    blogPostingNode({
      path,
      headline: post.headline || post.title,
      description: post.description,
      image: post.heroImage,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      keywords: keywordsFromSlug(post.slug, [post.title]),
      articleSection: 'Air Duct Cleaning',
      site,
    }),
    ...(post.faq.length
      ? [
          faqNode(post.faq, {
            pagePath: path,
            aboutId: `${absoluteUrl('/')}#business`,
            publisherId: `${absoluteUrl('/')}#organization`,
          }),
        ]
      : []),
  ])

  return (
    <>
      <PageClient />
      <JsonLd data={structuredData} />
      <BlogArticle post={post} services={offerServices} />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const [post, site] = await Promise.all([
    getBlogPost(decodeURIComponent(slug)),
    getSiteSeo(),
  ])
  if (!post) return {}

  const meta = resolvePageMeta(
    {
      path: `/blog/${post.slug}`,
      meta: post.meta,
      fallbackTitle: post.title,
      fallbackDescription: post.description,
      fallbackImage: post.heroImage,
      imageAlt: post.heroImageAlt || post.title,
      type: 'article',
    },
    site,
  )

  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt || post.publishedAt || undefined,
    },
  }
}
