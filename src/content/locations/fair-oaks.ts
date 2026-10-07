import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Fair Oaks CDP — Fair Oaks Mall / Fair Lakes corridor; not City of Fairfax.
 * Links used:
 * - https://www.fairfaxcounty.gov/health/environment/mold
 * - https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax
 * - https://www.fairfaxcounty.gov/code/property-maintenance
 * - https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/
 */
export const fairOaks: LocationContentSeed = {
  slug: 'fair-oaks',
  title: 'Fair Oaks & Fair Lakes Air Duct Cleaning',
  headline: 'Mall-corridor townhomes and Route 50/I-66 dust — flat rates from Burke',
  description:
    'Air duct & dryer vent cleaning in Fair Oaks & Fair Lakes, VA. Flat rates, before/after photos. Call (571) 460-0001.',
  intro:
    'Fair Oaks is the **Fairfax County** community around Fair Oaks Mall, Fair Lakes, and the Route 50 / I-66 knot — not the independent [City of Fairfax](/locations/fairfax) jurisdiction. Attic-mounted handlers, stacked laundry closets, and highway-adjacent returns load faster than quiet county subdivisions. County Health explains mold prevention but does not test indoor air or remediate for you. Burke dispatch: (571) 460-0001.',
  heroImage: '/img/locations/fair-oaks.webp',
  heroAlt: 'Air duct cleaning in Fair Oaks, VA — Amazon Air Duct Cleaning',
  city: 'Fair Oaks',
  state: 'VA',
  servedBy: 'burke',
  sectionLayout: 'faqMid',
  about: {
    heading: 'Mall-grid HOAs meet County mold honesty',
    paragraphs: [
      '1980s–2000s townhomes and singles dominate Fair Oaks and Fair Lakes — attic handlers under hot roofs, mall/West Ox traffic film, and brake dust from visitor lots. Fairfax Corner and Monument Drive may sit **inside City of Fairfax** limits; if your HOA says “City of Fairfax,” use [Fairfax](/locations/fairfax).',
      'County [mold guidance](https://www.fairfaxcounty.gov/health/environment/mold): Health does **not** test indoor air or remediate mold. [Healthy Homes](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax) stresses moisture control; [Property Maintenance](https://www.fairfaxcounty.gov/code/property-maintenance) notes mold alone is not a code violation — leaks that cause moisture may be. We clear trunks and dryer runs; we do not replace a Code case about water.',
      'Many Fair Oaks homes still hold **original builder drywall fines** in attic plenums while registers look clean. Detail: [Fair Oaks townhome dust and air ducts](/blog/fair-oaks-townhomes-dust-air-ducts). Burke runs this corridor with [Oakton](/locations/oakton) and [Chantilly](/locations/chantilly).',
    ],
    highlights: [
      'Fair Lakes / West Ox mall-corridor HOAs',
      'County Health does not test/remediate',
      'Attic handlers + stacked dryer chases',
      'Burke: (571) 460-0001',
    ],
  },
  offersTitle: 'Fair Oaks & Fair Lakes flat-rate packages',
  services: {
    heading: 'Attic trunks, HOA gates, and vertical dryer chases',
    intro: 'Townhome mechanical closets and single-family attic packs share the published scopes — access notes differ.',
    items: [
      {
        title: 'Air duct cleaning (source removal)',
        text: 'HEPA negative pressure on attic or basement trunk, agitation through supplies, returns, and boots — including corridor construction and Route 50 particulate load. [EPA duct guidance](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned). [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Stacked Fair Lakes laundry closets push lint up interior-wall chases to roof caps. Full rod-brush and vacuum with draw test. [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional antimicrobial on hard duct surfaces',
        text: 'After mechanical cleaning when coils or hard metal show biological film — not whole-home remediation per County Health boundaries. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why homeowners in Fair Oaks book us',
    items: [
      {
        title: 'Confirm jurisdiction before you book',
        text: 'Fair Oaks **CDP** vs **City of Fairfax** changes which official links apply — Burke dispatch and flat-rate menus stay the same. Edge blocks near Fairfax Corner: ask when you call.',
      },
      {
        title: 'HOA gate codes on the work order',
        text: 'West Ox and Fair Lakes recurring routes mean stacked dryers and visitor-parking access are routine logistics — noted the morning of the visit.',
      },
      {
        title: 'Highway film + hot attic cycle',
        text: 'Returns catch Beltway-adjacent dust; hot attic handlers meet humid return air — cleaning removes interior load; filters and moisture control slow return per [Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax).',
      },
      {
        title: 'Flat rate locked before unload',
        text: 'Quote confirmed on walkthrough before agitation starts; before/after photos at close-out.',
      },
    ],
  },
  communities: {
    heading: 'Mall edge, Fair Lakes, and 50/66 corridors',
    intro: 'If your address is inside City of Fairfax limits, use our [Fairfax](/locations/fairfax) page; this list covers Fair Oaks and Fair Lakes in Fairfax County.',
    groups: [
      {
        title: 'Mall & Fair Lakes',
        places: 'Fair Oaks Mall area, Fair Lakes, West Ox Road, Monument Drive',
      },
      {
        title: '50/66 corridors',
        places: 'Route 50, I-66, Pender, Government Center-adjacent county streets',
      },
      {
        title: 'Toward Fairfax Corner & Chantilly',
        places: 'Blocks toward Fairfax Corner (verify city vs county), [Oakton](/locations/oakton), [Chantilly](/locations/chantilly)',
      },
    ],
  },
  process: {
    heading: 'Burke → Fair Oaks visit flow',
    intro: 'HOA access and attic-handler safety checked before negative pressure starts.',
    steps: [
      {
        title: 'City vs county address',
        text: 'Fairfax City limits vs Fair Oaks CDP — we mention the right County Health links when you book.',
      },
      {
        title: 'Attic pack or basement trunk',
        text: 'Stacked laundry closet and roof-cap dryer? Hose runs and ladder time are scoped — not upsell bait.',
      },
      {
        title: 'Lock scope and price',
        text: 'Ducts, dryer vent, or both — number confirmed before tools run; antimicrobial only with your OK.',
      },
      {
        title: 'Source-removal + photos',
        text: 'HEPA negative pressure through scoped runs; images before we leave.',
      },
      {
        title: 'Handoff',
        text: 'Filter cadence, [Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax) humidity reminder, and (571) 460-0001.',
      },
    ],
  },
  faqIntro: 'Fair Oaks booking questions — County vs City when it helps. Call (571) 460-0001 (Burke).',
  faq: [
    {
      q: 'Is Fair Oaks the same as the City of Fairfax?',
      a: 'No. **Fair Oaks / Fair Lakes** is an unincorporated Fairfax County corridor around the mall and West Ox. The **City of Fairfax** is a separate jurisdiction — use our [Fairfax city page](/locations/fairfax) if your parcel is inside city limits.',
    },
    {
      q: 'Will Fairfax County Health recommend a duct cleaner?',
      a: 'No. County [mold guidance](https://www.fairfaxcounty.gov/health/environment/mold) does not endorse vendors. [VDH](https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/) is similarly neutral — judge us on scope, photos, and flat-rate terms.',
    },
    {
      q: 'Why do attic handlers here feel “too new” to need cleaning?',
      a: 'Many 1990s–2000s builds never had post-construction duct vacuuming — drywall fines sit in the plenum while registers look fine. See [Fair Oaks townhome dust and air ducts](/blog/fair-oaks-townhomes-dust-air-ducts).',
    },
    {
      q: 'Can ducts and the dryer vent be one visit?',
      a: 'Yes when booked together — common for stacked chases that share attic access. Call (571) 460-0001 from Burke.',
    },
    {
      q: 'Which office serves Fair Oaks?',
      a: 'Burke, VA (5641 Burke Centre Pkwy Ste 119). Call (571) 460-0001.',
    },
  ],
}
