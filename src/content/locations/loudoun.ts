import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Loudoun County — County IAQ (radon/lead/asbestos desk) + VDH mold + construction dust.
 * Links used:
 * - https://www.loudoun.gov/1287/Indoor-Air-Quality-Safety
 * - https://www.vdh.virginia.gov/environmental-health/public-health-toxicology/mold/
 * - https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned
 * - https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines
 */
export const loudoun: LocationContentSeed = {
  slug: 'loudoun',
  title: 'Loudoun County Air Duct Cleaning',
  headline: 'Ashburn, Leesburg, and Sterling — construction dust and basement humidity from Burke',
  description:
    'Air duct & dryer vent cleaning in Loudoun County, VA. Flat rates for Leesburg, Ashburn & Sterling. Call (571) 460-0001.',
  intro:
    'Loudoun County’s [Indoor Air Quality & Safety](https://www.loudoun.gov/1287/Indoor-Air-Quality-Safety) page steers residents toward radon, lead, and asbestos resources — not a county mold-testing hotline. For mold, Virginia Department of Health toxicology guidance applies. Meanwhile Ashburn and Sterling keep adding data-center and residential construction; fine dust in returns is routine. We clean ducts and dryer vents with flat rates and photos from Burke. (571) 460-0001.',
  heroImage: '/img/locations/loudoun.webp',
  heroAlt: 'Air duct cleaning in Loudoun County, VA — Amazon Air Duct Cleaning',
  city: 'Loudoun',
  state: 'VA',
  servedBy: 'burke',
  sectionLayout: 'offersLate',
  about: {
    heading: 'County IAQ referrals, VDH mold, and two eras of housing',
    paragraphs: [
      'Loudoun is split personalities: historic Leesburg basements near Goose Creek with retrofitted trunks and damp summers, and Ashburn–Broadlands–Brambleton belts of townhomes occupied while the next phase was still cutting drywall. Builder fines sit in supply runs for years if nobody cleaned after certificate of occupancy. Sterling and the Dulles Toll Road add traffic and data-center construction particulate on top of Piedmont pollen.',
      'The County’s [Indoor Air Quality & Safety](https://www.loudoun.gov/1287/Indoor-Air-Quality-Safety) program focuses on hazards like radon, lead, and asbestos — useful when you need those pathways, but **not** a substitute for hiring duct cleaning or a mold remediator. For mold questions statewide, [VDH mold guidance](https://www.vdh.virginia.gov/environmental-health/public-health-toxicology/mold/) explains health framing and moisture control. We cite both so you do not confuse county IAQ referrals with our mechanical scope.',
      'We dispatch from [Burke](/locations/burke) with realistic Toll Road windows — closer Dulles-edge towns also appear on [Herndon](/locations/herndon) and [Chantilly](/locations/chantilly) routes. We are private technicians, not Loudoun County inspectors.',
    ],
    highlights: [
      'County IAQ page scoped honestly (radon/lead/asbestos — not mold lab)',
      'VDH mold link for statewide context',
      'Leesburg vs Ashburn housing mix',
      'Burke: (571) 460-0001',
    ],
  },
  offersTitle: 'Loudoun County flat-rate packages',
  services: {
    heading: 'Duct and dryer services across Loudoun',
    intro: 'New-build drywall dust and Leesburg basement moisture — same published packages.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'Source removal under HEPA negative pressure through supplies, returns, and registers. [EPA duct guidance](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) keeps health claims measured — we show photos of debris removed. [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Two-story Ashburn and South Riding townhomes pack vertical chases before owners notice longer dry times. [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional duct antimicrobial',
        text: 'EPA-registered product on hard metal after mechanical cleaning when inspection supports it — not county IAQ testing and not whole-home mold remediation per [VDH mold](https://www.vdh.virginia.gov/environmental-health/public-health-toxicology/mold/). [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'How we work jobs in Loudoun County',
    items: [
      {
        title: 'County IAQ desk vs duct cleaning',
        text: 'Call [Indoor Air Quality & Safety](https://www.loudoun.gov/1287/Indoor-Air-Quality-Safety) for radon/lead/asbestos program info — not for a duct-cleaning certificate.',
      },
      {
        title: 'Construction dust is expected',
        text: 'HOA phases and data-center adjacency mean fine dust in returns — we inspect and clean, we do not blame “unusual layout” for price changes.',
      },
      {
        title: 'Drive time baked into scheduling',
        text: 'Toll Road traffic can stretch the day; we plan Loudoun routes from Burke and stay in touch so you are not left guessing.',
      },
      {
        title: 'Flat rate before tools run',
        text: 'Large Ashburn footprints and Leesburg basements scoped on walkthrough — number locked before agitation.',
      },
    ],
  },
  communities: {
    heading: 'Loudoun areas we schedule from Burke',
    intro: 'County overview — name your HOA when booking for gate codes.',
    groups: [
      {
        title: 'Leesburg & west',
        places: 'Leesburg, Lansdowne, Belmont, University Drive area, Purcellville edge',
      },
      {
        title: 'Ashburn & Broadlands',
        places: 'Ashburn, Broadlands, Brambleton, Moorefield, One Loudoun',
      },
      {
        title: 'Sterling, Dulles & south',
        places: 'Sterling, Dulles, South Riding, Lenah, Chantilly edge',
      },
    ],
  },
  process: {
    heading: 'Burke → Loudoun visit flow',
    intro: 'Longer drive — confirm combined duct + dryer up front when possible.',
    steps: [
      {
        title: 'Book with location detail',
        text: 'Leesburg historic vs Ashburn new-build changes access notes — not the menu price.',
      },
      {
        title: 'Walkthrough',
        text: 'Returns, trunk access, packed dryer path — especially post-renovation dust.',
      },
      {
        title: 'Confirm flat rate',
        text: 'Locked before equipment runs; antimicrobial with your OK only.',
      },
      {
        title: 'Source-removal + photos',
        text: 'Full-system duct cleaning and dryer brush-out when booked.',
      },
      {
        title: 'Handoff',
        text: 'When to call County IAQ vs VDH mold resources vs us for follow-up duct work — (571) 460-0001.',
      },
    ],
  },
  faqIntro: 'Loudoun County — IAQ desk vs VDH mold vs our scope. Book: (571) 460-0001 (Burke).',
  faq: [
    {
      q: 'Will Loudoun County test mold in my Ashburn townhome?',
      a: 'The County [Indoor Air Quality & Safety](https://www.loudoun.gov/1287/Indoor-Air-Quality-Safety) page centers radon, lead, asbestos, and related programs — not a mold testing desk. See [VDH mold guidance](https://www.vdh.virginia.gov/environmental-health/public-health-toxicology/mold/) for mold framing. We clean ducts and dryer vents mechanically with photos.',
    },
    {
      q: 'We moved into new construction — why are ducts dirty?',
      a: 'Builder drywall and trim dust often enters returns when the HVAC ran during build-out. Source-removal cleaning is common post-occupancy; it is separate from county IAQ programs.',
    },
    {
      q: 'Does duct cleaning fix radon?',
      a: 'No. Radon pathways are covered under [Indoor Air Quality & Safety](https://www.loudoun.gov/1287/Indoor-Air-Quality-Safety). We do not perform radon mitigation — we remove debris from HVAC ducts and lint from dryer vents.',
    },
    {
      q: 'Why cite EPA and NFPA?',
      a: '[EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) and [NFPA](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines) anchor honest expectations on debris removal and dryer fire risk.',
    },
    {
      q: 'How far ahead should I book Loudoun?',
      a: 'Allow several days for Toll Road drive windows from Burke. Call (571) 460-0001 for the next open Loudoun slot.',
    },
  ],
}
