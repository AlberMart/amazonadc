import React from 'react'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { resolveBrandMark } from '@/utilities/brandMark'
import { resolveCmsLink, type ResolvedNavLink } from '@/utilities/cmsLink'
import { getSiteSeo } from '@/utilities/seo'

import { HeaderClient } from './Component.client'

const fallbackNav: ResolvedNavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About Us' },
  { href: '/#current_offers', label: 'Services' },
  { href: '/#service_area', label: 'Service Area' },
  { href: '/locations/burke', label: 'Burke, VA' },
  { href: '/locations/bethesda', label: 'Bethesda, MD' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact Us' },
]

export async function Header() {
  const [headerData, site] = await Promise.all([
    getCachedGlobal('header', 1)(),
    getSiteSeo(),
  ])

  const fromCms = (headerData?.navItems || [])
    .map((row) => resolveCmsLink(row?.link))
    .filter((item): item is ResolvedNavLink => Boolean(item))

  const brand = resolveBrandMark(headerData?.brand, {
    siteName: site.siteName,
    logoPath: site.logoPath,
  })

  return (
    <HeaderClient
      brand={brand}
      showPhoneCta={headerData?.showPhoneCta !== false}
      phoneDisplay={site.phoneDisplay}
      phoneHref={site.phone.startsWith('tel:') ? site.phone : `tel:${site.phone}`}
      navItems={fromCms.length ? fromCms : fallbackNav}
    />
  )
}
