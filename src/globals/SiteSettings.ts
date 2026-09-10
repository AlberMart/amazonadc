import type { GlobalConfig } from 'payload'

import { revalidateTag } from 'next/cache'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
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
    },
    {
      name: 'phoneHref',
      type: 'text',
      required: true,
      defaultValue: '+18006063334',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      defaultValue: 'support@amazonadc.com',
    },
    {
      name: 'defaultMetaDescription',
      type: 'textarea',
      defaultValue:
        'Professional air duct and dryer vent cleaning in Virginia, Maryland, and Washington DC. Flat-rate pricing and 100% satisfaction guarantee.',
    },
    {
      name: 'addresses',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'street', type: 'text', required: true },
        { name: 'city', type: 'text', required: true },
        { name: 'state', type: 'text', required: true },
        { name: 'postalCode', type: 'text', required: true },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
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
