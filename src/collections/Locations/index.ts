import type { CollectionConfig, Field } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

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

export const Locations: CollectionConfig = {
  slug: 'locations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'phone', 'updatedAt'],
    useAsTitle: 'title',
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
      name: 'heroImage',
      type: 'text',
      required: true,
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
    },
    {
      name: 'state',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'phoneDisplay',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      defaultValue: 'support@amazonadc.com',
    },
    {
      name: 'streetAddress',
      type: 'text',
      required: true,
    },
    {
      name: 'postalCode',
      type: 'text',
      required: true,
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
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
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
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    slugField(),
  ],
}
