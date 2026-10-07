import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Washington, DC — DOEE mold licensing + 10 sq ft + tenant 7/30 timelines (unique vs VA counties).
 * Links: doee.dc.gov/service/mold; mold-information-tenants; skip unstable “as of 2026” if too volatile — include carefully.
 */
export const washingtonDc: LocationContentSeed = {
  slug: 'washington-dc',
  title: 'Washington DC Air Duct Cleaning',
  headline: 'Row houses and DOEE mold context — ducts and dryer vents from Burke and Bethesda',
  description:
    'Air duct & dryer vent cleaning in Washington, DC. Flat rates for row houses & condos. Before/after photos. Call (571) 460-0001.',
  intro:
    'The District licenses mold assessors and remediators and publishes tenant timelines Virginia counties do not. We clean ducts and dryer vents in row houses and condos with flat rates and photos — and we stay clear that duct antimicrobial is not DOEE whole-home mold remediation. Call (571) 460-0001 or (301) 809-4544.',
  heroImage: '/img/locations/washington-dc.webp',
  heroAlt: 'Air duct cleaning in Washington, DC — Amazon Air Duct Cleaning',
  city: 'Washington',
  state: 'DC',
  servedBy: 'burke',
  sectionLayout: 'faqEarly',
  dispatchLabel: 'our Burke and Bethesda offices',
  about: {
    heading: 'DOEE mold rules residents should know',
    paragraphs: [
      'DOEE’s [Mold — What To Do](https://doee.dc.gov/service/mold) hub covers homeowners, tenants, and professional licensing. District rules use a practical size threshold: about **10 square feet** or more of indoor mold generally requires DOEE-licensed assessment/remediation professionals. Virginia and Maryland county pages describe different complaint paths — if you rent or own in DC, start with DOEE’s live guidance.',
      'For renters, [Mold Information for Tenants](https://doee.dc.gov/service/mold-information-tenants) explains written notice to the owner, inspection and remediation timelines under District law, and that housing-code enforcement pathways have shifted toward the Department of Buildings for many complaint types while DOEE continues licensing. Read the live DOEE page for current complaint routing before you assume who inspects.',
      'Our work from [Burke](/locations/burke) and [Bethesda](/locations/bethesda) is mechanical: ducts and dryer vents in Capitol Hill row houses, Northwest condos, and Navy Yard apartments. Humidity context: [DC humidity and row-house indoor air](/blog/dc-humidity-row-houses-indoor-air). We do not claim DOEE licensure for whole-unit mold remediation on this service.',
    ],
    highlights: [
      'DOEE 10 sq ft / licensing context cited honestly',
      'Tenant notice timelines pointed to official pages',
      'Two-office dispatch across the District',
      '(571) 460-0001 · (301) 809-4544',
    ],
  },
  offersTitle: 'District flat-rate packages',
  services: {
    heading: 'What we clean in DC buildings',
    intro: 'Row-house trunks and condo laundry closets — not a substitute for licensed large-area mold remediation.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'Source-removal cleaning with photos. Health expectations per [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned). [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'DOEE home guidance stresses venting dryers outdoors; packed vents fight that. [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional duct antimicrobial',
        text: 'Hard duct surfaces after cleaning when inspection shows film. Large visible mold (≥ ~10 sq ft) generally requires DOEE-licensed professionals — [DOEE mold hub](https://doee.dc.gov/service/mold). [Our duct mold page](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'How we work jobs in Washington, DC',
    items: [
      {
        title: 'DOEE licensing context',
        text: 'DOEE lists licensed mold professionals for larger visible growth. We sell duct and dryer vent cleaning — and we say clearly when whole-unit licensed remediation is the right path.',
      },
      {
        title: 'The ~10 sq ft decision point',
        text: 'DOEE’s size threshold gives residents a concrete line between small cleanup guidance and licensed assessment/remediation.',
      },
      {
        title: 'Row-house logistics',
        text: 'Narrow streets, basement entries, and permit-parking notes collected before the truck rolls.',
      },
      {
        title: 'Closer office wins',
        text: 'Burke or Bethesda depending on your quadrant that day — same flat-rate menu.',
      },
    ],
  },
  communities: {
    heading: 'District areas we stage',
    intro: 'Quadrants and corridors; Virginia/Maryland neighbors share the same two offices.',
    groups: [
      { title: 'Northwest & Northeast', places: 'NW row houses and condos, Brookland, Petworth, Capitol Hill north edge' },
      { title: 'Capitol Hill & SE/SW', places: 'Capitol Hill, Navy Yard, Near Southeast, SW waterfront' },
      { title: 'Nearby cross-river', places: 'See also [Arlington](/locations/arlington) and [Alexandria](/locations/alexandria) for Virginia-side dispatch' },
    ],
  },
  process: {
    heading: 'Booking a District visit',
    intro: 'We ask quadrant and building type so the closer office takes it.',
    steps: [
      { title: 'Address + building', text: 'Row house, condo, or small office; parking constraints.' },
      { title: 'Scope vs DOEE licensing', text: 'Large visible mold → DOEE licensed remediation reading first. Ducts/dryer → our flat-rate scope.' },
      { title: 'Confirm price', text: 'Before equipment starts.' },
      { title: 'Clean + photos', text: 'Source removal and dryer brush-out as booked.' },
      { title: 'Handoff', text: 'Filter tips; official mold links if moisture remains; office line for your side of the river.' },
    ],
  },
  faqIntro: 'DC rules differ from VA/MD counties — links go to DOEE. Book: (571) 460-0001 or (301) 809-4544.',
  faq: [
    {
      q: 'When does DC require a licensed mold professional?',
      a: 'DOEE guidance centers on roughly **10 square feet** or more of indoor mold for licensed assessment/remediation — see [DOEE Mold](https://doee.dc.gov/service/mold). Smaller areas may follow DOEE cleanup guidance. Our duct service is not a substitute for that licensed whole-area work.',
    },
    {
      q: 'I’m a DC tenant with mold — what first?',
      a: 'Follow [Mold Information for Tenants](https://doee.dc.gov/service/mold-information-tenants): written/electronic notice to the owner and the District timelines described there. Check the live page for current complaint routing between DOEE and the Department of Buildings.',
    },
    {
      q: 'Do you hold DOEE mold remediator licenses for whole units?',
      a: 'This page sells air duct and dryer vent cleaning (optional antimicrobial on hard duct surfaces). For licensed large-area mold remediation, use DOEE’s licensed professional lists.',
    },
    {
      q: 'Which office serves my DC address?',
      a: 'Burke or Bethesda — whichever is closer that day. Call (571) 460-0001 or (301) 809-4544.',
    },
  ],
}
