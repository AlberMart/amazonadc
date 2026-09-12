import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { revalidatePath } from 'next/cache'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { scheduleRevalidate } from '@/utilities/scheduleRevalidate'

function revalidateOfficeCaches(slug?: string) {
  revalidatePath('/')
  if (slug) revalidatePath(`/locations/${slug}`)
}

const revalidateOfficePaths: CollectionAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const slug = typeof doc?.slug === 'string' ? doc.slug : undefined
    scheduleRevalidate(() => revalidateOfficeCaches(slug))
  }
  return doc
}

const revalidateOfficeDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const slug = typeof doc?.slug === 'string' ? doc.slug : undefined
    scheduleRevalidate(() => revalidateOfficeCaches(slug))
  }
  return doc
}

export const Offices: CollectionConfig = {
  slug: 'offices',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Content',
    defaultColumns: ['name', 'city', 'aggregateReviewCount', 'updatedAt'],
    useAsTitle: 'name',
    description:
      'Physical offices (NAP + Google rating). Source for schema branches, footer, “Our offices”, and reviews carousel.',
  },
  hooks: {
    afterChange: [revalidateOfficePaths],
    afterDelete: [revalidateOfficeDelete],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'NAP',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: { description: 'e.g. Amazon Air Duct Cleaning - Burke' },
            },
            { name: 'streetAddress', type: 'text', required: true },
            { name: 'city', type: 'text', required: true },
            { name: 'state', type: 'text', required: true },
            { name: 'postalCode', type: 'text', required: true },
            {
              name: 'phone',
              type: 'text',
              required: true,
              admin: { description: 'E.164, e.g. +15714600001' },
            },
            { name: 'phoneDisplay', type: 'text', required: true },
            {
              name: 'email',
              type: 'email',
              defaultValue: 'support@amazonadc.com',
            },
            {
              name: 'description',
              type: 'textarea',
              admin: { description: 'Short description for LocalBusiness / HVACBusiness schema' },
            },
            slugField(),
          ],
        },
        {
          label: 'Google / Schema',
          fields: [
            { name: 'latitude', type: 'number', required: true },
            { name: 'longitude', type: 'number', required: true },
            {
              name: 'geoRadiusMeters',
              type: 'number',
              defaultValue: 30000,
              admin: { description: 'GeoCircle radius for areaServed (meters)' },
            },
            {
              name: 'hasMapUrl',
              type: 'text',
              admin: { description: 'Google Maps / hasMap URL' },
            },
            {
              name: 'googleBusinessUrl',
              type: 'text',
              admin: { description: 'g.page URL for sameAs' },
            },
            {
              name: 'sameAs',
              type: 'array',
              labels: { singular: 'Link', plural: 'sameAs links' },
              fields: [{ name: 'url', type: 'text', required: true }],
              admin: {
                description: 'Extra profiles (Yelp, etc.). g.page also added from googleBusinessUrl.',
              },
            },
            {
              name: 'areaServedCities',
              type: 'array',
              labels: { singular: 'City', plural: 'Area served cities' },
              fields: [{ name: 'name', type: 'text', required: true }],
              admin: {
                description:
                  'Cities for LocalBusiness areaServed JSON-LD (plus GeoCircle from lat/lng).',
              },
            },
            {
              name: 'aggregateRatingValue',
              type: 'number',
              required: true,
              min: 1,
              max: 5,
              defaultValue: 5,
              admin: { description: 'Google GBP average rating' },
            },
            {
              name: 'aggregateReviewCount',
              type: 'number',
              required: true,
              min: 0,
              admin: { description: 'Google GBP review count' },
            },
            {
              name: 'weekdayOpens',
              type: 'text',
              defaultValue: '08:00',
              admin: { description: 'Mon–Fri open (HH:mm)' },
            },
            {
              name: 'weekdayCloses',
              type: 'text',
              defaultValue: '20:00',
            },
            {
              name: 'saturdayOpens',
              type: 'text',
              defaultValue: '09:00',
            },
            {
              name: 'saturdayCloses',
              type: 'text',
              defaultValue: '20:00',
            },
            {
              name: 'priceRange',
              type: 'text',
              defaultValue: '$$',
            },
          ],
        },
        {
          label: 'Featured reviews',
          fields: [
            {
              name: 'featuredReviews',
              type: 'array',
              labels: { singular: 'Review', plural: 'Reviews' },
              admin: {
                description:
                  'Sample Google reviews for this office — used in JSON-LD and the site reviews carousel.',
              },
              fields: [
                { name: 'initials', type: 'text', required: true },
                { name: 'author', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
                {
                  name: 'rating',
                  type: 'number',
                  required: true,
                  min: 1,
                  max: 5,
                  defaultValue: 5,
                },
                {
                  name: 'googleUrl',
                  type: 'text',
                  required: true,
                  admin: { description: 'Deep link to the Google review' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
