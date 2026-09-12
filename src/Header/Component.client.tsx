'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { BrandMark } from '@/components/BrandMark'
import { MobileCallButton } from '@/components/MobileCallButton'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import type { ResolvedBrandMark } from '@/utilities/brandMark'
import type { ResolvedNavLink } from '@/utilities/cmsLink'
import type { ResolvedMobileCall } from '@/utilities/mobileCall'

function isActive(pathname: string, hash: string, item: ResolvedNavLink) {
  const href = item.href
  const hashIndex = href.indexOf('#')
  if (hashIndex !== -1) {
    const pathPart = href.slice(0, hashIndex) || '/'
    const hashPart = href.slice(hashIndex + 1)
    return pathname === pathPart && hash === hashPart
  }
  if (href === '/') return pathname === '/' && !hash
  if (href === '/blog') {
    return pathname === '/blog' || pathname.startsWith('/blog/') || pathname.startsWith('/posts')
  }
  if (href.startsWith('/locations/')) {
    return pathname === href || pathname.startsWith(`${href}/`)
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

function showInHeader(call: ResolvedMobileCall | null) {
  return Boolean(call?.enabled && (call.placement === 'header' || call.placement === 'both'))
}

function showFloating(call: ResolvedMobileCall | null) {
  return Boolean(call?.enabled && (call.placement === 'floating' || call.placement === 'both'))
}

export const HeaderClient: React.FC<{
  brand: ResolvedBrandMark
  showPhoneCta: boolean
  phoneDisplay: string
  phoneHref: string
  navItems: ResolvedNavLink[]
  mobileCall: ResolvedMobileCall | null
}> = ({ brand, showPhoneCta, phoneDisplay, phoneHref, navItems, mobileCall }) => {
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [theme, setTheme] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [hash, setHash] = useState('')

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash.replace('#', ''))
    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function onNavClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    setOpen(false)
    const hashIndex = href.indexOf('#')
    if (hashIndex === -1 || pathname !== '/') return
    const id = href.slice(hashIndex + 1)
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.pushState(null, '', `/#${id}`)
    setHash(id)
  }

  const headerCall = showInHeader(mobileCall) ? mobileCall : null
  const floatingCall = showFloating(mobileCall) ? mobileCall : null

  return (
    <header
      className="site-header sticky top-0 z-40 border-b border-white/10 backdrop-blur"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex h-[72px] items-center justify-between gap-4">
        <BrandMark
          brand={brand}
          className="min-w-0 shrink-0"
          textClassName="block font-display text-lg font-semibold tracking-tight sm:text-xl"
          onClick={() => setOpen(false)}
        />

        <nav className="hidden items-center gap-0.5 xl:gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = isActive(pathname, hash, item)
            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                onClick={(event) => onNavClick(event, item.href)}
                className={`rounded-md px-2.5 py-2 text-sm transition xl:px-3 ${
                  active ? 'text-[var(--site-accent)]' : 'text-white/85 hover:text-[var(--site-accent)]'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          })}
          {showPhoneCta ? (
            <a href={phoneHref} className="site-btn site-btn-primary ml-2 px-3.5 py-2 xl:ml-3">
              {phoneDisplay}
            </a>
          ) : null}
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          {headerCall ? <MobileCallButton call={headerCall} /> : null}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition ${open ? 'opacity-0' : ''}`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="lg:hidden">
          <button
            type="button"
            className="fixed inset-0 top-[72px] z-30 bg-[var(--site-dark)]/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-nav"
            className="relative z-40 border-t border-white/10 bg-[var(--site-dark)] px-4 py-3"
            aria-label="Mobile"
          >
            {navItems.map((item) => {
              const active = isActive(pathname, hash, item)
              return (
                <Link
                  key={`m-${item.label}-${item.href}`}
                  href={item.href}
                  onClick={(event) => onNavClick(event, item.href)}
                  className={`block rounded-md px-3 py-3 text-base ${
                    active ? 'bg-white/5 text-[var(--site-accent)]' : 'text-white/90'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      ) : null}

      {floatingCall ? (
        <div className="pointer-events-none fixed bottom-5 right-5 z-50 lg:hidden">
          <MobileCallButton call={floatingCall} className="pointer-events-auto" />
        </div>
      ) : null}
    </header>
  )
}
