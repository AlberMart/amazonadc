'use client'

import React, { useEffect, useRef, useState } from 'react'

export type TrustBadgeItem = {
  src: string
  alt: string
  width?: number
  height?: number
}

const fallbackBadges: TrustBadgeItem[] = [
  { src: '/img/reviews/Trustpilot.webp', alt: 'Trustpilot', width: 140, height: 60 },
  {
    src: '/img/reviews/customers_dynamic_rectangle.webp',
    alt: 'CustomerLobby',
    width: 124,
    height: 60,
  },
  { src: '/img/reviews/houzz.webp', alt: 'Houzz', width: 80, height: 60 },
  { src: '/img/reviews/award.webp', alt: 'Super Service Award', width: 65, height: 60 },
  { src: '/img/reviews/toprated-solid-border.webp', alt: 'HomeAdvisor', width: 71, height: 80 },
  { src: '/img/reviews/bbb.webp', alt: 'BBB', width: 86, height: 60 },
  {
    src: '/img/reviews/Aeroseal-dealer-badge-white.webp',
    alt: 'Aeroseal Dealer',
    width: 91,
    height: 60,
  },
]

export function TrustBadges({ badges }: { badges?: TrustBadgeItem[] }) {
  const items = badges?.length ? badges : fallbackBadges
  const rowRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const row = rowRef.current
    if (!row) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold: 0.25 },
    )

    observer.observe(row)
    return () => observer.disconnect()
  }, [])

  if (!items.length) return null

  return (
    <div aria-label="Trust and review badges" className="text-center" role="region">
      <div
        ref={rowRef}
        className={`container flex flex-wrap items-center justify-center transition-[opacity,transform] duration-[400ms] ease-out motion-reduce:transform-none motion-reduce:opacity-100 ${
          visible ? 'scale-100 opacity-100' : 'scale-[0.6] opacity-0'
        }`}
      >
        {items.map((badge) => (
          <div
            key={`${badge.alt}-${badge.src}`}
            className="flex w-1/2 items-center justify-center md:w-1/3 lg:w-1/4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={badge.src}
              alt={badge.alt}
              width={badge.width || 120}
              height={badge.height || 60}
              loading="lazy"
              className="inline-block h-auto w-auto max-w-[40%] py-[15px] grayscale transition-all duration-200 ease-in-out hover:scale-110 hover:grayscale-0 md:max-w-[45%]"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
