import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { locationsSeed, officesSeed, servicesSeed, siteSettingsSeed, headerSeed, footerSeed, defaultServiceAreaPartialSeed } from './amazonadc'
import { homePageSeed, legalPagesSeed, postsSeed } from './blog-and-legal'
import { contactFormSeed } from './contact-form'

async function upsertBySlug(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: 'services' | 'locations' | 'offices' | 'posts' | 'pages' | 'partials',
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

function bindIncludes<T extends Record<string, unknown>>(data: T, partialId: number | string): T {
  const bind = (rows: unknown) =>
    Array.isArray(rows)
      ? rows.map((row) => {
          const section = row as { type?: string; partial?: unknown }
          if (section.type === 'include' && !section.partial) {
            return { ...section, partial: partialId }
          }
          return section
        })
      : rows

  return {
    ...data,
    sections: bind(data.sections),
    homeSections: bind(data.homeSections),
  }
}

async function run() {
  const payload = await getPayload({ config })
  const context = { disableRevalidate: true }

  const existingForm = await payload.find({
    collection: 'forms',
    where: { title: { equals: contactFormSeed.title } },
    limit: 1,
  })
  const formId = existingForm.docs[0]
    ? (
        await payload.update({
          collection: 'forms',
          id: existingForm.docs[0].id,
          data: contactFormSeed,
          context,
        })
      ).id
    : (
        await payload.create({
          collection: 'forms',
          data: contactFormSeed,
          context,
        })
      ).id
  console.log(existingForm.docs[0] ? 'updated' : 'created', 'forms', contactFormSeed.title)

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      ...siteSettingsSeed,
      contactForm: formId,
    },
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

  const serviceAreaPartialId = await upsertBySlug(
    payload,
    'partials',
    defaultServiceAreaPartialSeed.slug,
    defaultServiceAreaPartialSeed,
    context,
  )

  for (const service of servicesSeed) {
    await upsertBySlug(payload, 'services', service.slug, bindIncludes(service, serviceAreaPartialId), context)
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
        ...bindIncludes(rest, serviceAreaPartialId),
        servedBy: officeId,
      },
      context,
    )
  }

  try {
    for (const page of legalPagesSeed) {
      await upsertBySlug(payload, 'pages', page.slug, page, context)
    }
  } catch (error) {
    console.warn('legal pages seed skipped:', error instanceof Error ? error.message : error)
  }

  try {
    await upsertBySlug(payload, 'pages', homePageSeed.slug, bindIncludes(homePageSeed, serviceAreaPartialId), context)
  } catch (error) {
    console.warn('home page seed skipped:', error instanceof Error ? error.message : error)
  }

  try {
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
  } catch (error) {
    console.warn('posts seed skipped:', error instanceof Error ? error.message : error)
  }

  console.log('Seed complete')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
