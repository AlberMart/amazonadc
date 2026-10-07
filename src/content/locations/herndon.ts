import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Herndon — Elden Street / data-center corridor dust (not Reston high-rise first).
 * Links used:
 * - https://www.fairfaxcounty.gov/health/environment/mold
 * - https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax
 * - https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/
 */
export const herndon: LocationContentSeed = {
  slug: 'herndon',
  title: 'Air Duct Cleaning in Herndon, VA',
  headline: 'Elden Street cottages and Worldgate stacks — Dulles corridor grit from Burke',
  description:
    'Air duct & dryer vent cleaning in Herndon, VA. Flat rates for Elden Street & Worldgate homes. Photos. Call (571) 460-0001.',
  intro:
    'Herndon’s downtown centers on Elden Street — walkable cottages and small-lot retrofits with tight joist-bay duct paths and bent dryer runs. West toward the Dulles Toll Road, years of data-center and commercial construction add fine particulate to oak pollen. Fairfax County Health does not test indoor air or remediate mold. We clean ducts and dryer vents with flat rates and photos from Burke. (571) 460-0001.',
  heroImage: '/img/locations/herndon.webp',
  heroAlt: 'Air duct cleaning in Herndon, VA — Amazon Air Duct Cleaning',
  city: 'Herndon',
  state: 'VA',
  servedBy: 'burke',
  sectionLayout: 'servicesFirst',
  about: {
    heading: 'Downtown scale, corridor grit, County guidance',
    paragraphs: [
      'Herndon keeps a municipal downtown — clock tower, Elden Street shops, and early-twentieth-century cottages where forced-air was threaded through existing joist bays decades later. Those tight elbows collect dust at every bend; second-floor laundry on small lots creates bent dryer paths that pack lint faster than a straight suburban run. Worldgate and Herndon Parkway add 1990s–2000s townhomes with stacked closets and shared exterior caps — still low-rise compared to [Reston](/locations/reston) corridor towers.',
      'The Dulles Toll Road and ongoing data-center development west of town add construction-grade fines that mix with traffic film and canopy pollen along Fox Mill and Sterling-adjacent streets. Returns pull both into trunks that also see humid summer air; condensation on cool metal is the same physics County mold pages describe — fix moisture, then clean what accumulated mechanically.',
      'Fairfax County’s [mold guidance](https://www.fairfaxcounty.gov/health/environment/mold) states the Health Department does not perform indoor air testing or mold remediation. [Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax) pushes dehumidification and leak repair. We dispatch from Burke with [Chantilly](/locations/chantilly) and [Loudoun](/locations/loudoun) on overlapping western routes.',
    ],
    highlights: [
      'Elden Street cottages and Worldgate townhomes',
      'Toll Road / construction particulate called out honestly',
      'County Health mold limits cited',
      'Burke: (571) 460-0001',
    ],
  },
  offersTitle: 'Herndon flat-rate packages',
  services: {
    heading: 'Services on Herndon jobs — cottages to Worldgate',
    intro: 'Lead with scope: what we actually clean when downtown access is tight and corridor dust is fresh.',
    items: [
      {
        title: 'Air duct cleaning (source removal)',
        text: 'HEPA negative pressure on the trunk, agitation through supplies and returns, registers included. Fine construction dust in new renovations and years-old corridor grit both respond to source removal — [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) still warns against overselling health outcomes. [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Worldgate stacked laundry and Herndon Parkway vertical chases are lint fire risks before they are “slow dry” annoyances. [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). Full brush and vacuum to the cap. [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional antimicrobial on hard duct surfaces',
        text: 'After mechanical cleaning, EPA-registered product when inspection shows biological film on metal — not whole-home mold remediation per [County Health](https://www.fairfaxcounty.gov/health/environment/mold). [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why homeowners in Herndon book us',
    items: [
      {
        title: 'Low-rise access we plan for',
        text: 'Elden Street alleys, Worldgate gates, and single-family Toll Road edges — we capture parking and hose paths before the truck rolls.',
      },
      {
        title: 'Construction dust is a known finding',
        text: 'Homes near active commercial build-out often show fine gypsum-style dust in returns. We inspect, quote flat rate, clean — we do not claim County clearance.',
      },
      {
        title: 'VDH will not endorse us',
        text: '[VDH mold contact guidance](https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/) does not recommend contractors. Photos and published packages are the proof.',
      },
      {
        title: 'Burke western route',
        text: 'Same crew that knows Reston garage heights also knows Herndon downtown parking — different HOAs, same flat-rate terms.',
      },
    ],
  },
  communities: {
    heading: 'Herndon blocks we stage for',
    intro: 'Historic core vs Parkway townhomes vs Dulles-edge singles.',
    groups: [
      {
        title: 'Historic downtown',
        places: 'Elden Street, Center Street, clock tower area, municipal center blocks',
      },
      {
        title: 'Worldgate & Parkway',
        places: 'Worldgate, Worldgate Drive, Herndon Parkway townhomes, stacked laundry buildings',
      },
      {
        title: 'West toward Dulles',
        places: 'Runnymede, Fox Mill edge, Dranesville-adjacent streets toward [Loudoun](/locations/loudoun)',
      },
    ],
  },
  process: {
    heading: 'Burke → Herndon visit flow',
    intro: 'HOA gate codes and alley parking go on the ticket before we roll.',
    steps: [
      {
        title: 'Book with access notes',
        text: 'Downtown street parking vs Worldgate loading zone — mention renovations shedding dust when you call (571) 460-0001.',
      },
      {
        title: 'Walkthrough',
        text: 'Returns, trunk access, dryer path length — scoped before price lock.',
      },
      {
        title: 'Confirm flat rate',
        text: 'Ducts, dryer, or both; antimicrobial only with your OK.',
      },
      {
        title: 'Clean + photograph',
        text: 'Source-removal under negative pressure; full dryer brush-out when booked.',
      },
      {
        title: 'Close-out',
        text: 'Before/after images, humidity tips from [Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax), follow-up line.',
      },
    ],
  },
  faqIntro: 'Herndon questions — downtown vs corridor. Book: (571) 460-0001 (Burke).',
  faq: [
    {
      q: 'Do you treat Herndon like Reston high-rises?',
      a: 'No. Reston jobs often mean long condo risers and garage docks — see [Reston](/locations/reston). Herndon work centers on Elden Street cottages, Worldgate townhomes, and Dulles-edge singles with construction dust in returns.',
    },
    {
      q: 'Will Fairfax County test mold in my Herndon home?',
      a: 'County [mold guidance](https://www.fairfaxcounty.gov/health/environment/mold) says the Health Department does not perform indoor air testing or mold remediation. We clean ducts and vents mechanically — we are not County environmental health.',
    },
    {
      q: 'We are near active data-center construction — is duct cleaning worth it before move-in?',
      a: 'Fine construction particulate often sits in supply runs if the system ran during build-out. Source-removal cleaning with photos shows what was in the trunks; it does not replace fixing envelope leaks or landlord remediation duties.',
    },
    {
      q: 'Why cite EPA and NFPA?',
      a: '[EPA duct guidance](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) keeps health claims honest; [NFPA](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines) documents dryer fires — relevant for packed Worldgate chases.',
    },
    {
      q: 'Which office serves Herndon?',
      a: 'Burke, VA (5641 Burke Centre Pkwy Ste 119). Call (571) 460-0001.',
    },
  ],
}
