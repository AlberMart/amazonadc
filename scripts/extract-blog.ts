/**
 * One-off helper: extract readable sections from Laravel blog blades.
 * Run: npx tsx scripts/extract-blog.ts
 */
import fs from 'fs'
import path from 'path'

const blogDir = path.resolve('tmp-old/resources/views/blog')
const outDir = path.resolve('src/content/blog')

const preferredOrder = [
  'how-often-clean-air-ducts',
  '7-signs-air-ducts-need-cleaning',
  'why-clean-dryer-vents',
  'how-dirty-air-ducts-increase-energy-bills',
  'can-dirty-air-ducts-cause-allergies',
  'never-clean-air-ducts',
]

const imageBySlug: Record<string, { hero: string; inline?: string[] }> = {
  'how-often-clean-air-ducts': {
    hero: '/img/blog/how-often-clean-air-ducts.webp',
    inline: ['/img/blog/dirty-HVAC-unit.webp'],
  },
  '7-signs-air-ducts-need-cleaning': {
    hero: '/img/blog/7-signs-air-ducts-need-cleaning.webp',
    inline: ['/img/blog/neglected-air-ducts-buildup.webp', '/img/blog/Why-Air-Duct-Condition-Matters.webp'],
  },
  'why-clean-dryer-vents': {
    hero: '/img/blog/why-clean-dryer-vents.webp',
    inline: ['/img/blog/clogged-dryer-vent-lint.webp'],
  },
  'how-dirty-air-ducts-increase-energy-bills': {
    hero: '/img/blog/dirty-air-ducts-energy-bills.webp',
    inline: ['/img/blog/The-Hidden-Cost-of-Dirty-Air-Ducts.webp'],
  },
  'can-dirty-air-ducts-cause-allergies': {
    hero: '/img/blog/can-dirty-air-ducts-cause-allergies.webp',
    inline: ['/img/blog/Allergies.webp'],
  },
  'never-clean-air-ducts': {
    hero: '/img/blog/never-clean-air-ducts.webp',
    inline: ['/img/blog/Why-Air-Duct-Condition-Matters.webp'],
  },
}

function cleanText(html: string) {
  return html
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|li|h\d|div)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{\{[^}]+\}\}/g, '')
    .replace(/@\w+(\([^)]*\))?/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .replace(/[ \t]*\n[ \t]*/g, '\n')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractMeta(raw: string) {
  const title =
    raw.match(/@section\(\s*'title'\s*,\s*'([^']+)'/)?.[1]?.replace(/\s*\|\s*Amazon.*$/, '') || ''
  const description = raw.match(/@section\(\s*'meta_description'\s*,\s*'([^']+)'/)?.[1] || ''
  const h1 = raw.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
  return {
    title: cleanText(title || h1 || 'Blog Post'),
    description: cleanText(description),
    headline: cleanText(h1 || title || 'Blog Post'),
  }
}

function toImagePath(assetPath: string | undefined) {
  if (!assetPath) return undefined
  const normalized = assetPath.replace(/^\//, '')
  return normalized.startsWith('img/') ? `/${normalized}` : `/img/${normalized}`
}

function extractSections(raw: string) {
  const content = raw.split("@section('content')")[1] || raw
  const parts = [...content.matchAll(/<section([^>]*)>([\s\S]*?)<\/section>/gi)]
  const sections: Array<{
    id?: string
    heading?: string
    paragraphs: string[]
    listItems: string[]
    image?: string
  }> = []

  for (const match of parts) {
    const attrs = match[1] || ''
    const body = match[2] || ''
    const id = attrs.match(/id=["']([^"']+)["']/)?.[1]

    if (id === 'hero' || id === 'table_of_contents' || id === 'current_offers' || id === 'faq') continue

    const heading =
      cleanText(body.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i)?.[1] || '') ||
      cleanText(body.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)?.[1] || '')

    if (/frequently asked questions/i.test(heading)) continue

    const paragraphs = [...body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map((m) => cleanText(m[1]))
      .filter((t) => t && t.length > 20 && !t.startsWith('Interested?'))

    const listItems = [...body.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      .map((m) => cleanText(m[1]))
      .filter((t) => t && t.length > 2 && !t.toLowerCase().includes('faq'))

    const img = body.match(/asset\('([^']+)'\)/)?.[1]
    const image = toImagePath(img)

    if (!heading && paragraphs.length === 0 && listItems.length === 0) continue

    sections.push({
      id,
      heading: heading || undefined,
      paragraphs,
      listItems: listItems.slice(0, 20),
      image,
    })
  }

  return sections
}

function extractFaq(raw: string) {
  const faqSection = raw.split(/id=["']faq["']/i)[1]
  if (!faqSection) return []

  const sectionBody = faqSection.split(/<\/section>/i)[0] || faqSection
  const items: Array<{ q: string; a: string }> = []

  const blocks = [
    ...sectionBody.matchAll(
      /<a[^>]*data-bs-toggle=["']collapse["'][^>]*>([\s\S]*?)<\/a>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi,
    ),
  ]

  for (const m of blocks) {
    const q = cleanText(m[1])
    const a = cleanText(m[2])
    if (q && a) items.push({ q, a })
  }

  return items
}

function attachInlineImages(
  sections: ReturnType<typeof extractSections>,
  inline: string[] | undefined,
) {
  if (!inline?.length) return sections
  const used = new Set(sections.map((s) => s.image).filter(Boolean))
  const queue = inline.filter((src) => !used.has(src))
  let i = 0
  return sections.map((section) => {
    if (section.image || i >= queue.length) return section
    const image = queue[i++]
    return { ...section, image }
  })
}

fs.mkdirSync(outDir, { recursive: true })

const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.blade.php'))
const index: Array<{ slug: string; title: string; description: string; hero: string }> = []

for (const file of files) {
  const slug = file.replace(/\.blade\.php$/, '')
  const raw = fs.readFileSync(path.join(blogDir, file), 'utf8')
  const meta = extractMeta(raw)
  const media = imageBySlug[slug] || { hero: `/img/blog/${slug}.webp` }
  const sections = attachInlineImages(extractSections(raw), media.inline)
  const faq = extractFaq(raw)

  const data = {
    slug,
    title: meta.title,
    headline: meta.headline,
    description: meta.description,
    heroImage: media.hero,
    sections,
    faq,
  }

  fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(data, null, 2), 'utf8')
  index.push({
    slug,
    title: meta.title,
    description: meta.description,
    hero: media.hero,
  })
  console.log('wrote', slug, 'sections=', sections.length, 'faq=', faq.length)
}

index.sort((a, b) => {
  const ai = preferredOrder.indexOf(a.slug)
  const bi = preferredOrder.indexOf(b.slug)
  return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
})

fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(index, null, 2), 'utf8')
console.log('done', index.length)
