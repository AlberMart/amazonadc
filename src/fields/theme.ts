import type { Field } from 'payload'

import { colorField } from './color'
import { THEME_FONTS } from '@/utilities/theme'

const fontOptions = THEME_FONTS.map((font) => ({ label: font.label, value: font.value }))

const radiusOptions = [
  { label: 'None (square)', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'XL', value: 'xl' },
  { label: 'Pill / full', value: 'full' },
]

export const themeFields: Field = {
  name: 'theme',
  type: 'group',
  admin: {
    description:
      'Site-wide look. Blocks inherit these tokens; each section can still override background, text, cards, lists, and buttons.',
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Brand colors',
      admin: { initCollapsed: false },
      fields: [
        colorField('primary', 'Primary', {
          defaultValue: '#0b1c2c',
          description: 'Main brand color (navy by default). Used for dark surfaces and secondary buttons if those are empty.',
        }),
        colorField('primaryForeground', 'On primary', { defaultValue: '#ffffff' }),
        colorField('secondary', 'Secondary', { defaultValue: '#12324a' }),
        colorField('secondaryForeground', 'On secondary', { defaultValue: '#ffffff' }),
        colorField('tertiary', 'Tertiary', {
          defaultValue: '#0369a1',
          description: 'Third brand color. Also used for links if link color is empty.',
        }),
        colorField('tertiaryForeground', 'On tertiary', { defaultValue: '#ffffff' }),
        colorField('accent', 'Accent', {
          defaultValue: '#fbbf24',
          description: 'Highlights, list markers, and primary buttons if button colors are empty.',
        }),
        colorField('accentHover', 'Accent hover', { defaultValue: '#fcd34d' }),
        colorField('accentForeground', 'On accent', { defaultValue: '#0b1c2c' }),
      ],
    },
    {
      type: 'collapsible',
      label: 'Surfaces & text',
      admin: { initCollapsed: true },
      fields: [
        colorField('background', 'Page background', { defaultValue: '#ffffff' }),
        colorField('muted', 'Muted background', { defaultValue: '#f4f7fa' }),
        colorField('dark', 'Dark / hero background', { defaultValue: '#0b1c2c' }),
        colorField('footer', 'Footer background', { defaultValue: '#07131f' }),
        colorField('card', 'Card background', { defaultValue: '#ffffff' }),
        colorField('cardMuted', 'Card muted background', { defaultValue: '#f8fafc' }),
        colorField('heading', 'Heading text', { defaultValue: '#0b1c2c' }),
        colorField('body', 'Body text', { defaultValue: '#516579' }),
        colorField('mutedText', 'Muted text', { defaultValue: '#7a8b9c' }),
        colorField('onDark', 'Text on dark', { defaultValue: '#ffffff' }),
        colorField('onDarkMuted', 'Muted text on dark', { defaultValue: 'rgba(240, 249, 255, 0.85)' }),
        colorField('link', 'Link', { defaultValue: '#0369a1' }),
        colorField('linkOnDark', 'Link on dark', { defaultValue: '#bae6fd' }),
        colorField('border', 'Border', { defaultValue: '#d5dee8' }),
        colorField('badges', 'Trust badges bar', { defaultValue: '#232f3e' }),
      ],
    },
    {
      type: 'collapsible',
      label: 'Buttons',
      admin: { initCollapsed: false },
      fields: [
        {
          type: 'row',
          fields: [
            colorField('buttonPrimaryBg', 'Primary button background', {
              description: 'Empty = accent color',
            }),
            colorField('buttonPrimaryText', 'Primary button text'),
            colorField('buttonPrimaryHover', 'Primary button hover'),
          ],
        },
        {
          type: 'row',
          fields: [
            colorField('buttonSecondaryBg', 'Secondary button background', {
              description: 'Empty = primary color',
            }),
            colorField('buttonSecondaryText', 'Secondary button text'),
            colorField('buttonSecondaryHover', 'Secondary button hover'),
          ],
        },
        {
          type: 'row',
          fields: [
            colorField('buttonTertiaryBg', 'Tertiary button background', {
              description: 'Empty = transparent (outline)',
            }),
            colorField('buttonTertiaryText', 'Tertiary button text'),
            colorField('buttonTertiaryBorder', 'Tertiary button border'),
            colorField('buttonTertiaryHover', 'Tertiary button hover'),
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Fonts',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'headingFont',
          type: 'select',
          label: 'Heading font',
          defaultValue: 'Fraunces',
          options: fontOptions,
        },
        {
          name: 'bodyFont',
          type: 'select',
          label: 'Body font',
          defaultValue: 'Outfit',
          options: fontOptions,
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Corners & containers',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'buttonRadius',
          type: 'select',
          label: 'Button corners',
          defaultValue: 'md',
          options: radiusOptions,
        },
        {
          name: 'cardRadius',
          type: 'select',
          label: 'Card / container corners',
          defaultValue: 'none',
          options: radiusOptions,
        },
        {
          name: 'imageRadius',
          type: 'select',
          label: 'Image corners',
          defaultValue: 'none',
          options: radiusOptions,
        },
        {
          name: 'containerRadius',
          type: 'select',
          label: 'Nested container corners',
          defaultValue: 'none',
          options: radiusOptions,
        },
        {
          name: 'cardStyle',
          type: 'select',
          label: 'Default card style',
          defaultValue: 'bordered',
          options: [
            { label: 'Bordered', value: 'bordered' },
            { label: 'Filled', value: 'filled' },
            { label: 'Elevated (shadow)', value: 'elevated' },
            { label: 'Plain (no border)', value: 'plain' },
          ],
        },
        {
          name: 'listStyle',
          type: 'select',
          label: 'Default list style',
          defaultValue: 'check',
          options: [
            { label: 'Accent dots', value: 'check' },
            { label: 'Bullets', value: 'disc' },
            { label: 'Numbers', value: 'numbered' },
            { label: 'None', value: 'none' },
          ],
        },
      ],
    },
  ],
}
