'use client'

import Image from 'next/image'
import React, { useState } from 'react'

export type ReviewItem = {
  initials: string
  author: string
  text: string
  googleUrl: string
}

const INITIAL_COUNT = 4

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

  return (
    <section className="bg-[#f4f7fa] py-16 md:py-20">
      <div className="container">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c] md:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 max-w-2xl text-[#516579]">{intro}</p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {visible.map((review) => (
            <article key={review.author} className="border border-[#d5dee8] bg-white p-6">
              <p className="text-amber-400" aria-label="5 star review">
                ★★★★★
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#516579]">{review.text}</p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b1c2c] text-xs font-semibold text-white">
                    {review.initials}
                  </span>
                  <span className="font-semibold text-[#0b1c2c]">{review.author}</span>
                </div>
                <a
                  href={review.googleUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow ugc"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:underline"
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
              className="rounded-md border border-[#d5dee8] bg-white px-5 py-3 text-sm font-semibold text-[#0b1c2c] transition hover:border-sky-300"
              aria-expanded={expanded}
            >
              {expanded ? 'Show less' : 'See more reviews'}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
