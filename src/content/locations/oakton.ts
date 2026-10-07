import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Oakton — Route 123 canopy colonials, Fairfax Station-adjacent.
 * Links used:
 * - https://www.fairfaxcounty.gov/health/environment/mold
 * - https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax
 * - https://www.fairfaxcounty.gov/code/property-maintenance
 */
export const oakton: LocationContentSeed = {
  slug: 'oakton',
  title: 'Oakton Air Duct Cleaning',
  headline: 'Canopy lots, finished basements, and long dryer paths — from Burke',
  description:
    'Air duct & dryer vent cleaning in Oakton, VA. Flat rates for large-lot colonials & canopy homes. Call (571) 460-0001.',
  intro:
    'Oakton sits on Route 123 between the Town of Vienna and the City of Fairfax — Vale Road, Hunter Mill, Waples Mill — under one of the county’s heavier hardwood canopies. Finished basements keep handlers cool while summer humidity loads supply metal; 1960s–80s colonials with rec-room additions trap debris at graft points. County Health does not test indoor air; Healthy Homes pushes moisture control. We clean from Burke with flat rates and photos. (571) 460-0001.',
  heroImage: '/img/locations/oakton.webp',
  heroAlt: 'Air duct cleaning in Oakton, VA — Amazon Air Duct Cleaning',
  city: 'Oakton',
  state: 'VA',
  servedBy: 'burke',
  sectionLayout: 'servicesFirst',
  about: {
    heading: 'Canopy pollen on intakes — and basement handlers Oakton actually has',
    paragraphs: [
      'Oakton’s wooded half-acre and quarter-acre lots drop oak and maple pollen straight onto rooftop intakes and ground-level returns every spring — a heavier load than open subdivisions closer to I-66. Many homes grew by addition: original metal trunks branch into 1990s rec-room zones, and lint collects at those junctions more than in a single-era layout. Second-floor laundry often feeds long interior paths to a rear gable cap.',
      'Fairfax County Health’s [mold guidance](https://www.fairfaxcounty.gov/health/environment/mold) is clear: the Health Department **does not** perform indoor air testing or mold remediation. [Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax) emphasizes dehumidification, leak repair, and venting dryers outdoors — the habits that matter when cool basement supply metal condensates in July. [Property maintenance code](https://www.fairfaxcounty.gov/code/property-maintenance) notes mold alone is not a standalone violation while failing systems that cause moisture may be.',
      'Burke dispatch covers Oakton on the Route 123 rotation with [Vienna](/locations/vienna), [Fairfax](/locations/fairfax), and [Fair Oaks](/locations/fair-oaks). Fairfax Station–adjacent canopy streets share this pollen pattern. Seasonal detail: [Oakton canopy pollen and air ducts](/blog/oakton-canopy-pollen-air-ducts).',
    ],
    highlights: [
      'Canopy pollen + basement condensation angle',
      'County Health + Healthy Homes — honest limits',
      'Addition-era trunk joints routine',
      'Burke: (571) 460-0001',
    ],
  },
  offersTitle: 'Oakton flat-rate packages',
  services: {
    heading: 'Cleaning scopes for Oakton colonials and addition homes',
    intro:
      'Large-lot basement handlers, long second-floor dryer runs, and attic branches from 1990s wings — quoted flat-rate before hoses unroll.',
    items: [
      {
        title: 'Air duct cleaning (source removal)',
        text: 'HEPA negative pressure on the trunk, agitation through supplies, returns, and register boots — including addition junctions where debris stacks. [EPA duct guidance](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned). [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Long interior runs to gable or sidewall caps pack lint at elbows before the dryer feels slow. [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional antimicrobial on hard duct surfaces',
        text: 'After mechanical cleaning when biological film shows on hard metal — not County remediation and not a substitute for fixing moisture [Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax) describes. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why homeowners in Oakton book us',
    items: [
      {
        title: 'Large-lot colonials and long dryer runs',
        text: 'Route 123 colonials, Hunter Mill courts, and Fairfax Station–edge lots — we plan basement handlers, addition branches, and gable-cap dryer paths before the flat rate locks.',
      },
      {
        title: 'Addition joints trap debris',
        text: '1960s original trunks plus rec-room branches are scoped on walkthrough — flat rate locked before agitation, not per-register counting after surprises.',
      },
      {
        title: 'Canopy + Waples Mill film',
        text: 'Tree pollen and road particulate load returns together; cleaning removes trunk interior film filters cannot recover.',
      },
      {
        title: 'Photos + flat rate from Burke',
        text: 'Before/after images at close-out; share gate codes and long-driveway notes when you book so the crew arrives ready.',
      },
    ],
  },
  communities: {
    heading: 'Route 123 corridor neighborhoods',
    intro: 'Vienna town and City of Fairfax are separate civic pages on the same dispatch.',
    groups: [
      {
        title: 'Oakton Village & 123',
        places: 'Oakton Village, Chain Bridge Road, Waples Mill, Jermantown edge',
      },
      {
        title: 'Vale & Hunter Mill',
        places: 'Vale Road, Hunter Mill, large-lot streets toward [Vienna](/locations/vienna)',
      },
      {
        title: 'Toward Fairfax & Fair Oaks',
        places:
          'Blocks toward City of [Fairfax](/locations/fairfax), [Fair Oaks](/locations/fair-oaks), Fairfax Station–adjacent lanes',
      },
    ],
  },
  process: {
    heading: 'Burke → Oakton timing',
    intro: 'Route 123 is a regular Burke corridor — we book a clear window and keep the line open if the day shifts.',
    steps: [
      {
        title: 'Scope basement vs attic handler',
        text: 'Oakton colonials mix both; addition branches change vent runs — confirmed before price locks.',
      },
      {
        title: 'Dryer path length',
        text: 'Second-floor laundry through interior walls? Full brush-out scoped as flat-rate dryer service when booked.',
      },
      {
        title: 'Confirm package before tools run',
        text: 'Ducts, dryer, or both — antimicrobial only with your OK.',
      },
      {
        title: 'HEPA source-removal + photos',
        text: 'Debris leaves in the vacuum; before/after images before we leave.',
      },
      {
        title: 'Handoff',
        text: 'Filter cadence, dehumidifier reminder from County mold tips; (571) 460-0001.',
      },
    ],
  },
  faqIntro: 'Oakton corridor — County Health context. Book: (571) 460-0001 (Burke).',
  faq: [
    {
      q: 'Do you dispatch Oakton from the Burke office?',
      a: 'Yes. Burke, VA (5641 Burke Centre Pkwy Ste 119) stages Route 123 jobs including Oakton — canopy pollen, addition-era trunks, and long dryer runs are routine scope here.',
    },
    {
      q: 'Does Fairfax County recommend duct cleaning for pollen?',
      a: 'County [mold](https://www.fairfaxcounty.gov/health/environment/mold) and [Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax) focus on moisture control and maintenance — not endorsing vendors. We provide mechanical source removal with photos when you hire us.',
    },
    {
      q: 'Why do finished basements matter here?',
      a: 'Cool below-grade handlers meet humid upstairs air all summer — condensation on supply metal binds canopy pollen into sticky film. Fixing humidity helps; cleaning removes what already accumulated inside trunks.',
    },
    {
      q: 'We added a rec room in the 1990s — is duct layout a surprise?',
      a: 'Graft points between original metal and addition branches are everyday Oakton work — walkthrough identifies junctions before the flat rate locks.',
    },
    {
      q: 'Which office serves Oakton?',
      a: 'Burke, VA (5641 Burke Centre Pkwy Ste 119). Call (571) 460-0001.',
    },
    {
      q: 'More on canopy pollen locally?',
      a: '[Oakton canopy pollen and air ducts](/blog/oakton-canopy-pollen-air-ducts). Official: [Fairfax County Health — mold](https://www.fairfaxcounty.gov/health/environment/mold).',
    },
  ],
}
