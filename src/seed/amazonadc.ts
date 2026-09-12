import { themeSeed } from '@/utilities/theme'
import { airDuctCleaning } from '@/content/services/air-duct-cleaning'
import { airDuctAndDryerVentCleaning } from '@/content/services/air-duct-and-dryer-vent-cleaning'
import { dryerVentCleaning } from '@/content/services/dryer-vent-cleaning'
import { bethesda } from '@/content/locations/bethesda'
import { alexandria } from '@/content/locations/alexandria'
import { arlington } from '@/content/locations/arlington'
import { burke } from '@/content/locations/burke'
import { officesSeedSource } from '@/content/offices'
import type { LocationContentSeed } from '@/utilities/locations'
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
  organizationDescription:
    'Professional air duct, dryer vent, and HVAC cleaning in Virginia, Maryland, and Washington DC.',
  priceRange: '$$-$$$',
  logoPath: '/img/logo.png',
  defaultOgImage: '/img/Amazon.webp',
  defaultMetaTitle: 'Air Duct Cleaning in Virginia, Maryland & Washington DC',
  defaultMetaDescription:
    'Top-rated air duct cleaning in VA, MD & DC. Improve indoor air quality, remove dust and allergens, and clean dryer vents. Flat rates and a 100% satisfaction guarantee.',
  titleSuffix: 'Amazon Air Duct Cleaning',
  priceValidUntil: '2026-12-31',
  socialLinks: [
    { platform: 'Facebook', url: 'https://www.facebook.com/amazonductcleaning' },
    { platform: 'Instagram', url: 'https://www.instagram.com/amazonairduct' },
  ],
  trustBadges: [
    { src: '/img/reviews/Trustpilot.webp', alt: 'Trustpilot', width: 140, height: 60 },
    {
      src: '/img/reviews/customers_dynamic_rectangle.webp',
      alt: 'CustomerLobby',
      width: 124,
      height: 60,
    },
    { src: '/img/reviews/houzz.webp', alt: 'Houzz', width: 80, height: 60 },
    { src: '/img/reviews/award.webp', alt: 'Super Service Award', width: 65, height: 60 },
    { src: '/img/reviews/toprated-solid-border.webp', alt: 'HomeAdvisor', width: 71, height: 80 },
    { src: '/img/reviews/bbb.webp', alt: 'BBB', width: 86, height: 60 },
    {
      src: '/img/reviews/Aeroseal-dealer-badge-white.webp',
      alt: 'Aeroseal Dealer',
      width: 91,
      height: 60,
    },
  ],
  serviceAreaMapEmbedUrl:
    'https://www.google.com/maps/d/u/1/embed?mid=11Gt4y_RRlKcln8C0JIn5j3intMv4_0U&ehbc=2E312F&noprof=1',
  serviceAreaMapTitle: 'Service area map',
  theme: themeSeed,
  serviceAreaRegions: [
    {
      name: 'Virginia',
      cities: [
        { name: 'Arlington' },
        { name: 'Alexandria' },
        { name: 'Fairfax' },
        { name: 'Springfield' },
        { name: 'Loudoun' },
        { name: 'Prince William' },
      ],
      href: '/locations/burke',
      linkLabel: 'Burke & more',
    },
    {
      name: 'Maryland',
      cities: [
        { name: 'Rockville' },
        { name: 'Silver Spring' },
        { name: 'Bethesda' },
        { name: 'Gaithersburg' },
        { name: 'College Park' },
      ],
      href: '/locations/bethesda',
      linkLabel: 'Surrounding areas',
    },
    {
      name: 'Washington DC',
      cities: [
        { name: 'Capitol Hill' },
        { name: 'Northwest' },
        { name: 'Northeast' },
        { name: 'Southeast' },
      ],
      emptyLinkLabel: 'All DC neighborhoods',
    },
  ],
}

function customNav(label: string, url: string, detail?: string) {
  return {
    link: {
      type: 'custom' as const,
      label,
      url,
    },
    ...(detail ? { detail } : {}),
  }
}

export const headerSeed = {
  brand: {
    mode: 'text' as const,
    text: '',
    logoPath: '/img/logo.png',
    logoAlt: 'Amazon Air Duct Cleaning',
  },
  showPhoneCta: true,
  navItems: [
    customNav('Home', '/'),
    customNav('About Us', '/#about'),
    customNav('Services', '/#current_offers'),
    customNav('Service Area', '/#service_area'),
    customNav('Burke, VA', '/locations/burke'),
    customNav('Bethesda, MD', '/locations/bethesda'),
    customNav('Blog', '/blog'),
    customNav('Contact Us', '/#contact'),
  ],
}

export const footerSeed = {
  brand: {
    mode: 'text' as const,
    text: '',
    logoPath: '/img/logo.png',
    logoAlt: 'Amazon Air Duct Cleaning',
  },
  tagline:
    'Professional air duct and dryer vent cleaning for homes and businesses across Virginia, Maryland, and Washington DC.',
  showContactInBrand: true,
  copyrightText: '',
  columns: [
    {
      title: 'Offices',
      type: 'links' as const,
      links: [
        customNav(
          'Burke, VA',
          '/locations/burke',
          '5641 Burke Centre Pkwy Ste 119\n(571) 460-0001',
        ),
        customNav(
          'Bethesda, MD',
          '/locations/bethesda',
          '7815 Old Georgetown Rd Ste 201\n(301) 809-4544',
        ),
      ],
    },
    {
      title: 'Cities',
      type: 'links' as const,
      links: [
        customNav('Arlington, VA', '/locations/arlington'),
        customNav('Alexandria, VA', '/locations/alexandria'),
        customNav('All locations', '/locations'),
      ],
    },
    {
      title: 'Explore',
      type: 'links' as const,
      links: [
        customNav('Air Duct Cleaning', '/air-duct-cleaning'),
        customNav('Dryer Vent Cleaning', '/dryer-vent-cleaning'),
        customNav('Combo Package', '/air-duct-and-dryer-vent-cleaning'),
        customNav('Blog', '/blog'),
        customNav('Privacy Policy', '/privacy-policy'),
        customNav('Terms of Service', '/terms-of-service'),
        customNav('Refund Policy', '/refund-policy'),
      ],
    },
    {
      title: 'Our Social Networks',
      type: 'social' as const,
      links: [],
    },
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

function mapLocation(location: LocationContentSeed) {
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
    /** resolved to office id in seed/run.ts */
    servedBySlug: location.servedBy,
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

export const officesSeed = officesSeedSource.map((office) => ({
  ...office,
  areaServedCities: office.areaServedCities.map((name) => ({ name })),
  generateSlug: false,
}))

export const locationsSeed = [
  mapLocation(burke),
  mapLocation(bethesda),
  mapLocation(arlington),
  mapLocation(alexandria),
]
