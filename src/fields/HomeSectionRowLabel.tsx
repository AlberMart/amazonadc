'use client'

import { useRowLabel } from '@payloadcms/ui'

const labels: Record<string, string> = {
  hero: 'Hero',
  prose: 'Prose',
  offers: 'Offers',
  pricing: 'Pricing',
  featureSplit: 'Feature split',
  cardGrid: 'Card grid',
  steps: 'Steps',
  serviceArea: 'Service area',
  blogTeaser: 'Blog teaser',
  faq: 'FAQ',
  reviews: 'Reviews',
  contact: 'Contact',
  trustBadges: 'Trust badges',
  gallery: 'Gallery',
  listColumns: 'List columns',
  include: 'Include',
}

export const RowLabel = () => {
  const { data, rowNumber } = useRowLabel<{
    type?: string
    heading?: string
    anchorId?: string
  }>()
  const kind = labels[data?.type || ''] || data?.type || 'Section'
  const title = data?.heading?.trim() || data?.anchorId || ''
  return (
    <div>
      {String((rowNumber || 0) + 1).padStart(2, '0')}. {kind}
      {title ? ` — ${title.slice(0, 48)}` : ''}
    </div>
  )
}
