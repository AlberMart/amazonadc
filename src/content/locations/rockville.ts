import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Rockville — City code (not MoCo DHCA inside city) + DEP IAQ/mold + Tenant Mold Protection timelines via city news.
 */
export const rockville: LocationContentSeed = {
  slug: 'rockville',
  title: 'Air Duct & Dryer Vent Cleaning in Rockville, MD',
  headline: 'Twinbrook, King Farm, and Town Center — short run from Bethesda',
  description:
    'Air duct & dryer vent cleaning in Rockville, MD. Flat rates for Town Center, King Farm & Twinbrook. Call (301) 809-4544.',
  intro:
    'Inside Rockville city limits, rental maintenance complaints go through City code channels — Montgomery County DHCA does not take those interiors. County DEP still publishes mold and IAQ guidance for everyone. We clean ducts and dryer vents from Bethesda with flat rates and photos. Call (301) 809-4544.',
  heroImage: '/img/locations/rockville.webp',
  heroAlt: 'Air duct cleaning in Rockville, MD — Amazon Air Duct Cleaning',
  city: 'Rockville',
  state: 'MD',
  servedBy: 'bethesda',
  sectionLayout: 'whyFirst',
  about: {
    heading: 'Two governments, one set of trunks',
    paragraphs: [
      'Montgomery County [DHCA Code Enforcement](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement) states it does not have jurisdiction inside Rockville (or Gaithersburg) for those municipal interiors. For leaks and maintenance inside the City, Rockville points residents to [report a property maintenance code violation](https://www.rockvillemd.gov/services/report-a-property-maintenance-code-violation/) after written notice to the landlord. If your address is in Rockville city limits, use City reporting channels for housing maintenance — not DHCA for those interiors.',
      'County science still applies: DEP’s [mold](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold) and [indoor air quality](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality) pages push 30–50% humidity, venting dryers outdoors, and regular HVAC filter changes. City of Rockville has also aligned multifamily licensing updates with Maryland’s Tenant Mold Protection Act timelines (assessment after written notice, remediation windows) — read the City’s latest housing inspection news for the live dates.',
      'King Farm townhomes, Twinbrook ranches, and Town Center condos all show up on our Bethesda route with [Gaithersburg](/locations/gaithersburg) and [Silver Spring](/locations/silver-spring). Local humidity reading: [Rockville basement humidity and air ducts](/blog/rockville-basement-humidity-air-ducts).',
    ],
    highlights: [
      'City vs County jurisdiction explained — not glossed over',
      'DEP humidity / dryer-vent tips cited',
      'Flat-rate photo jobs from Bethesda',
      '(301) 809-4544',
    ],
  },
  offersTitle: 'Rockville packages',
  services: {
    heading: 'Cleaning scopes for Rockville housing',
    intro: 'Colonials, King Farm, Twinbrook — same rate card; different floor plans and vent runs.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'Source removal with photos. [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) on health expectations. [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'DEP mold guidance includes venting dryers outside; we clear packed runs. [NFPA](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional duct antimicrobial',
        text: 'After mechanical cleaning when film shows on hard metal — not City code enforcement and not whole-unit mold remediation. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why Rockville homeowners book us',
    items: [
      {
        title: 'Wrong agency wastes a week',
        text: 'Calling MoCo DHCA for a Rockville city rental interior is the wrong door. City code reporting after landlord notice is the right channel for housing complaints; we handle duct and dryer vent cleaning when you hire us for that scope.',
      },
      {
        title: 'DEP still teaches humidity',
        text: '30–50% RH and exhaust habits from County IAQ pages apply whether you are in the City or the unincorporated county.',
      },
      {
        title: 'Tenant mold timelines are state + city',
        text: 'Maryland’s Tenant Mold Protection Act sets assessment/remediation clocks after written notice — City multifamily rules are aligning. Duct cleaning does not pause those clocks.',
      },
      {
        title: 'Short run from Bethesda',
        text: 'Short Bethesda run along Old Georgetown / 355 — we set a real appointment window and stay in touch if traffic stretches it.',
      },
    ],
  },
  communities: {
    heading: 'Rockville areas we stage',
    intro: 'City neighborhoods on the Bethesda dispatch list.',
    groups: [
      { title: 'Town Center & Twinbrook', places: 'Rockville Town Center, Twinbrook, Hungerford corridor' },
      { title: 'King Farm & Fallsgrove', places: 'King Farm, Fallsgrove, Research Blvd-adjacent' },
      { title: 'East & south edges', places: 'Lone Oak-adjacent, Montrose, Congressional-adjacent streets' },
    ],
  },
  process: {
    heading: 'Bethesda → Rockville',
    intro: 'We ask city vs county address when jurisdiction matters for your other to-dos.',
    steps: [
      { title: 'Confirm City limits', text: 'Helps you pick City code vs DHCA if you also have a landlord issue.' },
      { title: 'Scope ducts/dryer', text: 'Flat rate before tools run.' },
      { title: 'Clean + photos', text: 'Source removal and dryer brush-out as booked.' },
      { title: 'Handoff', text: 'Filter cadence + DEP humidity reminder; (301) 809-4544.' },
    ],
  },
  faqIntro: 'Rockville City + Montgomery DEP. Book: (301) 809-4544.',
  faq: [
    {
      q: 'Does Montgomery County DHCA handle my Rockville apartment mold complaint?',
      a: 'Generally no for interiors inside Rockville city limits — [DHCA](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement) notes it lacks jurisdiction in Rockville. Use landlord notice, then [City property maintenance reporting](https://www.rockvillemd.gov/services/report-a-property-maintenance-code-violation/).',
    },
    {
      q: 'What humidity does County DEP recommend?',
      a: 'Montgomery DEP [IAQ](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality) cites about **30–50%** relative humidity and regular filter changes.',
    },
    {
      q: 'Do you enforce City housing code?',
      a: 'No. We clean ducts and dryer vents. Code and landlord-tenant processes stay with the City.',
    },
    {
      q: 'Which office serves Rockville?',
      a: 'Bethesda, MD. Call (301) 809-4544.',
    },
  ],
}
