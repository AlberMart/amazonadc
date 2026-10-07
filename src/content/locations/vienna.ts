import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Town of Vienna — maple canopy pollen + Metro village + Fairfax County IAQ.
 * Links used:
 * - https://www.fairfaxcounty.gov/health/environment/mold
 * - https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax
 * - https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/
 */
export const vienna: LocationContentSeed = {
  slug: 'vienna',
  title: 'Vienna Air Duct Cleaning',
  headline: 'Maple Avenue colonials and Wolf Trap canopy — pollen and basements from Burke',
  description:
    'Air duct & dryer vent cleaning in Vienna, VA. Flat rates for colonials & finished basements. Photos. Call (571) 460-0001.',
  intro:
    'Vienna is a walkable town wrapped in mature maple and oak canopy — heavy spring pollen on rooftop intakes is normal, not a surprise “allergy season” footnote. Finished basements along Glyndon Park hold cool handlers while humid air upstairs loads metal trunks. Fairfax County Health does not test indoor air or remediate mold; Healthy Homes pushes moisture control. We clean ducts and dryer vents from Burke with flat rates and photos. (571) 460-0001.',
  heroImage: '/img/locations/vienna.webp',
  heroAlt: 'Air duct cleaning in Vienna, VA — Amazon Air Duct Cleaning',
  city: 'Vienna',
  state: 'VA',
  servedBy: 'burke',
  sectionLayout: 'faqMid',
  about: {
    heading: 'Canopy pollen, basement handlers, County IAQ context',
    paragraphs: [
      'The Town of Vienna centers on Maple Avenue and Church Street — 1950s–70s colonials on generous lots, weekend farmers market energy, and Orange Line access without Reston’s tower density. Mature street trees define the look and the HVAC load: pollen cakes outdoor coils and grilles every April, then mixes with Chain Bridge Road traffic film inside returns.',
      'Finished basements in Glyndon Park and Nutley-side streets stay cool year-round; when July humidity enters upstairs, condensation forms on basement supply metal — the same moisture story [Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax) tells countywide. Colonials with 1990s rec-room additions often have original trunks branching into new wings — joints where debris stacks faster than in a single-era layout.',
      'Fairfax County’s [mold page](https://www.fairfaxcounty.gov/health/environment/mold) states the Health Department does not perform indoor air testing or mold remediation. We are private mechanical cleaners from [Burke](/locations/burke), staged with [Oakton](/locations/oakton), [McLean](/locations/mclean), and [Falls Church](/locations/falls-church) on Route 123 runs.',
    ],
    highlights: [
      'Maple/oak pollen + basement condensation angle',
      'Town-scale colonials and basement handlers',
      'Healthy Homes + County mold cited honestly',
      'Burke: (571) 460-0001',
    ],
  },
  offersTitle: 'Vienna flat-rate packages',
  services: {
    heading: 'What we clean in Vienna colonials and Metro-edge townhomes',
    intro: 'Basement trunks, second-floor laundry closets, and Tysons-edge mechanical rooms — one rate card.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'HEPA negative pressure and agitation through the full system. Pollen and road film in returns respond to source removal; [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) still cautions against health overclaims. [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Second-floor laundry in colonials and Vienna Metro-area townhomes push lint through long wall paths to gable caps. [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional duct antimicrobial',
        text: 'After mechanical cleaning on hard metal when inspection supports it — not County remediation. Scope: [mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'What usually brings us to Vienna homes',
    items: [
      {
        title: 'Spring tree pollen',
        text: 'Maple and oak canopy loads outdoor grilles and returns every April — source removal clears years of seasonal debris from trunks and registers.',
      },
      {
        title: 'Humidity around basement air handlers',
        text: 'Cool concrete and finished rec rooms create condensation zones County guidance tells you to dehumidify — cleaning removes existing debris; moisture control slows return.',
      },
      {
        title: 'County boundaries',
        text: '[Mold guidance](https://www.fairfaxcounty.gov/health/environment/mold) does not certify contractors. [VDH](https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/) does not pick vendors — flat rate + photos do.',
      },
      {
        title: 'Route 123 from Burke',
        text: 'Familiar Fairfax County drive — Maple Avenue appointments are not staged from a distant warehouse.',
      },
    ],
  },
  communities: {
    heading: 'Vienna neighborhoods we route',
    intro: 'Town limits vs Tysons-edge streets — mention HOA when you book.',
    groups: [
      {
        title: 'Maple Avenue & downtown',
        places: 'Maple Avenue, Church Street, Glyndon Park, Chain Bridge Road in town',
      },
      {
        title: 'Metro & Nutley',
        places: 'Vienna Metro area, Nutley Street, Courthouse Road corridor',
      },
      {
        title: 'Wolf Trap & west',
        places: 'Wolf Trap, Tapawingo, streets toward [Oakton](/locations/oakton) and [Fairfax](/locations/fairfax)',
      },
    ],
  },
  process: {
    heading: 'Burke → Vienna visit flow',
    intro: 'Protect floors in finished basements; note pollen season when scheduling follow-ups.',
    steps: [
      {
        title: 'Building layout',
        text: 'Basement handler, attic trunk, or addition branch? Colonial additions are everyday scope.',
      },
      {
        title: 'Moisture vs mechanical scope',
        text: 'Active leak or visible mold as housing condition — County moisture-first path. We quote ducts/dryer for today.',
      },
      {
        title: 'Lock flat rate',
        text: 'Confirmed before agitation; Envirocon only with your OK.',
      },
      {
        title: 'Clean and photograph',
        text: 'Source-removal ducts; full dryer brush-out when booked.',
      },
      {
        title: 'Handoff',
        text: 'Filter interval, dehumidifier reminder per [Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax), (571) 460-0001.',
      },
    ],
  },
  faqIntro: 'Common Vienna booking questions — call (571) 460-0001 (Burke).',
  faq: [
    {
      q: 'Is Vienna the same service story as Reston?',
      a: 'No. Reston emphasizes corridor towers and long condo dryer risers. Vienna is town-scale colonials, Wolf Trap canopy pollen, and basement handlers — see [Reston](/locations/reston) for high-rise notes.',
    },
    {
      q: 'Does Fairfax County inspect air ducts in Vienna?',
      a: 'County [mold guidance](https://www.fairfaxcounty.gov/health/environment/mold) covers moisture and mold education — not routine HVAC cleanliness inspections. We document our cleaning with photos; we are not County inspectors.',
    },
    {
      q: 'Pollen season — should I clean ducts every spring?',
      a: 'Heavy canopy loads outdoor grilles and can contribute to return debris over years. [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) notes ducts should be cleaned when needed — we inspect on site and quote flat rate before work.',
    },
    {
      q: 'Finished basement smells musty — is that duct mold?',
      a: 'Musty basements often trace to moisture, not ducts alone. [Healthy Homes Fairfax](https://www.fairfaxcounty.gov/health/environment/healthy-homes-fairfax) prioritizes dehumidification and leak repair. We clean HVAC pathways when booked; we do not replace whole-home mold remediation.',
    },
    {
      q: 'Who dispatches Vienna jobs?',
      a: 'Burke, VA (5641 Burke Centre Pkwy Ste 119). Call (571) 460-0001.',
    },
  ],
}
