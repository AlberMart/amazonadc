import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Prince William County — PCE maintenance vs mold lab + VDH + VA DEQ indoor air.
 * Links used:
 * - https://www.pwcva.gov/department/neighborhood-services/pce-overview
 * - https://www.vdh.virginia.gov/environmental-health/public-health-toxicology/mold/
 * - https://www.deq.virginia.gov/news-info/the-environment-you/your-air/indoor-air-quality
 * - https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned
 * - https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines
 */
export const princeWilliam: LocationContentSeed = {
  slug: 'prince-william',
  title: 'Air Duct & Dryer Vent Cleaning in Prince William County, VA',
  headline: 'Woodbridge, Manassas, and Gainesville — I-95 humidity and inland dust from Burke',
  description:
    'Air duct & dryer vent cleaning in Prince William County, VA. Flat rates for Woodbridge & Manassas. Call (571) 460-0001.',
  intro:
    'Prince William Property Code Enforcement handles property maintenance and quality-of-life code issues — not mold testing or HVAC certification. VDH and VA DEQ indoor air pages point residents to moisture control and trusted federal guidance. We clean ducts and dryer vents in I-95 corridor townhomes and inland Manassas colonials with flat rates and photos from Burke — same crew that already runs Springfield. (571) 460-0001.',
  heroImage: '/img/locations/prince-william.webp',
  heroAlt: 'Air duct cleaning in Prince William County, VA — Amazon Air Duct Cleaning',
  city: 'Prince William',
  state: 'VA',
  servedBy: 'burke',
  sectionLayout: 'communitiesFirst',
  about: {
    heading: 'River-corridor humidity, inland splits, and civic boundaries',
    paragraphs: [
      'Prince William stretches from Occoquan-adjacent Woodbridge and Dale City — 1970s–2000s townhomes and split-levels with basement handlers that sweat all summer — out to Manassas colonials and Gainesville HOA new-build where drywall dust never left the supplies. I-95 corridor homes load highway particulate alongside river humidity; inland blocks swap some of that for pollen and older retrofit trunks with awkward junctions.',
      '[Property Code Enforcement (PCE)](https://www.pwcva.gov/department/neighborhood-services/pce-overview) investigates property maintenance and related code concerns in the county — useful when building conditions violate maintenance standards, but **not** a mold laboratory or air-duct inspection service. For mold framing, [VDH mold guidance](https://www.vdh.virginia.gov/environmental-health/public-health-toxicology/mold/) applies statewide. [VA DEQ indoor air quality](https://www.deq.virginia.gov/news-info/the-environment-you/your-air/indoor-air-quality) steers readers toward EPA and VDH resources rather than endorsing vendors.',
      'We dispatch from Burke with I-95 drive time in the window — alongside [Springfield](/locations/springfield) and [Lorton](/locations/lorton). We remove debris from ducts and lint from dryer vents; we do not file PCE complaints or replace county enforcement.',
    ],
    highlights: [
      'PCE = maintenance enforcement, not mold testing',
      'VDH + DEQ indoor air cited honestly',
      'Woodbridge / Manassas / Dale City housing mix',
      'Burke: (571) 460-0001',
    ],
  },
  offersTitle: 'Prince William flat-rate packages',
  services: {
    heading: 'What we clean across Prince William County',
    intro: 'Vertical dryer chases in Woodbridge and Gainesville basement handlers — same flat-rate card.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'HEPA negative pressure and full-system agitation. [EPA duct guidance](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) cautions against overselling health outcomes — we document debris removed. [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Lake Ridge and Dale City townhomes pack lint in interior wall chases. [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional duct antimicrobial',
        text: 'After mechanical cleaning on hard metal when inspection supports it — not VDH remediation and not PCE clearance. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why PCE and duct cleaning solve different problems',
    items: [
      {
        title: 'Maintenance code vs mechanical cleaning',
        text: '[PCE overview](https://www.pwcva.gov/department/neighborhood-services/pce-overview) describes enforcement on property conditions — not scheduling your HVAC hygiene visit.',
      },
      {
        title: 'DEQ points to EPA/VDH — not to us',
        text: '[DEQ indoor air](https://www.deq.virginia.gov/news-info/the-environment-you/your-air/indoor-air-quality) aggregates guidance; we compete on flat rate and photos, not “state approved.”',
      },
      {
        title: 'Occoquan humidity loads basements',
        text: 'River-adjacent communities keep supply metal damp — dehumidify and fix leaks per [VDH mold](https://www.vdh.virginia.gov/environmental-health/public-health-toxicology/mold/); clean ducts when debris warrants it.',
      },
      {
        title: 'Burke southern corridor routing',
        text: 'We book around I-95 traffic and stay reachable if the corridor stretches the day; ducts + dryer together when you schedule both.',
      },
    ],
  },
  communities: {
    heading: 'Prince William communities we stage for',
    intro: 'County-wide page — name your neighborhood for HOA and access notes.',
    groups: [
      {
        title: 'Woodbridge & the river',
        places: 'Woodbridge, Lake Ridge, Occoquan, Dale City, Dumfries edge',
      },
      {
        title: 'Manassas & west',
        places: 'Manassas, Manassas Park, Buckhall, Yorkshire, Independent Hill area',
      },
      {
        title: 'Gainesville & I-66',
        places: 'Gainesville, Haymarket, Linton Hall, Bristow edge',
      },
    ],
  },
  process: {
    heading: 'Burke → Prince William visit flow',
    intro: 'Separate landlord/PCE pathways from the duct scope you hire today.',
    steps: [
      {
        title: 'Housing type',
        text: 'River-corridor townhome riser, Dale City split-level, or Gainesville new-build — sets time, not rate.',
      },
      {
        title: 'Scope boundaries',
        text: 'Active maintenance dispute or mold as housing condition — county/landlord path first. We quote ducts/dryer for this visit.',
      },
      {
        title: 'Lock flat rate',
        text: 'Confirmed before agitation; antimicrobial only with your OK.',
      },
      {
        title: 'Clean + photograph',
        text: 'Source-removal and full dryer brush-out when booked.',
      },
      {
        title: 'Handoff',
        text: 'When to use PCE vs VDH vs follow-up duct work — (571) 460-0001.',
      },
    ],
  },
  faqIntro: 'Prince William — PCE, VDH, DEQ, and our scope. Book: (571) 460-0001 (Burke).',
  faq: [
    {
      q: 'Will Prince William Property Code Enforcement test mold in my ducts?',
      a: 'No. [PCE](https://www.pwcva.gov/department/neighborhood-services/pce-overview) handles property maintenance and code enforcement — not mold lab work or HVAC cleanliness certification. See [VDH mold guidance](https://www.vdh.virginia.gov/environmental-health/public-health-toxicology/mold/) for mold questions.',
    },
    {
      q: 'What does VA DEQ say about indoor air?',
      a: '[DEQ indoor air quality](https://www.deq.virginia.gov/news-info/the-environment-you/your-air/indoor-air-quality) points to EPA and VDH resources. It does not recommend specific duct cleaners — we cite it so expectations stay honest.',
    },
    {
      q: 'Woodbridge humidity — ducts or dehumidifier first?',
      a: 'Moisture control first per VDH and [EPA moisture guidance](https://www.epa.gov/mold). Duct cleaning removes accumulated debris when inspection supports it; it does not dry a wet basement.',
    },
    {
      q: 'Why NFPA on a county page?',
      a: 'Packed vertical dryer chases in corridor townhomes are a fire-safety issue — [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines) documents the pattern.',
    },
    {
      q: 'Can I combine ducts and dryer vent in one trip?',
      a: 'Yes — book both up front. Call (571) 460-0001 from Burke.',
    },
    {
      q: 'How far ahead should I book Prince William?',
      a: 'Allow several days for I-95 drive windows from Burke. Same crew often runs [Springfield](/locations/springfield) the same week.',
    },
  ],
}
