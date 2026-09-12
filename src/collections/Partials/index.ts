import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { pageSectionsFields } from '../../fields/pageSections'
import { scheduleRevalidate } from '@/utilities/scheduleRevalidate'

const revalidatePartialCaches = (slug?: string) => {
  revalidateTag('partials', 'max')
  if (slug) revalidateTag(`partial_${slug}`, 'max')
  revalidatePath('/')
}

const revalidatePartials: CollectionAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const slug = typeof doc?.slug === 'string' ? doc.slug : undefined
    scheduleRevalidate(() => revalidatePartialCaches(slug))
  }
  return doc
}

const revalidatePartialsDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const slug = typeof doc?.slug === 'string' ? doc.slug : undefined
    scheduleRevalidate(() => revalidatePartialCaches(slug))
  }
  return doc
}

export const Partials: CollectionConfig = {
  slug: 'partials',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Content',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
    description:
      'Reusable section chunks (like Blade includes). Edit once, then insert on Home / Services / Locations via an Include section.',
  },
  defaultPopulate: {
    title: true,
    slug: true,
    sections: true,
  },
  hooks: {
    afterChange: [revalidatePartials],
    afterDelete: [revalidatePartialsDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    pageSectionsFields({
      name: 'sections',
      allowInclude: false,
      description:
        'Sections in this Partial. Include is not allowed here (no nested includes). Insert this Partial onto a page with an Include section.',
    }),
    slugField(),
  ],
}
