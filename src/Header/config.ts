import type { GlobalConfig } from 'payload'

import { brandMarkFields } from '@/fields/brandMark'
import { headerBottomEdgeField } from '@/fields/chromeEdges'
import { cmsImageFields } from '@/fields/cmsImage'
import { colorField } from '@/fields/color'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

const whenCustomIcon = (_: unknown, siblingData: Record<string, unknown>) => siblingData?.icon === 'custom'

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
      type: 'collapsible',
      label: 'Edges',
      admin: { initCollapsed: true },
      fields: [headerBottomEdgeField],
    },
    {
      name: 'showPhoneCta',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show desktop phone button',
      admin: {
        description: 'Text button in the desktop nav. Uses Site Settings phone unless overridden below.',
      },
    },
    {
      name: 'phoneDisplay',
      type: 'text',
      admin: {
        description: 'Optional override of Site Settings display phone',
      },
    },
    {
      name: 'phoneHref',
      type: 'text',
      admin: {
        description: 'Optional override of Site Settings tel href (E.164)',
      },
    },
    {
      name: 'mobileCall',
      type: 'group',
      label: 'Mobile call button',
      admin: {
        description:
          'Phone control on small screens: icon, number, or both. Styles and number are all editable here.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show on mobile',
        },
        {
          name: 'display',
          type: 'select',
          defaultValue: 'icon',
          options: [
            { label: 'Icon only', value: 'icon' },
            { label: 'Number button', value: 'number' },
            { label: 'Icon + number', value: 'both' },
          ],
        },
        {
          name: 'placement',
          type: 'select',
          defaultValue: 'header',
          options: [
            { label: 'In header', value: 'header' },
            { label: 'Floating corner', value: 'floating' },
            { label: 'Header + floating', value: 'both' },
          ],
        },
        {
          name: 'phoneDisplay',
          type: 'text',
          admin: { description: 'Optional. Empty = header / Site Settings number' },
        },
        {
          name: 'phoneHref',
          type: 'text',
          admin: { description: 'Optional tel href override' },
        },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'phone',
          options: [
            { label: 'Phone', value: 'phone' },
            { label: 'Phone outgoing', value: 'phone-outgoing' },
            { label: 'Custom image', value: 'custom' },
          ],
        },
        ...cmsImageFields({
          uploadName: 'iconUpload',
          pathName: 'iconPath',
          altName: 'iconAlt',
          condition: whenCustomIcon,
          pathDescription: 'Or public path to an icon image',
        }),
        colorField('background', 'Background', { defaultValue: '#fbbf24' }),
        colorField('iconColor', 'Icon / text color', { defaultValue: '#0b1c2c' }),
        {
          name: 'size',
          type: 'select',
          defaultValue: 'md',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
        {
          name: 'shape',
          type: 'select',
          defaultValue: 'circle',
          options: [
            { label: 'Circle', value: 'circle' },
            { label: 'Rounded', value: 'rounded' },
            { label: 'Square', value: 'square' },
          ],
        },
        {
          name: 'shadow',
          type: 'checkbox',
          defaultValue: true,
          label: 'Drop shadow',
        },
        {
          name: 'ariaLabel',
          type: 'text',
          admin: { description: 'Accessible label. Empty = “Call {number}”' },
        },
      ],
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
