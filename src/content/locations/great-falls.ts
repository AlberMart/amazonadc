import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Great Falls, VA — large-lot Fairfax; Potomac-adjacent canopy; not McLean grid or Potomac MD estates page.
 * Links used:
 * - https://www.fairfaxcounty.gov/health/environment/mold
 * - https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax
 * - https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/
 */
export const greatFalls: LocationContentSeed = {
  slug: 'great-falls',
  title: 'Great Falls VA Air Duct Cleaning',
  headline: 'Large-lot homes, long dryer runs, and walk-out basements — staged from Burke',
  description:
    'Air duct & dryer vent cleaning in Great Falls, VA. Flat rates for large-lot homes & long dryer runs. Call (571) 460-0001.',
  intro:
    'Great Falls is **Fairfax County** wooded acreage between Georgetown Pike and the Potomac — Walker Road, Springvale, River Bend — with multi-zone HVAC, walk-out basement handlers, and dryer runs that can exceed fifty feet. River-influenced humidity and oak-hickory canopy load returns every spring and summer. If your address is in **Potomac, Maryland**, see our [Potomac, MD](/locations/potomac) page for Montgomery DEP resources. County Health does not test indoor air; we clean from Burke with photos and a booked arrival window that respects Pike drive time. (571) 460-0001.',
  heroImage: '/img/locations/great-falls.webp',
  heroAlt: 'Air duct cleaning in Great Falls, VA — Amazon Air Duct Cleaning',
  city: 'Great Falls',
  state: 'VA',
  servedBy: 'burke',
  sectionLayout: 'offersLate',
  about: {
    heading: 'Large-lot Fairfax County — humidity, pollen, and long dryer runs',
    paragraphs: [
      'Homeowners sometimes confuse **Potomac, Maryland** ([our MD page](/locations/potomac) cites Montgomery DEP) with **Great Falls, Virginia** along Georgetown Pike. Here, [Fairfax County Health’s mold page](https://www.fairfaxcounty.gov/health/environment/mold) and [Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax) are the civic baseline: dry spaces, humidity control, fix leaks — and no County indoor air testing or remediation for hire.',
      'Lots large enough for two or three zones often place the primary air handler in a walk-out basement at grade, where soil moisture and Difficult Run humidity migrate toward foundation walls. Long supply trunks rise through multiple finished floors; debris stacks at branch points. Guest-wing and second-floor laundry push lint through extended interior paths before a gable or sidewall cap.',
      'Burke dispatch — no Great Falls storefront — serves this area with [McLean](/locations/mclean) and [Reston](/locations/reston) on overlapping western tickets. Local read: [Great Falls estate humidity and air ducts](/blog/great-falls-estates-humidity-air-ducts). [VDH](https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/) does not endorse contractors.',
    ],
    highlights: [
      'Fairfax County VA — check MD vs VA if mail says Potomac',
      'Multi-zone + long dryer runs',
      'County Health cited honestly',
      'Burke: (571) 460-0001',
    ],
  },
  offersTitle: 'Great Falls estate-scale packages',
  services: {
    heading: 'Multi-zone ducts and long-run dryer service',
    intro: 'Every zone and every dryer elbow scoped before flat rate locks — estate scale, published rate card.',
    items: [
      {
        title: 'Air duct cleaning (source removal)',
        text: 'HEPA negative pressure at each plenum served, agitation through supplies and returns across zones booked. [EPA duct guidance](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned). [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Extended interior paths from guest wings and second-floor laundry brushed to exterior termination. [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional antimicrobial on hard duct surfaces',
        text: 'After mechanical cleaning when walk-out basement humidity left film on hard metal — not whole-estate mold remediation. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why Great Falls needs longer walkthroughs',
    items: [
      {
        title: 'Estate-scale walkthroughs',
        text: 'Multi-zone handlers, guest-wing laundry, and fifty-foot dryer paths are scoped up front — flat rate still locked before agitation.',
      },
      {
        title: 'Canopy pollen + river dew',
        text: 'Oak-hickory canopy and Potomac-side dew load outdoor intakes; cleaning removes trunk film humidity control slows from returning per [Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax).',
      },
      {
        title: 'County Health boundaries',
        text: 'We remove HVAC debris and lint — we do not replace County environmental health or indoor mold assessment services.',
      },
      {
        title: 'Drive time said up front',
        text: 'Crews leave from Burke Centre Parkway; we book a clear window that accounts for Pike travel and keep you updated if the day moves.',
      },
    ],
  },
  communities: {
    heading: 'Georgetown Pike and river-edge neighborhoods',
    intro: 'We stage Great Falls from Burke alongside McLean and Reston — tell us your Pike neighborhood when you book.',
    groups: [
      {
        title: 'Village & Georgetown Pike',
        places: 'Great Falls Village, Georgetown Pike, Walker Road, Springvale',
      },
      {
        title: 'River Bend & Potomac lots',
        places: 'River Bend, Seneca Road, Parkway-adjacent acreage',
      },
      {
        title: 'Toward Reston & McLean',
        places: 'Utterback Store Road, edges toward [Reston](/locations/reston) and [McLean](/locations/mclean)',
      },
    ],
  },
  process: {
    heading: 'Burke → Great Falls planning',
    intro: 'Multi-zone homes get zone-by-zone scope before the flat rate locks.',
    steps: [
      {
        title: 'Count zones and handlers',
        text: 'Guest wing, pool house, main house — booked scope matches walkthrough, not surprise add-ons.',
      },
      {
        title: 'Map longest dryer path',
        text: 'Fifty-foot runs are routine here — full brush-out included when dryer service is on the ticket.',
      },
      {
        title: 'Confirm flat rate before unload',
        text: 'Antimicrobial only with your OK after mechanical cleaning.',
      },
      {
        title: 'Source-removal + photos',
        text: 'Each zone documented; lint cleared to cap when booked.',
      },
      {
        title: 'Handoff',
        text: 'Humidity habits from County mold tips; (571) 460-0001 for a second zone visit later.',
      },
    ],
  },
  faqIntro: 'Great Falls VA — Fairfax Health context. Book: (571) 460-0001 (Burke).',
  faq: [
    {
      q: 'Is Great Falls the same service area as Potomac, Maryland?',
      a: 'No. [Potomac, MD](/locations/potomac) is Montgomery County with DEP IAQ links. **Great Falls, VA** is Fairfax County along Georgetown Pike — use [Fairfax County Health mold guidance](https://www.fairfaxcounty.gov/health/environment/mold) for civic context here.',
    },
    {
      q: 'How is this different from your McLean page?',
      a: '[McLean](/locations/mclean) focuses closer-in McLean/Langley patterns. Great Falls is large-lot, multi-zone, long dryer runs, and longer Burke drives — same phone, different building and scheduling notes.',
    },
    {
      q: 'Does Fairfax County Health recommend our company?',
      a: 'No. The [County mold page](https://www.fairfaxcounty.gov/health/environment/mold) does not endorse vendors. [VDH](https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/) is similarly neutral — judge us on scope, photos, and flat-rate terms.',
    },
    {
      q: 'Multi-zone home — one flat rate?',
      a: 'Walkthrough counts handlers and zones **before** price locks. Estate scale uses the same published package discipline — not open-ended per-vent math.',
    },
    {
      q: 'Which office serves Great Falls?',
      a: 'Burke, VA (5641 Burke Centre Pkwy Ste 119). Call (571) 460-0001.',
    },
    {
      q: 'More on estate humidity locally?',
      a: '[Great Falls estate humidity and air ducts](/blog/great-falls-estates-humidity-air-ducts). Official: [Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax).',
    },
  ],
}
