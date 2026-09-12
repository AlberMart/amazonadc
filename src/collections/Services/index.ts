import type { CollectionConfig, Field } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from 'payload'
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

const titledSteps: Field = {
  name: 'steps',
  type: 'array',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'text', type: 'textarea', required: true },
  ],
}

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'price', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'SEO / meta description and long summary',
      },
    },
    {
      name: 'price',
      type: 'number',
      admin: {
        description: 'Current offer price in USD. Leave empty for estimate-only services.',
      },
    },
    {
      name: 'compareAtPrice',
      type: 'number',
      admin: {
        description: 'Original / strikethrough price in USD',
      },
    },
    {
      name: 'orderUrl',
      type: 'text',
      admin: {
        description: 'Checkout URL (Stripe). Empty = “Get a Free Quote” to the contact form.',
      },
    },
    {
      name: 'thumbMedia',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Small card image upload (preferred)' },
    },
    {
      name: 'thumbImage',
      type: 'text',
      admin: {
        description: 'Or public path, e.g. /img/services/..._small.webp',
      },
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
      admin: {
        description: 'Or public path, e.g. /img/Amazon_AIR_DUCT_CLEANING.webp',
      },
    },
    {
      name: 'heroAlt',
      type: 'text',
      required: true,
    },
    pageSectionsFields({
      name: 'sections',
      allowInclude: true,
      description:
        'Page body. Unique copy lives here; reuse Partials via Include. Empty = legacy layout until you seed.',
    }),
    {
      name: 'includesIntro',
      type: 'textarea',
      admin: hiddenLegacy,
    },
    {
      name: 'includesMedia',
      type: 'upload',
      relationTo: 'media',
      admin: hiddenLegacy,
    },
    {
      name: 'includesImage',
      type: 'text',
      admin: { ...hiddenLegacy, description: 'Deprecated — use Sections.' },
    },
    {
      name: 'includesImageAlt',
      type: 'text',
      admin: hiddenLegacy,
    },
    {
      name: 'includes',
      type: 'array',
      labels: { singular: 'Item', plural: 'Included items' },
      admin: hiddenLegacy,
      fields: [textItem('item')],
    },
    {
      name: 'beforeAfter',
      type: 'array',
      admin: hiddenLegacy,
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
        },
        { name: 'src', type: 'text' },
        { name: 'alt', type: 'text' },
      ],
    },
    {
      name: 'why',
      type: 'group',
      admin: hiddenLegacy,
      fields: [
        { name: 'heading', type: 'text' },
        {
          name: 'paragraphs',
          type: 'array',
          fields: [textareaItem()],
        },
        { name: 'media', type: 'upload', relationTo: 'media' },
        { name: 'image', type: 'text' },
        { name: 'imageAlt', type: 'text' },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      admin: hiddenLegacy,
      fields: [
        { name: 'heading', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [textItem('item')],
        },
      ],
    },
    {
      name: 'listBlocks',
      type: 'array',
      admin: hiddenLegacy,
      fields: [
        { name: 'heading', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [textItem('item')],
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
        titledSteps,
      ],
    },
    {
      name: 'processAside',
      type: 'group',
      admin: hiddenLegacy,
      fields: [
        { name: 'heading', type: 'text' },
        {
          name: 'paragraphs',
          type: 'array',
          fields: [textareaItem()],
        },
        titledSteps,
      ],
    },
    {
      name: 'scheduleCta',
      type: 'group',
      admin: hiddenLegacy,
      fields: [
        { name: 'heading', type: 'text' },
        {
          name: 'paragraphs',
          type: 'array',
          fields: [textareaItem()],
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
