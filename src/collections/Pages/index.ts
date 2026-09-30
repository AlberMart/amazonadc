import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { homeContentFields } from '@/fields/homeContent'
import { homeSectionsFields } from '@/fields/homeSections'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

const isTemplatePage = (data: { pageKind?: string | null } | undefined) =>
  data?.pageKind !== 'legal' && data?.pageKind !== 'home'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'pageKind', 'updatedAt'],
    description:
      'Use pageKind Home for / and Legal for /privacy-policy etc. Avoid “Default” — that is the old Payload template layout (Hero + Content blocks) and often looks empty. Contact lives in Homepage / Location sections, not a separate Pages doc. Current Offers cards come from Services (card order + empty-price text).',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'pageKind',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Home', value: 'home' },
        { label: 'Legal', value: 'legal' },
        {
          label: 'Legacy template (Hero + blocks — usually empty)',
          value: 'default',
        },
      ],
      admin: {
        position: 'sidebar',
        description:
          'Home = homepage sections. Legal = policy body. Legacy template is leftover Payload demo layout — prefer deleting unused docs over creating new ones.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
          admin: {
            condition: (data) => isTemplatePage(data),
          },
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock],
              required: false,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
          admin: {
            condition: (data) => isTemplatePage(data),
          },
        },
        {
          fields: [
            homeSectionsFields,
            {
              ...homeContentFields,
              admin: {
                ...(homeContentFields.admin || {}),
                condition: () => false,
                description: 'Deprecated flat homepage fields — use Sections above.',
              },
            },
          ],
          label: 'Homepage',
          admin: {
            condition: (data) => data?.pageKind === 'home',
          },
        },
        {
          fields: [
            {
              name: 'legalContent',
              type: 'group',
              fields: [
                { name: 'intro', type: 'textarea' },
                { name: 'detailsHeading', type: 'text' },
                {
                  name: 'sections',
                  type: 'array',
                  fields: [
                    { name: 'heading', type: 'text', required: true },
                    { name: 'intro', type: 'textarea' },
                    {
                      name: 'items',
                      type: 'array',
                      fields: [{ name: 'item', type: 'text', required: true }],
                    },
                    {
                      name: 'paragraphs',
                      type: 'array',
                      fields: [{ name: 'text', type: 'textarea', required: true }],
                    },
                  ],
                },
                { name: 'closing', type: 'textarea' },
              ],
            },
          ],
          label: 'Legal Content',
          admin: {
            condition: (data) => data?.pageKind === 'legal',
          },
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
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
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
