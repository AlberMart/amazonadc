import type { GlobalConfig } from 'payload'

import { brandMarkFields } from '@/fields/brandMark'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Portable site header: brand mark + nav links + optional phone CTA. Phone/email defaults come from Site Settings. Add any location/service links as normal nav items (no domain-specific toggles).',
  },
  fields: [
    brandMarkFields(),
    {
      name: 'showPhoneCta',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show phone button',
      admin: {
        description: 'Uses Site Settings phone display / href',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      labels: { singular: 'Nav item', plural: 'Nav items' },
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 20,
      admin: {
        initCollapsed: true,
        description:
          'All menu links live here (including city/office pages if this project has them). Use Custom URL for hashes like /#about.',
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
