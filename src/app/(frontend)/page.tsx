import type { Metadata } from 'next'
import React from 'react'

import { HomePageView } from '@/components/HomePageView'
import { getBlogIndex } from '@/utilities/blog'
import { getHomeContent } from '@/utilities/home'
import { collectOfficeReviews, getAllOffices } from '@/utilities/offices'
import { getAllServiceCards } from '@/utilities/services'
import { getSiteSeo, resolvePageMeta } from '@/utilities/seo'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [home, services, blogIndex, offices, site] = await Promise.all([
    getHomeContent(),
    getAllServiceCards(),
    getBlogIndex(),
    getAllOffices(),
    getSiteSeo(),
  ])

  const reviews = collectOfficeReviews(offices)

  return (
    <HomePageView
      sections={home.sections}
      faqItems={home.faqItems}
      services={services}
      posts={blogIndex.slice(0, 3)}
      offices={offices}
      reviews={reviews}
      site={site}
    />
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const [home, site] = await Promise.all([getHomeContent(), getSiteSeo()])
  return resolvePageMeta(
    {
      path: '/',
      meta: {
        title: home.meta.title,
        description: home.meta.description,
      },
      fallbackTitle: site.defaultMetaTitle,
      fallbackDescription: site.defaultMetaDescription,
      fallbackImage: site.defaultOgImage,
    },
    site,
  )
}
