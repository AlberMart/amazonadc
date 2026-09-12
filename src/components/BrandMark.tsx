import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { ResolvedBrandMark } from '@/utilities/brandMark'

export function BrandMark({
  brand,
  href = '/',
  className,
  textClassName,
  logoClassName,
  onClick,
}: {
  brand: ResolvedBrandMark
  href?: string
  className?: string
  textClassName?: string
  logoClassName?: string
  onClick?: () => void
}) {
  const showLogo = (brand.mode === 'logo' || brand.mode === 'both') && Boolean(brand.logoUrl)
  const showText = brand.mode === 'text' || brand.mode === 'both' || !showLogo

  return (
    <Link href={href} className={className} onClick={onClick}>
      {showLogo && brand.logoUrl ? (
        <span className={logoClassName || 'relative block h-9 w-[140px]'}>
          <Image
            src={brand.logoUrl}
            alt={brand.logoAlt}
            fill
            className="object-contain object-left"
            sizes="160px"
            priority
          />
        </span>
      ) : null}
      {showText ? (
        <span className={textClassName}>{brand.text}</span>
      ) : null}
    </Link>
  )
}
