import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = async () => {
  return [
    {
      source: '/blog/how-dirty-air-ducts-increase-energy-bills',
      destination: '/blog/do-dirty-air-ducts-raise-energy-bills',
      permanent: true,
    },
    {
      source: '/home',
      destination: '/',
      permanent: true,
    },
    {
      source: '/privacy',
      destination: '/privacy-policy',
      permanent: true,
    },
    {
      source: '/terms',
      destination: '/terms-of-service',
      permanent: true,
    },
    {
      source: '/refund',
      destination: '/refund-policy',
      permanent: true,
    },
    {
      source: '/refunds',
      destination: '/refund-policy',
      permanent: true,
    },
    {
      source: '/contact',
      destination: '/#contact',
      permanent: true,
    },
    {
      source: '/contact-us',
      destination: '/#contact',
      permanent: true,
    },
    {
      source: '/about',
      destination: '/#about',
      permanent: true,
    },
    {
      source: '/about-us',
      destination: '/#about',
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
      source: '/order-now',
      destination: '/#current_offers',
      permanent: true,
    },
    {
      source: '/service-area',
      destination: '/locations',
      permanent: true,
    },
    {
      source: '/areas-we-serve',
      destination: '/locations',
      permanent: true,
    },
    {
      source: '/air-duct-cleaning-sanitization',
      destination: '/air-duct-cleaning',
      permanent: true,
    },
    {
      source: '/duct-cleaning',
      destination: '/air-duct-cleaning',
      permanent: true,
    },
    {
      source: '/dryer-vent',
      destination: '/dryer-vent-cleaning',
      permanent: true,
    },
    {
      source: '/mold-remediation',
      destination: '/mold-remediation-air-ducts',
      permanent: true,
    },
    {
      source: '/mold-removal',
      destination: '/mold-remediation-air-ducts',
      permanent: true,
    },
    {
      source: '/virginia',
      destination: '/locations/burke',
      permanent: true,
    },
    {
      source: '/maryland',
      destination: '/locations/bethesda',
      permanent: true,
    },
    {
      source: '/washington-dc',
      destination: '/locations/washington-dc',
      permanent: true,
    },
    {
      source: '/dc',
      destination: '/locations/washington-dc',
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
