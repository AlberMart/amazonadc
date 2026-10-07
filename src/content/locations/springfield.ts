import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Springfield CDP — Mixing Bowl / I-95 corridor dust + Fairfax County mold boundaries.
 * Links used:
 * - https://www.fairfaxcounty.gov/health/environment/mold
 * - https://www.fairfaxcounty.gov/code/property-maintenance
 * - https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax
 * - https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/
 */
export const springfield: LocationContentSeed = {
  slug: 'springfield',
  title: 'Springfield VA Air Duct & Dryer Vent Cleaning',
  headline: 'Franconia and West Springfield — Mixing Bowl dust and split-levels from Burke',
  description:
    'Air duct & dryer vent cleaning in Springfield, VA. Flat rates for Franconia & Mixing Bowl homes. Call (571) 460-0001.',
  intro:
    'Springfield sits under the Mixing Bowl — fine road dust is part of daily life on Old Keene Mill and Backlick, not a generic suburb story. Fairfax County Health does not test indoor air or remediate mold; Code Compliance treats moisture defects differently from “mold alone.” We clean ducts and dryer vents in split-levels, Franconia townhomes, and Metro-area stacks from Burke with flat rates and photos. (571) 460-0001.',
  heroImage: '/img/locations/springfield.webp',
  heroAlt: 'Air duct cleaning in Springfield, VA — Amazon Air Duct Cleaning',
  city: 'Springfield',
  state: 'VA',
  servedBy: 'burke',
  sectionLayout: 'processFirst',
  about: {
    heading: 'Corridor dust meets County mold honesty',
    paragraphs: [
      'The Mixing Bowl (I-95 / I-395 / Beltway) puts steady brake and road film on returns. Housing is mostly 1960s–80s split-levels with basement handlers, plus Franconia-Springfield Metro townhomes with long dryer chases. This page is the Springfield CDP under Fairfax County — if you are in the **City of Fairfax**, see [Fairfax](/locations/fairfax).',
      'County [mold guidance](https://www.fairfaxcounty.gov/health/environment/mold): Health does not test indoor air or remediate. Keep spaces dry, fix leaks, then address visible mold. [Property Maintenance](https://www.fairfaxcounty.gov/code/property-maintenance): mold alone is not a code violation; moisture-causing leaks may be. We clear trunks and dryer runs — not a substitute for a water Code case.',
      '[Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax) repeats moisture-first habits for humid summers. Burke dispatch runs Springfield with [Burke](/locations/burke), [Alexandria](/locations/alexandria), and [Prince William](/locations/prince-william).',
    ],
    highlights: [
      'Mixing Bowl dust + canopy pollen — two loads on one blower',
      'County Health does not test/remediate — cited, not hidden',
      'Franconia Metro stacks and West Springfield split-levels',
      'Burke: (571) 460-0001',
    ],
  },
  offersTitle: 'Springfield & Franconia flat-rate packages',
  services: {
    heading: 'What we clean on Springfield corridor jobs',
    intro: 'Basement handlers sweating through July and roof-cap dryer chases — same flat-rate scopes, corridor-specific access notes.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'HEPA negative pressure and full-system agitation through supplies, returns, and registers. [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) cautions against treating routine duct cleaning as a medical fix — we remove debris and document it. [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Franconia and Kingstowne-edge townhomes pack lint in long interior climbs before drying times slip. [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines) is the honest safety frame. [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional duct antimicrobial',
        text: 'After mechanical cleaning, EPA-registered product on hard metal when inspection shows film — not a substitute for fixing the moisture source County Health says must be fixed or mold returns. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Moisture, highway dust, and dryer runs here',
    items: [
      {
        title: 'Highway film is mechanical, not mystical',
        text: 'Weeks of heavy traffic leave gray film on registers; the blower recirculates what sits in trunk elbows. Cleaning addresses accumulated debris — not County “clearance.”',
      },
      {
        title: 'County will not pick your duct vendor',
        text: 'Health and Code pathways handle moisture and building defects; neither inspects HVAC cleanliness on demand. [VDH](https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/) does not recommend mold contractors either.',
      },
      {
        title: 'Minutes from Burke Centre',
        text: 'Old Keene Mill is a short hop from our office — realistic same-week windows when the calendar allows.',
      },
      {
        title: 'Flat rate before agitation',
        text: 'Split-level basement access and packed dryer elbows are scoped on site; price locked before the first hose runs.',
      },
    ],
  },
  communities: {
    heading: 'Springfield areas we route from Burke',
    intro: 'West Springfield and Newington share pollen loads; Franconia adds Metro-density laundry chases.',
    groups: [
      {
        title: 'Central Springfield & Town Center',
        places: 'Springfield Town Center, Old Keene Mill, Commerce Street, Backlick Road',
      },
      {
        title: 'Franconia & Metro',
        places: 'Franconia, Franconia-Springfield Metro, Kingstowne edge, Hayfield',
      },
      {
        title: 'West Springfield & south',
        places: 'West Springfield, Newington, Rolling Valley, streets toward [Lorton](/locations/lorton)',
      },
    ],
  },
  process: {
    heading: 'Burke → Springfield — scope before tools',
    intro: 'We lead with process on this page because corridor homes mix active renovation dust, pets, and packed dryer paths.',
    steps: [
      {
        title: 'Call with building type',
        text: 'Split-level with basement handler, Franconia townhome riser, or recent kitchen remodel? That sets hose time — not the rate card.',
      },
      {
        title: 'Split civic issues from HVAC scope',
        text: 'Active leak or landlord dispute stays on County/landlord paths per [property maintenance](https://www.fairfaxcounty.gov/code/property-maintenance) guidance. We quote ducts and/or dryer vent for today.',
      },
      {
        title: 'Confirm flat rate',
        text: 'Ducts, dryer, or combined package — number locked before agitation; antimicrobial only with your OK.',
      },
      {
        title: 'Source-removal + dryer brush-out',
        text: 'Negative-pressure HEPA cleaning and full-length dryer vacuum when booked; before/after photos.',
      },
      {
        title: 'Handoff',
        text: 'Filter tips, humidity reminder aligned with [Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax), (571) 460-0001 for follow-up.',
      },
    ],
  },
  faqIntro: 'Springfield & Franconia — County links where they help. Book: (571) 460-0001 (Burke).',
  faq: [
    {
      q: 'Is this page for the City of Fairfax?',
      a: 'No. The **City of Fairfax** is a separate jurisdiction with its own [location page](/locations/fairfax). This page covers the Springfield CDP, Franconia, West Springfield, and corridor neighborhoods under Fairfax County.',
    },
    {
      q: 'Will Fairfax County Health test mold in my Springfield townhome?',
      a: 'The County [mold page](https://www.fairfaxcounty.gov/health/environment/mold) states the Health Department does not perform indoor air testing or mold remediation. Fix moisture, then hire cleanup when mold is visible — duct cleaning removes HVAC debris; it is not County remediation.',
    },
    {
      q: 'Can Code Compliance force my landlord to clean air ducts?',
      a: '[Property Maintenance](https://www.fairfaxcounty.gov/code/property-maintenance) focuses on building systems and moisture sources — mold alone is not listed as a standalone violation. Duct cleaning is a service you schedule with us; it does not substitute for written landlord notice about leaks.',
    },
    {
      q: 'Does Mixing Bowl traffic really show up in ducts?',
      a: 'Fine particulates settle on outdoor surfaces and work indoors through returns — especially in homes with original 1970s metal trunks and limited filtration upgrades. Photos after cleaning show what came out; we do not promise health outcomes [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) would caution against.',
    },
    {
      q: 'Can ducts and the dryer vent be one visit?',
      a: 'Yes — book the combined package up front. Call (571) 460-0001; the Burke crew brings both tool sets for one stop.',
    },
    {
      q: 'Who dispatches Springfield jobs?',
      a: 'Burke, VA (5641 Burke Centre Pkwy Ste 119). Springfield is one of our closest service areas from that office.',
    },
  ],
}
