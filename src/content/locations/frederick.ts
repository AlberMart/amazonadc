import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Frederick — County Housing livability does NOT mold-inspect; Health FAQ points to EPA contacts.
 */
export const frederick: LocationContentSeed = {
  slug: 'frederick',
  title: 'Air Duct & Dryer Vent Cleaning in Frederick, MD',
  headline: 'Downtown cellars and newer Urbana pads — longer Bethesda hop, same flat rates',
  description:
    'Air duct & dryer vent cleaning in Frederick, MD. Flat rates for downtown & newer suburbs. Photos. Call (301) 809-4544.',
  intro:
    'Frederick County Division of Housing says mold inspections are not performed by County Housing personnel — even while Livability Code covers rental maintenance. Downtown brick and Urbana-edge suburbs still need clear ducts and dryer vents. We run from Bethesda with flat rates and photos. Call (301) 809-4544.',
  heroImage: '/img/locations/frederick.webp',
  heroAlt: 'Air duct cleaning in Frederick, MD — Amazon Air Duct Cleaning',
  city: 'Frederick',
  state: 'MD',
  servedBy: 'bethesda',
  sectionLayout: 'whyFirst',
  about: {
    heading: 'I-270 end of the line — different County voice',
    paragraphs: [
      'Downtown Frederick brick and rowhouse stock carries retrofitted trunks; newer clusters toward Urbana and Ballenger Creek bring townhome closets and longer dryer runs. The drive from Bethesda is longer than Rockville — we say so up front and still keep flat-rate residential packages.',
      'Frederick County [Livability Code Enforcement](https://frederickcountymd.gov/6376/Livability-Code-Enforcement) adopted property-maintenance standards for rentals and states clearly that mold inspections are **not** performed by Division of Housing staff, pointing residents to EPA mold resources. That boundary is the civic hook for this page.',
      'The Frederick County Health Department FAQ on mold steers people toward EPA Air Quality contacts rather than a local mold-inspection desk. We clean ducts and dryer vents; we do not replace Livability complaint processes for leaks and sanitation. Corridor neighbors on the same Bethesda dispatch include [Germantown](/locations/germantown) and [Gaithersburg](/locations/gaithersburg).',
    ],
    highlights: [
      'Housing “no mold inspections” cited from Livability page',
      'Downtown brick vs newer suburb building split',
      'Flat-rate photo jobs despite longer ETA',
      'Bethesda: (301) 809-4544',
    ],
  },
  offersTitle: 'Frederick packages',
  services: {
    heading: 'What we clean in Frederick',
    intro: 'Same menu as closer MD cities — honest travel window from Bethesda.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'Source removal for brick-home trunks and newer systems. [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned). [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Horizontal downtown runs and suburban townhome chases. [NFPA](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional duct antimicrobial',
        text: 'After cleaning when film is on hard metal — not a County mold inspection. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why Frederick homeowners book us',
    items: [
      {
        title: 'Housing complaints vs mold testing',
        text: 'County Housing can work rental maintenance complaints under adopted property-maintenance code; it will not mold-inspect. Know which ask you are making.',
      },
      {
        title: 'Two housing eras',
        text: 'Downtown brick retrofit trunks vs newer suburb closets — we ask which before quoting time on site.',
      },
      {
        title: 'Distance honesty',
        text: 'Bethesda to Frederick is a real drive — we say so up front and schedule a window that respects the hop, not a fake “nearby” claim.',
      },
      {
        title: 'Flat rate still holds',
        text: 'Travel does not turn into per-vent math on residential packages.',
      },
    ],
  },
  communities: {
    heading: 'Frederick areas we stage',
    intro: 'City core and south/east growth corridors.',
    groups: [
      { title: 'Downtown & historic', places: 'Downtown Frederick, Market Street corridor, historic brick blocks' },
      { title: 'North & west', places: 'Fort Detrick-adjacent residential, Yellow Springs-adjacent' },
      { title: 'South & east growth', places: 'Ballenger Creek, Urbana-edge, I-270 south approaches' },
    ],
  },
  process: {
    heading: 'Bethesda → Frederick',
    intro: 'Longer hop — we confirm address, parking, and access details when you book so the visit is not a guess.',
    steps: [
      { title: 'Address class', text: 'Downtown parking vs suburban driveway.' },
      { title: 'Scope', text: 'Ducts, dryer, or both; flat rate locked.' },
      { title: 'Clean + photos', text: 'Source removal and dryer brush-out.' },
      { title: 'Handoff', text: 'Filter tips; Livability/EPA links if moisture remains; (301) 809-4544.' },
    ],
  },
  faqIntro: 'Frederick County Livability + Health FAQ context. Book: (301) 809-4544.',
  faq: [
    {
      q: 'Will Frederick County Housing inspect mold for me?',
      a: 'No. [Livability Code Enforcement](https://frederickcountymd.gov/6376/Livability-Code-Enforcement) states mold inspections are not performed by Division of Housing personnel and points to EPA mold resources.',
    },
    {
      q: 'Who does the Health Department say to call about mold?',
      a: 'County Health FAQs steer mold questions toward EPA Air Quality contacts rather than a local mold-inspection program. Verify the live FAQ for current numbers.',
    },
    {
      q: 'Is travel added to the price?',
      a: 'Residential packages stay flat-rate as quoted. We are clear that Frederick is a longer Bethesda run for scheduling, not a surcharge surprise after the walkthrough.',
    },
    {
      q: 'Which office serves Frederick?',
      a: 'Bethesda, MD. Call (301) 809-4544.',
    },
  ],
}
