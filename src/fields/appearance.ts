import type { Field } from 'payload'

import { colorField } from './color'
import { COLOR_TOKEN_OPTIONS } from '@/utilities/theme'

const token = (name: string, label: string, extra?: { description?: string }): Field => ({
  name,
  type: 'select',
  label,
  defaultValue: 'inherit',
  options: [...COLOR_TOKEN_OPTIONS],
  admin: extra,
})

const whenCustom =
  (field: string) =>
  (_: unknown, siblingData: Record<string, unknown>) =>
    siblingData?.[field] === 'custom'

export const appearanceFields: Field = {
  type: 'collapsible',
  label: 'Appearance (optional override)',
  admin: {
    initCollapsed: true,
    description:
      'Leave as Inherit to use Site Settings → Appearance. Override only what this block needs.',
  },
  fields: [
    {
      name: 'appearance',
      type: 'group',
      label: false,
      fields: [
        token('background', 'Background'),
        {
          ...colorField('backgroundCustom', 'Custom background'),
          admin: {
            ...colorField('backgroundCustom', 'Custom background').admin,
            condition: whenCustom('background'),
          },
        },
        token('headingColor', 'Heading color'),
        {
          ...colorField('headingCustom', 'Custom heading color'),
          admin: {
            ...colorField('headingCustom', 'Custom heading color').admin,
            condition: whenCustom('headingColor'),
          },
        },
        token('bodyColor', 'Body text color'),
        {
          ...colorField('bodyCustom', 'Custom body color'),
          admin: {
            ...colorField('bodyCustom', 'Custom body color').admin,
            condition: whenCustom('bodyColor'),
          },
        },
        {
          name: 'cardStyle',
          type: 'select',
          label: 'Card / container style',
          defaultValue: 'inherit',
          options: [
            { label: 'Inherit site default', value: 'inherit' },
            { label: 'Bordered', value: 'bordered' },
            { label: 'Filled', value: 'filled' },
            { label: 'Elevated (shadow)', value: 'elevated' },
            { label: 'Plain (no border)', value: 'plain' },
          ],
        },
        {
          name: 'radius',
          type: 'select',
          label: 'Corners',
          defaultValue: 'inherit',
          options: [
            { label: 'Inherit site default', value: 'inherit' },
            { label: 'None (square)', value: 'none' },
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
            { label: 'XL', value: 'xl' },
            { label: 'Pill / full', value: 'full' },
          ],
        },
        {
          name: 'listStyle',
          type: 'select',
          label: 'List style',
          defaultValue: 'inherit',
          options: [
            { label: 'Inherit site default', value: 'inherit' },
            { label: 'Accent dots', value: 'check' },
            { label: 'Bullets', value: 'disc' },
            { label: 'Numbers', value: 'numbered' },
            { label: 'None', value: 'none' },
          ],
        },
        {
          name: 'ctaVariant',
          type: 'select',
          label: 'Button style',
          defaultValue: 'inherit',
          options: [
            { label: 'Inherit (primary in hero, secondary elsewhere)', value: 'inherit' },
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Tertiary / outline', value: 'tertiary' },
          ],
        },
      ],
    },
  ],
}
