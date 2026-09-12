import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { scheduleRevalidate } from '@/utilities/scheduleRevalidate'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)

    scheduleRevalidate(() => {
      revalidateTag('global_header', 'max')
    })
  }

  return doc
}
