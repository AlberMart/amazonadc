import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Location } from '../../../payload-types'
import { scheduleRevalidate } from '@/utilities/scheduleRevalidate'

function revalidateLocationPaths(slug?: string | null) {
  if (!slug) return
  revalidatePath(`/locations/${slug}`)
  revalidatePath('/locations')
  revalidatePath('/')
  revalidatePath('/sitemap.xml')
}

export const revalidateLocation: CollectionAfterChangeHook<Location> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  payload.logger.info(`Revalidating location: ${doc.slug}`)
  scheduleRevalidate(() => {
    revalidateLocationPaths(doc.slug)
    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidateLocationPaths(previousDoc.slug)
    }
  })
  return doc
}

export const revalidateLocationDelete: CollectionAfterDeleteHook<Location> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    scheduleRevalidate(() => revalidateLocationPaths(doc?.slug))
  }
  return doc
}
