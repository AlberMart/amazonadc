import type { HomeSection } from '@/utilities/homeSections'
import { servicePrimaryCta, type ServiceContent } from '@/utilities/services'
import type {
  LocationContent,
  LocationContentSeed,
  LocationSectionLayout,
} from '@/utilities/locations'

export function serviceContentToSections(service: ServiceContent): HomeSection[] {
  const cta = servicePrimaryCta(service)
  const sections: HomeSection[] = []

  if (service.includes.length) {
    sections.push({
      type: 'featureSplit',
      tone: 'muted',
      heading: "What's included",
      intro: service.includesIntro,
      highlights: service.includes,
      image: service.includesImage,
      imageAlt: service.includesImageAlt,
      imagePosition: 'left',
      ctaLabel: cta.label,
      ctaHref: cta.href,
    })
  }

  if (service.beforeAfter?.length) {
    sections.push({
      type: 'gallery',
      tone: 'white',
      heading: 'Proof of Cleaning with Before/After photos',
      photos: service.beforeAfter.map((photo) => ({
        ...photo,
        overlay:
          photo.overlay ||
          (/\bbefore\b/i.test(photo.alt) || /before/i.test(photo.src)
            ? 'before'
            : /\bafter\b/i.test(photo.alt) || /after/i.test(photo.src)
              ? 'after'
              : 'none'),
      })),
    })
  }

  if (service.processAside) {
    sections.push({
      type: 'steps',
      tone: 'dark',
      heading: service.processAside.heading,
      paragraphs: service.processAside.paragraphs,
      steps: service.processAside.steps,
      stepsLayout: 'list',
    })
  }

  if (service.why) {
    sections.push({
      type: 'featureSplit',
      tone: 'muted',
      heading: service.why.heading,
      paragraphs: service.why.paragraphs,
      image: service.why.image,
      imageAlt: service.why.imageAlt,
      imagePosition: 'right',
    })
  }

  if (service.columns?.length) {
    sections.push({
      type: 'listColumns',
      tone: 'white',
      listColumns: service.columns,
    })
  }

  ;(service.listBlocks || []).forEach((block, index) => {
    sections.push({
      type: 'listColumns',
      tone: index % 2 === 0 ? 'white' : 'muted',
      listColumns: [{ heading: block.heading, items: block.items }],
    })
  })

  if (service.process) {
    sections.push({
      type: 'steps',
      tone: service.listBlocks?.length ? 'white' : 'muted',
      heading: service.process.heading,
      intro: service.process.intro,
      steps: service.process.steps,
      stepsLayout: 'cards',
    })
  }

  if (service.scheduleCta) {
    sections.push({
      type: 'prose',
      tone: 'white',
      heading: service.scheduleCta.heading,
      paragraphs: service.scheduleCta.paragraphs,
      ctaLabel: cta.label,
      ctaHref: cta.href,
    })
  }

  sections.push({
    type: 'offers',
    tone: 'muted',
    heading: 'More Services',
    intro: 'Interested? Contact us at support@amazonadc.com, or',
    phoneDisplay: '(800) 606-3334',
    phoneHref: 'tel:+18006063334',
  })

  if (service.faq.length) {
    sections.push({
      type: 'faq',
      tone: 'white',
      heading: 'Frequently Asked Questions',
      intro: service.faqIntro,
      faqItems: service.faq,
    })
  }

  sections.push({ type: 'include' })
  sections.push({ type: 'contact', anchorId: 'contact', tone: 'white' })
  return sections
}

type LocationSectionParts = {
  about: HomeSection
  offers: HomeSection
  services: HomeSection
  why: HomeSection
  communities: HomeSection
  nearby: HomeSection
  process: HomeSection
  faq: HomeSection | null
  contact: HomeSection
}

