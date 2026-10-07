import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Service } from '../../payload-types'
import { scheduleRevalidate } from '@/utilities/scheduleRevalidate'
import { scheduleIndexNow } from '@/utilities/indexNow'

function revalidateServicePaths(slug?: string | null) {
  if (slug) revalidatePath(`/${slug}`)
  revalidatePath('/')
  revalidatePath('/sitemap.xml')
}

export const revalidateService: CollectionAfterChangeHook<Service> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  payload.logger.info(`Revalidating service: ${doc.slug}`)
  scheduleRevalidate(() => {
    revalidateServicePaths(doc.slug)
    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidateServicePaths(previousDoc.slug)
    }
  })
  scheduleIndexNow([doc.slug ? `/${doc.slug}` : null, '/'])
  return doc
}

export const revalidateServiceDelete: CollectionAfterDeleteHook<Service> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    scheduleRevalidate(() => revalidateServicePaths(doc?.slug))
    scheduleIndexNow([doc?.slug ? `/${doc.slug}` : null, '/'])
  }
  return doc
}
