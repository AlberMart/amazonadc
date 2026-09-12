import type { GlobalConfig } from 'payload'

import { revalidateTag } from 'next/cache'

import { themeFields } from '@/fields/theme'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Site-wide brand + SEO defaults. Per-page SEO tabs override these. Office NAP/ratings live under Offices.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
              defaultValue: 'Amazon Air Duct Cleaning',
            },
            {
              name: 'phone',
              type: 'text',
              required: true,
              defaultValue: '(800) 606-3334',
              admin: { description: 'Display phone (toll-free)' },
            },
            {
              name: 'phoneHref',
              type: 'text',
              required: true,
              defaultValue: '+18006063334',
              admin: { description: 'E.164 for tel: and schema' },
            },
            {
              name: 'email',
              type: 'email',
              required: true,
              defaultValue: 'support@amazonadc.com',
            },
            {
              name: 'organizationDescription',
              type: 'textarea',
              defaultValue:
                'Professional air duct, dryer vent, and HVAC cleaning in Virginia, Maryland, and Washington DC.',
            },
            {
              name: 'priceRange',
              type: 'text',
              defaultValue: '$$-$$$',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Uploaded logo (preferred). Edit crop/focal point in Media.' },
            },
            {
              name: 'logoPath',
              type: 'text',
              defaultValue: '/img/logo.png',
              admin: { description: 'Or public path, e.g. /img/logo.png' },
            },
            {
              name: 'defaultOgImageUpload',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Fallback Open Graph image upload' },
            },
            {
              name: 'defaultOgImage',
              type: 'text',
              defaultValue: '/img/Amazon.webp',
              admin: { description: 'Or public path used when no upload is set' },
            },
          ],
        },
        {
          label: 'Appearance',
          fields: [themeFields],
        },
        {
          label: 'SEO defaults',
          fields: [
            {
              name: 'defaultMetaTitle',
              type: 'text',
              defaultValue: 'Air Duct Cleaning in Virginia, Maryland & Washington DC',
              admin: {
                description:
                  'Used when a page has no meta.title. Per-page SEO tab always wins when set.',
              },
            },
            {
              name: 'defaultMetaDescription',
              type: 'textarea',
              defaultValue:
                'Top-rated air duct cleaning in VA, MD & DC. Improve indoor air quality, remove dust and allergens, and clean dryer vents. Flat rates and a 100% satisfaction guarantee.',
            },
            {
              name: 'titleSuffix',
              type: 'text',
              defaultValue: 'Amazon Air Duct Cleaning',
              admin: { description: 'Appended to titles that do not already include the brand' },
            },
            {
              name: 'priceValidUntil',
              type: 'text',
              defaultValue: '2026-12-31',
              admin: { description: 'Offer.priceValidUntil for service schema (YYYY-MM-DD)' },
            },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              fields: [
                { name: 'platform', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
              ],
              admin: { description: 'Also used as Organization sameAs' },
            },
          ],
        },
        {
          label: 'Trust badges',
          fields: [
            {
              name: 'trustBadges',
              type: 'array',
              labels: { singular: 'Badge', plural: 'Badges' },
              admin: {
                description:
                  'Strip under the footer on every page. Leave empty to hide (or seed defaults apply until you save).',
              },
              fields: [
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
              ],
            },
          ],
        },
        {
          label: 'Service area',
          fields: [
            {
              name: 'serviceAreaMapEmbedUrl',
              type: 'text',
              admin: { description: 'Google Maps embed URL for the Service Area section' },
            },
            {
              name: 'serviceAreaMapTitle',
              type: 'text',
              defaultValue: 'Service area map',
            },
            {
              name: 'serviceAreaRegions',
              type: 'array',
              labels: { singular: 'Region', plural: 'Regions' },
              admin: {
                description:
                  'Region rows shown in Service Area (any geography — not hardcoded to VA/MD/DC).',
              },
              fields: [
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
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        if (!context.disableRevalidate) {
          revalidateTag('global_site-settings', 'max')
        }
        return doc
      },
    ],
  },
}
