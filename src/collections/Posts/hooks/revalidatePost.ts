import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Post } from '../../../payload-types'
import { scheduleRevalidate } from '@/utilities/scheduleRevalidate'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/blog/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      scheduleRevalidate(() => {
        revalidatePath(path)
        revalidatePath('/blog')
        revalidatePath('/sitemap.xml')
      })
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/blog/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      scheduleRevalidate(() => {
        revalidatePath(oldPath)
        revalidatePath('/blog')
        revalidatePath('/sitemap.xml')
      })
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/blog/${doc?.slug}`

    scheduleRevalidate(() => {
      revalidatePath(path)
      revalidatePath('/blog')
      revalidatePath('/sitemap.xml')
    })
  }

  return doc
}
