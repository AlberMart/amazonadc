import Link from 'next/link'
import React from 'react'

import { BrandMark } from '@/components/BrandMark'
import { getCachedGlobalSafe } from '@/utilities/getGlobals'
import { resolveBrandMark } from '@/utilities/brandMark'
import { resolveCmsLink } from '@/utilities/cmsLink'
import { getSiteSeo } from '@/utilities/seo'

const fallbackSocial = [
  { platform: 'Facebook', url: 'https://www.facebook.com/amazonductcleaning' },
  { platform: 'Instagram', url: 'https://www.instagram.com/amazonairduct' },
]

type FooterLink = { href: string; label: string; detail?: string }

function SocialIcon({ platform }: { platform: string }) {
  const name = platform.toLowerCase()

  if (name.includes('instagram')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07C2 17.1 5.66 21.2 10.44 22v-7.03H7.9v-3.32h2.54V9.41c0-2.5 1.49-3.89 3.78-3.89.78 0 1.6.14 1.6.14v2.47h-1.28c-1.26 0-1.65.78-1.65 1.56v1.86h2.82l-.45 3.32h-2.37V22C18.34 21.2 22 17.1 22 12.07z" />
    </svg>
  )
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] text-[var(--site-link-on-dark)] uppercase">{children}</p>
  )
}

export async function Footer() {
  const [footerData, settings, site] = await Promise.all([
    getCachedGlobalSafe('footer', 2),
    getCachedGlobalSafe('site-settings', 0),
    getSiteSeo(),
  ])

  const brand = resolveBrandMark(footerData?.brand, {
    siteName: site.siteName,
    logoPath: site.logoPath,
  })
  const tagline =
    footerData?.tagline?.trim() ||
    settings?.organizationDescription ||
    site.organizationDescription
  const showContactInBrand = footerData?.showContactInBrand !== false
  const socialLinks = settings?.socialLinks?.length ? settings.socialLinks : fallbackSocial
  const year = new Date().getFullYear()
  const copyright =
    footerData?.copyrightText?.trim() || `© ${year} ${site.siteName}. All rights reserved.`

  const columns = footerData?.columns?.length
    ? footerData.columns
    : [
        {
          title: 'Explore',
          type: 'links' as const,
          links: [
            { link: { type: 'custom' as const, label: 'Blog', url: '/blog' } },
            { link: { type: 'custom' as const, label: 'Locations', url: '/locations' } },
          ],
        },
        { title: 'Our Social Networks', type: 'social' as const, links: [] },
      ]

  return (
    <footer className={`site-footer mt-auto ${footerData?.topEdge === 'hairline' ? 'border-t border-white/10' : ''}`}>
      <div className="container grid gap-10 py-12 lg:grid-cols-[minmax(220px,1.1fr)_minmax(0,2.4fr)]">
        <div>
          <BrandMark
            brand={brand}
            className="inline-flex flex-col items-start gap-2"
            textClassName="font-display text-2xl font-semibold"
          />
          {tagline ? <p className="mt-3 max-w-sm text-sm text-[var(--site-on-dark-muted)]">{tagline}</p> : null}
          {showContactInBrand ? (
            <p className="mt-5 text-sm">
              <a className="hover:text-[var(--site-accent)]" href={`tel:${site.phone}`}>
                {site.phoneDisplay}
              </a>
              <br />
              <a className="hover:text-[var(--site-accent)]" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          ) : null}
        </div>

        <div
          className={`grid gap-10 sm:grid-cols-2 ${columns.length >= 3 ? 'lg:grid-cols-3' : ''} ${columns.length >= 4 ? 'xl:grid-cols-4' : ''}`}
        >
          {columns.map((column, index) => {
            const key = `${column.title}-${index}`
            if (column.type === 'social') {
              return (
                <div key={key}>
                  <ColumnHeading>{column.title}</ColumnHeading>
                  <div className="mt-4 flex gap-3">
                    {socialLinks.map((item) => (
                      <a
                        key={item.url}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.platform}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/90 transition hover:border-amber-300 hover:text-[var(--site-accent)]"
                      >
                        <SocialIcon platform={item.platform} />
                      </a>
                    ))}
                  </div>
                </div>
              )
            }

            if (column.type === 'contact') {
              return (
                <div key={key}>
                  <ColumnHeading>{column.title}</ColumnHeading>
                  <div className="mt-4 space-y-2 text-sm text-white/80">
                    <a className="block hover:text-[var(--site-accent)]" href={`tel:${site.phone}`}>
                      {site.phoneDisplay}
                    </a>
                    <a className="block hover:text-[var(--site-accent)]" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </div>
                </div>
              )
            }

            const links: FooterLink[] = []
            for (const row of column.links || []) {
              const resolved = resolveCmsLink(row?.link)
              if (!resolved) continue
              links.push({
                href: resolved.href,
                label: resolved.label,
                detail: row?.detail?.trim() || undefined,
              })
            }

            return (
              <div key={key}>
                <ColumnHeading>{column.title}</ColumnHeading>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  {links.map((item) => (
                    <li key={`${item.label}-${item.href}`}>
                      <Link className="hover:text-[var(--site-accent)]" href={item.href}>
                        {item.label}
                      </Link>
                      {item.detail ? (
                        <p className="mt-1 whitespace-pre-line text-xs text-white/55">{item.detail}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        {copyright}
      </div>
    </footer>
  )
}
