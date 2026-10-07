import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Alexandria pilot — civic IAQ / mold angle with city + VDH sources.
 * Links used (only high-fit):
 * - https://www.alexandriava.gov/Mold
 * - https://www.alexandriava.gov/environmental-health/indoor-air-quality-alexandria-va
 * - https://www.alexandriava.gov/news-ahd/alexandrias-healthy-homes-network-releases-city-wide-action-plan-to-tackle-mold-pests
 * - https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/
 * Skipped: food-establishment HVAC code, school mold reporting, HB2195 (bill), duplicate code-admin hub.
 */
export const alexandria: LocationContentSeed = {
  slug: 'alexandria',
  title: 'Air Duct Cleaning in Alexandria, VA',
  headline: 'Old Town row houses, Del Ray bungalows, and condo dryer risers — flat-rate cleaning from Burke',
  description:
    'Air duct & dryer vent cleaning in Alexandria, VA. Flat rates for Old Town, Del Ray & condos. Photos included. Call (571) 460-0001.',
  intro:
    'Alexandria treats indoor moisture and mold as a real local issue — not a generic “DMV humidity” line. We clean ducts and dryer vents for Old Town row houses, Del Ray bungalows, and Potomac Yard condos, document the work with photos, and stay clear about what City of Alexandria and VDH resources cover versus what a duct cleaning visit actually does. Book from Burke at (571) 460-0001.',
  heroImage: '/img/locations/alexandria.webp',
  heroAlt: 'Air duct cleaning in Alexandria, VA — Amazon Air Duct Cleaning',
  city: 'Alexandria',
  state: 'VA',
  servedBy: 'burke',
  sectionLayout: 'whyFirst',
  about: {
    heading: 'City IAQ resources and what duct cleaning covers',
    paragraphs: [
      'The [City of Alexandria’s indoor air quality hub](https://www.alexandriava.gov/environmental-health/indoor-air-quality-alexandria-va) lists mold among the hazards residents are steered to for help — and states plainly that mold is a big problem here. Our job is narrower: remove debris from HVAC trunks and clear dryer runs, then document results. We are not a substitute for Alex311, landlord obligations, or whole-home mold remediation.',
      'Old Town and Del Ray still carry retrofitted metal trunks through plaster and joist bays; Potomac Yard and Carlyle add stacked laundry closets and multi-story dryer chases. River humidity loads both eras the same way — condensation on cold metal, sticky film on trunks, lint that packs elbows. Deeper read: [how Potomac humidity shows up in Alexandria homes](/blog/how-potomac-humidity-affects-alexandria-air-quality).',
      'The City’s [Healthy Homes Network action plan news](https://www.alexandriava.gov/news-ahd/alexandrias-healthy-homes-network-releases-city-wide-action-plan-to-tackle-mold-pests) underscores that mold and pests are a city-wide priority. That context is useful for renters and owners alike: if moisture or visible mold is a housing-condition issue, start with the City’s mold pathway; if you want debris out of ducts or lint out of a dryer vent, that is the visit we schedule from Burke alongside [Arlington](/locations/arlington) and [Mount Vernon](/locations/mount-vernon).',
    ],
    highlights: [
      'Aligned with City IAQ / mold resources — without overclaiming we replace them',
      'Old Town alleys, Del Ray basements, Potomac Yard laundry chases',
      'Flat-rate residential packages; before/after photos on every job',
      'Burke dispatch: (571) 460-0001',
    ],
  },
  offersTitle: 'Alexandria packages (flat-rate)',
  services: {
    heading: 'What we actually clean on Alexandria jobs',
    intro:
      'Three scopes — ducts, dryer vents, and antimicrobial on hard duct surfaces when inspection supports it. Same published flat rates for row house or condo.',
    items: [
      {
        title: 'Air duct cleaning (source removal)',
        text: 'HEPA negative pressure on the trunk, agitation through supplies and returns, registers included. [EPA guidance](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) still frames routine duct cleaning carefully on health claims — we remove debris and show photos, we do not sell medical results. Details: [air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Alexandria’s own [mold prevention tips](https://www.alexandriava.gov/Mold) include cleaning laundry vents regularly — lint-packed runs also raise dryer fire risk (see [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines)). We brush and vacuum the full length to the exterior cap, including long condo risers. Book [dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Antimicrobial on hard duct surfaces (optional)',
        text: 'After mechanical cleaning, optional EPA-registered product on hard duct metal when inspection shows biological film — not a whole-house mold remediation and not a substitute for fixing water intrusion. Scope and limits: [mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why Alexandria homeowners book us',
    items: [
      {
        title: 'Renters: City complaint steps first when mold is a housing issue',
        text: 'Alexandria’s [Mold Information & Assistance](https://www.alexandriava.gov/Mold) page tells renters to report to the landlord in writing, then escalate via Alex311 if there is no follow-up in about 10–15 days. Code Administration may look for water intrusion; the City states it does **not** inspect or test for mold itself. We clean ducts/vents when you hire us — we do not file Alex311 for you or replace landlord duties.',
      },
      {
        title: 'VDH does not pick your contractor',
        text: 'The [Virginia Department of Health](https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/) explains who to contact for mold questions and is clear that VDH does not assess or recommend specific mold specialists. That honesty is the bar we match: flat-rate duct/vent work with photos, not a “health department approved” badge.',
      },
      {
        title: 'Humidity target the City already cites',
        text: 'City mold guidance points residents toward keeping indoor humidity below about 50% and using exhaust fans — the same moisture logic that loads duct metal near the Potomac. Cleaning removes what is already in the trunks; dehumidification and leak repair slow the return.',
      },
      {
        title: 'Photo-backed flat rate from Burke',
        text: 'Quote before equipment starts, before/after photos at close-out, no per-vent math. Old Town parking and condo access notes go on the work order the morning of the visit.',
      },
    ],
  },
  communities: {
    heading: 'Neighborhoods we stage for from Burke',
    intro:
      'Same published packages; different access notes — alleys in Old Town, basement handlers in Del Ray, rooftop packs and laundry risers at Potomac Yard.',
    groups: [
      {
        title: 'Waterfront & Old Town',
        places: 'Old Town, Old Town North, waterfront, Robinson Landing area',
      },
      {
        title: 'Del Ray, Rosemont, Arlandria',
        places: 'Del Ray, Rosemont, Arlandria, Braddock-adjacent streets',
      },
      {
        title: 'West End, Carlyle, Potomac Yard',
        places: 'West End, Carlyle, Potomac Yard, Eisenhower corridor',
      },
    ],
  },
  process: {
    heading: 'What a Burke → Alexandria visit looks like',
    intro: 'Logistics first, then scope — especially when mold or moisture is part of the story you tell us.',
    steps: [
      {
        title: 'Tell us the building type',
        text: 'Row house with plaster chases, Del Ray basement handler, or condo laundry riser? That changes hose runs and time — not the flat-rate menu.',
      },
      {
        title: 'Separate City issues from duct scope',
        text: 'Active leak, landlord dispute, or Alex311 case stays on the City/landlord path. We scope ducts and dryer vents you want cleaned today.',
      },
      {
        title: 'Confirm price before tools run',
        text: 'Ducts, dryer vent, or both — number locked before agitation starts; Envirocon only with your OK.',
      },
      {
        title: 'Source-removal + photos',
        text: 'Negative-pressure HEPA cleaning, full dryer brush-out when booked, before/after images before we leave.',
      },
      {
        title: 'Handoff tips that match City advice',
        text: 'Filter interval, humidity reminder (City cites ~50%), and when to revisit the dryer vent — plus (571) 460-0001 for follow-up.',
      },
    ],
  },
  faqIntro:
    'Common Alexandria booking questions — City resources linked where they help. Call (571) 460-0001 (Burke).',
  faq: [
    {
      q: 'Does the City of Alexandria clean air ducts or test mold in my unit?',
      a: 'No. Alexandria’s [mold page](https://www.alexandriava.gov/Mold) explains renter reporting (landlord, then Alex311) and states Code Administration does not inspect or test for mold. The [City IAQ hub](https://www.alexandriava.gov/environmental-health/indoor-air-quality-alexandria-va) covers hazards and programs like ALX Breathes. We are a private flat-rate duct and dryer-vent cleaner — not a City service.',
    },
    {
      q: 'I’m a renter with mold — should I book duct cleaning first?',
      a: 'If the issue is moisture or visible mold as a housing condition, follow the City’s steps first: written notice to the landlord, then Alex311 if needed ([Mold Information & Assistance](https://www.alexandriava.gov/Mold)). Duct cleaning can still help when trunks hold debris, but it does not fix water intrusion or replace landlord remediation duties.',
    },
    {
      q: 'Why do you mention laundry vents on an Alexandria page?',
      a: 'Alexandria’s [mold prevention tips](https://www.alexandriava.gov/Mold) include cleaning laundry vents regularly. Packed dryer vents also raise fire risk. We brush and vacuum the full run — including tall condo chases — as a separate or combined flat-rate service.',
    },
    {
      q: 'Will VDH recommend Amazon Air Duct Cleaning?',
      a: 'No. [VDH’s mold contact guidance](https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/) says the department does not recommend specific mold specialists. We cite that so expectations stay honest — judge us on scope, photos, and flat-rate terms.',
    },
    {
      q: 'Which office serves Alexandria?',
      a: 'Burke, VA (5641 Burke Centre Pkwy Ste 119). Call (571) 460-0001. Same-day duct + dryer packages are available when both are booked up front.',
    },
    {
      q: 'Where can I read more about humidity in Alexandria homes?',
      a: 'Our article on [Potomac humidity and Alexandria air ducts](/blog/how-potomac-humidity-affects-alexandria-air-quality). Official City context: [Indoor Air Quality](https://www.alexandriava.gov/environmental-health/indoor-air-quality-alexandria-va) and [Mold Information & Assistance](https://www.alexandriava.gov/Mold).',
    },
  ],
}
