import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Page } from '../../../payload-types'
import { scheduleRevalidate } from '@/utilities/scheduleRevalidate'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

      payload.logger.info(`Revalidating page at path: ${path}`)

      scheduleRevalidate(() => {
        revalidatePath(path)
        revalidatePath('/sitemap.xml')
      })
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      scheduleRevalidate(() => {
        revalidatePath(oldPath)
        revalidatePath('/sitemap.xml')
      })
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = doc?.slug === 'home' ? '/' : `/${doc?.slug}`
    scheduleRevalidate(() => {
      revalidatePath(path)
      revalidatePath('/sitemap.xml')
    })
  }

  return doc
}
