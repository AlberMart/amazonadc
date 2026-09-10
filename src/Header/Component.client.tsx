'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

const fallbackLinks = [
  { href: '/air-duct-cleaning', label: 'Air Duct Cleaning' },
  { href: '/dryer-vent-cleaning', label: 'Dryer Vent' },
  { href: '/locations/bethesda', label: 'Locations' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
]

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const hasCmsNav = Boolean(data?.navItems?.length)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="sticky top-0 z-30 border-b border-[#0b1c2c]/10 bg-[#0b1c2c]/95 text-white backdrop-blur"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex items-center justify-between gap-4 py-4">
        <Link href="/" className="min-w-0">
          <span className="block font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight sm:text-xl">
            Amazon Air Duct Cleaning
          </span>
          <span className="hidden text-xs tracking-wide text-sky-200/80 sm:block">
            VA · MD · Washington DC
          </span>
        </Link>

        {hasCmsNav ? (
          <HeaderNav data={data} />
        ) : (
          <nav className="hidden items-center gap-5 text-sm md:flex">
            {fallbackLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/85 transition hover:text-amber-300">
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+18006063334"
              className="rounded-md bg-amber-400 px-3 py-2 text-xs font-semibold text-[#0b1c2c]"
            >
              (800) 606-3334
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
