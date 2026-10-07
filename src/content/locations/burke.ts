import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Burke hub — company home base: Lake Braddock, Fairfax Station canopy, I-495 corridor, County Health mold page.
 * Links used:
 * - https://www.fairfaxcounty.gov/health/environment/mold
 * - https://www.fairfaxcounty.gov/code/property-maintenance
 * - https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned
 */
export const burke: LocationContentSeed = {
  slug: 'burke',
  title: 'Burke Air Duct Cleaning — Fairfax Office & Local Dispatch',
  headline: 'Staffed desk on Burke Centre Parkway for Lake Braddock, Fairfax Station, and Northern Virginia routes',
  description:
    'Air duct & dryer vent cleaning from our Burke, VA office. Fairfax dispatch, flat rates, before/after photos. Call (571) 460-0001.',
  intro:
    '5641 Burke Centre Pkwy Ste 119 is not a virtual office — trucks stage here, the (571) 460-0001 line rings this desk, and Burke Centre / Lake Braddock / Fairfax Station streets are often the **shortest drive** on the board. Oak canopy, humid Fairfax summers, and I-495 corridor dust load returns on colonials and townhomes we photograph every week. County Health explains what it does not do for mold; we clean ducts and dryer vents with flat rates. (571) 460-0001.',
  heroImage: '/img/locations/burke.webp',
  heroAlt: 'Burke, VA office — Amazon Air Duct Cleaning on Burke Centre Parkway',
  city: 'Burke',
  state: 'VA',
  servedBy: 'burke',
  sectionLayout: 'hubBurke',
  about: {
    heading: 'Home-base honesty — this is where the Fairfax calendar starts',
    paragraphs: [
      'National brands hide behind toll-free numbers; our Burke listing is the **address we drive past** to reach Lake Braddock, Fairfax Station, Burke Centre, and the Robinson Secondary / I-495 fringe. Split-levels, 1970s–90s colonials, and townhome rows under heavy oak canopy are the weekly default — not occasional “service area” copy. When we say before/after photos, many reference jobs are **blocks from this parkway**, not stock imagery from another state.',
      'Fairfax County Health’s [mold, mildew, and fungi](https://www.fairfaxcounty.gov/health/environment/mold) page is the civic baseline: keep spaces dry, reduce humidity, fix leaks — and understand the Health Department **does not** perform indoor air testing or mold remediation. [Code Compliance — Property Maintenance](https://www.fairfaxcounty.gov/code/property-maintenance) notes mold alone is not a standalone violation while failing systems that cause moisture may be. We remove debris from HVAC trunks and lint from dryer runs; we do not replace County environmental health or file Code cases for you.',
      'Maryland jobs leave from [Bethesda](/locations/bethesda) at (301) 809-4544 — same packages, separate Google listing. From Burke we fan out to [Springfield](/locations/springfield), [Fairfax](/locations/fairfax), [Oakton](/locations/oakton), [Alexandria](/locations/alexandria), and the Dulles corridor on the regular rotation.',
    ],
    highlights: [
      'HQ on Burke Centre Pkwy — shortest drives locally',
      'Lake Braddock / Fairfax Station canopy housing',
      'County Health mold page — honest scope boundaries',
      '(571) 460-0001 staffed desk',
    ],
  },
  offersTitle: 'Burke & Northern Virginia packages',
  services: {
    heading: 'Services staged from Suite 119',
    intro:
      'Burke Centre townhome dryer chases and Lake Braddock basement handlers share the published rate card with Reston high-rises — different access, same flat-rate discipline.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'HEPA negative pressure and agitation through supplies, returns, and registers — including 1990s additions on original Fairfax colonials. [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned). [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Long horizontal runs to rear walls and roof caps in Burke Centre — full brush-out, not the first elbow only. [NFPA](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Combo + optional duct antimicrobial',
        text: '[Combo package](/air-duct-and-dryer-vent-cleaning) for one stop. Optional EPA-registered product on hard metal after cleaning — not County remediation. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why Burke matters as an office — not just a ZIP on a map',
    items: [
      {
        title: 'Photos from real nearby jobs',
        text: 'Canopy colonials and Parkway-adjacent splits around Lake Braddock are routine — the crew knows your street type before GPS finishes.',
      },
      {
        title: 'County mold guidance sets expectations',
        text: '[Health mold page](https://www.fairfaxcounty.gov/health/environment/mold) does not certify contractors — we match that honesty with flat-rate scope and images.',
      },
      {
        title: 'Local dispatch, not a distant call center',
        text: 'Scheduling runs from the Burke office line — we aim for windows that fit real Fairfax drive times and keep you updated if the day shifts.',
      },
      {
        title: 'Price locked before hoses unroll',
        text: 'Residential duct and dryer packages confirmed on (571) 460-0001; before/after photos every visit.',
      },
    ],
  },
  communities: {
    heading: 'Virginia cities from Burke Centre Parkway',
    intro: 'City pages carry neighborhood FAQs; this hub is the staffed Burke desk.',
    groups: [
      {
        title: 'Next door',
        places:
          '[Springfield](/locations/springfield), [Fair Oaks](/locations/fair-oaks), [Oakton](/locations/oakton), [Lorton](/locations/lorton), [Mt Vernon](/locations/mount-vernon), [Fairfax](/locations/fairfax)',
      },
      {
        title: 'Inside the Beltway & close-in',
        places:
          '[Alexandria](/locations/alexandria), [Arlington](/locations/arlington), [Falls Church](/locations/falls-church), [McLean](/locations/mclean)',
      },
      {
        title: 'Dulles corridor',
        places:
          '[Reston](/locations/reston), [Herndon](/locations/herndon), [Vienna](/locations/vienna), [Great Falls](/locations/great-falls), [Chantilly](/locations/chantilly), [Loudoun](/locations/loudoun)',
      },
      {
        title: 'Farther south & the District',
        places: '[Prince William](/locations/prince-william), [Washington, DC](/locations/washington-dc)',
      },
    ],
  },
  process: {
    heading: 'Burke Centre intake — then Fairfax routes',
    intro: 'When you live in Burke itself, dispatch is often same-day friendly — farther west gets I-495/I-66 math.',
    steps: [
      {
        title: 'Phone scope on the Burke line',
        text: 'Call (571) 460-0001 — basement vs attic handler, townhome party-wall dryer, pets, and gate codes for west-county HOAs.',
      },
      {
        title: 'Stay on the agreed window',
        text: 'We book a clear arrival window and stay reachable if Mixing Bowl traffic or an HOA gate slows the crew — nearby Burke jobs often land earlier in the day when the route allows.',
      },
      {
        title: 'On-site package lock',
        text: 'Ducts, dryer, or both — flat-rate before equipment starts.',
      },
      {
        title: 'HEPA source-removal',
        text: 'Negative pressure, agitation, vacuum extraction — debris leaves in the machine, not your rooms.',
      },
      {
        title: 'Photos and handoff',
        text: 'Before/after set, filter tips for oak pollen season, dryer interval reminder, (571) 460-0001 for follow-up.',
      },
    ],
  },
  faqIntro: 'Burke HQ questions — Fairfax County context. (571) 460-0001.',
  faq: [
    {
      q: 'Is Burke really your main Virginia office?',
      a: 'Yes — 5641 Burke Centre Pkwy Ste 119 is staffed for booking and dispatch. Many crews start here; Burke/Lake Braddock addresses are typically the **shortest** drives on the calendar.',
    },
    {
      q: 'Does Fairfax County Health clean air ducts or test mold for me?',
      a: 'No. The County [mold page](https://www.fairfaxcounty.gov/health/environment/mold) states Health does not perform indoor air testing or mold remediation. We are a private flat-rate duct and dryer-vent cleaner.',
    },
    {
      q: 'Why emphasize Lake Braddock and Fairfax Station?',
      a: 'That is the immediate canopy housing around the office — the housing stock we see most often in Burke-area photos and weekly routes, not generic “Northern Virginia.”',
    },
    {
      q: 'Do you handle Reston / McLean HOA gates from Burke?',
      a: 'Yes — share gate codes when you book. Those routes run weekly from this office.',
    },
    {
      q: 'Need Maryland service?',
      a: '[Bethesda](/locations/bethesda) at (301) 809-4544 — same packages and pricing, separate Google Business listing.',
    },
    {
      q: 'Can ducts and dryer vent be one visit?',
      a: 'Yes — ask for the combo on (571) 460-0001 so the truck carries both tool sets.',
    },
  ],
}
