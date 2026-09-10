import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { locationsSeed, servicesSeed, siteSettingsSeed } from './amazonadc'
import { homePageSeed, legalPagesSeed, postsSeed } from './blog-and-legal'

async function upsertBySlug(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: 'services' | 'locations' | 'posts' | 'pages',
  slug: string,
  data: Record<string, unknown>,
  context: { disableRevalidate: boolean },
) {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (existing.docs[0]) {
    await payload.update({
      collection,
      id: existing.docs[0].id,
      data,
      context,
    })
    console.log('updated', collection, slug)
  } else {
    await payload.create({
      collection,
      data,
      context,
    })
    console.log('created', collection, slug)
  }
}

async function run() {
  const payload = await getPayload({ config })
  const context = { disableRevalidate: true }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: siteSettingsSeed,
    context,
  })
  console.log('updated site-settings')

  for (const service of servicesSeed) {
    await upsertBySlug(payload, 'services', service.slug, service, context)
  }

  for (const location of locationsSeed) {
    await upsertBySlug(payload, 'locations', location.slug, location, context)
  }

  for (const post of postsSeed) {
    await upsertBySlug(
      payload,
      'posts',
      post.slug,
      {
        ...post,
        publishedAt: new Date().toISOString(),
      },
      context,
    )
  }

  for (const page of legalPagesSeed) {
    await upsertBySlug(payload, 'pages', page.slug, page, context)
  }

  await upsertBySlug(payload, 'pages', homePageSeed.slug, homePageSeed, context)

  console.log('Seed complete')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
