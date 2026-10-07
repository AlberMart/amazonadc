import { absoluteUrl } from '@/utilities/seo'
import { SEO_META_DESCRIPTION, SEO_HOME_H1 } from '@/utilities/seoCopy'
import { locationsSeed, servicesSeed } from '@/seed/amazonadc'
import blogIndex from '@/content/blog/index.json'

export const dynamic = 'force-dynamic'

/** Expanded site map for LLM crawlers (linked from /llms.txt). */
export function GET() {
  const services = servicesSeed.map((service) => {
    const slug = String(service.slug)
    const title = String(service.title)
    const summary = String(service.summary || service.description || '')
    return `- [${title}](${absoluteUrl(`/${slug}`)}): ${summary}`
  })

  const locations = locationsSeed.map((location) => {
    const slug = String(location.slug)
    const city = String(location.city || location.title || slug)
    const state = String(location.state || '')
    const label = state ? `${city}, ${state}` : city
    return `- [${label}](${absoluteUrl(`/locations/${slug}`)})`
  })

  const posts = (blogIndex as Array<{ slug: string; title: string; description: string }>)
    .slice(0, 40)
    .map((post) => `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.description}`)

  const body = [
    '# Amazon Air Duct Cleaning — Full LLM Map',
    `# ${SEO_HOME_H1}`,
    `# ${SEO_META_DESCRIPTION}`,
    '',
    '> Amazon Air Duct Cleaning serves Virginia, Maryland, and Washington DC with flat-rate air duct cleaning, dryer vent cleaning, combo packages, and mold remediation for air ducts. Offices in Burke, VA and Bethesda, MD. Phone (800) 606-3334 · support@amazonadc.com.',
    '',
    '## NAP',
    '',
    '- Brand: Amazon Air Duct Cleaning',
    '- Phone: (800) 606-3334',
    '- Email: support@amazonadc.com',
    '- Burke office: 5641 Burke Centre Pkwy Ste 119, Burke, VA 22015 · (571) 460-0001',
    '- Bethesda office: 7815A Old Georgetown Rd Ste 201, Bethesda, MD 20814 · (301) 809-4544',
    '',
    '## Services',
    '',
    ...services,
    '',
    '## Locations',
    '',
    ...locations,
    '',
    '## Blog',
    '',
    ...posts,
    '',
    '## Policies',
    '',
    `- [Privacy Policy](${absoluteUrl('/privacy-policy')})`,
    `- [Terms of Service](${absoluteUrl('/terms-of-service')})`,
    `- [Refund Policy](${absoluteUrl('/refund-policy')})`,
    '',
    '## Machine-readable',
    '',
    `- [Short llms.txt](${absoluteUrl('/llms.txt')})`,
    `- [Sitemap](${absoluteUrl('/sitemap.xml')})`,
    `- [Robots](${absoluteUrl('/robots.txt')})`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  })
}
