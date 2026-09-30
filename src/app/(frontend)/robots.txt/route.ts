import { absoluteUrl } from '@/utilities/seo'
import { isNonProductionHost } from '@/utilities/getURL'

export const dynamic = 'force-dynamic'

/** Public robots.txt. Sitemap URL is generated from CMS content at /sitemap.xml — new published URLs are included automatically. */

function buildRobotsTxt() {
  const sitemap = absoluteUrl('/sitemap.xml')
  const host = absoluteUrl('/')

  if (isNonProductionHost()) {
    return [
      'User-agent: *',
      'Disallow: /',
      '',
      `# Staging host (${host}) — block indexing until production NEXT_PUBLIC_SERVER_URL is set.`,
      '',
    ].join('\n')
  }

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
