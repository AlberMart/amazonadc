import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Mt Vernon — unincorporated Fairfax County along GW Parkway; NOT City of Alexandria.
 * Links used:
 * - https://www.fairfaxcounty.gov/health/environment/mold
 * - https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax
 * - https://www.fairfaxcounty.gov/code/property-maintenance
 * - https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/
 */
export const mountVernon: LocationContentSeed = {
  slug: 'mount-vernon',
  title: 'Air Duct Cleaning in Mt Vernon, VA',
  headline: 'Fort Hunt and Parkway-side homes — river humidity and mid-century trunks from Burke',
  description:
    'Air duct & dryer vent cleaning in Mount Vernon, VA. Flat rates for Parkway homes & colonials. Photos. Call (571) 460-0001.',
  intro:
    'Mt Vernon is the **Fairfax County** residential community along the George Washington Memorial Parkway — Fort Hunt, Waynewood, Hollin Hills — not the historic estate and not City of Alexandria jurisdiction. River humidity loads mid-century metal in joist bays; County Health explains mold prevention but does not test indoor air or remediate for you. We clean ducts and dryer vents from Burke with flat rates and photos. (571) 460-0001.',
  heroImage: '/img/locations/mount-vernon.webp',
  heroAlt: 'Air duct cleaning in Mt Vernon, VA — Amazon Air Duct Cleaning',
  city: 'Mt Vernon',
  state: 'VA',
  servedBy: 'burke',
  sectionLayout: 'faqEarly',
  about: {
    heading: 'Fairfax County along the Parkway — humidity and mid-century ducts',
    paragraphs: [
      'If your mailing address says Alexandria but your parcel is **south of the city** along the Parkway, you may still be in Fairfax County — this page is for **Mt Vernon, Fort Hunt, Hollin Hills, Stratford Landing**, and similar county streets. City of Alexandria’s mold and IAQ hubs apply inside city limits; here, [Fairfax County Health’s mold page](https://www.fairfaxcounty.gov/health/environment/mold) is the usual civic baseline: control moisture, fix leaks, reduce humidity — and understand the Health Department **does not** perform indoor air testing or mold remediation.',
      'GW Parkway corridor humidity pushes river dew inland year-round. Summer air meets cool crawl-space and basement supply metal; Hollin Hills ramblers and Fort Hunt brick colonials often carry **retrofit duct** through tight joists where debris stacks at every elbow. Long exterior-wall dryer runs hide caps behind vegetation on wooded lots. [Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax) repeats the same moisture-first habits countywide.',
      'Burke dispatch serves Mt Vernon with [Alexandria](/locations/alexandria) city jobs and [Lorton](/locations/lorton) on the same southern loop. Local read: [Mount Vernon Potomac humidity and air ducts](/blog/mount-vernon-potomac-humidity-air-ducts). [VDH](https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/) does not recommend specific mold contractors.',
    ],
    highlights: [
      'Fairfax County — not Alexandria city code',
      'Parkway humidity + mid-century trunks',
      'County Health mold cited honestly',
      'Burke: (571) 460-0001',
    ],
  },
  offersTitle: 'Mt Vernon flat-rate packages',
  services: {
    heading: 'What we clean on Parkway-side county homes',
    intro:
      'Wooded-lot dryer caps, Hollin Hills joist bays, and Fort Hunt basement handlers — scoped before price locks.',
    items: [
      {
        title: 'Air duct cleaning (source removal)',
        text: 'HEPA negative pressure on the trunk, agitation through supplies and returns, registers included. [EPA duct guidance](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) on health expectations. [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Second-floor laundry and long exterior-wall runs pack lint before the dryer feels slow. [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). Full brush-out to the cap. [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional antimicrobial on hard duct surfaces',
        text: 'After mechanical cleaning when inspection shows biological film on hard metal — not County Health remediation and not a substitute for fixing water intrusion. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why homeowners in Mt Vernon book us',
    items: [
      {
        title: 'If your address is in Fairfax County',
        text: 'Parkway blocks in Fort Hunt and Hollin Hills use Fairfax Health education and [property maintenance code](https://www.fairfaxcounty.gov/code/property-maintenance) context (mold alone is not a standalone violation while failing systems causing moisture may be). City of Alexandria mold and Alex311 paths apply inside city limits — we do not file Code cases for you.',
      },
      {
        title: 'Parkway humidity loads metal trunks',
        text: 'Potomac-side lots see heavier dew and pollen under oak canopy than inland Fairfax subdivisions. Cleaning removes accumulated film; dehumidification and leak repair slow return per [Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax).',
      },
      {
        title: 'Mid-century retrofit is routine here',
        text: 'Hollin Hills and Fort Hunt add-on ductwork is walkthrough-scoped before quote — not surprise per-vent math after the first register opens.',
      },
      {
        title: 'Photo-backed flat rate from Burke',
        text: 'Price confirmed before agitation; before/after images at close-out. Gate codes and long driveways are easier when you flag them at booking.',
      },
    ],
  },
  communities: {
    heading: 'Parkway neighborhoods we stage from Burke',
    intro: 'If your parcel is inside City of Alexandria limits, see our [Alexandria](/locations/alexandria) page for city resources; this list covers Fairfax County Parkway neighborhoods.',
    groups: [
      {
        title: 'Fort Hunt & river blocks',
        places: 'Fort Hunt, Waynewood, Stratford Landing, Fort Hunt Park streets',
      },
      {
        title: 'GW Parkway corridor',
        places: 'Parkway-adjacent lots, Mount Vernon Woods, estate-area fringe (residential county)',
      },
      {
        title: 'Hollin Hills & west edges',
        places:
          'Hollin Hills, blocks toward [Springfield](/locations/springfield) and [Lorton](/locations/lorton) — confirm county vs city if unsure',
      },
    ],
  },
  process: {
    heading: 'Burke → Mt Vernon visit flow',
    intro: 'We separate County housing moisture issues from duct and dryer scope on the walkthrough.',
    steps: [
      {
        title: 'Confirm county vs city',
        text: 'Parkway addresses sometimes confuse Alexandria city mail with Fairfax parcels — civic links change; flat-rate menu does not.',
      },
      {
        title: 'Building type',
        text: 'Mid-century joist bay, Fort Hunt crawl handler, or long exterior dryer run? Sets hose plan and time — not upsell bait.',
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
        text: 'Filter cadence, humidity reminder from County mold tips, (571) 460-0001 for follow-up.',
      },
    ],
  },
  faqIntro:
    'Mt Vernon county questions — Fairfax Health linked where useful. Book: (571) 460-0001 (Burke).',
  faq: [
    {
      q: 'Should I use City of Alexandria mold resources for my Fort Hunt home?',
      a: 'If you are in **Fairfax County** (Fort Hunt, Waynewood, Hollin Hills, etc.), Alexandria’s Alex311 and City mold pages are the wrong door. Start with [Fairfax County Health mold guidance](https://www.fairfaxcounty.gov/health/environment/mold) and moisture repair; hire us for duct/dryer mechanical cleaning when you want debris removed with photos.',
    },
    {
      q: 'Does Fairfax County Health test my ducts or recommend a contractor?',
      a: 'No. The [County mold page](https://www.fairfaxcounty.gov/health/environment/mold) states the Health Department does not perform indoor air testing or mold remediation. [VDH](https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/) does not endorse specific specialists either.',
    },
    {
      q: 'Why mention the GW Parkway on a duct page?',
      a: 'Parkway-side lots get river-influenced humidity and heavy tree pollen on outdoor intakes — the same moisture logic County Health describes, applied to mid-century metal trunks and long dryer runs.',
    },
    {
      q: 'I’m in Hollin Hills with a musty basement — ducts first?',
      a: '[Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax) prioritizes dehumidification and leak repair. Duct cleaning helps when trunks hold debris; it does not replace whole-home mold remediation.',
    },
    {
      q: 'Which office serves Mt Vernon?',
      a: 'Burke, VA (5641 Burke Centre Pkwy Ste 119). Call (571) 460-0001.',
    },
    {
      q: 'More reading on Parkway humidity?',
      a: '[Mount Vernon Potomac humidity and air ducts](/blog/mount-vernon-potomac-humidity-air-ducts). Official: [Fairfax County Health — mold](https://www.fairfaxcounty.gov/health/environment/mold).',
    },
  ],
}
