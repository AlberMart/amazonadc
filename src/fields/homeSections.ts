import type { Field } from 'payload'

import { appearanceFields } from './appearance'
import { cmsImageFields } from './cmsImage'

const textRows: Field = {
  name: 'paragraphs',
  type: 'array',
  fields: [{ name: 'text', type: 'textarea', required: true }],
}

const highlightRows: Field = {
  name: 'highlights',
  type: 'array',
  fields: [{ name: 'item', type: 'text', required: true }],
}

const titledItems: Field = {
  name: 'items',
  type: 'array',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'text', type: 'textarea', required: true },
  ],
}

const when =
  (...types: string[]) =>
  (_: unknown, siblingData: { type?: string }) =>
    types.includes(siblingData?.type || '')

/**
 * Portable homepage sections — reorder/add/remove in admin.
 * Types are layout roles (hero, prose, featureSplit…), not business nouns.
 */
export const homeSectionsFields: Field = {
  name: 'homeSections',
  type: 'array',
  labels: { singular: 'Section', plural: 'Sections' },
  admin: {
    description:
      'Ordered homepage sections. Add, remove, or reorder freely. Use portable types (featureSplit for any image+copy block — not “air duct” / “dryer” field names).',
    initCollapsed: true,
    components: {
      RowLabel: '@/fields/HomeSectionRowLabel#RowLabel',
    },
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Hero', value: 'hero' },
        { label: 'Prose (heading + paragraphs)', value: 'prose' },
        { label: 'Offers (service cards from Services)', value: 'offers' },
        { label: 'Pricing', value: 'pricing' },
        { label: 'Feature split (image + copy + CTA)', value: 'featureSplit' },
        { label: 'Card grid', value: 'cardGrid' },
        { label: 'Numbered steps', value: 'steps' },
        { label: 'Service area map', value: 'serviceArea' },
        { label: 'Blog teaser', value: 'blogTeaser' },
        { label: 'FAQ', value: 'faq' },
        { label: 'Reviews (from Offices)', value: 'reviews' },
        { label: 'Contact form', value: 'contact' },
      ],
    },
    {
      name: 'anchorId',
      type: 'text',
      admin: {
        description: 'Optional HTML id for in-page links (about, contact, …)',
      },
    },
    {
      name: 'tone',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Muted', value: 'muted' },
        { label: 'Dark (hero-style)', value: 'dark' },
      ],
      admin: { condition: when('prose', 'pricing', 'featureSplit', 'cardGrid', 'steps', 'faq', 'blogTeaser', 'offers', 'reviews', 'hero', 'contact', 'serviceArea') },
    },
    appearanceFields,
    {
      name: 'eyebrow',
      type: 'text',
      admin: { condition: when('hero') },
    },
    {
      name: 'heading',
      type: 'textarea',
      admin: {
        condition: when(
          'hero',
          'prose',
          'offers',
          'pricing',
          'featureSplit',
          'cardGrid',
          'steps',
          'blogTeaser',
          'faq',
          'reviews',
          'serviceArea',
          'contact',
        ),
      },
    },
    {
      name: 'subheadline',
      type: 'textarea',
      admin: { condition: when('hero') },
    },
    {
      name: 'intro',
      type: 'textarea',
      admin: {
        condition: when('offers', 'pricing', 'cardGrid', 'steps', 'blogTeaser', 'faq', 'reviews', 'serviceArea', 'contact', 'prose'),
      },
    },
    {
      ...textRows,
      admin: { condition: when('prose', 'featureSplit', 'pricing') },
    },
    {
      ...highlightRows,
      admin: { condition: when('pricing') },
    },
    {
      ...titledItems,
      admin: { condition: when('cardGrid') },
    },
    {
      name: 'steps',
      type: 'array',
      admin: { condition: when('steps') },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
      ],
    },
    {
      name: 'faqItems',
      type: 'array',
      admin: {
        condition: when('faq'),
        description: 'Also feeds FAQPage JSON-LD when present on the home page.',
      },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    ...cmsImageFields({
      condition: when('hero', 'featureSplit', 'steps'),
    }),
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Image right', value: 'right' },
        { label: 'Image left', value: 'left' },
      ],
      admin: { condition: when('featureSplit') },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      admin: { condition: when('hero', 'featureSplit', 'prose') },
    },
    {
      name: 'ctaHref',
      type: 'text',
      admin: { condition: when('hero', 'featureSplit', 'prose') },
    },
    {
      name: 'phoneDisplay',
      type: 'text',
      admin: { condition: when('hero', 'prose', 'cardGrid', 'faq', 'contact') },
    },
    {
      name: 'phoneHref',
      type: 'text',
      admin: { condition: when('hero', 'prose', 'cardGrid', 'faq', 'contact') },
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      admin: {
        condition: when('contact'),
        description:
          'Optional. Empty = Site Settings → Contact form. Emails for this form are edited on the Form itself.',
      },
    },
    {
      name: 'closingText',
      type: 'textarea',
      admin: {
        condition: when('prose'),
        description: 'Optional line before phone link',
      },
    },
    {
      name: 'viewAllLabel',
      type: 'text',
      admin: { condition: when('blogTeaser') },
    },
    {
      name: 'viewAllHref',
      type: 'text',
      defaultValue: '/blog',
      admin: { condition: when('blogTeaser') },
    },
    {
      name: 'cardLinkLabel',
      type: 'text',
      defaultValue: 'Read article',
      admin: { condition: when('blogTeaser') },
    },
    {
      name: 'phoneSuffix',
      type: 'text',
      admin: {
        condition: when('faq'),
        description: 'Text after the phone link, e.g. “or unlock special pricing online.”',
      },
    },
  ],
}
