import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { type DataFromGlobalSlug, getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import { withDbRetry } from '@/utilities/dbRetry'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(slug: T, depth = 0): Promise<DataFromGlobalSlug<T>> {
  return withDbRetry(async () => {
    const payload = await getPayload({ config: configPromise })
    return payload.findGlobal({
      slug,
      depth,
    })
  })
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = <T extends Global>(slug: T, depth = 0) =>
  unstable_cache(async () => getGlobal<T>(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })

export async function getCachedGlobalSafe<T extends Global>(slug: T, depth = 0) {
  try {
    return await getCachedGlobal(slug, depth)()
  } catch (error) {
    console.error(`Global ${slug} unavailable`, error)
    return null
  }
}
