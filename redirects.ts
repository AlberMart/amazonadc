import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = async () => {
  return [
    {
      source: '/home',
      destination: '/',
      permanent: true,
    },
    {
      source: '/posts',
      destination: '/blog',
      permanent: true,
    },
    {
      source: '/posts/page/:pageNumber',
      destination: '/blog',
      permanent: true,
    },
    {
      source: '/posts/:slug',
      destination: '/blog/:slug',
      permanent: true,
    },
    {
      source: '/blog/page/:pageNumber',
      destination: '/blog',
      permanent: true,
    },
    {
      source: '/pages-sitemap.xml',
      destination: '/sitemap.xml',
      permanent: true,
    },
    {
      source: '/posts-sitemap.xml',
      destination: '/sitemap.xml',
      permanent: true,
    },
    {
      source: '/order-now/p/air-duct-cleaning-sanitization',
      destination: '/air-duct-cleaning',
      permanent: true,
    },
    {
      source: '/order-now/p/dryer-vent-cleaning',
      destination: '/dryer-vent-cleaning',
      permanent: true,
    },
    {
      source: '/order-now/p/air-duct-cleaning-dryer-vent-cleaning-sanitization',
      destination: '/air-duct-and-dryer-vent-cleaning',
      permanent: true,
    },
    {
      source: '/mold-remediation-whole-house',
      destination: '/mold-remediation-air-ducts',
      permanent: true,
    },
    {
      source: '/mold-remediation-house',
      destination: '/mold-remediation-air-ducts',
      permanent: true,
    },
    {
      source: '/blog/oakton-123-pollen-air-ducts',
      destination: '/blog/oakton-canopy-pollen-air-ducts',
      permanent: true,
    },
    {
      destination: '/ie-incompatible.html',
      has: [
        {
          type: 'header' as const,
          key: 'user-agent',
          value: '(.*Trident.*)',
        },
      ],
      permanent: false,
      source: '/:path((?!ie-incompatible.html$).*)',
    },
  ]
}
