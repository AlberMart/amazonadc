import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Wheaton — Metro/urban renewal dust, garden apartments, Wheaton mall hub identity.
 * Links used:
 * - https://www.montgomerycountymd.gov/DEP/air/indoor-air.html
 * - https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold
 * - https://www.montgomerycountymd.gov/DHCA/housing/landlordtenant/
 * - https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement
 */
export const wheaton: LocationContentSeed = {
  slug: 'wheaton',
  title: 'Wheaton MD Air Duct & Dryer Vent Cleaning',
  headline: 'Veirs Mill corridor housing — urban dust and older trunks from Bethesda',
  description:
    'Air duct & dryer vent cleaning in Wheaton, MD. Flat rates for mid-century brick & Metro-corridor homes. Call (301) 809-4544.',
  intro:
    'Wheaton’s identity is the Georgia–Veirs Mill crossroads: Westfield Wheaton, the Metro, and decades of urban renewal that left mid-century brick next to stacked rentals. Garden apartments near Glenmont share dryer risers; bus-corridor film loads returns on Veirs Mill. County DEP publishes IAQ science; DHCA handles many rental complaints. We dispatch from Bethesda with photos and flat rates. (301) 809-4544.',
  heroImage: '/img/locations/wheaton.webp',
  heroAlt: 'Air duct cleaning in Wheaton, MD — Amazon Air Duct Cleaning',
  city: 'Wheaton',
  state: 'MD',
  servedBy: 'bethesda',
  sectionLayout: 'whyFirst',
  about: {
    heading: 'Mall-Metro hub housing — renewal dust and shared laundry stacks',
    paragraphs: [
      'Silver Spring gets the downtown label; Wheaton gets the **mall–Metro knot** — Westfield Wheaton, Wheaton Metro, Glenmont to the east, Kemp Mill and Aspen Hill on the spokes. Housing is mostly 1940s–1960s brick Cape Cods and ramblers with basement handlers, plus garden-style rentals along Randolph and Connecticut Avenue edges where **one dryer riser serves multiple units** and lint compacts faster than in a single-family chase.',
      'Urban renewal and constant corridor traffic add a particulate mix Silver Spring pages describe differently: Georgia Avenue bus film, Veirs Mill grit, and Montgomery pollen layered in leaky mid-century joints. DEP’s [Indoor Air Quality](https://www.montgomerycountymd.gov/DEP/air/indoor-air.html) and [mold](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold) pages recommend humidity control, venting dryers outside, and filter changes — practical context when cool basements sweat through humid summers.',
      'Renters with maintenance disputes should use County [Landlord & Tenant](https://www.montgomerycountymd.gov/DHCA/housing/landlordtenant/) and [DHCA Code Enforcement](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement) — not our intake line. We clean ducts and vents from [Bethesda](/locations/bethesda) alongside [Kensington](/locations/kensington); deeper local reading: [Wheaton urban dust and air ducts](/blog/wheaton-urban-dust-air-ducts).',
    ],
    highlights: [
      'Westfield / Metro / Glenmont garden-apartment identity',
      'Shared risers + corridor particulate called out',
      'DEP IAQ + DHCA rental resources linked',
      'Bethesda: (301) 809-4544',
    ],
  },
  offersTitle: 'Wheaton packages (flat-rate)',
  services: {
    heading: 'Cleaning scopes for Wheaton brick and stacked units',
    intro: 'A Veirs Mill rambler and a Glenmont garden apartment need different access notes — same published rates.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'Source removal with HEPA negative pressure through plaster-cut trunks and basement plenums. [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) on health expectations. [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Basement laundry in brick stock and shared risers in Glenmont-area apartments — full brush-out to cap, aligned with DEP dryer-venting guidance and [NFPA](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional duct antimicrobial',
        text: 'After mechanical cleaning on hard metal when inspection shows film — not DHCA housing enforcement. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Wheaton-only reasons trunks load faster than “close-in Montgomery”',
    items: [
      {
        title: 'Metro-adjacent garden apartments',
        text: 'High-occupancy laundry on shared risers is a Wheaton pattern — we scope the full run, not just the first elbow from the unit.',
      },
      {
        title: 'Corridor film is local geography',
        text: 'Georgia–Veirs Mill traffic and renewal-era construction dust are baseline here, not a footnote borrowed from Silver Spring.',
      },
      {
        title: 'Renters: DHCA before blaming ducts',
        text: 'Landlord notice and [DHCA](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement) complaint steps apply when moisture or mold is a housing condition — duct cleaning does not pause those clocks.',
      },
      {
        title: 'Short eastbound run from Bethesda',
        text: 'Flat rate locked before tools run; portable HEPA when street parking is tight.',
      },
    ],
  },
  communities: {
    heading: 'Wheaton grids we stage from Bethesda',
    intro: 'Silver Spring is south; Kensington is west — this page stays on the mall–Metro ring.',
    groups: [
      {
        title: 'Downtown Wheaton & Westfield',
        places: 'Wheaton CBD, Westfield Wheaton, Georgia Avenue, Veirs Mill Road',
      },
      {
        title: 'Glenmont & Metro ring',
        places: 'Glenmont, Randolph Road, Connecticut Avenue edge, garden-apartment courts',
      },
      {
        title: 'Kemp Mill & Aspen Hill edge',
        places: 'Kemp Mill, Arcola, streets toward Aspen Hill — ask if your block is not listed',
      },
    ],
  },
  process: {
    heading: 'Bethesda → Wheaton visit',
    intro: 'We ask building type first — rambler basement vs shared riser — so access time is honest.',
    steps: [
      { title: 'Building type on the phone', text: 'Rambler, split-level, or garden apartment with shared chase? That drives hose plan — not the flat-rate menu.' },
      { title: 'Rental vs owner paths', text: 'If DHCA is in play for moisture, we still scope ducts/dryer you want cleaned today.' },
      { title: 'Confirm price before tools', text: 'Ducts, dryer, or combo — locked on site before agitation.' },
      { title: 'Clean + photos', text: 'Negative-pressure source removal and full dryer brush-out when booked.' },
      { title: 'Handoff', text: 'Filter tips, DEP humidity reminder, (301) 809-4544 for follow-up.' },
    ],
  },
  faqIntro: 'Wheaton Metro hub questions — book (301) 809-4544 (Bethesda).',
  faq: [
    {
      q: 'Is Wheaton the same service area as Silver Spring on your site?',
      a: 'Same Bethesda office and rates — different housing story. Wheaton emphasizes **Westfield/Metro**, Glenmont garden apartments, and shared dryer risers. Silver Spring emphasizes downtown Georgia Avenue brick and DHCA-heavy rental corridors.',
    },
    {
      q: 'Who handles rental mold complaints in Wheaton?',
      a: 'Most Wheaton addresses fall under County [DHCA Code Enforcement](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement) after landlord written notice — see [Landlord & Tenant](https://www.montgomerycountymd.gov/DHCA/housing/landlordtenant/). DEP [IAQ](https://www.montgomerycountymd.gov/DEP/air/indoor-air.html) educates on humidity and ventilation; it does not replace DHCA.',
    },
    {
      q: 'Do you clean shared dryer risers in Glenmont-area apartments?',
      a: 'Yes — tell us the building and unit layout when you book so we plan access through the full chase.',
    },
    {
      q: 'What humidity range does County DEP cite?',
      a: 'Montgomery DEP [mold/IAQ](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold) materials emphasize keeping indoor humidity in a healthy band (often cited around **30–50%**) and venting dryers outdoors.',
    },
    {
      q: 'Which office dispatches Wheaton?',
      a: 'Bethesda — 7815A Old Georgetown Rd Ste 201. (301) 809-4544.',
    },
  ],
}
