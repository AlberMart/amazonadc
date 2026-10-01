import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import {
  locationsSeed,
  officesSeed,
  servicesSeed,
  siteSettingsSeed,
  headerSeed,
  footerSeed,
  defaultServiceAreaPartialSeed,
} from './amazonadc'
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

  // Removed service — delete leftover CMS rows so seed never resurrects it
  {
    const dead = await payload.find({
      collection: 'services',
      where: { slug: { equals: 'mold-remediation-house' } },
      limit: 10,
      overrideAccess: true,
    })
    for (const doc of dead.docs) {
      await payload.delete({ collection: 'services', id: doc.id, context })
      console.log('deleted', 'services', 'mold-remediation-house')
    }
  }

  // Renamed blog post — drop old placeholder slug
  {
    const dead = await payload.find({
      collection: 'posts',
      where: { slug: { equals: 'oakton-123-pollen-air-ducts' } },
      limit: 10,
      overrideAccess: true,
    })
    for (const doc of dead.docs) {
      await payload.delete({ collection: 'posts', id: doc.id, context })
      console.log('deleted', 'posts', 'oakton-123-pollen-air-ducts')
    }
  }

  for (const service of servicesSeed) {
    await upsertBySlug(
      payload,
      'services',
      service.slug,
      bindIncludes(service, serviceAreaPartialId),
      context,
    )
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
    const data = {
      ...bindIncludes(rest, serviceAreaPartialId),
      servedBy: officeId,
      generateSlug: false,
      slug: rest.slug,
    }
    const bySlug = await payload.find({
      collection: 'locations',
      where: { slug: { equals: rest.slug } },
      limit: 1,
    })
    const existing =
      bySlug.docs[0] ||
      (
        await payload.find({
          collection: 'locations',
          where: {
            and: [{ city: { equals: rest.city } }, { state: { equals: rest.state } }],
          },
          limit: 1,
        })
      ).docs[0]
    if (existing) {
      await payload.update({
        collection: 'locations',
        id: existing.id,
        data,
        context,
      })
      console.log(
        'updated',
        'locations',
        rest.slug,
        existing.slug !== rest.slug ? `(was ${existing.slug})` : '',
      )
    } else {
      await payload.create({
        collection: 'locations',
        data,
        context,
      })
      console.log('created', 'locations', rest.slug)
    }
  }

  try {
    for (const page of legalPagesSeed) {
      await upsertBySlug(payload, 'pages', page.slug, page, context)
    }
  } catch (error) {
    console.warn('legal pages seed skipped:', error instanceof Error ? error.message : error)
  }

  try {
    await upsertBySlug(
      payload,
      'pages',
      homePageSeed.slug,
      bindIncludes(homePageSeed, serviceAreaPartialId),
      context,
    )
  } catch (error) {
    console.warn('home page seed skipped:', error instanceof Error ? error.message : error)
  }

  // Remove leftover Payload-template pages (e.g. empty "contact" with Hero+blocks and no content)
  try {
    const keep = new Set([
      homePageSeed.slug,
      ...legalPagesSeed.map((page) => page.slug),
    ])
    const orphanPages = await payload.find({
      collection: 'pages',
      limit: 100,
      pagination: false,
      overrideAccess: true,
    })
    for (const doc of orphanPages.docs) {
      const slug = typeof doc.slug === 'string' ? doc.slug : ''
      const kind = (doc as { pageKind?: string | null }).pageKind
      if (!slug || keep.has(slug)) continue
      if (kind === 'home' || kind === 'legal') continue
      await payload.delete({ collection: 'pages', id: doc.id, context })
      console.log('deleted orphan page', slug)
    }
  } catch (error) {
    console.warn('orphan pages cleanup skipped:', error instanceof Error ? error.message : error)
  }

  try {
    // Organic publishedAt timeline (looks hand-published over years, not one mass dump).
    // Evergreen first in 2023; city posts irregularly through 2024–2025.
    const evergreenDates: Record<string, string> = {
      'how-often-clean-air-ducts': '2023-02-14T15:20:00.000Z',
      '7-signs-air-ducts-need-cleaning': '2023-04-03T16:05:00.000Z',
      'why-clean-dryer-vents': '2023-05-22T14:40:00.000Z',
      'can-dirty-air-ducts-cause-allergies': '2023-07-11T13:15:00.000Z',
      'how-dirty-air-ducts-increase-energy-bills': '2023-09-06T17:30:00.000Z',
      'never-clean-air-ducts': '2023-11-20T15:50:00.000Z',
    }
    // Irregular spacing so city posts do not look auto-scheduled every N days.
    const cityDayOffsets = [
      0, 9, 17, 31, 44, 52, 68, 79, 93, 110, 121, 138, 147, 163, 180, 191, 208, 219, 235, 248, 261,
      279, 292, 310, 325, 341, 356, 372, 388, 401, 419, 434, 451, 467,
    ]
    const cityBase = Date.parse('2024-01-18T14:25:00.000Z')
    const dayMs = 24 * 60 * 60 * 1000
    let cityIndex = 0
    for (const post of postsSeed) {
      const evergreenAt = evergreenDates[post.slug]
      const publishedAt = evergreenAt
        ? evergreenAt
        : new Date(
            cityBase +
              (cityDayOffsets[cityIndex] ?? cityIndex * 13) * dayMs +
              ((cityIndex * 37) % 5) * 60 * 60 * 1000,
          ).toISOString()
      if (!evergreenAt) cityIndex++
      await upsertBySlug(
        payload,
        'posts',
        post.slug,
        {
          ...post,
          publishedAt,
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
