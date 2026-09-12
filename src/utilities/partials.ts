import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import {
  flattenPageSections,
  mapHomeSection,
  mapRawSections,
  type HomeSection,
} from '@/utilities/homeSections'

export const DEFAULT_SERVICE_AREA_SLUG = 'service-area-dc-metro'

function sectionsFromPartialDoc(doc: { sections?: unknown[] } | null | undefined): HomeSection[] {
  if (!doc?.sections?.length) return []
  return flattenPageSections(
    doc.sections
      .map((row) => mapHomeSection(row as Record<string, unknown>, true))
      .filter((row): row is HomeSection => Boolean(row)),
  )
}

export async function getPartialSections(slug: string): Promise<HomeSection[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'partials',
      where: { slug: { equals: slug } },
      limit: 1,
      pagination: false,
      depth: 1,
      overrideAccess: true,
    })
    return sectionsFromPartialDoc(result.docs[0] as { sections?: unknown[] } | undefined)
  } catch {
    return []
  }
}

export async function getPartialSectionsById(id: number | string): Promise<HomeSection[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const doc = await payload.findByID({
      collection: 'partials',
      id,
      depth: 1,
      overrideAccess: true,
    })
    return sectionsFromPartialDoc(doc as { sections?: unknown[] })
  } catch {
    return []
  }
}

export const getCachedPartialSections = (slug: string) =>
  unstable_cache(async () => getPartialSections(slug), ['partial', slug], {
    tags: ['partials', `partial_${slug}`],
  })

const getCachedPartialSectionsById = (id: number | string) =>
  unstable_cache(async () => getPartialSectionsById(id), ['partial-id', String(id)], {
    tags: ['partials', `partial_id_${id}`],
  })

export async function getDefaultServiceAreaSection(): Promise<HomeSection | null> {
  const sections = await getCachedPartialSections(DEFAULT_SERVICE_AREA_SLUG)()
  return sections.find((section) => section.type === 'serviceArea') || null
}

/** Fill Include rows that only have a Partial id (relationship populate often omits nested sections). */
export async function hydrateIncludes(sections: HomeSection[]): Promise<HomeSection[]> {
  return Promise.all(
    sections.map(async (section) => {
      if (section.type !== 'include') return section
      if (section.includedSections?.length) return section
      if (section.partialId == null) return section
      const includedSections = await getCachedPartialSectionsById(section.partialId)()
      return { ...section, includedSections }
    }),
  )
}

export async function loadPageSections(raw: unknown): Promise<HomeSection[]> {
  const mapped = mapRawSections(raw, { flatten: false })
  return flattenPageSections(await hydrateIncludes(mapped))
}
