import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { pageTitle, SITE_NAME } from './seo'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/img/Amazon.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const path = Array.isArray(doc?.slug) ? `/${doc.slug.join('/')}` : doc?.slug ? `/${doc.slug}` : '/'
  const title = pageTitle(doc?.meta?.title || SITE_NAME)

  return {
    description: doc?.meta?.description,
    alternates: { canonical: `${getServerSideURL().replace(/\/$/, '')}${path === '/home' ? '/' : path}` },
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: path === '/home' ? '/' : path,
    }),
    title: { absolute: title },
  }
}
