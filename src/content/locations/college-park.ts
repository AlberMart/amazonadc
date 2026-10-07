import type { LocationContentSeed } from '@/utilities/locations'

/**
 * College Park — City rental inspections + UMD turnover; PG County DPIE licensing excludes incorporated College Park.
 * Links used:
 * - https://www.collegeparkmd.gov/renting
 * - https://www.collegeparkmd.gov/dps
 * - https://www.princegeorgescountymd.gov/news-events/news/damaged-property-inspection-and-report
 * - https://www.princegeorgescountymd.gov/departments-offices/permitting-inspections-and-enforcement/code-enforcement
 * - https://www.princegeorgescountymd.gov/departments-offices/health/environmental-health/lead-poisoning/childhood-lead-and-asthma
 */
export const collegePark: LocationContentSeed = {
  slug: 'college-park',
  title: 'Air Duct & Dryer Vent Cleaning in College Park, MD',
  headline: 'Campus-area rentals and Route 1 housing — flat-rate cleaning from Bethesda',
  description:
    'Air duct & dryer vent cleaning in College Park, MD. Flat rates for UMD rentals & Route 1 homes. Photos. Call (301) 809-4544.',
  intro:
    'College Park is its own incorporated city wrapped around UMD. City Code Enforcement inspects licensed rentals; Prince George’s County says it does not provide mold or indoor air quality testing for homes — and County DPIE rental licensing does not replace City permits here. We clean ducts and dryer vents between tenant cycles and for owner-occupants with flat rates and photos. Bethesda dispatch: (301) 809-4544.',
  heroImage: '/img/locations/college-park.webp',
  heroAlt: 'Air duct cleaning in College Park, MD — Amazon Air Duct Cleaning',
  city: 'College Park',
  state: 'MD',
  servedBy: 'bethesda',
  sectionLayout: 'processFirst',
  about: {
    heading: 'Campus rentals, City inspections, and pollen that outlasts one semester',
    paragraphs: [
      'The [City renting hub](https://www.collegeparkmd.gov/renting) requires most rentals — apartments, rooming houses, fraternities and sororities — to hold a Residential Occupancy Permit and pass **annual housing inspections**. [Department of Public Services](https://www.collegeparkmd.gov/dps) may verify tenant housing-code complaints. That process covers life-safety and maintenance; it is not a duct-cleaning order and does not replace fixing water intrusion first.',
      'UMD-edge housing runs hard: shared rentals, skipped filters through a school year, stacked Route 1 laundry, and campus oak/tulip-poplar pollen from March through June. Old Town, Berwyn, Hollywood, Calvert Hills, and College Park Woods add Baltimore Avenue traffic film. Seasonal read: [College Park rentals, pollen, and air ducts](/blog/college-park-rentals-pollen-air-ducts).',
      'Prince George’s [Code Enforcement](https://www.princegeorgescountymd.gov/departments-offices/permitting-inspections-and-enforcement/code-enforcement) lists **College Park** where County DPIE does **not** issue single-family rental licenses — City licensing applies. County [damaged-property guidance](https://www.princegeorgescountymd.gov/news-events/news/damaged-property-inspection-and-report) states the County does **not** provide mold or air-quality testing. [Lead and Healthy Homes](https://www.princegeorgescountymd.gov/departments-offices/health/environmental-health/lead-poisoning/childhood-lead-and-asthma) offers phone consults on mold/asthma triggers for children — we are not that program. Dispatch from [Bethesda](/locations/bethesda).',
    ],
    highlights: [
      'City rental inspections — not County DPIE licensing',
      'UMD turnover + campus pollen angle',
      'County honesty: no public mold/air testing',
      'Bethesda: (301) 809-4544',
    ],
  },
  offersTitle: 'College Park flat-rate packages',
  services: {
    heading: 'What we clean for landlords and owner-occupants',
    intro:
      'Between-tenant resets and routine maintenance share the published menu — property managers can batch move-out windows.',
    items: [
      {
        title: 'Air duct cleaning (source removal)',
        text: 'HEPA negative pressure on the trunk, agitation through supplies and returns, registers included. [EPA duct guidance](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) cautions against health overclaims — we remove debris and show photos. [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Multi-unit laundry risers and heavy student-week loads pack lint before the dryer feels slow — fire risk is the other honest driver per [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). Full brush-out to the exterior cap. [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional antimicrobial on hard duct surfaces',
        text: 'After mechanical cleaning, EPA-registered product on hard metal when inspection shows biological film — not whole-home mold remediation and not a substitute for landlord moisture repair. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why landlords and owners in College Park book us',
    items: [
      {
        title: 'City housing complaints first',
        text: 'Licensed rentals and tenant complaints route through City [Public Services / Code Enforcement](https://www.collegeparkmd.gov/dps) — report via [Tell Us](https://www.collegeparkmd.gov/tellus) or the Code hotline (240-487-3588). We do not file City complaints or pass inspections for you.',
      },
      {
        title: 'County mold testing is not free',
        text: 'PG County’s [damaged-property FAQ](https://www.princegeorgescountymd.gov/news-events/news/damaged-property-inspection-and-report) directs residents to **private contractors** for mold identification and air-quality testing. Our visit is mechanical source removal with photos — not a County certificate.',
      },
      {
        title: 'Turnover debris, flat rate',
        text: 'A rental that skipped filters for four academic years quotes the same published package as a maintained Berwyn colonial — no “neglect surcharge.”',
      },
      {
        title: 'Photo documentation for files',
        text: 'Before/after images can sit in turnover packets or owner records; they document duct condition at the visit, not City code compliance.',
      },
    ],
  },
  communities: {
    heading: 'Campus edge, Berwyn, and Route 1 corridors',
    intro: 'College Park city addresses — tell us your neighborhood when you book from Bethesda.',
    groups: [
      {
        title: 'Campus & Route 1',
        places: 'UMD edge, Route 1, Old Town College Park, Baltimore Avenue apartments',
      },
      {
        title: 'Berwyn & Hollywood',
        places: 'Berwyn, Hollywood, Calvert Hills, College Park Woods',
      },
      {
        title: 'Toward Greenbelt & Riverdale',
        places: 'Streets toward Greenbelt, Riverdale Park, University Park — ask if your block is not listed',
      },
    ],
  },
  process: {
    heading: 'Bethesda → College Park visit flow',
    intro: 'Logistics for campus parking, rental turnover windows, and scope separated from City housing cases.',
    steps: [
      {
        title: 'Building type and turnover timing',
        text: 'Fraternity house, four-bedroom rental, or owner-occupied split? Move-out windows and basement handlers change hose runs — not the flat-rate menu.',
      },
      {
        title: 'Separate housing disputes from duct scope',
        text: 'Active City code complaint or unresolved leak stays on the landlord/City path. We scope ducts and dryer vents you want cleaned today.',
      },
      {
        title: 'Lock price before tools run',
        text: 'Ducts, dryer vent, or both — number confirmed before agitation; antimicrobial only with your OK.',
      },
      {
        title: 'Source-removal + photos',
        text: 'Negative-pressure HEPA cleaning and full dryer brush-out when booked; images before we leave.',
      },
      {
        title: 'Handoff',
        text: 'Filter interval, humidity reminder, and when to revisit the dryer vent — plus (301) 809-4544 for follow-up.',
      },
    ],
  },
  faqIntro: 'College Park booking questions — City vs County linked where it helps. Call (301) 809-4544 (Bethesda).',
  faq: [
    {
      q: 'Does Prince George’s County license rentals in College Park?',
      a: 'No — County [Code Enforcement](https://www.princegeorgescountymd.gov/departments-offices/permitting-inspections-and-enforcement/code-enforcement) lists **College Park** among municipalities with **local** rental licensing. See the City’s [renting page](https://www.collegeparkmd.gov/renting) and [Public Services housing inspections](https://www.collegeparkmd.gov/dps).',
    },
    {
      q: 'Will the County test mold in my UMD-area rental?',
      a: 'County [damaged-property guidance](https://www.princegeorgescountymd.gov/news-events/news/damaged-property-inspection-and-report) states the County does **not** provide mold or indoor air-quality testing — private contractors perform that work if you choose it. We clean debris from ducts and vents when hired.',
    },
    {
      q: 'I’m a landlord between tenants — what should I book?',
      a: 'Many managers book combined duct + [dryer vent cleaning](/dryer-vent-cleaning) before the next lease. Same flat-rate packages as owner-occupants; mention move-out date when you call (301) 809-4544.',
    },
    {
      q: 'How is this page different from Hyattsville?',
      a: 'Hyattsville is [its own city page](/locations/hyattsville) — arts-district renovations and City Code Compliance on Gallatin Street. College Park centers UMD turnover, campus pollen, and City rental inspections on Baltimore Avenue.',
    },
    {
      q: 'Which office serves College Park?',
      a: 'Bethesda, MD (7815A Old Georgetown Rd Ste 201). Call (301) 809-4544. Combined duct + dryer packages available when both are booked up front.',
    },
    {
      q: 'Where can I read more about campus pollen and ducts?',
      a: '[College Park rentals, pollen, and air ducts](/blog/college-park-rentals-pollen-air-ducts). Official rental context: [College Park renting](https://www.collegeparkmd.gov/renting).',
    },
  ],
}
