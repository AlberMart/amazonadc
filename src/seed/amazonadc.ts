import { airDuctCleaning } from '@/content/services/air-duct-cleaning'
import { airDuctAndDryerVentCleaning } from '@/content/services/air-duct-and-dryer-vent-cleaning'
import { dryerVentCleaning } from '@/content/services/dryer-vent-cleaning'
import { bethesda } from '@/content/locations/bethesda'
import { burke } from '@/content/locations/burke'
import type { LocationContent } from '@/utilities/locations'
import type { ServiceContent } from '@/utilities/services'

/**
 * Seed data for Amazon Air Duct Cleaning.
 * Source of truth for initial CMS content: `src/content/*`
 * Run: `pnpm run seed`
 */

export const siteSettingsSeed = {
  siteName: 'Amazon Air Duct Cleaning',
  phone: '(800) 606-3334',
  phoneHref: '+18006063334',
  email: 'support@amazonadc.com',
  defaultMetaDescription:
    'Professional air duct and dryer vent cleaning in Virginia, Maryland, and Washington DC. Flat-rate pricing and 100% satisfaction guarantee.',
  addresses: [
    {
      label: 'Burke, VA',
      street: '5641 Burke Centre Pkwy Ste 119',
      city: 'Burke',
      state: 'VA',
      postalCode: '22015',
    },
    {
      label: 'Bethesda, MD',
      street: '7815 Old Georgetown Rd Ste 201',
      city: 'Bethesda',
      state: 'MD',
      postalCode: '20814',
    },
  ],
  socialLinks: [
    { platform: 'Facebook', url: 'https://www.facebook.com/amazonductcleaning' },
    { platform: 'Instagram', url: 'https://www.instagram.com/amazonairduct' },
  ],
}

const serviceThumbs: Record<string, string> = {
  'air-duct-cleaning': '/img/services/Amazon_AIR_DUCT_CLEANING_small.webp',
  'dryer-vent-cleaning': '/img/services/AmazonDC-179_small.webp',
  'air-duct-and-dryer-vent-cleaning': '/img/services/Amazon_DRYER_VENT_CLEANING_small.webp',
}

function mapService(service: ServiceContent) {
  return {
    title: service.title,
    slug: service.slug,
    summary: service.summary,
    description: service.description,
    price: service.price,
    compareAtPrice: service.compareAtPrice,
    orderUrl: service.orderUrl,
    thumbImage: serviceThumbs[service.slug] || service.heroImage,
    heroImage: service.heroImage,
    heroAlt: service.heroAlt,
    includesIntro: service.includesIntro,
    includesImage: service.includesImage,
    includesImageAlt: service.includesImageAlt,
    includes: service.includes.map((item) => ({ item })),
    beforeAfter: service.beforeAfter,
    why: service.why
      ? {
          heading: service.why.heading,
          paragraphs: service.why.paragraphs.map((text) => ({ text })),
          image: service.why.image,
          imageAlt: service.why.imageAlt,
        }
      : undefined,
    columns: service.columns?.map((col) => ({
      heading: col.heading,
      items: col.items.map((item) => ({ item })),
    })),
    listBlocks: service.listBlocks?.map((block) => ({
      heading: block.heading,
      items: block.items.map((item) => ({ item })),
    })),
    process: service.process
      ? {
          heading: service.process.heading,
          intro: service.process.intro,
          steps: service.process.steps,
        }
      : undefined,
    processAside: service.processAside
      ? {
          heading: service.processAside.heading,
          paragraphs: service.processAside.paragraphs.map((text) => ({ text })),
          steps: service.processAside.steps,
        }
      : undefined,
    scheduleCta: service.scheduleCta
      ? {
          heading: service.scheduleCta.heading,
          paragraphs: service.scheduleCta.paragraphs.map((text) => ({ text })),
        }
      : undefined,
    faqIntro: service.faqIntro,
    faq: service.faq.map((item) => ({ question: item.q, answer: item.a })),
    meta: {
      title: service.title,
      description: service.description,
    },
  }
}

function mapLocation(location: LocationContent) {
  return {
    title: location.title,
    slug: location.slug,
    headline: location.headline,
    description: location.description,
    intro: location.intro,
    heroImage: location.heroImage,
    heroAlt: location.heroAlt,
    city: location.city,
    state: location.state,
    phone: location.phone,
    phoneDisplay: location.phoneDisplay,
    email: location.email,
    streetAddress: location.streetAddress,
    postalCode: location.postalCode,
    offersTitle: location.offersTitle,
    about: {
      heading: location.about.heading,
      paragraphs: location.about.paragraphs.map((text) => ({ text })),
      highlights: location.about.highlights.map((item) => ({ item })),
    },
    services: {
      heading: location.services.heading,
      intro: location.services.intro,
      items: location.services.items,
    },
    why: {
      heading: location.why.heading,
      items: location.why.items,
    },
    communities: {
      heading: location.communities.heading,
      intro: location.communities.intro,
      groups: location.communities.groups,
    },
    process: {
      heading: location.process.heading,
      intro: location.process.intro,
      steps: location.process.steps,
    },
    faqIntro: location.faqIntro,
    faq: location.faq.map((item) => ({ question: item.q, answer: item.a })),
    meta: {
      title: location.title,
      description: location.description,
    },
  }
}

export const servicesSeed = [
  mapService(airDuctCleaning),
  mapService(dryerVentCleaning),
  mapService(airDuctAndDryerVentCleaning),
]

export const locationsSeed = [mapLocation(burke), mapLocation(bethesda)]
