import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { getSiteSeo, resolvePageMeta } from './seo'

const getImagePath = (image?: Media | Config['db']['defaultIDType'] | null) => {
  if (!image || typeof image !== 'object' || !('url' in image)) return undefined
  return image.sizes?.og?.url || image.url || undefined
}

const docPath = (
  doc: Partial<Page> | Partial<Post> | null,
  collection: 'pages' | 'posts',
) => {
  const slug = Array.isArray(doc?.slug) ? doc.slug.join('/') : doc?.slug
  if (!slug || slug === 'home') return '/'
  return collection === 'posts' ? `/blog/${slug}` : `/${slug}`
}

/** Adapter from Payload page/post docs onto the shared resolvePageMeta() path. */
export const generateMeta = async (args: {
  collection?: 'pages' | 'posts'
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { collection = 'pages', doc } = args
  const site = await getSiteSeo()
  const fallbackTitle = typeof doc?.title === 'string' ? doc.title : undefined

  return resolvePageMeta(
    {
      path: docPath(doc, collection),
      meta: {
        title: doc?.meta?.title,
        description: doc?.meta?.description,
        image: getImagePath(doc?.meta?.image),
        noIndex: doc?.meta?.noIndex,
      },
      fallbackTitle,
      fallbackDescription: site.defaultMetaDescription,
    },
    site,
  )
}
