'use client'

import Image from 'next/image'
import React, { useState } from 'react'

export type ReviewItem = {
  initials: string
  author: string
  text: string
  rating: number
  googleUrl: string
  officeLabel?: string
}

const INITIAL_COUNT = 4

function Stars({ rating }: { rating: number }) {
  const safe = Math.max(1, Math.min(5, Math.round(rating)))
  return (
    <p className="text-[var(--site-accent)]" aria-label={`${safe} star review`}>
      {'★'.repeat(safe)}
      <span className="text-[var(--site-border)]">{'★'.repeat(5 - safe)}</span>
    </p>
  )
}

export function ReviewsSection({
  reviews,
  heading = 'What Our Clients Say About Us',
  intro = 'Real reviews from customers who trusted our air duct & dryer vent cleaning services.',
}: {
  reviews: ReviewItem[]
  heading?: string
  intro?: string
}) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? reviews : reviews.slice(0, INITIAL_COUNT)
  const hasMore = reviews.length > INITIAL_COUNT

  if (!reviews.length) return null

  return (
    <div className="container">
      <h2 className="site-heading text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h2>
      <p className="site-body mt-3 max-w-2xl">{intro}</p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {visible.map((review) => (
          <article
            key={`${review.officeLabel || 'review'}-${review.author}`}
            className="site-card p-6"
          >
            <Stars rating={review.rating} />
            <p className="site-body mt-4 text-sm leading-relaxed">{review.text}</p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--site-primary)] text-xs font-semibold text-[var(--site-primary-fg)]">
                  {review.initials}
                </span>
                <div>
                  <span className="font-semibold text-[var(--site-heading)]">{review.author}</span>
                  {review.officeLabel ? (
                    <p className="site-muted text-xs">{review.officeLabel}</p>
                  ) : null}
                </div>
              </div>
              <a
                href={review.googleUrl}
                target="_blank"
                rel="noopener noreferrer nofollow ugc"
                className="site-link inline-flex items-center gap-2 text-sm"
                aria-label={`Read ${review.author}'s review on Google`}
              >
                <Image
                  src="/img/reviews/google-icon.svg"
                  alt=""
                  width={22}
                  height={22}
                  unoptimized
                />
                Google
              </a>
            </div>
          </article>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="site-btn site-btn-tertiary"
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'See more reviews'}
          </button>
        </div>
      ) : null}
    </div>
  )
}
