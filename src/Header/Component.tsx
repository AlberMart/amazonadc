import React from 'react'

import { getCachedGlobalSafe } from '@/utilities/getGlobals'
import { resolveBrandMark } from '@/utilities/brandMark'
import { resolveCmsLink, type ResolvedNavLink } from '@/utilities/cmsLink'
import { getLocationChromePhones } from '@/utilities/locations'
import { resolveMobileCall } from '@/utilities/mobileCall'
import { getSiteSeo } from '@/utilities/seo'
import { toTelHref } from '@/utilities/tel'

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
  const [headerData, site, locationPhones] = await Promise.all([
    getCachedGlobalSafe('header', 1),
    getSiteSeo(),
    getLocationChromePhones(),
  ])

  const fromCms = (headerData?.navItems || [])
    .map((row) => resolveCmsLink(row?.link))
    .filter((item): item is ResolvedNavLink => Boolean(item))

  const brand = resolveBrandMark(headerData?.brand, {
    siteName: site.siteName,
    logoPath: site.logoPath,
  })

  const phoneDisplay = headerData?.phoneDisplay?.trim() || site.phoneDisplay
  const phoneHref = toTelHref(headerData?.phoneHref?.trim() || site.phone)

  return (
    <HeaderClient
      brand={brand}
      showPhoneCta={headerData?.showPhoneCta !== false}
      phoneDisplay={phoneDisplay}
      phoneHref={phoneHref}
      locationPhones={locationPhones}
      navItems={fromCms.length ? fromCms : fallbackNav}
      mobileCall={resolveMobileCall(headerData, {
        phoneDisplay,
        phoneHref,
      })}
      bottomEdge={headerData?.bottomEdge || 'none'}
    />
  )
}
