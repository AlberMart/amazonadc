import type { Metadata } from 'next'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { HomePageView } from '@/components/HomePageView'
import { getBlogIndex } from '@/utilities/blog'
import { getHomeContent } from '@/utilities/home'
import { getAllServiceCards } from '@/utilities/services'

export const dynamic = 'force-dynamic'

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

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const [{ content }, services, blogIndex, locations] = await Promise.all([
    getHomeContent(),
    getAllServiceCards(),
    getBlogIndex(),
    payload.find({
      collection: 'locations',
      limit: 10,
      pagination: false,
    }),
  ])

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

  return (
    <HomePageView
      content={content}
      services={services}
      posts={blogIndex.slice(0, 3)}
      locations={areaLocations}
    />
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getHomeContent()
  return {
    title: meta.title || 'Air Duct Cleaning in Virginia, Maryland & Washington DC',
    description:
      meta.description ||
      'Top-rated Air Duct Cleaning in VA, MD & DC. Improve your indoor air quality, remove dust & allergens, dryer vent cleaning, commercial services. Call for free estimate!',
  }
}
