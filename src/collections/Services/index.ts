import type { CollectionConfig, Field } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from 'payload'
import { seoMetaTabFields } from '../../fields/seoMeta'

const textItem = (name = 'text'): Field => ({
  name,
  type: 'text',
  required: true,
})

const textareaItem = (name = 'text'): Field => ({
  name,
  type: 'textarea',
  required: true,
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
      required: true,
      admin: {
        description: 'Current offer price in USD',
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
      required: true,
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
    {
      name: 'includesIntro',
      type: 'textarea',
    },
    {
      name: 'includesMedia',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'includesImage',
      type: 'text',
      required: true,
      admin: { description: 'Or public path if no upload' },
    },
    {
      name: 'includesImageAlt',
      type: 'text',
      required: true,
    },
    {
      name: 'includes',
      type: 'array',
      labels: { singular: 'Item', plural: 'Included items' },
      fields: [textItem('item')],
    },
    {
      name: 'beforeAfter',
      type: 'array',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
        },
        { name: 'src', type: 'text' },
        { name: 'alt', type: 'text', required: true },
      ],
    },
    {
      name: 'why',
      type: 'group',
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
      fields: [
        { name: 'heading', type: 'text', required: true },
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
      fields: [
        { name: 'heading', type: 'text', required: true },
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
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'intro', type: 'textarea' },
        titledSteps,
      ],
    },
    {
      name: 'processAside',
      type: 'group',
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
    },
    {
      name: 'faq',
      type: 'array',
      admin: {
        description: 'Shown on the page and emitted as FAQPage JSON-LD for this URL.',
      },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
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
