import type { HomeSection } from '@/utilities/homeSections'
import { servicePrimaryCta, type ServiceContent } from '@/utilities/services'
import type { LocationContent, LocationContentSeed } from '@/utilities/locations'

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
      photos: service.beforeAfter,
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

export function locationContentToSections(
  location: LocationContent | LocationContentSeed,
): HomeSection[] {
  const sections: HomeSection[] = []

  sections.push({
    type: 'prose',
    tone: 'muted',
    heading: location.about.heading,
    paragraphs: location.about.paragraphs,
    highlights: location.about.highlights,
  })

  sections.push({
    type: 'offers',
    tone: 'white',
    heading: location.offersTitle,
    intro: 'Transparent flat-rate pricing. No counting vents. No surprise add-ons.',
  })

  sections.push({
    type: 'cardGrid',
    tone: 'muted',
    heading: location.services.heading,
    intro: location.services.intro,
    items: location.services.items,
    gridCols: 2,
  })

  sections.push({
    type: 'cardGrid',
    tone: 'white',
    heading: location.why.heading,
    items: location.why.items,
    gridCols: 3,
  })

  sections.push({
    type: 'cardGrid',
    tone: 'muted',
    heading: location.communities.heading,
    intro: location.communities.intro,
    items: location.communities.groups.map((group) => ({
      title: group.title,
      text: group.places,
    })),
    gridCols: 3,
  })

  sections.push({ type: 'include' })

  sections.push({
    type: 'steps',
    tone: 'white',
    heading: location.process.heading,
    intro: location.process.intro,
    steps: location.process.steps,
    stepsLayout: 'cards',
  })

  if (location.faq.length) {
    sections.push({
      type: 'faq',
      tone: 'muted',
      heading: `Frequently Asked Questions — ${location.city}`,
      intro: location.faqIntro,
      faqItems: location.faq,
    })
  }

  sections.push({ type: 'contact', anchorId: 'contact', tone: 'white' })
  return sections
}
