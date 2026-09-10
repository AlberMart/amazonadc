import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export type ServiceOfferCard = {
  slug: string
  title: string
  price: number
  compareAtPrice?: number | null
  summary?: string | null
  thumb: string
  href?: string
}

export function ServiceOfferCards({ services }: { services: ServiceOfferCard[] }) {
  if (!services.length) return null

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-6">
      {services.map((item) => (
        <Link
          key={item.slug}
          href={item.href || `/${item.slug}`}
          className="group flex w-full max-w-[380px] flex-col border border-[#d5dee8] bg-white p-6 text-left transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_18px_40px_rgba(11,28,44,0.08)]"
        >
          <div className="mx-auto mb-5 w-full max-w-[300px]">
            <Image
              src={item.thumb}
              alt={item.title}
              width={300}
              height={200}
              className="h-auto w-full object-cover"
              sizes="300px"
            />
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#0b1c2c]">
            {item.title}
          </h3>
          <p className="mt-4 text-3xl font-semibold text-[#0b1c2c]">
            ${item.price}
            {typeof item.compareAtPrice === 'number' ? (
              <span className="ml-2 text-base font-normal text-[#7a8b9c] line-through">
                ${item.compareAtPrice}
              </span>
            ) : null}
          </p>
          {item.summary ? (
            <p className="mt-3 line-clamp-3 flex-1 text-sm text-[#516579]">{item.summary}</p>
          ) : null}
          <span className="mt-6 inline-block text-sm font-semibold text-sky-700 group-hover:underline">
            Learn more
          </span>
        </Link>
      ))}
    </div>
  )
}
