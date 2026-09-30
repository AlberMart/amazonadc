import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { SEO_HOME_H1, SEO_META_DESCRIPTION, SEO_META_TITLE } from '../utilities/seoCopy'

type HeroSection = { type?: string; heading?: string | null }

/**
 * Writes amazonadc.com homepage H1/title/description into CMS.
 * Does not touch locations, services, or other pages.
 */
async function run() {
  const payload = await getPayload({ config })
  const context = { disableRevalidate: true }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      defaultMetaTitle: SEO_META_TITLE,
      defaultMetaDescription: SEO_META_DESCRIPTION,
    },
    context,
  })
  console.log('site-settings: title + description')

  const found = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })
  const home = found.docs[0]
  if (!home) {
    throw new Error('Home page not found in CMS')
  }

  const homeSections = ((home.homeSections || []) as HeroSection[]).map((section) =>
    section.type === 'hero' ? { ...section, heading: SEO_HOME_H1 } : section,
  )
  const homeContent = {
    ...((home.homeContent as Record<string, unknown> | null) || {}),
    heroHeadline: SEO_HOME_H1,
  }
  const meta = (home.meta || {}) as {
    image?: unknown
    noIndex?: boolean | null
  }

  await payload.update({
    collection: 'pages',
    id: home.id,
    data: {
      homeSections,
      homeContent,
      meta: {
        title: SEO_META_TITLE,
        description: SEO_META_DESCRIPTION,
        ...(meta.image ? { image: meta.image } : {}),
        ...(meta.noIndex != null ? { noIndex: meta.noIndex } : {}),
      },
    },
    context,
  })
  console.log('pages/home: H1 + meta')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