function locationSectionParts(
  location: LocationContent | LocationContentSeed,
): LocationSectionParts {
  const officeCity =
    'office' in location && location.office
      ? location.office.city
      : (location as LocationContentSeed).servedBy === 'bethesda'
        ? 'Bethesda'
        : 'Burke'
  const dispatch =
    location.dispatchLabel ||
    (location.slug === 'washington-dc'
      ? 'our Burke and Bethesda offices'
      : `our ${officeCity} office`)

  return {
    about: {
      type: 'prose',
      tone: 'muted',
      heading: location.about.heading,
      paragraphs: location.about.paragraphs,
      highlights: location.about.highlights,
    },
    offers: {
      type: 'offers',
      tone: 'white',
      heading: location.offersTitle,
      intro: [
        'Transparent flat-rate pricing. No counting vents. No surprise add-ons.',
        'Published packages — the number we quote before work starts is what you pay.',
        'Choose a package below or ask for a combined duct and dryer visit.',
        'Same rates we list on our service pages. Scoped on site before we begin.',
        'No vent counting games. Residential packages are flat-rate.',
      ][
        Math.abs([...location.slug].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0)) % 5
      ],
    },
    services: {
      type: 'cardGrid',
      tone: 'muted',
      heading: location.services.heading,
      intro: location.services.intro,
      items: location.services.items,
      gridCols: 2,
    },
    why: {
      type: 'cardGrid',
      tone: 'white',
      heading: location.why.heading,
      items: location.why.items,
      gridCols: 3,
    },
    communities: {
      type: 'cardGrid',
      tone: 'muted',
      heading: location.communities.heading,
      intro: location.communities.intro,
      items: location.communities.groups.map((group) => ({
        title: group.title,
        text: group.places,
      })),
      gridCols: 3,
    },
    nearby: (() => {
      const nearbyPacks = [
        {
          heading: `Serving ${location.city} from ${dispatch}`,
          intro: `We cover ${location.city} and nearby communities from ${dispatch}. For the full list of cities, see our locations index.`,
        },
        {
          heading: `${location.city} Routes Staged at ${dispatch}`,
          intro: `${location.city} jobs leave from ${dispatch}. Nearby city pages share the same crew list.`,
        },
        {
          heading: `Where Else We Drive Near ${location.city}`,
          intro: `Beyond ${location.city}, the same team covers neighboring streets from ${dispatch}.`,
        },
        {
          heading: `${location.city} Coverage Map — Compact View`,
          intro: `A short list of neighboring communities on the ${location.city} route from ${dispatch}.`,
        },
        {
          heading: `Next Stops After ${location.city}`,
          intro: `Same office (${dispatch}). Different city pages below for neighborhood-level detail.`,
        },
      ]
      const i =
        Math.abs([...location.slug].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0)) %
        nearbyPacks.length
      const pack = nearbyPacks[i]
      return {
        type: 'serviceArea' as const,
        tone: 'white' as const,
        heading: pack.heading,
        intro: pack.intro,
        compact: true,
        anchorId: 'service_area',
      }
    })(),
    process: {
      type: 'steps',
      tone: 'white',
      heading: location.process.heading,
      intro: location.process.intro,
      steps: location.process.steps,
      stepsLayout: 'cards',
    },
    faq: location.faq.length
      ? {
          type: 'faq',
          tone: 'muted',
          heading:
            location.slug === 'burke' || location.slug === 'bethesda'
              ? `Office FAQs — ${location.city}`
              : location.state === 'DC'
                ? 'District Service Questions'
                : ([
                    `${location.city} Homeowner Questions`,
                    `Before You Book in ${location.city}`,
                    `Answers for ${location.city}, ${location.state}`,
                    `${location.city} Scheduling & Scope FAQs`,
                    `Common ${location.city} Service Questions`,
                  ][
                    Math.abs(
                      [...location.slug].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0),
                    ) % 5
                  ]),
          intro: location.faqIntro,
          faqItems: location.faq,
        }
      : null,
    contact: { type: 'contact', anchorId: 'contact', tone: 'white' },
  }
}

function orderForLayout(layout: LocationSectionLayout, parts: LocationSectionParts): HomeSection[] {
  const push = (rows: Array<HomeSection | null | undefined>) =>
    rows.filter((row): row is HomeSection => Boolean(row))

  switch (layout) {
    case 'servicesFirst':
      return push([
        parts.about,
        parts.services,
        parts.process,
        parts.why,
        parts.offers,
        parts.communities,
        parts.nearby,
        parts.faq,
        parts.contact,
      ])
    case 'faqEarly':
      return push([
        parts.about,
        parts.why,
        parts.services,
        parts.faq,
        parts.process,
        parts.offers,
        parts.communities,
        parts.nearby,
        parts.contact,
      ])
    case 'communitiesFirst':
      return push([
        parts.about,
        parts.communities,
        parts.services,
        parts.why,
        parts.process,
        parts.faq,
        parts.offers,
        parts.nearby,
        parts.contact,
      ])
    case 'processFirst':
      return push([
        parts.about,
        parts.process,
        parts.services,
        parts.communities,
        parts.why,
        parts.faq,
        parts.offers,
        parts.nearby,
        parts.contact,
      ])
    case 'whyFirst':
      return push([
        parts.about,
        parts.why,
        parts.communities,
        parts.process,
        parts.services,
        parts.faq,
        parts.offers,
        parts.nearby,
        parts.contact,
      ])
    case 'offersLate':
      return push([
        parts.about,
        parts.services,
        parts.why,
        parts.communities,
        parts.process,
        parts.faq,
        parts.nearby,
        parts.offers,
        parts.contact,
      ])
    case 'leanNoOffers':
      return push([
        parts.about,
        parts.services,
        parts.why,
        parts.process,
        parts.communities,
        parts.faq,
        parts.nearby,
        parts.contact,
      ])
    case 'faqMid':
      return push([
        parts.about,
        parts.services,
        parts.communities,
        parts.faq,
        parts.why,
        parts.process,
        parts.offers,
        parts.nearby,
        parts.contact,
      ])
    case 'hub':
      return push([
        parts.about,
        parts.services,
        parts.why,
        parts.communities,
        parts.process,
        parts.faq,
        parts.offers,
        parts.nearby,
        parts.contact,
      ])
    case 'default':
    default:
      return push([
        parts.about,
        parts.offers,
        parts.services,
        parts.why,
        parts.communities,
        parts.nearby,
        parts.process,
        parts.faq,
        parts.contact,
      ])
  }
}

export function locationContentToSections(
  location: LocationContent | LocationContentSeed,
): HomeSection[] {
  const layout: LocationSectionLayout =
    location.sectionLayout ||
    (location.slug === 'burke' || location.slug === 'bethesda' ? 'hub' : 'default')
  return orderForLayout(layout, locationSectionParts(location))
}
