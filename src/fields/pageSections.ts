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

export const trustBadgeItemFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    admin: { description: 'Upload (preferred)' },
  },
  {
    name: 'src',
    type: 'text',
    admin: { description: 'Or public path, e.g. /img/reviews/bbb.webp' },
  },
  { name: 'alt', type: 'text' },
  { name: 'width', type: 'number' },
  { name: 'height', type: 'number' },
]

export const serviceAreaRegionFields: Field[] = [
  { name: 'name', type: 'text', required: true },
  {
    name: 'cities',
    type: 'array',
    fields: [{ name: 'name', type: 'text', required: true }],
  },
  {
    name: 'href',
    type: 'text',
    admin: { description: 'Optional link, e.g. /locations/burke' },
  },
  {
    name: 'linkLabel',
    type: 'text',
    admin: { description: 'Label for href; if empty and no href, shows emptyLinkLabel' },
  },
  {
    name: 'emptyLinkLabel',
    type: 'text',
    admin: { description: 'Shown when href is empty (e.g. All neighborhoods)' },
  },
]

const when =
  (...types: string[]) =>
  (_: unknown, siblingData: { type?: string }) =>
    types.includes(siblingData?.type || '')

const notInclude = (_: unknown, siblingData: { type?: string }) => siblingData?.type !== 'include'

const TYPE_OPTIONS = [
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
  { label: 'Trust badges', value: 'trustBadges' },
  { label: 'Gallery', value: 'gallery' },
  { label: 'List columns', value: 'listColumns' },
  { label: 'Include partial', value: 'include' },
] as const

export type PageSectionsFieldOptions = {
  name?: string
  allowInclude?: boolean
  description?: string
}

/**
 * Portable page sections — reorder/add/remove in admin.
 * Types are layout roles (hero, prose, featureSplit…), not business nouns.
 */
export function pageSectionsFields(options: PageSectionsFieldOptions = {}): Field {
  const name = options.name || 'sections'
  const allowInclude = options.allowInclude !== false
  const typeOptions = TYPE_OPTIONS.filter((option) => allowInclude || option.value !== 'include')

  return {
    name,
    type: 'array',
    labels: { singular: 'Section', plural: 'Sections' },
    admin: {
      description:
        options.description ||
        'Ordered sections. Unique copy lives here. Reuse a Partial via Include (like a Blade include).',
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
        options: [...typeOptions],
      },
      {
        name: 'anchorId',
        type: 'text',
        admin: {
          description: 'Optional HTML id for in-page links (about, contact, …)',
          condition: notInclude,
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
        admin: { condition: notInclude },
      },
      {
        ...appearanceFields,
        admin: {
          ...appearanceFields.admin,
          condition: notInclude,
        },
      },
      {
        name: 'partial',
        type: 'relationship',
        relationTo: 'partials',
        admin: {
          condition: when('include'),
          description: 'Reusable Partial to insert here (same idea as a Blade @include).',
        },
      },
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
            'gallery',
            'listColumns',
            'trustBadges',
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
          condition: when(
            'offers',
            'pricing',
            'cardGrid',
            'steps',
            'blogTeaser',
            'faq',
            'reviews',
            'serviceArea',
            'contact',
            'prose',
            'featureSplit',
            'gallery',
            'listColumns',
          ),
        },
      },
      {
        ...textRows,
        admin: { condition: when('prose', 'featureSplit', 'pricing', 'steps') },
      },
      {
        ...highlightRows,
        admin: { condition: when('pricing', 'featureSplit', 'prose') },
      },
      {
        ...titledItems,
        admin: { condition: when('cardGrid') },
      },
      {
        name: 'gridCols',
        type: 'select',
        defaultValue: '4',
        options: [
          { label: '2 columns', value: '2' },
          { label: '3 columns', value: '3' },
          { label: '4 columns', value: '4' },
        ],
        admin: { condition: when('cardGrid') },
      },
      {
        name: 'steps',
        type: 'array',
        admin: { condition: when('steps') },
        fields: [
          { name: 'title', type: 'text' },
          { name: 'text', type: 'textarea', required: true },
        ],
      },
      {
        name: 'stepsLayout',
        type: 'select',
        defaultValue: 'list',
        options: [
          { label: 'Numbered list', value: 'list' },
          { label: 'Cards', value: 'cards' },
        ],
        admin: { condition: when('steps') },
      },
      {
        name: 'faqItems',
        type: 'array',
        admin: {
          condition: when('faq'),
          description: 'Also feeds FAQPage JSON-LD when present on the page.',
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
        admin: { condition: when('hero', 'prose', 'cardGrid', 'faq', 'contact', 'serviceArea', 'offers') },
      },
      {
        name: 'phoneHref',
        type: 'text',
        admin: { condition: when('hero', 'prose', 'cardGrid', 'faq', 'contact', 'serviceArea', 'offers') },
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
      {
        name: 'mapEmbedUrl',
        type: 'text',
        admin: {
          condition: when('serviceArea'),
          description: 'Google Maps embed URL. Empty = Site Settings fallback / default Partial.',
        },
      },
      {
        name: 'mapTitle',
        type: 'text',
        admin: { condition: when('serviceArea') },
      },
      {
        name: 'regions',
        type: 'array',
        labels: { singular: 'Region', plural: 'Regions' },
        admin: {
          condition: when('serviceArea'),
          description: 'Empty = fallback to the default Service area Partial, then Site Settings.',
        },
        fields: serviceAreaRegionFields,
      },
      {
        name: 'badges',
        type: 'array',
        labels: { singular: 'Badge', plural: 'Badges' },
        admin: {
          condition: when('trustBadges'),
          description: 'Empty = Site Settings → Trust badges (logo library).',
        },
        fields: trustBadgeItemFields,
      },
      {
        name: 'photos',
        type: 'array',
        admin: { condition: when('gallery') },
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
        name: 'listColumns',
        type: 'array',
        admin: { condition: when('listColumns') },
        fields: [
          { name: 'heading', type: 'text', required: true },
          {
            name: 'items',
            type: 'array',
            fields: [{ name: 'item', type: 'text', required: true }],
          },
        ],
      },
    ],
  }
}

export const homeSectionsFields: Field = pageSectionsFields({
  name: 'homeSections',
  allowInclude: true,
  description:
    'Ordered homepage sections. Add, remove, or reorder freely. Use portable types (featureSplit for any image+copy block — not “air duct” / “dryer” field names). Include a Partial to reuse Service area, trust badges, or other shared chunks.',
})
