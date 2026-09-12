import { absoluteUrl } from '@/utilities/seo'

export const dynamic = 'force-dynamic'

function buildRobotsTxt() {
  const sitemap = absoluteUrl('/sitemap.xml')
  const host = absoluteUrl('/')
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /api/',
    'Disallow: /login',
    'Disallow: /checkout',
    'Disallow: /cart',
    'Disallow: /search',
    'Disallow: /next/',
    '',
    'User-agent: GPTBot',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /api/',
    '',
    'User-agent: Google-Extended',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /api/',
    '',
    `Sitemap: ${sitemap}`,
    `Host: ${host}`,
    '',
  ].join('\n')
}

export function GET() {
  return new Response(buildRobotsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
