import type { Field } from 'payload'

/** Portable brand mark: text, logo file/path, or both. */
export const brandMarkFields = (overrides?: { name?: string; label?: string }): Field => ({
  type: 'group',
  name: overrides?.name || 'brand',
  label: overrides?.label || 'Brand mark',
  admin: {
    description: 'Logo and/or text shown in the chrome. Empty text falls back to Site Settings → site name.',
  },
  fields: [
    {
      name: 'mode',
      type: 'select',
      defaultValue: 'text',
      required: true,
      options: [
        { label: 'Text only', value: 'text' },
        { label: 'Logo only', value: 'logo' },
        { label: 'Logo + text', value: 'both' },
      ],
    },
    {
      name: 'text',
      type: 'text',
      admin: {
        description: 'Optional override of Site Settings site name',
        condition: (_, siblingData) =>
          siblingData?.mode === 'text' || siblingData?.mode === 'both',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Uploaded logo (preferred)',
        condition: (_, siblingData) =>
          siblingData?.mode === 'logo' || siblingData?.mode === 'both',
      },
    },
    {
      name: 'logoPath',
      type: 'text',
      admin: {
        description: 'Or public path, e.g. /img/logo.png (used if no upload)',
        condition: (_, siblingData) =>
          siblingData?.mode === 'logo' || siblingData?.mode === 'both',
      },
    },
    {
      name: 'logoAlt',
      type: 'text',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.mode === 'logo' || siblingData?.mode === 'both',
      },
    },
  ],
})
