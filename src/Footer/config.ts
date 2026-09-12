import type { GlobalConfig } from 'payload'

import { brandMarkFields } from '@/fields/brandMark'
import { footerTopEdgeField } from '@/fields/chromeEdges'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Portable footer: brand + optional columns. Add/remove columns as needed — nothing assumes offices or cities exist.',
  },
  fields: [
    brandMarkFields(),
    {
      type: 'collapsible',
      label: 'Edges',
      admin: { initCollapsed: true },
      fields: [footerTopEdgeField],
    },
    {
      name: 'tagline',
      type: 'textarea',
      admin: {
        description: 'Under the brand. Empty → Site Settings organization description.',
      },
    },
    {
      name: 'showContactInBrand',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show phone & email under brand',
      admin: { description: 'From Site Settings' },
    },
    {
      name: 'columns',
      type: 'array',
      labels: { singular: 'Column', plural: 'Columns' },
      admin: {
        initCollapsed: true,
        description: 'Footer columns. Type “Links” for any list; “Social” / “Contact” pull from Site Settings.',
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'links',
          options: [
            { label: 'Links list', value: 'links' },
            { label: 'Contact (Site Settings)', value: 'contact' },
            { label: 'Social (Site Settings)', value: 'social' },
          ],
        },
        {
          name: 'links',
          type: 'array',
          labels: { singular: 'Link', plural: 'Links' },
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'links',
            initCollapsed: true,
          },
          fields: [
            link({ appearances: false }),
            {
              name: 'detail',
              type: 'textarea',
              admin: {
                description: 'Optional secondary lines under the link (address, hours, note).',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      admin: {
        description: 'Optional. Default: “© {year} {siteName}. All rights reserved.”',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
