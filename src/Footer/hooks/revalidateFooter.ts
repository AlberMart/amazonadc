import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { scheduleRevalidate } from '@/utilities/scheduleRevalidate'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    scheduleRevalidate(() => {
      revalidateTag('global_footer', 'max')
    })
  }

  return doc
}
