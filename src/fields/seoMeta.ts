import type { Field } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

/** Shared SEO tab fields: page overrides Site Settings defaults */
export function seoMetaTabFields(): Field[] {
  return [
    OverviewField({
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
      imagePath: 'meta.image',
    }),
    MetaTitleField({
      hasGenerateFn: true,
    }),
    MetaImageField({
      relationTo: 'media',
    }),
    MetaDescriptionField({}),
    {
      name: 'noIndex',
      type: 'checkbox',
      label: 'No index',
      admin: {
        description:
          'If checked, robots noindex for this URL. Overrides Site Settings defaults when title/description/image are set above.',
      },
    },
    PreviewField({
      hasGenerateFn: true,
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
    }),
  ]
}
