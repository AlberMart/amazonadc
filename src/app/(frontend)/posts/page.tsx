import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { getBlogIndex } from '@/utilities/blog'
import {
  absoluteUrl,
  breadcrumb,
  getSiteSeo,
  jsonLd,
  organizationNode,
  resolvePageMeta,
  websiteNode,
} from '@/utilities/seo'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const [posts, site] = await Promise.all([getBlogIndex(), getSiteSeo()])
  const path = '/blog'
  const pageUrl = absoluteUrl(path)

  const structuredData = jsonLd([
    organizationNode(site),
    websiteNode(site),
    breadcrumb(
      [
        { name: 'Home', path: '/' },
        { name: 'Blog', path },
      ],
      path,
    ),
    {
      '@type': 'CollectionPage',
      '@id': `${pageUrl}#collection`,
      name: 'Air duct cleaning guides',
      description:
        'Expert guides on air duct cleaning, dryer vent safety, allergies, and HVAC efficiency.',
      url: pageUrl,
      isPartOf: { '@id': `${absoluteUrl('/')}#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: posts.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: post.title,
          url: absoluteUrl(`/blog/${post.slug}`),
        })),
      },
    },
  ])

  return (
    <main>
      <JsonLd data={structuredData} />
      <PageClient />
      <section className="site-hero">
        <div
          aria-hidden
          className="site-hero-wash"
        />
        <div className="container relative py-20 md:py-24">
          <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Guides for cleaner air at home
          </h1>
          <p className="mt-5 max-w-2xl text-base site-copy-on-dark sm:text-lg">
            Practical advice on air duct cleaning, dryer vents, energy bills, and indoor air quality
            for homeowners across Virginia, Maryland, and DC.
          </p>
        </div>
      </section>

      <section className="bg-[var(--site-muted)] py-16 md:py-20">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="site-card site-card-hover group flex h-full flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/10] site-media">
                  <Image
                    src={post.hero}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-xl font-semibold text-[var(--site-heading)]">
                    {post.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed site-body">
                    {post.description}
                  </p>
                  <span className="mt-6 site-link text-sm group-hover:underline">
                    Read article
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSeo()
  return resolvePageMeta(
    {
      path: '/blog',
      fallbackTitle: 'Blog',
      fallbackDescription:
        'Expert guides on air duct cleaning, dryer vent safety, allergies, and HVAC efficiency for homes in VA, MD, and DC.',
    },
    site,
  )
}
