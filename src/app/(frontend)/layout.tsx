import type { Metadata } from 'next'

import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { ThemeVars } from '@/components/ThemeVars'
import { TrustBadges } from '@/components/TrustBadges'
import { AccessibilityWidget } from '@/components/AccessibilityWidget'
import { SiteIntegrations } from '@/components/SiteIntegrations'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { draftMode } from 'next/headers'
import { resolveCmsImage } from '@/utilities/cmsImage'
import { resolveTheme } from '@/utilities/theme'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const settings = await getCachedGlobal('site-settings', 1)()
  const theme = resolveTheme(settings?.theme)
  const trustBadges = (settings?.trustBadges || [])
    .map((badge) => ({
      src: resolveCmsImage(badge.image, badge.src) || '',
      alt: badge.alt || '',
      width: badge.width || undefined,
      height: badge.height || undefined,
    }))
    .filter((badge) => badge.src && badge.alt)

  return (
    <html
      data-card-style={theme.containers.cardStyle}
      data-list-style={theme.containers.listStyle}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <ThemeVars theme={settings?.theme} />
        <link href="/favicon.ico" rel="icon" sizes="48x48" />
        <link href="/favicon-32.png" rel="icon" type="image/png" sizes="32x32" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
      </head>
      <body className="font-[family-name:var(--font-sans)] antialiased">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          <main id="main">{children}</main>
          <TrustBadges badges={trustBadges} />
          <Footer />
          {settings?.accessibility?.widget === 'builtin' ? <AccessibilityWidget /> : null}
        </Providers>
        <SiteIntegrations settings={settings} />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Amazon Air Duct Cleaning',
    template: '%s | Amazon Air Duct Cleaning',
  },
  description:
    'Professional air duct and dryer vent cleaning in Virginia, Maryland, and Washington DC. Flat-rate pricing and 100% satisfaction guarantee.',
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}
