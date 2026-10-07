import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Montgomery Village — 1970s planned community (Stedwick / Whetstone / lakes), not Kentlands-style new urbanism.
 * Links used:
 * - https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality
 * - https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold
 * - https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement
 * - https://www.montgomerycountymd.gov/DHCA/housing/landlordtenant/
 */
export const montgomeryVillage: LocationContentSeed = {
  slug: 'montgomery-village',
  title: 'Montgomery Village Air Duct Cleaning',
  headline: '1970s planned courts and lake-edge townhomes — Bethesda dispatch',
  description:
    'Air duct & dryer vent cleaning in Montgomery Village, MD. Flat rates for townhomes & lakeside homes. Call (301) 809-4544.',
  intro:
    'Montgomery Village is a master-planned 1970s community — Stedwick, Whetstone, East Village, Lakeforest — with original townhome mechanical closets and party-wall dryer runs that modern dryers outgrow. Lake Whetstone and Lake Marion keep lower trunks damper than upland Gaithersburg pads. County DEP publishes humidity and mold-prevention science; DHCA handles many rental housing complaints in unincorporated Montgomery. We clean ducts and dryer vents from Bethesda with photos, not municipal enforcement. (301) 809-4544.',
  heroImage: '/img/locations/montgomery-village.webp',
  heroAlt: 'Air duct cleaning in Montgomery Village, MD — Amazon Air Duct Cleaning',
  city: 'Montgomery Village',
  state: 'MD',
  servedBy: 'bethesda',
  sectionLayout: 'communitiesFirst',
  about: {
    heading: 'Planned-village housing stock — and County IAQ pages that actually apply here',
    paragraphs: [
      'Montgomery Village was laid out as a **planned village** in the late 1960s–1980s: courts off Montgomery Village Avenue, townhome blocks in Stedwick and Whetstone, and later infill toward Lakeforest. Original HVAC was sized for smaller furnaces and shorter dryer paths. Fifty years of Montgomery pollen, pets, and lake-proximity humidity left film inside trunks that filters never pull back out.',
      'Montgomery DEP’s [Indoor Air Quality](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality) and [mold](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold) guidance pushes roughly 30–50% humidity, venting dryers outdoors, and filter maintenance — habits that matter when Lake Whetstone keeps basement-level metal cool through humid months. Renters in village townhomes may use [DHCA Housing Code Enforcement](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement) and [Landlord & Tenant](https://www.montgomerycountymd.gov/DHCA/housing/landlordtenant/) resources when moisture or maintenance is disputed; we are not DHCA inspectors.',
      'We dispatch from [Bethesda](/locations/bethesda) with [Germantown](/locations/germantown) north and Gaithersburg south on the same I-270 rotation. Building-specific detail: [Montgomery Village townhomes and air ducts](/blog/montgomery-village-townhomes-air-ducts).',
    ],
    highlights: [
      '1970s planned courts and party-wall chases',
      'DEP IAQ + DHCA cited with clear scope limits',
      'Lake Whetstone / Marion moisture angle',
      'Bethesda: (301) 809-4544',
    ],
  },
  offersTitle: 'Montgomery Village flat-rate packages',
  services: {
    heading: 'Scopes for original townhome trunks and lake-side lower levels',
    intro:
      'Stedwick end-units and Whetstone interior townhomes share the same era of duct layout — the walkthrough confirms party-wall dryer bends before we lock price.',
    items: [
      {
        title: 'Air duct cleaning (source removal)',
        text: 'HEPA negative pressure on the trunk, agitation through supplies and returns, registers included. [EPA duct guidance](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) cautions against health overclaims — we remove debris and show photos. [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Original party-wall chases with tight elbows pack lint faster than modern high-BTU dryers expect. DEP mold tips include venting dryers outdoors; fire risk is the other honest driver — [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). Full brush-out to the cap. [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional antimicrobial on hard duct surfaces',
        text: 'After mechanical cleaning, EPA-registered product on hard metal when inspection shows biological film — not whole-home mold remediation and not a substitute for fixing water intrusion DEP describes. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why village townhomes are their own duct story',
    items: [
      {
        title: 'Village courts and HOA maps',
        text: 'Montgomery Village is unincorporated county with village association maps — we quote planned-community access notes (courts, shared parking) on the work order.',
      },
      {
        title: 'Lake microclimate loads lower trunks',
        text: 'Lakeside blocks condensate on cool supply metal while upland townhomes on the same zip may feel drier. Cleaning removes accumulated film; DEP humidity habits slow how fast it returns.',
      },
      {
        title: 'DHCA for rentals — DEP for science',
        text: 'Rental mold/maintenance complaints often route through [DHCA](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement); DEP [IAQ/mold](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold) teaches prevention. Duct cleaning does not pause landlord timelines.',
      },
      {
        title: 'Flat rate + photos from Bethesda',
        text: 'Price locked before agitation; before/after images at close-out. Mention Lost Knife / Centerway parking limits when you book so we plan around them.',
      },
    ],
  },
  communities: {
    heading: 'Village centers we stage from Bethesda',
    intro:
      'Same published packages; different court access — Stedwick loops vs Lakeforest cul-de-sacs vs East Village townhome rows.',
    groups: [
      {
        title: 'Stedwick & Whetstone cores',
        places: 'Stedwick, Whetstone, Montgomery Village Avenue courts, original village centers',
      },
      {
        title: 'East Village & Lakeforest',
        places: 'East Village, Lakeforest, Lost Knife Road, Centerway, village retail edge',
      },
      {
        title: 'The lakes & north corridor',
        places:
          'Lake Whetstone, Lake Marion, streets toward [Germantown](/locations/germantown) — ask if your court is not listed',
      },
    ],
  },
  process: {
    heading: 'Bethesda → Montgomery Village visit flow',
    intro: 'We ask about townhome party-wall dryer access and basement handler location before tools run.',
    steps: [
      {
        title: 'Building era and laundry path',
        text: '1970s mechanical closet vs later colonial infill? Party-wall dryer chase or exterior wall cap? That sets hose runs — not the flat-rate menu.',
      },
      {
        title: 'Separate housing disputes from duct scope',
        text: 'Active leak or DHCA complaint stays on the County/landlord path. We scope ducts and dryer vents you want cleaned today.',
      },
      {
        title: 'Confirm price before agitation',
        text: 'Ducts, dryer vent, or both — number locked before equipment starts; antimicrobial only with your OK.',
      },
      {
        title: 'Source-removal + photos',
        text: 'Negative-pressure HEPA cleaning, full dryer brush-out when booked, before/after images before we leave.',
      },
      {
        title: 'Handoff aligned with DEP habits',
        text: 'Filter interval, humidity reminder (~30–50% per County IAQ), dryer-vent cadence — plus (301) 809-4544 for follow-up.',
      },
    ],
  },
  faqIntro:
    'Montgomery Village — planned community, County DEP/DHCA links where they help. Book: (301) 809-4544 (Bethesda).',
  faq: [
    {
      q: 'Is Montgomery Village the same as Gaithersburg Kentlands for duct layouts?',
      a: 'Kentlands in Gaithersburg is a different build era and street grid. Montgomery Village is 1970s planned courts with original townhome trunks and party-wall dryer chases — lake humidity and court parking notes apply here.',
    },
    {
      q: 'Does Montgomery County DEP inspect my ducts or order cleaning?',
      a: 'DEP [IAQ](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality) and [mold](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold) pages teach humidity control, venting dryers outdoors, and maintenance — they do not endorse vendors or perform duct cleaning. We are a private flat-rate service with photos.',
    },
    {
      q: 'I rent a Stedwick townhome — who handles mold as a housing issue?',
      a: 'Many rental complaints in unincorporated Montgomery go through [DHCA Housing Code Enforcement](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement) after landlord notice. Duct cleaning can help when trunks hold debris, but it does not fix water intrusion or replace landlord remediation duties.',
    },
    {
      q: 'Why do lake-adjacent blocks feel “muggier” in the ducts?',
      a: 'Lake Whetstone and Lake Marion keep nearby lower levels cooler and damper through summer — condensation on supply metal binds pollen and household dust into film. DEP humidity guidance applies; mechanical cleaning removes what is already inside.',
    },
    {
      q: 'Which office serves Montgomery Village?',
      a: 'Bethesda, MD (7815A Old Georgetown Rd Ste 201). Call (301) 809-4544. Combined duct + dryer packages are available when both are booked up front.',
    },
    {
      q: 'Where can I read more about village-era dryer chases?',
      a: 'Our article on [Montgomery Village townhomes and air ducts](/blog/montgomery-village-townhomes-air-ducts). Official context: [Montgomery DEP Indoor Air Quality](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality).',
    },
  ],
}
