import React from 'react'

import { ServiceOfferCards } from '@/components/ServiceOfferCards'

export type OfferItem = {
  id: string | number
  title: string
  slug: string
  price?: number | null
  compareAtPrice?: number | null
  summary?: string | null
  thumb?: string | null
}

export function SpecialOffers({
  services,
  title = 'Our Special Offers',
}: {
  services: OfferItem[]
  title?: string
}) {
  if (!services.length) return null

  const cards = services
    .filter((service) => typeof service.price === 'number' && service.thumb)
    .map((service) => ({
      slug: service.slug,
      title: service.title,
      price: service.price as number,
      compareAtPrice: service.compareAtPrice,
      summary: service.summary,
      thumb: service.thumb as string,
    }))

  if (!cards.length) return null

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c] md:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-[#516579]">
          Transparent flat-rate pricing. No counting vents. No surprise add-ons.
        </p>
        <ServiceOfferCards services={cards} />
      </div>
    </section>
  )
}
