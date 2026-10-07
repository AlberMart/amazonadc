import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Takoma Park — Tree City bungalows, DC border, MoCo DEP + DHCA.
 * Links used:
 * - https://www.montgomerycountymd.gov/DEP/air/indoor-air.html
 * - https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold
 * - https://www.montgomerycountymd.gov/DHCA/housing/landlordtenant/
 * - https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement
 */
export const takomaPark: LocationContentSeed = {
  slug: 'takoma-park',
  title: 'Takoma Park Air Duct Cleaning',
  headline: 'Bungalows and crawl-space humidity near the DC line — from Bethesda',
  description:
    'Air duct & dryer vent cleaning in Takoma Park, MD. Flat rates for bungalows & crawl-space retrofits. Call (301) 809-4544.',
  intro:
    'Takoma Park’s “Tree City” canopy is not marketing — it shapes what returns pull in: leaf debris, organic dust, and crawl-space moisture under Carroll Avenue bungalows where central air was retrofitted through plaster and tight crawl bays. The DC line and Sligo Creek watershed add humidity without Bethesda’s condo stacks. DEP publishes IAQ guidance; DHCA handles many rental complaints. Bethesda crews know the one-ways. (301) 809-4544.',
  heroImage: '/img/locations/takoma-park.webp',
  heroAlt: 'Air duct cleaning in Takoma Park, MD — Amazon Air Duct Cleaning',
  city: 'Takoma Park',
  state: 'MD',
  servedBy: 'bethesda',
  sectionLayout: 'offersLate',
  about: {
    heading: 'Bungalow crawl spaces — border humidity and field-fit trunks',
    paragraphs: [
      'Silver Spring pages emphasize downtown brick and Georgia Avenue film; Takoma Park emphasizes **Old Takoma, Takoma Junction, Carroll and Laurel Avenues** — early-1900s bungalows and duplexes where ductwork was field-fit decades after original construction. Shallow crawls hold moisture into fall; handlers mounted there develop coil and plenum film faster than above-grade closets.',
      'Dryer vents routed through enclosed porches, mudrooms, and rear additions create multi-bend runs invisible from the laundry nook. Montgomery DEP [Indoor Air Quality](https://www.montgomerycountymd.gov/DEP/air/indoor-air.html) and [mold](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold) pages stress humidity bands, exhausting dryers outdoors, and filter maintenance — paired with [NFPA](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines) fire context for packed vents.',
      'Renters use [Landlord & Tenant](https://www.montgomerycountymd.gov/DHCA/housing/landlordtenant/) and [DHCA Code Enforcement](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement) when maintenance is disputed — we clean booked trunks and vents from [Bethesda](/locations/bethesda). Read [Takoma Park bungalow humidity and air ducts](/blog/takoma-park-bungalow-humidity-air-ducts).',
    ],
    highlights: [
      'Tree City canopy + crawl-space retrofits',
      'DC-border streets the crew navigates weekly',
      'DEP IAQ + DHCA rental links',
      '(301) 809-4544',
    ],
  },
  offersTitle: 'Takoma Park bungalow packages',
  services: {
    heading: 'Cleaning retrofitted bungalow systems',
    intro: 'Crawl entry and plaster-wall supplies are scoped before pricing — flat rate still locks before agitation.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'HEPA negative pressure through crawl trunks, floor registers in original hardwood, and return plenums. [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned). [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Trace porch and addition routes to exterior caps — full brush-out and draw test. [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional duct antimicrobial',
        text: 'Hard metal after mechanical cleaning when crawl humidity left biological film — not whole-home remediation. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why Takoma Park trunks hold organic debris year-round',
    items: [
      {
        title: 'Canopy debris is continuous',
        text: 'Tree City shade feeds returns from spring through late fall — not a single pollen week.',
      },
      {
        title: 'Crawl spaces and tight joist bays',
        text: 'Many Takoma Park bungalows run horizontal duct through joist bays and crawl handlers — we scope access before the flat rate locks.',
      },
      {
        title: 'Joint-by-joint on retrofits',
        text: 'Field-fit connections checked before vacuum seal — leaky bays noted on the walk.',
      },
      {
        title: 'Border-city logistics',
        text: 'Carroll one-ways and Junction parking planned on the work order — flat rate from (301) 809-4544.',
      },
    ],
  },
  communities: {
    heading: 'Takoma Park streets from Bethesda',
    intro: 'Hyattsville east, Silver Spring north — this page stays bungalow-focused.',
    groups: [
      {
        title: 'Old Takoma & Carroll Avenue',
        places: 'Old Takoma, Carroll Avenue, Takoma Park Historic District, Ethan Allen',
      },
      {
        title: 'Takoma Junction',
        places: 'Takoma Junction, Laurel Avenue, Metro-adjacent blocks toward the DC line',
      },
      {
        title: 'Long Branch & county edge',
        places: 'Long Branch, New Hampshire Avenue edge, streets toward Silver Spring and Hyattsville',
      },
    ],
  },
  process: {
    heading: 'Bethesda → Takoma Park bungalow visit',
    intro: 'Crawl clearance and dryer path tracing come first.',
    steps: [
      { title: 'Crawl / handler access', text: 'Note hatch size, finished-room paths, and pets — bungalow crawls are tighter than Burke basements.' },
      { title: 'Dryer path mapped', text: 'Porch and addition bends included on the scope sheet.' },
      { title: 'Package locked', text: 'Flat residential rate before hoses run.' },
      { title: 'Source removal + photos', text: 'Negative-pressure agitation; trunk images before we leave.' },
      { title: 'Handoff', text: 'DEP humidity reminder; (301) 809-4544 for combo booking.' },
    ],
  },
  faqIntro: 'Takoma Park Tree City housing — (301) 809-4544 (Bethesda).',
  faq: [
    {
      q: 'Is Takoma Park the same as Silver Spring for rental complaints?',
      a: 'Many Takoma Park rentals use [DHCA Code Enforcement](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement) after landlord notice. Bungalow crawl-space housing and tight joist-bay ducts are the usual scope we quote here.',
    },
    {
      q: 'Does the City of Takoma Park clean ducts?',
      a: 'No municipal duct service — DEP [IAQ](https://www.montgomerycountymd.gov/DEP/air/indoor-air.html) educates on humidity and ventilation. We are a private flat-rate cleaner from Bethesda.',
    },
    {
      q: 'How long for one bungalow system?',
      a: 'Most single-handler bungalows run about **2–3 hours** — packed crawl access or long dryer paths are scoped before agitation so the flat rate stays locked.',
    },
    {
      q: 'Can ducts and dryer be one visit?',
      a: 'Yes — book the combo up front on (301) 809-4544 so both tool sets ride from Bethesda.',
    },
    {
      q: 'Walk to DC — which office?',
      a: 'Many DC-adjacent addresses still dispatch from Bethesda for Maryland-side Takoma Park; pure DC pages: [Washington, DC](/locations/washington-dc). Virginia: [Burke](/locations/burke).',
    },
  ],
}
