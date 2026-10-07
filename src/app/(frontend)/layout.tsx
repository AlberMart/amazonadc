import type { Metadata } from 'next'

import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { ThemeVars } from '@/components/ThemeVars'
import { AccessibilityWidget } from '@/components/AccessibilityWidget'
import { ScrollOnNavigate } from '@/components/ScrollOnNavigate'
import { SiteIntegrations } from '@/components/SiteIntegrations'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { SiteJsonLd } from '@/components/SiteJsonLd'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getCachedGlobalSafe } from '@/utilities/getGlobals'
import { draftMode } from 'next/headers'
import { resolveTheme } from '@/utilities/theme'

import './globals.css'
import { getServerSideURL, isNonProductionHost } from '@/utilities/getURL'
import { SEO_DOCUMENT_TITLE, SEO_META_DESCRIPTION, SEO_META_TITLE } from '@/utilities/seoCopy'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const settings = await getCachedGlobalSafe('site-settings', 1)
  const theme = resolveTheme(settings?.theme)

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
        <SiteJsonLd />
      </head>
      <body className="font-[family-name:var(--font-sans)] antialiased">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Providers>
          <ScrollOnNavigate />
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          <main id="main">{children}</main>
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
    default: SEO_DOCUMENT_TITLE,
    // Short pages only — resolvePageMeta uses absolute titles and skips this template.
    template: '%s | Amazon ADC',
  },
  description: SEO_META_DESCRIPTION,
  openGraph: mergeOpenGraph({
    title: SEO_META_TITLE,
    description: SEO_META_DESCRIPTION,
    url: getServerSideURL(),
  }),
  twitter: {
    card: 'summary_large_image',
    title: SEO_META_TITLE,
    description: SEO_META_DESCRIPTION,
    images: [`${getServerSideURL()}/img/og-default.jpg`],
  },
  robots: isNonProductionHost()
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
      },
  other: {
    // Bump when shipping content/SEO fixes so AI crawlers can tell cache from fresh HTML.
    'content-rev': '2026-10-03-meta-og',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}
