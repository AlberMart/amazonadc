import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Professional air duct and dryer vent cleaning in Virginia, Maryland, and Washington DC. Flat-rate pricing and 100% satisfaction guarantee.',
  images: [
    {
      url: `${getServerSideURL()}/img/Amazon.webp`,
    },
  ],
  siteName: 'Amazon Air Duct Cleaning',
  title: 'Amazon Air Duct Cleaning',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
