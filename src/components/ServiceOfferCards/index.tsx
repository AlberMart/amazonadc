import Link from 'next/link'
import React from 'react'

export type ServiceOfferCard = {
  slug: string
  title: string
  price?: number | null
  compareAtPrice?: number | null
  emptyPriceDisplay?: 'text' | 'hidden'
  emptyPriceText?: string | null
  summary?: string | null
  thumb: string
  href?: string
}

/** Cap offer thumbs at 300/640 — Next `sizes` otherwise puts 1920 in `src` and hurts PSI. */
function offerThumbSrc(src: string, width: 300 | 640, quality = 60) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}

export function PriceLine({
  price,
  compareAtPrice,
  emptyPriceDisplay = 'text',
  emptyPriceText = 'Free estimate',
  amountClassName = 'text-3xl font-semibold text-[var(--site-heading)]',
  textClassName = 'text-xl',
}: {
  price?: number | null
  compareAtPrice?: number | null
  emptyPriceDisplay?: 'text' | 'hidden'
  emptyPriceText?: string | null
  amountClassName?: string
  textClassName?: string
}) {
  if (typeof price === 'number') {
    return (
      <p className={amountClassName}>
        ${price}
        {typeof compareAtPrice === 'number' ? (
          <span className="ml-2 text-base font-normal site-muted line-through">${compareAtPrice}</span>
        ) : null}
      </p>
    )
  }
  if (emptyPriceDisplay === 'hidden') return null
  return (
    <p className={amountClassName}>
      <span className={textClassName}>{emptyPriceText || 'Free estimate'}</span>
    </p>
  )
}

export function ServiceOfferCards({ services }: { services: ServiceOfferCard[] }) {
  if (!services.length) return null

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-6">
      {services.map((item) => {
        const src1x = offerThumbSrc(item.thumb, 300)
        const src2x = offerThumbSrc(item.thumb, 640)
        return (
          <Link
            key={item.slug}
            href={item.href || `/${item.slug}`}
            className="site-card site-card-hover group flex w-full max-w-[380px] flex-col p-6 text-left"
          >
            <div className="mx-auto mb-5 w-[300px] max-w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src1x}
                srcSet={`${src1x} 300w, ${src2x} 640w`}
                sizes="300px"
                alt={item.title}
                width={300}
                height={200}
                loading="lazy"
                decoding="async"
                className="h-auto w-[300px] max-w-full object-cover"
              />
            </div>
            <h3 className="font-display text-xl font-semibold text-[var(--site-heading)]">
              {item.title}
            </h3>
            <div className="mt-4">
              <PriceLine
                price={item.price}
                compareAtPrice={item.compareAtPrice}
                emptyPriceDisplay={item.emptyPriceDisplay}
                emptyPriceText={item.emptyPriceText}
              />
            </div>
            {item.summary ? (
              <p className="mt-3 line-clamp-3 flex-1 text-sm site-body">{item.summary}</p>
            ) : null}
            <span className="mt-6 inline-block site-link text-sm group-hover:underline">
              Learn more
            </span>
          </Link>
        )
      })}
    </div>
  )
}
