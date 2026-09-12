import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { locationsSeed, officesSeed, servicesSeed, siteSettingsSeed, headerSeed, footerSeed } from './amazonadc'
import { homePageSeed, legalPagesSeed, postsSeed } from './blog-and-legal'

async function upsertBySlug(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: 'services' | 'locations' | 'offices' | 'posts' | 'pages',
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
    return existing.docs[0].id
  }

  const created = await payload.create({
    collection,
    data,
    context,
  })
  console.log('created', collection, slug)
  return created.id
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

  await payload.updateGlobal({
    slug: 'header',
    data: headerSeed,
    context,
  })
  console.log('updated header')

  await payload.updateGlobal({
    slug: 'footer',
    data: footerSeed,
    context,
  })
  console.log('updated footer')

  for (const service of servicesSeed) {
    await upsertBySlug(payload, 'services', service.slug, service, context)
  }

  const officeIds = new Map<string, number | string>()
  for (const office of officesSeed) {
    const id = await upsertBySlug(payload, 'offices', office.slug, office, context)
    officeIds.set(office.slug, id)
  }

  for (const location of locationsSeed) {
    const { servedBySlug, ...rest } = location
    const officeId = officeIds.get(servedBySlug)
    if (!officeId) {
      throw new Error(`Missing office for location ${location.slug}: ${servedBySlug}`)
    }
    await upsertBySlug(
      payload,
      'locations',
      location.slug,
      {
        ...rest,
        servedBy: officeId,
      },
      context,
    )
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
