import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Germantown — Town Center / Milestone / pre-2000 townhomes along I-270.
 * Links used:
 * - https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality
 * - https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold
 * - https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement
 * - https://www.montgomerycountymd.gov/DHCA/housing/landlordtenant/
 */
export const germantown: LocationContentSeed = {
  slug: 'germantown',
  title: 'Germantown Air Duct & Dryer Vent Cleaning',
  headline: 'Milestone and Town Center townhomes — party-wall dryers and corridor dust from Bethesda',
  description:
    'Air duct & dryer vent cleaning in Germantown, MD. Flat rates for townhomes & corridor homes. Photos. Call (301) 809-4544.',
  intro:
    'Germantown grew along I-270 — Milestone, Germantown Town Center, Waters Landing, Clopper Road clusters — with **1980s–2000s townhomes** whose mechanical closets sit under stairs and whose dryer vents punch through party walls. Ongoing pad construction and freeway particulate gray registers fast; Waters Landing lake air adds lower-level condensation. DEP teaches humidity and mold prevention; DHCA handles many rental housing complaints. We dispatch from Bethesda. (301) 809-4544.',
  heroImage: '/img/locations/germantown.webp',
  heroAlt: 'Air duct cleaning in Germantown, MD — Amazon Air Duct Cleaning',
  city: 'Germantown',
  state: 'MD',
  servedBy: 'bethesda',
  sectionLayout: 'processFirst',
  about: {
    heading: 'I-270 corridor townhomes and County IAQ guidance',
    paragraphs: [
      '**Germantown** is unincorporated north on 270: Milestone HOAs, Observation Drive townhome rows, and older **three-story townhomes** with tight stairwell mechanical rooms. I-270 brake dust and nearby grading projects deliver fine particulate returns catch faster than filters alone manage. If your address is inside [Gaithersburg](/locations/gaithersburg) city limits, City rental channels apply instead of DHCA for some housing complaints.',
      'Montgomery DEP [Indoor Air Quality](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality) and [mold](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold) guidance applies countywide: vent dryers outdoors, target ~30–50% humidity, change filters. Renters use [DHCA Housing Code Enforcement](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement) and [Landlord & Tenant](https://www.montgomerycountymd.gov/DHCA/housing/landlordtenant/) for maintenance disputes — we clean ducts and vents; we do not file 311 for you.',
      'Bethesda crews run Germantown with [Montgomery Village](/locations/montgomery-village) and [Clarksburg](/locations/clarksburg) on the same corridor. Building detail: [Germantown I-270 townhome air ducts](/blog/germantown-i270-townhome-air-ducts).',
    ],
    highlights: [
      'Town Center / Milestone townhome stock',
      'I-270 + construction particulate angle',
      'DEP + DHCA with clear boundaries',
      'Bethesda: (301) 809-4544',
    ],
  },
  offersTitle: 'Germantown flat-rate packages',
  services: {
    heading: 'Townhome closets, party-wall dryers, Clopper colonials',
    intro: 'Stairwell handlers and lake-adjacent lower trunks scoped on walkthrough before price locks.',
    items: [
      {
        title: 'Air duct cleaning (source removal)',
        text: 'HEPA negative pressure through supplies, returns, and boots — including corridor dust load in returns after construction phases. [EPA duct guidance](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned). [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Party-wall chases with tight bends compact lint into plugs over a few seasons. [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). Full brush-out to exterior cap. [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional antimicrobial on hard duct surfaces',
        text: 'After mechanical cleaning when inspection shows film on hard metal near cool lower trunks — not whole-unit mold remediation. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Moisture, freeway dust, and party-wall dryers here',
    items: [
      {
        title: 'Freeway + pad-site film',
        text: '270 corridor particulate and ongoing development mean heavier return loading than quiet interior county streets — scoped as normal, not a surprise surcharge.',
      },
      {
        title: 'Older townhome chases',
        text: 'Pre-2010 party-wall dryer paths were not sized for today’s dryer airflow — we verify draw at the cap, not just brush the closet end.',
      },
      {
        title: 'DHCA for rentals, DEP for habits',
        text: 'Housing complaints and [DHCA](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement); prevention science on DEP [mold/IAQ](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold) pages.',
      },
      {
        title: 'Flat rate + photos',
        text: 'Quote before agitation; before/after images; pass HOA gate codes when you schedule so access is not a surprise.',
      },
    ],
  },
  communities: {
    heading: 'Germantown clusters on the 270 corridor',
    intro: 'Gaithersburg south, Clarksburg north — neighboring pages, different center names.',
    groups: [
      {
        title: 'Milestone & Town Center',
        places: 'Milestone, Germantown Town Center, Observation Drive, Century Boulevard',
      },
      {
        title: 'Waters Landing & Clopper',
        places: 'Waters Landing, Clopper Road, Neelsville, Gunners Branch',
      },
      {
        title: 'North toward Clarksburg',
        places: 'North Germantown, Ridge Road edge, [Clarksburg](/locations/clarksburg) fringe HOAs',
      },
    ],
  },
  process: {
    heading: 'How a Bethesda → Germantown visit runs',
    intro: 'Process-first for corridor townhomes — access and dryer path before agitation.',
    steps: [
      {
        title: 'HOA gate and stair-closet access',
        text: 'Milestone and Town Center visitor rules, mechanical closet under stairs — noted before unload.',
      },
      {
        title: 'Inspect returns and party-wall dryer',
        text: 'Construction fines in returns and lint at chase elbows identified before flat rate locks.',
      },
      {
        title: 'Stage portable HEPA when needed',
        text: 'Tight parking courts get truck-adjacent portable vacuum; larger Clopper lots may use truck mount when access allows.',
      },
      {
        title: 'Source-removal ducts + optional dryer',
        text: 'Agitation under negative pressure; full-length dryer brush when on the ticket.',
      },
      {
        title: 'Photo walk-through and handoff',
        text: 'Review images together, DEP humidity reminder, book follow-up at (301) 809-4544 if needed.',
      },
    ],
  },
  faqIntro: 'Germantown corridor — DEP/DHCA links. Book: (301) 809-4544 (Bethesda).',
  faq: [
    {
      q: 'Is Germantown the same as Gaithersburg for civic housing complaints?',
      a: 'No. Inside **Gaithersburg city limits**, DHCA often lacks interior jurisdiction — see [Gaithersburg](/locations/gaithersburg). Germantown is unincorporated county; many rental mold/maintenance complaints route through [DHCA Housing Code Enforcement](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement).',
    },
    {
      q: 'Does DEP require duct cleaning after construction nearby?',
      a: 'DEP [IAQ](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality) focuses on humidity, filters, and venting dryers outside — not mandating vendors. We remove debris when you hire us and document with photos.',
    },
    {
      q: 'Why do Milestone townhome dryers clog faster?',
      a: 'Party-wall chases with tight elbows and modern high-heat dryers pack lint into solid plugs — full brush-out to the cap, with [NFPA](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines) fire risk as the honest second reason.',
    },
    {
      q: 'Waters Landing lake proximity — different scope?',
      a: 'Same flat-rate packages; lake-adjacent lower trunks may show more condensation film — walkthrough confirms, price locks before tools run.',
    },
    {
      q: 'Which office serves Germantown?',
      a: 'Bethesda, MD (7815A Old Georgetown Rd Ste 201). Call (301) 809-4544.',
    },
    {
      q: 'More on I-270 townhome ducts?',
      a: '[Germantown I-270 townhome air ducts](/blog/germantown-i270-townhome-air-ducts). Official: [Montgomery DEP mold](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold).',
    },
  ],
}
