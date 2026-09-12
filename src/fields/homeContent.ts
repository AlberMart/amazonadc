import type { Field } from 'payload'

const textItem = (name = 'item'): Field => ({
  name,
  type: 'text',
  required: true,
})

const textareaItem = (name = 'text'): Field => ({
  name,
  type: 'textarea',
  required: true,
})

const titledItems: Field = {
  name: 'items',
  type: 'array',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'text', type: 'textarea', required: true },
  ],
}

export const homeContentFields: Field = {
  name: 'homeContent',
  type: 'group',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroEyebrow',
              type: 'text',
              admin: { description: 'Small line above the headline. Leave empty to hide.' },
            },
            { name: 'heroHeadline', type: 'textarea', required: true },
            { name: 'heroSubheadline', type: 'textarea', required: true },
            { name: 'heroCtaLabel', type: 'text', required: true },
            { name: 'heroCtaHref', type: 'text', required: true },
            { name: 'heroPhoneDisplay', type: 'text', required: true },
            { name: 'heroPhoneHref', type: 'text', required: true },
            {
              name: 'heroImage',
              type: 'text',
              required: true,
              admin: { description: 'Public path, e.g. /img/Amazon.webp' },
            },
            { name: 'heroImageAlt', type: 'text', required: true },
          ],
        },
        {
          label: 'About',
          fields: [
            { name: 'aboutHeading', type: 'text', required: true },
            {
              name: 'aboutParagraphs',
              type: 'array',
              fields: [textareaItem()],
            },
            { name: 'aboutClosing', type: 'textarea' },
            { name: 'aboutPhoneDisplay', type: 'text' },
            { name: 'aboutPhoneHref', type: 'text' },
          ],
        },
        {
          label: 'Offers',
          fields: [
            { name: 'offersHeading', type: 'text', required: true },
            { name: 'offersIntro', type: 'textarea', required: true },
          ],
        },
        {
          label: 'Pricing',
          fields: [
            { name: 'pricingHeading', type: 'text', required: true },
            { name: 'pricingIntro', type: 'textarea', required: true },
            {
              name: 'pricingHighlights',
              type: 'array',
              fields: [textItem()],
            },
            {
              name: 'pricingParagraphs',
              type: 'array',
              fields: [textareaItem()],
            },
          ],
        },
        {
          label: 'Air Duct',
          fields: [
            { name: 'airDuctHeading', type: 'text', required: true },
            {
              name: 'airDuctParagraphs',
              type: 'array',
              fields: [textareaItem()],
            },
            { name: 'airDuctImage', type: 'text', required: true },
            { name: 'airDuctImageAlt', type: 'text', required: true },
            { name: 'airDuctCtaLabel', type: 'text', required: true },
            { name: 'airDuctCtaHref', type: 'text', required: true },
          ],
        },
        {
          label: 'Dryer Vent',
          fields: [
            { name: 'dryerHeading', type: 'text', required: true },
            {
              name: 'dryerParagraphs',
              type: 'array',
              fields: [textareaItem()],
            },
            { name: 'dryerImage', type: 'text', required: true },
            { name: 'dryerImageAlt', type: 'text', required: true },
            { name: 'dryerCtaLabel', type: 'text', required: true },
            { name: 'dryerCtaHref', type: 'text', required: true },
          ],
        },
        {
          label: 'Why Us',
          fields: [
            { name: 'whyHeading', type: 'text', required: true },
            { name: 'whyIntro', type: 'textarea', required: true },
            { name: 'whyPhoneDisplay', type: 'text' },
            { name: 'whyPhoneHref', type: 'text' },
            { ...titledItems, name: 'whyItems' },
          ],
        },
        {
          label: 'Process',
          fields: [
            { name: 'processHeading', type: 'text', required: true },
            { name: 'processIntro', type: 'textarea', required: true },
            { name: 'processImage', type: 'text', required: true },
            { name: 'processImageAlt', type: 'text', required: true },
            {
              name: 'processSteps',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Services list',
          fields: [
            { name: 'servicesHeading', type: 'text', required: true },
            { name: 'servicesIntro', type: 'textarea', required: true },
            { ...titledItems, name: 'serviceItems' },
          ],
        },
        {
          label: 'Blog',
          fields: [
            { name: 'blogHeading', type: 'text', required: true },
            { name: 'blogIntro', type: 'textarea', required: true },
            { name: 'blogViewAllLabel', type: 'text', required: true },
          ],
        },
        {
          label: 'FAQ',
          fields: [
            { name: 'faqHeading', type: 'text', required: true },
            { name: 'faqIntro', type: 'textarea', required: true },
            { name: 'faqPhoneDisplay', type: 'text' },
            { name: 'faqPhoneHref', type: 'text' },
            {
              name: 'faqItems',
              type: 'array',
              admin: {
                description: 'Shown on the homepage and emitted as FAQPage JSON-LD.',
              },
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Reviews',
          fields: [
            { name: 'reviewsHeading', type: 'text', required: true },
            { name: 'reviewsIntro', type: 'textarea', required: true },
            {
              name: 'reviews',
              type: 'array',
              admin: {
                description:
                  'Deprecated — featured reviews now live on each Office (Content → Offices → Featured reviews). Home carousel reads from offices.',
                condition: () => false,
              },
              fields: [
                { name: 'initials', type: 'text', required: true },
                { name: 'author', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
                { name: 'googleUrl', type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
