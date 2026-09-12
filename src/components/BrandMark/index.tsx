import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { ResolvedBrandMark } from '@/utilities/brandMark'

export function BrandMark({
  brand,
  href = '/',
  className,
  textClassName,
  onClick,
}: {
  brand: ResolvedBrandMark
  href?: string
  className?: string
  textClassName?: string
  onClick?: () => void
}) {
  const showLogo = (brand.mode === 'logo' || brand.mode === 'both') && Boolean(brand.logoUrl)
  const showText = brand.mode === 'text' || brand.mode === 'both' || !showLogo

  return (
    <Link href={href} className={className} onClick={onClick}>
      {showLogo && brand.logoUrl ? (
        <span className="relative inline-flex h-9 w-auto max-w-[160px] items-center">
          <Image
            src={brand.logoUrl}
            alt={brand.logoAlt}
            width={160}
            height={36}
            className="h-9 w-auto object-contain"
            priority
          />
        </span>
      ) : null}
      {showText ? (
        <span
          className={
            textClassName ||
            'block font-display text-lg font-semibold tracking-tight sm:text-xl'
          }
        >
          {brand.text}
        </span>
      ) : null}
    </Link>
  )
}
