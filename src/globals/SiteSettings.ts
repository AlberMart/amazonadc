import type { GlobalConfig } from 'payload'

import { revalidateTag } from 'next/cache'

import { themeFields } from '@/fields/theme'
import { scheduleRevalidate } from '@/utilities/scheduleRevalidate'

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
              defaultValue: '2027-12-31',
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
          label: 'Contact form',
          fields: [
            {
              name: 'contactForm',
              type: 'relationship',
              relationTo: 'forms',
              admin: {
                description:
                  'Form shown on the public site. Edit fields, labels, confirmation, and who receives emails under Collections → Forms.',
              },
            },
            {
              name: 'contactHeading',
              type: 'text',
              defaultValue: 'Contact Us',
            },
            {
              name: 'contactIntro',
              type: 'textarea',
              admin: {
                description:
                  'Optional. If empty, the form shows phone and email from Brand.',
              },
            },
            {
              name: 'contactSubmitLabel',
              type: 'text',
              defaultValue: 'Send',
              admin: {
                description: 'Used only if the Form has no submit button label.',
              },
            },
            {
              name: 'contactSuccessMessage',
              type: 'textarea',
              defaultValue: 'Your message has been sent. Thank you!',
              admin: {
                description: 'Used only if the Form confirmation message is empty.',
              },
            },
          ],
        },
        {
          label: 'Tracking',
          fields: [
            {
              name: 'analytics',
              type: 'group',
              admin: {
                description:
                  'Google Analytics / Tag Manager. Use a GA4 Measurement ID (G-XXXX), a GTM container (GTM-XXXX), or both. IDs are sanitized before scripts load.',
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Enable tracking scripts',
                },
                {
                  name: 'gaMeasurementId',
                  type: 'text',
                  admin: { description: 'GA4 ID, e.g. G-18507TM6WB' },
                },
                {
                  name: 'gtmId',
                  type: 'text',
                  admin: { description: 'Optional Google Tag Manager container, e.g. GTM-XXXX' },
                },
                {
                  name: 'googleAdsId',
                  type: 'text',
                  admin: { description: 'Optional Google Ads ID, e.g. AW-XXXX' },
                },
              ],
            },
          ],
        },
        {
          label: 'Chat',
          fields: [
            {
              name: 'chat',
              type: 'group',
              admin: {
                description:
                  'Live chat widget. Pick a provider and paste its public widget ID. Leave provider on None to hide chat.',
              },
              fields: [
                {
                  name: 'provider',
                  type: 'select',
                  defaultValue: 'none',
                  options: [
                    { label: 'None', value: 'none' },
                    { label: 'Chatra', value: 'chatra' },
                    { label: 'Tawk.to', value: 'tawk' },
                    { label: 'Crisp', value: 'crisp' },
                    { label: 'Tidio', value: 'tidio' },
                  ],
                },
                {
                  name: 'widgetId',
                  type: 'text',
                  admin: {
                    description:
                      'Chatra / Crisp / Tidio public ID. For Tawk use propertyId/widgetId, e.g. abcdef123/default',
                    condition: (_, sibling) => sibling?.provider && sibling.provider !== 'none',
                  },
                },
                {
                  name: 'buttonBg',
                  type: 'text',
                  admin: {
                    description: 'Chatra button background (hex)',
                    condition: (_, sibling) => sibling?.provider === 'chatra',
                  },
                },
                {
                  name: 'buttonText',
                  type: 'text',
                  admin: {
                    description: 'Chatra button text (hex)',
                    condition: (_, sibling) => sibling?.provider === 'chatra',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Accessibility',
          fields: [
            {
              name: 'accessibility',
              type: 'group',
              admin: {
                description:
                  'Free built-in widget (text size, contrast, underline links, reduce motion) plus optional UserWay / accessiBe. Skip-to-content is always on.',
              },
              fields: [
                {
                  name: 'widget',
                  type: 'select',
                  defaultValue: 'builtin',
                  options: [
                    { label: 'None', value: 'none' },
                    { label: 'Built-in (free)', value: 'builtin' },
                    { label: 'UserWay', value: 'userway' },
                    { label: 'accessiBe', value: 'accessibe' },
                  ],
                },
                {
                  name: 'widgetId',
                  type: 'text',
                  admin: {
                    description: 'UserWay account or accessiBe license id',
                    condition: (_, sibling) =>
                      sibling?.widget === 'userway' || sibling?.widget === 'accessibe',
                  },
                },
              ],
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
                  'Logo library for Trust badges sections. Placement is per-page (add a Trust badges section). Leave empty to hide.',
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
              admin: { description: 'Fallback Google Maps embed URL if a Service area section/Partial has none.' },
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
                  'Fallback region rows if a Service area section/Partial has none. Prefer editing a Partial (Content → Partials) and including it on pages.',
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
          scheduleRevalidate(() => {
            revalidateTag('global_site-settings', 'max')
          })
        }
        return doc
      },
    ],
  },
}
