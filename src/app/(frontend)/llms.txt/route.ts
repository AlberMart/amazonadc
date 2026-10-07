import { absoluteUrl } from '@/utilities/seo'
import { SEO_META_DESCRIPTION, SEO_HOME_H1 } from '@/utilities/seoCopy'

export const dynamic = 'force-dynamic'

/** Public llms.txt — short site map for LLM / AI crawlers. */
export function GET() {
  const body = [
    '# Amazon Air Duct Cleaning',
    `# ${SEO_HOME_H1}`,
    `# ${SEO_META_DESCRIPTION}`,
    '',
    `> Professional air duct cleaning, dryer vent cleaning, and mold remediation for air ducts across Virginia, Maryland, and Washington DC. Flat-rate pricing. Phone: (800) 606-3334. Email: support@amazonadc.com.`,
    '',
    '## Main',
    '',
    `- [Home](${absoluteUrl('/')}): overview, offers, service area, reviews, contact`,
    `- [Air Duct Cleaning](${absoluteUrl('/air-duct-cleaning')}): residential & commercial duct cleaning`,
    `- [Dryer Vent Cleaning](${absoluteUrl('/dryer-vent-cleaning')}): lint removal and fire-risk reduction`,
    `- [Air Duct + Dryer Vent Combo](${absoluteUrl('/air-duct-and-dryer-vent-cleaning')}): combined package`,
    `- [Mold Remediation for Air Ducts](${absoluteUrl('/mold-remediation-air-ducts')}): HVAC mold containment and cleanup`,
    `- [Blog](${absoluteUrl('/blog')}): indoor air quality and maintenance guides`,
    `- [Locations](${absoluteUrl('/locations')}): city service pages across VA, MD, and DC`,
    '',
    '## Offices',
    '',
    `- [Burke, VA office](${absoluteUrl('/locations/burke')}): 5641 Burke Centre Pkwy Ste 119 — (571) 460-0001 — Northern Virginia dispatch`,
    `- [Bethesda, MD office](${absoluteUrl('/locations/bethesda')}): 7815A Old Georgetown Rd Ste 201 — (301) 809-4544 — Maryland dispatch`,
    '',
    '## Optional',
    '',
    `- [Sitemap](${absoluteUrl('/sitemap.xml')})`,
    `- [Full LLM map](${absoluteUrl('/llms-full.txt')})`,
    `- [Robots](${absoluteUrl('/robots.txt')})`,
    `- [Privacy Policy](${absoluteUrl('/privacy-policy')})`,
    `- [Terms of Service](${absoluteUrl('/terms-of-service')})`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  })
}
