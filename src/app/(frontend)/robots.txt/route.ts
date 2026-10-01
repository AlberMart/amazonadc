import { absoluteUrl } from '@/utilities/seo'
import { isNonProductionHost } from '@/utilities/getURL'

export const dynamic = 'force-dynamic'

/** Public robots.txt. Sitemap URL is generated from CMS content at /sitemap.xml — new published URLs are included automatically. */

function sharedDisallows() {
  return [
    'Disallow: /admin/',
    'Disallow: /api/',
    'Disallow: /login',
    'Disallow: /checkout',
    'Disallow: /cart',
    'Disallow: /search',
    'Disallow: /next/',
  ]
}

function buildRobotsTxt() {
  const sitemap = absoluteUrl('/sitemap.xml')
  const host = absoluteUrl('/')

  // Staging stays crawlable so review tools / AI auditors can fetch pages.
  // Indexing is blocked via <meta robots noindex> + X-Robots-Tag (see layout / headers).
  if (isNonProductionHost()) {
    return [
      'User-agent: *',
      'Allow: /',
      ...sharedDisallows(),
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
      `# Staging host (${host}) — crawl allowed for review; pages send noindex so they stay out of Google.`,
      `Sitemap: ${sitemap}`,
      '',
    ].join('\n')
  }

  return [
    'User-agent: *',
    'Allow: /',
    ...sharedDisallows(),
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
  const headers: Record<string, string> = {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'public, max-age=300',
  }
  if (isNonProductionHost()) {
    headers['X-Robots-Tag'] = 'noindex, nofollow'
  }
  return new Response(buildRobotsTxt(), { headers })
}
