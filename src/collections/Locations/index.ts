import type { CollectionConfig, Field } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from 'payload'
import { revalidateLocation, revalidateLocationDelete } from './hooks/revalidateLocation'
import { seoMetaTabFields } from '../../fields/seoMeta'
import { INLINE_LINKS_HINT } from '../../fields/inlineLinksHint'
import { pageSectionsFields } from '../../fields/pageSections'

const hiddenLegacy = {
  condition: () => false,
  description: 'Deprecated — use Sections.',
}

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
    pageSectionsFields({
      name: 'sections',
      allowInclude: true,
      description:
        'Page body. Unique copy lives here; reuse Partials via Include. Empty = legacy layout until you seed.',
    }),
    {
      name: 'offersTitle',
      type: 'text',
      admin: hiddenLegacy,
    },
    {
      name: 'about',
      type: 'group',
      admin: hiddenLegacy,
      fields: [
        { name: 'heading', type: 'text' },
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
      admin: hiddenLegacy,
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'intro', type: 'textarea' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'text', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'why',
      type: 'group',
      admin: hiddenLegacy,
      fields: [
        { name: 'heading', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'text', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'communities',
      type: 'group',
      admin: hiddenLegacy,
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'intro', type: 'textarea' },
        {
          name: 'groups',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'places', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'process',
      type: 'group',
      admin: hiddenLegacy,
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'intro', type: 'textarea' },
        {
          name: 'steps',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'text', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'faqIntro',
      type: 'textarea',
      admin: hiddenLegacy,
    },
    {
      name: 'faq',
      type: 'array',
      admin: {
        ...hiddenLegacy,
        description: 'Deprecated — FAQ now lives in Sections.',
      },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true, admin: { description: INLINE_LINKS_HINT } },
      ],
    },
    {
      name: 'mapUrl',
      type: 'text',
      admin: hiddenLegacy,
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
