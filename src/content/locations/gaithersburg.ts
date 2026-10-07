import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Gaithersburg — City jurisdiction (DHCA out) + MoCo DEP IAQ + Kentlands/Crown building types.
 */
export const gaithersburg: LocationContentSeed = {
  slug: 'gaithersburg',
  title: 'Gaithersburg Air Duct Cleaning',
  headline: 'Kentlands basements and I-270 corridor townhomes — from the Bethesda office',
  description:
    'Air duct & dryer vent cleaning in Gaithersburg, MD. Flat rates for Kentlands & I-270 homes. Photos. Call (301) 809-4544.',
  intro:
    'Gaithersburg is a municipality — Montgomery County DHCA does not cover city interiors the way it covers much of Silver Spring. DEP still publishes countywide mold and IAQ guidance. We clean ducts and dryer vents in Kentlands, Lakelands, and Crown from Bethesda. Call (301) 809-4544.',
  heroImage: '/img/locations/gaithersburg.webp',
  heroAlt: 'Air duct cleaning in Gaithersburg, MD — Amazon Air Duct Cleaning',
  city: 'Gaithersburg',
  state: 'MD',
  servedBy: 'bethesda',
  sectionLayout: 'processFirst',
  about: {
    heading: 'New-urbanist townhomes meet municipal code lines',
    paragraphs: [
      'Kentlands and Lakelands pack mechanical closets into party-wall footprints; Crown adds condo stacks; older Gaithersburg colonials keep basement handlers. I-270 particulate mixes with canopy pollen — a combination we see on most western-route jobs from Bethesda.',
      '[DHCA](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement) states it lacks jurisdiction inside Gaithersburg. Housing maintenance complaints inside the City go through City channels after landlord notice. County DEP [mold](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold) and [IAQ](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality) pages still teach 30–50% humidity and venting dryers outdoors for every MoCo address.',
      'Bethesda dispatch pairs Gaithersburg with [Germantown](/locations/germantown) and [Rockville](/locations/rockville). Local reading: [Gaithersburg Kentlands basement humidity](/blog/gaithersburg-kentlands-basement-humidity-air-ducts).',
    ],
    highlights: [
      'City jurisdiction called out (DHCA out)',
      'Kentlands / Crown building types',
      'DEP humidity + dryer vent tips',
      'Bethesda: (301) 809-4544',
    ],
  },
  offersTitle: 'Gaithersburg packages',
  services: {
    heading: 'Scopes for townhome and condo stock',
    intro: 'Party-wall dryer routes are the local specialty.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'Source removal in compact townhome systems and older singles. [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned). [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Angular party-wall chases pack lint — DEP wants dryers vented outside; we clear the run. [NFPA](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional duct antimicrobial',
        text: 'After cleaning when film is on hard metal. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'What usually brings us to Gaithersburg homes',
    items: [
      {
        title: 'City vs County complaint paths',
        text: 'If your address is inside Gaithersburg city limits, housing maintenance complaints go through City channels after landlord notice — not Montgomery County DHCA. DEP humidity and mold guidance still applies countywide.',
      },
      {
        title: 'Party-wall dryer chases',
        text: 'Kentlands-era angular chases pack lint fast — full brush-out to the exterior cap is the usual fix when dry times slip.',
      },
      {
        title: 'I-270 corridor dust',
        text: 'Filters and returns near the corridor take a finer particulate load.',
      },
      {
        title: 'Flat rate + photos',
        text: 'Confirmed before work; documented after.',
      },
    ],
  },
  communities: {
    heading: 'Gaithersburg clusters',
    intro: 'New-urbanist cores and older grids.',
    groups: [
      { title: 'Kentlands & Lakelands', places: 'Kentlands, Lakelands, Washingtonian-adjacent' },
      { title: 'Crown & downtown', places: 'Crown, Olde Towne, Frederick Avenue corridor' },
      { title: 'North & west', places: 'Quince Orchard-adjacent, Muddy Branch-adjacent, Montgomery Village-edge when routed together' },
    ],
  },
  process: {
    heading: 'Bethesda → Gaithersburg flow',
    intro: 'Process-first layout: logistics before pitch.',
    steps: [
      { title: 'Townhome vs condo vs single', text: 'Sets hose runs and dryer path expectations.' },
      { title: 'Jurisdiction note', text: 'If you also have a landlord issue, City — not DHCA — for interiors.' },
      { title: 'Flat-rate confirm', text: 'Ducts, dryer, or both.' },
      { title: 'Clean + photos', text: 'Source removal and full dryer brush-out as booked.' },
      { title: 'Handoff', text: 'DEP humidity band + filter tip; (301) 809-4544.' },
    ],
  },
  faqIntro: 'City Gaithersburg + MoCo DEP. Book: (301) 809-4544.',
  faq: [
    {
      q: 'Can I file a Gaithersburg rental mold complaint with DHCA?',
      a: 'DHCA [states](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement) it does not have jurisdiction inside Gaithersburg. Use landlord notice and City reporting channels.',
    },
    {
      q: 'Where do humidity recommendations come from?',
      a: 'Montgomery County DEP [IAQ](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality) cites about **30–50%** RH and venting dryers outdoors.',
    },
    {
      q: 'Do you need HOA approval in Kentlands?',
      a: 'Sometimes for parking/exterior access — send rules when you book so we bring COI if required.',
    },
    {
      q: 'Which office serves Gaithersburg?',
      a: 'Bethesda, MD. Call (301) 809-4544.',
    },
  ],
}
