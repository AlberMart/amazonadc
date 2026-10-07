import type { Metadata } from 'next'
import { OG_DEFAULT_DESCRIPTION } from './serviceCopy'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: OG_DEFAULT_DESCRIPTION,
  images: [
    {
      url: `${getServerSideURL()}/img/og-default.jpg`,
      secureUrl: `${getServerSideURL()}/img/og-default.jpg`,
      width: 1200,
      height: 630,
      type: 'image/jpeg',
      alt: 'Amazon Air Duct Cleaning',
    },
  ],
  siteName: 'Amazon Air Duct Cleaning',
  title: 'Air Duct Cleaning in VA, MD & Washington DC',
  url: getServerSideURL(),
  locale: 'en_US',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
