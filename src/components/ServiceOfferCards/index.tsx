import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export type ServiceOfferCard = {
  slug: string
  title: string
  price?: number | null
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
          className="site-card site-card-hover group flex w-full max-w-[380px] flex-col p-6 text-left"
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
          <h3 className="font-display text-xl font-semibold text-[var(--site-heading)]">
            {item.title}
          </h3>
          <p className="mt-4 text-3xl font-semibold text-[var(--site-heading)]">
            {typeof item.price === 'number' ? (
              <>
                ${item.price}
                {typeof item.compareAtPrice === 'number' ? (
                  <span className="ml-2 text-base font-normal site-muted line-through">
                    ${item.compareAtPrice}
                  </span>
                ) : null}
              </>
            ) : (
              <span className="text-xl">Free estimate</span>
            )}
          </p>
          {item.summary ? (
            <p className="mt-3 line-clamp-3 flex-1 text-sm site-body">{item.summary}</p>
          ) : null}
          <span className="mt-6 inline-block site-link text-sm group-hover:underline">
            Learn more
          </span>
        </Link>
      ))}
    </div>
  )
}
