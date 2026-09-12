'use client'

import { useRowLabel } from '@payloadcms/ui'

export const RowLabel = () => {
  const { data, rowNumber } = useRowLabel<{
    title?: string
    type?: string
    link?: { label?: string }
  }>()

  const label = data?.title || data?.link?.label
  const suffix = data?.type ? ` (${data.type})` : ''
  return <div>{label ? `${label}${suffix}` : `Row ${String((rowNumber || 0) + 1).padStart(2, '0')}`}</div>
}
