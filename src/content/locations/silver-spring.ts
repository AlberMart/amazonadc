import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Silver Spring — Montgomery DEP IAQ/mold + DHCA for rental mold (unincorporated / county jurisdiction).
 */
export const silverSpring: LocationContentSeed = {
  slug: 'silver-spring',
  title: 'Silver Spring Air Duct Cleaning',
  headline: 'Brick houses, corridor dust, and close-in Montgomery — from Bethesda',
  description:
    'Air duct & dryer vent cleaning in Silver Spring, MD. Flat rates for brick homes & urban dust. Photos. Call (301) 809-4544.',
  intro:
    'Silver Spring sits in County jurisdiction for most rental housing complaints — different from Rockville’s city code door. DEP publishes mold and IAQ science; DHCA takes many residential rental mold/maintenance complaints. We clean ducts and dryer vents from Bethesda. Call (301) 809-4544.',
  heroImage: '/img/locations/silver-spring.webp',
  heroAlt: 'Air duct cleaning in Silver Spring, MD — Amazon Air Duct Cleaning',
  city: 'Silver Spring',
  state: 'MD',
  servedBy: 'bethesda',
  sectionLayout: 'servicesFirst',
  about: {
    heading: 'Downtown dust meets County IAQ paperwork',
    paragraphs: [
      'Georgia Avenue corridors, Woodside bungalows, and downtown condos collect traffic film with canopy pollen. Older brick returns and unfinished basement handlers are common. See also [Silver Spring brick houses and urban dust](/blog/silver-spring-brick-houses-urban-dust-air-ducts).',
      'Montgomery County DEP’s [Indoor Air Quality](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality) and [mold](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold) pages emphasize humidity control (about 30–50%), venting dryers outdoors, and filter changes. For rental units, County 311 guidance steers mold complaints toward [DHCA Housing Code Enforcement](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement) rather than treating DEP as the landlord enforcer.',
      'We are not DHCA and not DEP. Bethesda crews run Silver Spring with [Wheaton](/locations/wheaton) and [Kensington](/locations/kensington) on neighboring tickets — flat-rate ducts and dryer vents with photos.',
    ],
    highlights: [
      'DHCA vs DEP roles spelled out for renters',
      'Urban dust + brick housing angle',
      'Flat-rate photo documentation',
      'Bethesda: (301) 809-4544',
    ],
  },
  offersTitle: 'Silver Spring packages',
  services: {
    heading: 'What we clean here',
    intro: 'Downtown condos and older singles use the same published rates.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'HEPA source removal through older trunks and condo systems. [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned). [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Aligned with DEP’s “vent dryers outside” mold tip; fire risk via [NFPA](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional duct antimicrobial',
        text: 'Hard surfaces after cleaning when film is present — separate from DHCA housing cases. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'What usually brings us to Silver Spring homes',
    items: [
      {
        title: 'Rental mold → DHCA / landlord steps',
        text: 'County indoor-air complaint routing sends residential rental mold toward DHCA. We clean systems you hire us for; we do not file 311 for you.',
      },
      {
        title: 'DEP teaches prevention',
        text: 'Humidity bands and exhaust habits are public guidance — good handoff tips after a cleaning visit.',
      },
      {
        title: 'Brick + corridor particulate',
        text: 'Georgia Avenue traffic film and brick returns load faster here — worth inspecting filters more often and booking source removal when registers stay gray.',
      },
      {
        title: 'Flat rate from Bethesda',
        text: 'Number confirmed before agitation; photos at close-out.',
      },
    ],
  },
  communities: {
    heading: 'Silver Spring clusters',
    intro: 'Downtown core and residential grids on the Bethesda list.',
    groups: [
      { title: 'Downtown & Fenton', places: 'Downtown Silver Spring, Fenton corridor, Veterans Plaza-adjacent' },
      { title: 'Woodside & north', places: 'Woodside, 16th Street corridor, Forest Glen-adjacent' },
      { title: 'East & west edges', places: 'Takoma-adjacent edges, Four Corners-adjacent, Lyttonsville-adjacent' },
    ],
  },
  process: {
    heading: 'Bethesda → Silver Spring',
    intro: 'Parking and loading notes matter downtown.',
    steps: [
      { title: 'Access', text: 'Meter, garage, or alley — send it with the booking.' },
      { title: 'Scope', text: 'Ducts, dryer, or both; flat rate locked first.' },
      { title: 'Clean + photos', text: 'Source removal and dryer brush-out as booked.' },
      { title: 'Handoff', text: 'DEP-style humidity/filter tips; (301) 809-4544.' },
    ],
  },
  faqIntro: 'MoCo DEP + DHCA context. Book: (301) 809-4544.',
  faq: [
    {
      q: 'Who handles mold in my Silver Spring rental?',
      a: 'For many residential rentals, [DHCA Code Enforcement](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement) is the housing complaint door. DEP publishes [IAQ/mold guidance](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold) but is not a substitute for landlord/DHCA processes.',
    },
    {
      q: 'Will cleaning ducts close a DHCA case?',
      a: 'Not by itself. DHCA looks at housing conditions; we document duct/vent cleaning with photos if you hire us.',
    },
    {
      q: 'What humidity should I target?',
      a: 'Montgomery DEP cites roughly **30–50%** RH on its IAQ pages.',
    },
    {
      q: 'Which office serves Silver Spring?',
      a: 'Bethesda, MD. Call (301) 809-4544.',
    },
  ],
}
