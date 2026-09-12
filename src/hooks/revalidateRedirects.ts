import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { scheduleRevalidate } from '@/utilities/scheduleRevalidate'

export const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`)

  scheduleRevalidate(() => {
    revalidateTag('redirects', 'max')
  })

  return doc
}
