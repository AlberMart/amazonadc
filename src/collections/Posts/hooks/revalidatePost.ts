import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Post } from '../../../payload-types'
import { scheduleRevalidate } from '@/utilities/scheduleRevalidate'

function revalidatePostPaths(slug?: string | null) {
  if (slug) revalidatePath(`/blog/${slug}`)
  revalidatePath('/blog')
  revalidatePath('/')
  revalidatePath('/sitemap.xml')
}

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/blog/${doc.slug}`
      payload.logger.info(`Revalidating post at path: ${path}`)
      scheduleRevalidate(() => revalidatePostPaths(doc.slug))
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/blog/${previousDoc.slug}`
      payload.logger.info(`Revalidating old post at path: ${oldPath}`)
      scheduleRevalidate(() => revalidatePostPaths(previousDoc.slug))
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    scheduleRevalidate(() => revalidatePostPaths(doc?.slug))
  }

  return doc
}
