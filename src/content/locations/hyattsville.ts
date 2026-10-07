import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Hyattsville — City Code Compliance + Arts District / Route 1.
 * Links used:
 * - https://www.hyattsville.org/rentals
 * - https://www.hyattsville.org/FAQ/Topic?topic=18
 * - https://www.princegeorgescountymd.gov/news-events/news/damaged-property-inspection-and-report
 * - https://www.princegeorgescountymd.gov/departments-offices/permitting-inspections-and-enforcement/code-enforcement
 */
export const hyattsville: LocationContentSeed = {
  slug: 'hyattsville',
  title: 'Hyattsville Air Duct Cleaning',
  headline: 'Arts-district renovations and Route 1 housing — booked from Bethesda',
  description:
    'Air duct & dryer vent cleaning in Hyattsville, MD. Flat rates for Arts District & Route 1 homes. Call (301) 809-4544.',
  intro:
    'Hyattsville is the **City of Hyattsville** — Route 1 arts corridor, Gateway mixed-use, Queens Chapel low spots. City Code Compliance licenses and inspects rentals; County DPIE rental licensing does not cover incorporated Hyattsville. If your address is in incorporated College Park, see [College Park](/locations/college-park) for City rental inspection paths. We clean ducts and dryer vents with flat rates and photos from Bethesda. (301) 809-4544.',
  heroImage: '/img/locations/hyattsville.webp',
  heroAlt: 'Air duct cleaning in Hyattsville, MD — Amazon Air Duct Cleaning',
  city: 'Hyattsville',
  state: 'MD',
  servedBy: 'bethesda',
  sectionLayout: 'whyFirst',
  about: {
    heading: 'Arts-district dust in closed walls — and City inspectors on rental complaints',
    paragraphs: [
      'The City [residential rentals program](https://www.hyattsville.org/rentals) requires annual single-family licenses and inspects apartments on a schedule — rental complaints go to **Code Compliance** (301-985-5014). [Rental FAQs](https://www.hyattsville.org/FAQ/Topic?topic=18): lease/rent disputes belong in **Prince George’s County Landlord-Tenant Court**, not City Hall. Housing-code issues start with Code Compliance; we do not file those for you.',
      'Arts District and Baltimore Avenue renovations push plaster fines into returns long after painters leave. West Hyattsville and Queens Chapel sit lower — PG humidity beads on cool basement trunks while Route 1 film mixes with shade-tree pollen. Gateway mid-rises add vertical dryer chases. Seasonal read: [Hyattsville Route 1 humidity and air ducts](/blog/hyattsville-route-1-humidity-air-ducts).',
      'County [Code Enforcement](https://www.princegeorgescountymd.gov/departments-offices/permitting-inspections-and-enforcement/code-enforcement) lists **Hyattsville** where DPIE does **not** issue rental licenses. [Damaged-property guidance](https://www.princegeorgescountymd.gov/news-events/news/damaged-property-inspection-and-report): the County does **not** provide mold or indoor air-quality testing. Bethesda runs Hyattsville with [Takoma Park](/locations/takoma-park) and [College Park](/locations/college-park).',
    ],
    highlights: [
      'City Code Compliance — not County DPIE licensing',
      'Arts District renovation + Route 1 particulate',
      'Distinct from College Park campus rentals',
      'Bethesda: (301) 809-4544',
    ],
  },
  offersTitle: 'Hyattsville flat-rate packages',
  services: {
    heading: 'Semi-detached brick, Gateway stacks, renovation residue',
    intro: '1940s Queens Chapel duplex and Gateway condo need different access plans — both scoped on site before price locks.',
    items: [
      {
        title: 'Air duct cleaning (source removal)',
        text: 'HEPA negative pressure through basement trunks, returns, and boots — including post-renovation gypsum load and corridor dust. Party-wall penetrations get checked before vacuum pressure runs. [EPA duct guidance](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned). [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Gateway risers and Baltimore Avenue foundation-wall exits both pack lint at elbows. Full brush-out to the exterior cap; fire context from [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional antimicrobial on hard duct surfaces',
        text: 'After mechanical cleaning on hard metal when inspection shows biological film — not whole-home remediation and not a substitute for fixing water intrusion. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why homeowners in Hyattsville book us',
    items: [
      {
        title: 'City rental inspections on Gallatin Street',
        text: 'Licensed rentals and housing complaints route through Hyattsville [Code Compliance](https://www.hyattsville.org/rentals). If your address is in incorporated College Park, City Code Enforcement there handles licensed rentals — different door, same flat-rate duct and dryer work from Bethesda.',
      },
      {
        title: 'Renovation dust, same flat rate',
        text: 'Arts-district remodel residue in trunks is scoped like any other residential load — quoted before equipment starts at (301) 809-4544.',
      },
      {
        title: 'Low-lying humidity + Route 1 film',
        text: 'Queens Chapel and Ager Road basements sweat through humid months; cleaning removes trunk debris — dehumidification and leak repair slow return.',
      },
      {
        title: 'Cross-county dispatch with honest ETAs',
        text: 'Bethesda to Hyattsville crosses the Beltway — we schedule a workable window for that hop and keep you posted if the day shifts.',
      },
    ],
  },
  communities: {
    heading: 'Route 1, Arts District, and neighborhood grids',
    intro: 'College Park and Takoma Park are separate location pages.',
    groups: [
      {
        title: 'Arts district & Route 1',
        places: 'Hyattsville Arts District, Route 1, Gateway, Baltimore Avenue',
      },
      {
        title: 'West Hyattsville',
        places: 'West Hyattsville, Ager Road, Queens Chapel, Metro-adjacent streets',
      },
      {
        title: 'Toward College Park & Riverdale',
        places: 'Streets toward College Park, Riverdale Park, University Park — confirm city limits when you book',
      },
    ],
  },
  process: {
    heading: 'Bethesda → Hyattsville visit flow',
    intro: 'We separate City/landlord pathways from duct and dryer scope on the walkthrough.',
    steps: [
      {
        title: 'Confirm city address',
        text: 'Hyattsville city limits vs county-edge blocks changes which civic links we mention — not the flat-rate menu.',
      },
      {
        title: 'Building era and renovation history',
        text: 'Semi-detached plaster chases, Gateway stack, or recent Arts District gut? That steers hose runs and party-wall checks.',
      },
      {
        title: 'Lock scope and price',
        text: 'Ducts, dryer vent, or both — number confirmed before tools run; antimicrobial only with your OK.',
      },
      {
        title: 'Source-removal + photos',
        text: 'Negative-pressure HEPA cleaning and full dryer brush-out when booked; images before we leave.',
      },
      {
        title: 'Handoff',
        text: 'Filter cadence, humidity reminder, dryer interval — (301) 809-4544 for follow-up.',
      },
    ],
  },
  faqIntro: 'Hyattsville booking questions — City resources linked where they help. Call (301) 809-4544 (Bethesda).',
  faq: [
    {
      q: 'Who inspects rental housing complaints in Hyattsville?',
      a: 'City [Code Compliance](https://www.hyattsville.org/rentals) (301-985-5014) investigates complaints about licensed rental homes and apartment complexes. Rent **disputes** follow County Landlord-Tenant Court per City [FAQs](https://www.hyattsville.org/FAQ/Topic?topic=18) — we do not represent you in court.',
    },
    {
      q: 'Does Prince George’s County test mold in my Hyattsville home?',
      a: 'County [damaged-property guidance](https://www.princegeorgescountymd.gov/news-events/news/damaged-property-inspection-and-report) directs residents to **private contractors** for mold and air-quality testing. We perform mechanical duct and dryer vent cleaning with photos when hired.',
    },
    {
      q: 'We just finished an Arts District renovation — when should ducts be cleaned?',
      a: 'Ideal timing is after final finishes and before furniture — but post-occupancy cleaning still removes plaster and lathe dust trapped in returns. See our [Route 1 humidity article](/blog/hyattsville-route-1-humidity-air-ducts) for moisture context.',
    },
    {
      q: 'How is this different from the College Park page?',
      a: '[College Park](/locations/college-park) centers UMD turnover, campus pollen, and City inspections on fraternity and Route 1 student housing. Hyattsville is arts-corridor brick, Gateway stacks, and Gallatin Street Code Compliance.',
    },
    {
      q: 'Which office serves Hyattsville?',
      a: 'Bethesda, MD (7815A Old Georgetown Rd Ste 201). Call (301) 809-4544.',
    },
  ],
}
