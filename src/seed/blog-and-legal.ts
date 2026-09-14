import howOften from '@/content/blog/how-often-clean-air-ducts.json'
import sevenSigns from '@/content/blog/7-signs-air-ducts-need-cleaning.json'
import whyDryer from '@/content/blog/why-clean-dryer-vents.json'
import energyBills from '@/content/blog/how-dirty-air-ducts-increase-energy-bills.json'
import allergies from '@/content/blog/can-dirty-air-ducts-cause-allergies.json'
import neverClean from '@/content/blog/never-clean-air-ducts.json'
import arlingtonHumidity from '@/content/blog/how-potomac-humidity-affects-arlington-air-quality.json'
import alexandriaHumidity from '@/content/blog/how-potomac-humidity-affects-alexandria-air-quality.json'
import dcHumidity from '@/content/blog/dc-humidity-row-houses-indoor-air.json'
import mcleanPollen from '@/content/blog/mclean-tree-pollen-basement-humidity.json'
import rockvilleBasement from '@/content/blog/rockville-basement-humidity-air-ducts.json'
import fairfaxRamblers from '@/content/blog/fairfax-ramblers-pollen-air-ducts.json'
import springfieldDust from '@/content/blog/springfield-mixing-bowl-dust-air-ducts.json'
import loudounDust from '@/content/blog/loudoun-construction-dust-pollen-air-ducts.json'
import princeWilliamHumidity from '@/content/blog/prince-william-occoquan-humidity-air-ducts.json'
import silverSpringDust from '@/content/blog/silver-spring-brick-houses-urban-dust-air-ducts.json'
import gaithersburgBasement from '@/content/blog/gaithersburg-kentlands-basement-humidity-air-ducts.json'
import collegeParkRentals from '@/content/blog/college-park-rentals-pollen-air-ducts.json'
import {
  homeContentSeed,
  mapHomeContentToSeed,
} from '@/content/home'
import { mapHomeSectionsToSeed, homeSectionsSeed } from '@/utilities/homeSections'
import {
  privacyPolicy,
  refundPolicy,
  termsOfService,
  type LegalPageContent,
} from '@/content/legal'
import type { BlogPost } from '@/utilities/blog'

function mapPost(post: BlogPost) {
  return {
    title: post.title,
    slug: post.slug,
    headline: post.headline,
    excerpt: post.description,
    heroImagePath: post.heroImage,
    sections: post.sections.map((section) => ({
      sectionId: section.id,
      heading: section.heading,
      paragraphs: (section.paragraphs || []).map((text) => ({ text })),
      listItems: (section.listItems || []).map((item) => ({ item })),
      image: section.image,
    })),
    faq: (post.faq || []).map((item) => ({ question: item.q, answer: item.a })),
    meta: {
      title: post.title,
      description: post.description,
    },
    _status: 'published' as const,
  }
}

function mapLegal(page: LegalPageContent) {
  return {
    title: page.title,
    slug: page.slug,
    pageKind: 'legal' as const,
    _status: 'published' as const,
    legalContent: {
      intro: page.intro,
      detailsHeading: page.detailsHeading,
      sections: page.sections.map((section) => ({
        heading: section.heading,
        intro: section.intro,
        items: (section.items || []).map((item) => ({ item })),
        paragraphs: (section.paragraphs || []).map((text) => ({ text })),
      })),
      closing: page.closing,
    },
    meta: {
      title: page.title,
      description: page.description,
    },
  }
}

export const postsSeed = [
  mapPost(howOften as BlogPost),
  mapPost(sevenSigns as BlogPost),
  mapPost(whyDryer as BlogPost),
  mapPost(energyBills as BlogPost),
  mapPost(allergies as BlogPost),
  mapPost(neverClean as BlogPost),
  mapPost(arlingtonHumidity as BlogPost),
  mapPost(alexandriaHumidity as BlogPost),
  mapPost(dcHumidity as BlogPost),
  mapPost(mcleanPollen as BlogPost),
  mapPost(rockvilleBasement as BlogPost),
  mapPost(fairfaxRamblers as BlogPost),
  mapPost(springfieldDust as BlogPost),
  mapPost(loudounDust as BlogPost),
  mapPost(princeWilliamHumidity as BlogPost),
  mapPost(silverSpringDust as BlogPost),
  mapPost(gaithersburgBasement as BlogPost),
  mapPost(collegeParkRentals as BlogPost),
]

export const legalPagesSeed = [
  mapLegal(privacyPolicy),
  mapLegal(termsOfService),
  mapLegal(refundPolicy),
]

export const homePageSeed = {
  title: 'Home',
  slug: 'home',
  pageKind: 'home' as const,
  _status: 'published' as const,
  hero: {
    type: 'none' as const,
  },
  layout: [],
  homeSections: mapHomeSectionsToSeed(homeSectionsSeed),
  homeContent: mapHomeContentToSeed(homeContentSeed),
  meta: {
    title: 'Air Duct Cleaning in Virginia, Maryland & Washington DC',
    description:
      'Top-rated Air Duct Cleaning in VA, MD & DC. Improve your indoor air quality, remove dust & allergens, dryer vent cleaning, commercial services. Call for free estimate!',
  },
}
