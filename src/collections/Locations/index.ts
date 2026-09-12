import type { CollectionConfig, Field } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from 'payload'
import { revalidateLocation, revalidateLocationDelete } from './hooks/revalidateLocation'
import { seoMetaTabFields } from '../../fields/seoMeta'
import { INLINE_LINKS_HINT } from '../../fields/inlineLinksHint'

const textItem = (name = 'text'): Field => ({
  name,
  type: 'text',
  required: true,
})

const textareaItem = (name = 'text'): Field => ({
  name,
  type: 'textarea',
  required: true,
  admin: { description: INLINE_LINKS_HINT },
})

export const Locations: CollectionConfig = {
  slug: 'locations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Content',
    defaultColumns: ['title', 'slug', 'city', 'updatedAt'],
    useAsTitle: 'title',
    description: 'City SEO pages. Public URL: /locations/[slug]. Link each page to the serving office via servedBy.',
    preview: (doc) => {
      const slug = typeof doc?.slug === 'string' ? doc.slug : ''
      return slug ? `/locations/${slug}` : null
    },
  },
  hooks: {
    afterChange: [revalidateLocation],
    afterDelete: [revalidateLocationDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. Air Duct Cleaning in Bethesda, MD',
      },
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      required: true,
    },
    {
      name: 'heroMedia',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Hero image upload (preferred). Edit crop in Media.' },
    },
    {
      name: 'heroImage',
      type: 'text',
      required: true,
      admin: { description: 'Or public path if no upload' },
    },
    {
      name: 'heroAlt',
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      admin: {
        description: 'City this page targets (e.g. Arlington — not the office city unless this is an office hub page).',
      },
    },
    {
      name: 'state',
      type: 'text',
      required: true,
    },
    {
      name: 'servedBy',
      type: 'relationship',
      relationTo: 'offices',
      required: true,
      admin: {
        description: 'Physical office that serves this city. Phone and address on the page come from this office.',
      },
    },
    {
      name: 'offersTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'paragraphs',
          type: 'array',
          fields: [textareaItem()],
        },
        {
          name: 'highlights',
          type: 'array',
          fields: [textItem('item')],
        },
      ],
    },
    {
      name: 'services',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'intro', type: 'textarea', required: true },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'text', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      name: 'why',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'text', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      name: 'communities',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'intro', type: 'textarea', required: true },
        {
          name: 'groups',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'places', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      name: 'process',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'intro', type: 'textarea', required: true },
        {
          name: 'steps',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'text', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      name: 'faqIntro',
      type: 'textarea',
    },
    {
      name: 'faq',
      type: 'array',
      admin: {
        description: 'Shown on the page and emitted as FAQPage JSON-LD for this URL.',
      },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true, admin: { description: INLINE_LINKS_HINT } },
      ],
    },
    {
      name: 'mapUrl',
      type: 'text',
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          label: 'SEO',
          fields: seoMetaTabFields(),
        },
      ],
    },
    slugField(),
  ],
}
