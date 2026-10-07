import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Potomac — river-canopy estates, multi-zone humidity.
 * Links used:
 * - https://www.montgomerycountymd.gov/DEP/air/indoor-air.html
 * - https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold
 * - https://www.montgomerycountymd.gov/DHCA/housing/landlordtenant/
 */
export const potomac: LocationContentSeed = {
  slug: 'potomac',
  title: 'Potomac MD Air Duct Cleaning',
  headline: 'Tree-canopy estates and long trunks — River Road routes from Bethesda',
  description:
    'Air duct & dryer vent cleaning in Potomac, MD. Flat rates for large-lot canopy homes. Photos included. Call (301) 809-4544.',
  intro:
    'Potomac is Montgomery’s wooded western edge — half-acre to multi-acre lots under oak and poplar, long supply runs through crawl spaces, and Potomac River dew point keeping lower levels cool and damp. Multi-zone systems can hide a neglected trunk while another zone feels fine. DEP publishes humidity and mold-prevention science; we scope every zone and clean with photos from River Road. (301) 809-4544.',
  heroImage: '/img/locations/potomac.webp',
  heroAlt: 'Air duct cleaning in Potomac, MD — Amazon Air Duct Cleaning',
  city: 'Potomac',
  state: 'MD',
  servedBy: 'bethesda',
  sectionLayout: 'communitiesFirst',
  about: {
    heading: 'Canopy estates — long trunks and river humidity',
    paragraphs: [
      'Potomac centers **Falls Road, Cabin John, Avenel, Travilah**, and Potomac Village — large footprints where one air handler may feed fifty-plus feet of trunk through landscaping and between-floor chases. Spring canopy pollen here is among the heaviest in the county; river proximity elevates summer dew point so crawl-space and lower-level metal condensates longer than open-sky subdivisions.',
      'Montgomery DEP’s [Indoor Air Quality](https://www.montgomerycountymd.gov/DEP/air/indoor-air.html) and [mold](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold) guidance recommends humidity control, venting dryers outdoors, and maintenance habits that matter more when shade keeps basements cold. Renters in rare duplex or ADU situations should use [Landlord & Tenant](https://www.montgomerycountymd.gov/DHCA/housing/landlordtenant/) paths for housing disputes — duct cleaning does not replace leak repair.',
      'We dispatch from [Bethesda](/locations/bethesda) via River Road — often faster than cross-county highway runs. Virginia mirror across the river: [Great Falls](/locations/great-falls) from Burke. Local moisture reading: [Potomac tree canopy humidity and air ducts](/blog/potomac-tree-canopy-humidity-air-ducts).',
    ],
    highlights: [
      'Cabin John / Falls Road / Avenel estate trunks',
      'Multi-zone scope — one residential package discipline',
      'DEP humidity + dryer-venting guidance cited',
      'Bethesda: (301) 809-4544',
    ],
  },
  offersTitle: 'Potomac estate packages',
  services: {
    heading: 'Scopes sized for canopy lots — not counted per vent',
    intro: 'Large homes still use published residential flat rates; the walk determines access time, not surprise per-zone billing.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'Zone-by-zone source removal with HEPA negative pressure — supplies, returns, and boots on long crawl and chase runs. [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned). [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Horizontal runs to caps hidden by landscaping — located, brushed, vacuumed, draw tested. [NFPA](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional duct antimicrobial',
        text: 'Hard metal after mechanical cleaning when river-humidity film shows — not whole-home mold remediation. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why Potomac needs a thorough zone walk before quoting',
    items: [
      {
        title: 'Multi-zone blind spots',
        text: 'One clean zone can mask a stagnant trunk elsewhere — we trace each handler you book.',
      },
      {
        title: 'Canopy + river baseline',
        text: 'Heavy organic load and damp metal are normal here — scoped up front, not “surprise” add-ons.',
      },
      {
        title: 'DEP habits slow return of film',
        text: 'Dehumidification and exhaust per [DEP IAQ](https://www.montgomerycountymd.gov/DEP/air/indoor-air.html) after mechanical cleaning.',
      },
      {
        title: 'River Road dispatch',
        text: 'Flat rate locked before agitation; before/after photos on every zone cleaned.',
      },
    ],
  },
  communities: {
    heading: 'Potomac neighborhoods on the River Road route',
    intro: 'Wooded western Montgomery — east toward Rockville, south toward Cabin John creek.',
    groups: [
      {
        title: 'Cabin John & the river',
        places: 'Cabin John, Glen Echo, MacArthur Boulevard, river-side lanes',
      },
      {
        title: 'Potomac Village & Falls Road',
        places: 'Potomac Village, Falls Road, River Road corridor, Potomac Elementary area',
      },
      {
        title: 'Avenel & west lots',
        places: 'Avenel, Travilah, large-lot streets toward Darnestown',
      },
    ],
  },
  process: {
    heading: 'Bethesda → Potomac estate visit',
    intro: 'Gate codes, long driveways, and multi-handler layouts — planned on the phone.',
    steps: [
      { title: 'Count handlers & zones', text: 'Two or three systems? All on today’s ticket or phased — confirmed before unload.' },
      { title: 'Dryer terminations', text: 'Locate caps behind plantings — full length on the scope sheet.' },
      { title: 'Lock flat rate', text: 'Residential package confirmed before agitation — not per-register math on site.' },
      { title: 'Clean each booked zone', text: 'Source removal under negative pressure; photos per handler.' },
      { title: 'Handoff', text: 'Humidity reminder from DEP mold tips; (301) 809-4544 for the next zone visit.' },
    ],
  },
  faqIntro: 'Potomac canopy estates — (301) 809-4544 (Bethesda).',
  faq: [
    {
      q: 'Do you charge per vent on large Potomac homes?',
      a: 'Residential jobs use published **flat packages** scoped on site — we confirm the number before equipment runs, not after counting registers.',
    },
    {
      q: 'How is Potomac different from Rockville on your site?',
      a: 'Rockville emphasizes **city vs County code** and Town Center/Twinbrook stock. Potomac emphasizes **river-canopy estates**, long trunks, and multi-zone humidity.',
    },
    {
      q: 'Does DEP recommend a duct cleaning schedule?',
      a: 'DEP [IAQ/mold](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold) focuses on humidity, filters, and venting dryers outside — not endorsing vendors. We clean when you hire us and document with photos.',
    },
    {
      q: 'One visit for three zones?',
      a: 'Often yes if access and time allow — call (301) 809-4544 with handler locations so we block enough calendar.',
    },
    {
      q: 'Cross-river Great Falls, VA?',
      a: 'Virginia side of the river dispatches from [Burke](/locations/burke) — (571) 460-0001.',
    },
  ],
}
