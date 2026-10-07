import type { LocationContentSeed } from '@/utilities/locations'

/**
 * McLean — service-first city page.
 * Official sources used for local job ideas (not as the page thesis):
 * - https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax
 * - https://www.fairfaxcounty.gov/health/environment/mold
 * - https://www.fairfaxcounty.gov/code/property-maintenance
 * - Fairfax mechanical plan review (dryer exhaust duct length limits)
 * - Fairfax County i-Tree / urban forest canopy context
 * - Existing local read: /blog/mclean-tree-pollen-basement-humidity
 */
export const mclean: LocationContentSeed = {
  slug: 'mclean',
  title: 'McLean Air Duct & Dryer Vent Cleaning',
  headline: 'Tree-canopy estates and Tysons-edge condos — Fairfax routes from Burke',
  description:
    'Air duct & dryer vent cleaning in McLean, VA. Flat rates for canopy lots, basements & Tysons condos. Call (571) 460-0001.',
  intro:
    'We clean air ducts and dryer vents in McLean homes and condos — HEPA source-removal, full dryer brush-outs, optional antimicrobial on hard duct metal when inspection supports it. Large Langley and Chesterbrook houses often hide years of pollen and dust in long trunks; finished basements add cool metal that holds film in summer humidity. Flat rate before we start. Photos when we finish. Burke dispatch: (571) 460-0001.',
  heroImage: '/img/locations/mclean.webp',
  heroAlt: 'Air duct and dryer vent cleaning in McLean, VA — Amazon Air Duct Cleaning',
  city: 'McLean',
  state: 'VA',
  servedBy: 'burke',
  sectionLayout: 'default',
  about: {
    heading: 'What McLean homes usually need cleaned — and why',
    paragraphs: [
      'Most McLean calls are **air duct cleaning**, **dryer vent cleaning**, or both in one visit. On large-lot streets (Langley, Chesterbrook, Chain Bridge Road north) the HVAC trunk is long and the house volume is big, so debris builds for years before anyone looks behind a register. Spring oak and maple pollen from Fairfax’s dense residential canopy settles on everything outdoors; returns pull a share of that load indoors every year. Filters help — they do not catch everything. We remove what is already inside the system and show you before/after photos.',
      'Finished lower levels are the other McLean pattern. Many air handlers sit in cool basements near Difficult Run / Pimmit Run drainages where summer humidity stays high. Fairfax [Healthy Homes](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax) and the County [mold page](https://www.fairfaxcounty.gov/health/environment/mold) both stress keeping spaces dry — the same moisture that beads on cold supply metal and bonds dust into sticky film. Duct cleaning clears that film when you book it; it does not replace fixing a leak or running a dehumidifier when the basement stays wet.',
      'Near Tysons we also clean condo and townhome systems: shorter trunks, tight closets, and vertical dryer risers that pack lint and raise fire risk. Fairfax mechanical review practice caps typical dryer exhaust duct length (about **35 feet** unless the manufacturer allows more) — long McLean main-level dryer runs and multi-bend paths are exactly where we spend hose time. Deeper seasonal read: [McLean pollen, basements, and ducts](/blog/mclean-tree-pollen-basement-humidity).',
    ],
    highlights: [
      'Air ducts + dryer vents — flat residential packages',
      'Built for large-lot trunks and basement handlers',
      'Before/after photos on every job',
      'Book Burke: (571) 460-0001',
    ],
  },
  offersTitle: 'McLean flat-rate packages',
  services: {
    heading: 'Services we sell in McLean',
    intro:
      'Same published packages as the rest of our Burke route — scoped to your house layout, not per-vent games.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'HEPA negative pressure on the trunk, agitation through supplies and returns, registers included. On estate-scale systems we plan hose map and time from the walkthrough — the **price stays flat** once confirmed. [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) cautions against health overclaims for routine cleaning; we sell debris removal and documentation. Details: [air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Full brush-out from the dryer to the exterior or roof cap — including long horizontal runs from main-floor laundry and stacked Tysons closets. Lint buildup is a fire and overheating risk ([NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines)). Book alone or with ducts: [dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Combo package',
        text: 'Ducts and dryer in one visit so we only stage the truck once on long McLean drives. Best value when both systems are overdue. [Air duct + dryer vent cleaning](/air-duct-and-dryer-vent-cleaning).',
      },
      {
        title: 'Optional duct antimicrobial',
        text: 'After mechanical cleaning, EPA-registered product on **hard duct surfaces** when inspection shows biological film — not whole-home mold remediation. Fairfax County [Health](https://www.fairfaxcounty.gov/health/environment/mold) does not test or remediate mold for you; [Code Compliance](https://www.fairfaxcounty.gov/code/property-maintenance) treats mold alone as not a property-maintenance violation while leaks and failed systems can be. Scope: [mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why McLean homeowners book us',
    items: [
      {
        title: 'Flat rate before tools leave the truck',
        text: 'You get a locked residential price for ducts, dryer, or both — confirmed before agitation. Unusual multi-system estates are scoped first, then quoted.',
      },
      {
        title: 'Photos you can keep',
        text: 'Before/after images of trunks and dryer runs. Useful for your records, HOA questions, or comparing “looks fine at the register” with what was inside.',
      },
      {
        title: 'Built for long trunks and basement access',
        text: 'We plan stair paths, finished-rec-room handlers, and long dryer routes on the morning of the visit — not after we are already mid-job.',
      },
      {
        title: 'Honest line with County mold limits',
        text: 'We clean mechanical systems. We do not claim Fairfax Health “cleared” your house. If you have an active leak dispute, use County Code/landlord paths; hire us when you want the ducts or dryer cleaned.',
      },
    ],
  },
  communities: {
    heading: 'McLean areas we serve from Burke',
    intro:
      'If your address is in McLean or the immediate Tysons edge, we schedule from Burke. Tell us the neighborhood when you call so we plan drive time and parking.',
    groups: [
      {
        title: 'Langley & north McLean',
        places:
          'Langley, Chesterbrook, Chain Bridge Road north — large lots, long trunks, canopy pollen seasons.',
      },
      {
        title: 'Central McLean',
        places:
          'Dolley Madison corridor, Franklin Park area, downtown McLean — colonials and finished basements.',
      },
      {
        title: 'Tysons edge',
        places:
          'Tysons-adjacent condos and townhomes, West McLean, Routes 123/7 — closet handlers and dryer risers; send garage/dock rules when you book.',
      },
    ],
  },
  process: {
    heading: 'How to book a McLean cleaning',
    intro: 'Five steps from call to photos — built to get you a clear price and a finished job.',
    steps: [
      {
        title: 'Call or request an estimate',
        text: '(571) 460-0001 or the form below. Say ducts, dryer, or both — and whether the handler is in a basement or closet.',
      },
      {
        title: 'We confirm the package',
        text: 'Flat residential rate for the scope you choose. Multi-system or commercial spaces get a custom quote before the truck is assigned.',
      },
      {
        title: 'Visit day access',
        text: 'We need clear paths to the air handler and dryer, outdoor cap access when possible, and any HOA/garage notes you already have.',
      },
      {
        title: 'Clean under negative pressure',
        text: 'Source-removal duct cleaning and/or full dryer brush-out as booked. Optional antimicrobial only with your OK after we see the metal.',
      },
      {
        title: 'Photos and handoff',
        text: 'Before/after images, filter tip for pollen season, and the same Burke number for follow-up.',
      },
    ],
  },
  faqIntro: 'Buying questions for McLean jobs. Call (571) 460-0001 to schedule.',
  faq: [
    {
      q: 'How much does air duct cleaning cost in McLean?',
      a: 'Residential packages are **flat-rate** — we confirm the number before work starts. There is no per-vent counting on standard homes. Very large multi-system estates are scoped first. See current packages on this page or call (571) 460-0001.',
    },
    {
      q: 'Do I need ducts, dryer vent, or both?',
      a: 'Book **ducts** when registers show film, airflow feels uneven, or it has been years since a full clean — common on large McLean trunks after many pollen seasons. Book the **dryer vent** when clothes take longer to dry, the dryer runs hot, or the run is long/bent. Many homeowners take the [combo](/air-duct-and-dryer-vent-cleaning) so we only visit once.',
    },
    {
      q: 'Will Fairfax County inspect mold or certify my ducts?',
      a: 'No. County [Health](https://www.fairfaxcounty.gov/health/environment/mold) does not perform indoor air testing or mold remediation. [Code Compliance](https://www.fairfaxcounty.gov/code/property-maintenance) does not treat mold alone as a maintenance violation. We provide private cleaning with photos — not a County certificate.',
    },
    {
      q: 'My basement smells musty — is duct cleaning enough?',
      a: 'Often moisture is the root cause. County [Healthy Homes](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax) guidance starts with keeping spaces dry. Fix leaks and humidity first; duct cleaning removes debris already in the trunks when you still want that system cleaned.',
    },
    {
      q: 'Which office serves McLean?',
      a: 'Our **Burke** office (5641 Burke Centre Pkwy Ste 119). Phone (571) 460-0001. Same crew covers [Great Falls](/locations/great-falls), [Vienna](/locations/vienna), and [Arlington](/locations/arlington) on the Northern Virginia calendar.',
    },
  ],
}
