import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Reston — Fairfax County mold + planned-community / high-rise laundry angle.
 */
export const reston: LocationContentSeed = {
  slug: 'reston',
  title: 'Reston Air Duct Cleaning',
  headline: 'High-rise laundry chases and village townhomes — planned-community jobs from Burke',
  description:
    'Air duct & dryer vent cleaning in Reston, VA. Flat rates for village homes & high-rise dryer chases. Call (571) 460-0001.',
  intro:
    'Reston is a planned community of stacked laundry closets, village townhomes, and lake-adjacent condos. Fairfax County Health still will not test or remediate mold for you. We clean ducts and dryer vents with flat rates and photos from Burke. Call (571) 460-0001.',
  heroImage: '/img/locations/reston.webp',
  heroAlt: 'Air duct cleaning in Reston, VA — Amazon Air Duct Cleaning',
  city: 'Reston',
  state: 'VA',
  servedBy: 'burke',
  sectionLayout: 'whyFirst',
  about: {
    heading: 'Planned-community air paths meet County honesty',
    paragraphs: [
      'Wiehle and Reston Town Center high-rises push dryer exhaust up shared chases; Lake Anne and Hunters Woods stock mixes original condo mechanical rooms with later townhome closets. Toll Road dust and humid summers load both — the access notes we collect before arrival center on risers, garage docks, and HOA rules.',
      'County baseline stays the same: the [Fairfax County mold page](https://www.fairfaxcounty.gov/health/environment/mold) says Health does not perform indoor air testing or mold remediation, and points to EPA/CDC/VDH. Keep moisture down; hire cleanup when growth appears. Our scope is trunks and dryer runs, documented.',
      '[Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax) repeats dry-space prevention. In Reston, clear dryer vents on a schedule in buildings where the run is longer than the laundry closet looks. Dispatch from Burke with [Herndon](/locations/herndon) and [Fairfax](/locations/fairfax) on neighboring days.',
    ],
    highlights: [
      'High-rise dryer chases planned before arrival',
      'Fairfax County Health mold links, no fake “county approved” badge',
      'Flat-rate photos on every job',
      'Burke: (571) 460-0001',
    ],
  },
  offersTitle: 'Reston packages',
  services: {
    heading: 'Scopes that match Reston buildings',
    intro: 'Town Center risers and village townhomes use the same rate card; access notes differ.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'Source-removal cleaning for condo and townhome systems. Expectations framed by [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned). [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning (risers included)',
        text: 'Long vertical runs are why Reston condo laundry smells hot mid-cycle. [NFPA](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines) on failure-to-clean. [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional duct antimicrobial',
        text: 'After mechanical cleaning when film is visible on hard metal — moisture source still has to be controlled per County guidance. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why Reston homeowners book us',
    items: [
      {
        title: 'Shared chases hide lint',
        text: 'What looks like a short closet vent may travel floors. We rod and vacuum the full length we can access to the cap.',
      },
      {
        title: 'County will not certify your HVAC',
        text: 'Health Department pages redirect to EPA/CDC/VDH — they will not stamp your ducts clean. Photos are our proof.',
      },
      {
        title: 'HOA / condo desk logistics',
        text: 'Certificates of insurance and loading-dock windows handled before arrival when you send rules ahead.',
      },
      {
        title: 'Flat rate from Burke',
        text: 'No per-vent math; number confirmed before equipment starts.',
      },
    ],
  },
  communities: {
    heading: 'Reston villages and centers we stage',
    intro: 'Same packages across the planned community grid.',
    groups: [
      { title: 'Town Center & transit', places: 'Reston Town Center, Wiehle-Reston East area, Spectrum' },
      { title: 'Lakes & originals', places: 'Lake Anne, Hunters Woods, South Lakes' },
      { title: 'North & west clusters', places: 'North Point, Upper Lake, Twin Branches-adjacent streets' },
    ],
  },
  process: {
    heading: 'Burke → Reston',
    intro: 'High-rise days need earlier access coordination.',
    steps: [
      { title: 'Send building rules', text: 'Dock hours, COI, unit HVAC closet location.' },
      { title: 'Quote on site', text: 'Ducts, dryer riser, or both — flat rate locked first.' },
      { title: 'Clean', text: 'Negative-pressure ducts; full dryer brush-out when booked.' },
      { title: 'Photos', text: 'Before/after set before we leave the unit.' },
      { title: 'Handoff', text: 'Filter + dryer interval tips; (571) 460-0001.' },
    ],
  },
  faqIntro: 'Reston + Fairfax County context. Book: (571) 460-0001.',
  faq: [
    {
      q: 'Does Fairfax County clean dryer vents in Reston high-rises?',
      a: 'No. County [mold/Health pages](https://www.fairfaxcounty.gov/health/environment/mold) do not provide residential duct or dryer cleaning. That is private flat-rate work — what we schedule from Burke.',
    },
    {
      q: 'Can you service a multi-story dryer chase?',
      a: 'Yes within accessible run length to the exterior/roof cap. Tall risers are common in Town Center and Wiehle buildings — tell us floors and access when booking.',
    },
    {
      q: 'Is mold testing included?',
      a: 'No. County Health does not test either; we photograph duct/vent interiors after cleaning.',
    },
    {
      q: 'Which office serves Reston?',
      a: 'Burke, VA. Call (571) 460-0001.',
    },
  ],
}
