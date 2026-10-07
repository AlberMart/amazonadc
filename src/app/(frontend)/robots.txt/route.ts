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

/** Explicit allow so AI crawlers that scan robots.txt for llms.* find the paths. */
function llmsAllows() {
  return ['Allow: /llms.txt', 'Allow: /llms-full.txt']
}

function buildRobotsTxt() {
  const sitemap = absoluteUrl('/sitemap.xml')
  const host = absoluteUrl('/')

  // Staging stays crawlable so review tools / AI auditors can fetch pages.
  // Indexing is blocked via <meta robots noindex> + X-Robots-Tag (see layout / headers).
  const aiAgents = [
    'User-agent: OAI-SearchBot',
    'Allow: /',
    ...llmsAllows(),
    '',
    'User-agent: ChatGPT-User',
    'Allow: /',
    ...llmsAllows(),
    '',
    'User-agent: GPTBot',
    'Allow: /',
    ...llmsAllows(),
    'Disallow: /admin/',
    'Disallow: /api/',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    ...llmsAllows(),
    'Disallow: /admin/',
    'Disallow: /api/',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    ...llmsAllows(),
    'Disallow: /admin/',
    'Disallow: /api/',
    '',
    'User-agent: Applebot-Extended',
    'Allow: /',
    ...llmsAllows(),
    'Disallow: /admin/',
    'Disallow: /api/',
    '',
    'User-agent: Google-Extended',
    'Allow: /',
    ...llmsAllows(),
    'Disallow: /admin/',
    'Disallow: /api/',
  ]

  if (isNonProductionHost()) {
    return [
      'User-agent: *',
      'Allow: /',
      ...llmsAllows(),
      ...sharedDisallows(),
      '',
      ...aiAgents,
      '',
      `# Staging host (${host}) — crawl allowed for review; pages send noindex so they stay out of Google.`,
      `Sitemap: ${sitemap}`,
      '',
    ].join('\n')
  }

  return [
    'User-agent: *',
    'Allow: /',
    ...llmsAllows(),
    ...sharedDisallows(),
    '',
    ...aiAgents,
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
