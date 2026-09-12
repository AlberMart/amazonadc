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
          'If checked, this URL is omitted from /sitemap.xml and served with robots noindex. New published pages, posts, services, and locations are added to the sitemap automatically — you do not add them by hand.',
      },
    },
    PreviewField({
      hasGenerateFn: true,
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
    }),
  ]
}
