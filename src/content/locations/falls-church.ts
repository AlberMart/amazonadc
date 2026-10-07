import type { LocationContentSeed } from '@/utilities/locations'

/**
 * City of Falls Church — independent city + Fairfax County Health contract angle.
 * Links used:
 * - https://www.fallschurchva.gov/691/Tenant-Landlord-Property-Assistance
 * - https://www.fairfaxcounty.gov/health/environment/mold
 * - https://www.fallschurchva.gov/1846/Code-Administration
 * - https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/
 */
export const fallsChurch: LocationContentSeed = {
  slug: 'falls-church',
  title: 'Falls Church Air Duct Cleaning',
  headline: 'City lots and close-in Fairfax County streets — ducts and dryer vents from Burke',
  description:
    'Air duct & dryer vent cleaning in Falls Church, VA. Flat rates for City lots & close-in homes. Photos. Call (571) 460-0001.',
  intro:
    'The City of Falls Church is its own jurisdiction — separate from Fairfax County addresses that share a Falls Church mailing name. City staff can mediate some landlord–tenant disputes, but mediation cannot order mold remediation or duct work. Fairfax County Health handles mold and pest questions under contract. We clean ducts and dryer vents in bungalows on compact lots and West End streets with flat rates and photos. Burke dispatch: (571) 460-0001.',
  heroImage: '/img/locations/falls-church.webp',
  heroAlt: 'Air duct cleaning in Falls Church, VA — Amazon Air Duct Cleaning',
  city: 'Falls Church',
  state: 'VA',
  servedBy: 'burke',
  sectionLayout: 'faqEarly',
  about: {
    heading: 'Independent city housing — and who answers mold questions',
    paragraphs: [
      'Falls Church is a tight grid of 1920s–1960s bungalows on small lots, close enough to Route 7 and the Beltway that road film lands in returns. This page is the **City of Falls Church**, not the larger Fairfax County mailing area — if your HOA says Fairfax County, see [Fairfax](/locations/fairfax) or [Arlington](/locations/arlington).',
      'For mold and pest, the City points to [Fairfax County Health mold](https://www.fairfaxcounty.gov/health/environment/mold): moisture control first; Health does not test indoor air or remediate. City [Code Administration](https://www.fallschurchva.gov/1846/Code-Administration) handles permits and property standards — we are not inspectors and do not file City complaints.',
      'Renters: [Tenant, Landlord & Property Assistance](https://www.fallschurchva.gov/691/Tenant-Landlord-Property-Assistance) may offer **mediation**, but mediation **cannot order** mold abatement or HVAC work. When you want trunks or dryer chases cleaned, book Burke — nearby routes also cover [Vienna](/locations/vienna) and [McLean](/locations/mclean).',
    ],
    highlights: [
      'City vs county address — we quote the right page when you call',
      'Fairfax County Health mold guidance cited honestly',
      'Compact-lot trunks, Beltway dust, stacked laundry chases',
      'Burke: (571) 460-0001',
    ],
  },
  offersTitle: 'Falls Church flat-rate packages',
  services: {
    heading: 'What we clean in the City of Falls Church',
    intro:
      'Retrofit metal in joist bays and tight dryer bends — same published scopes as county neighbors, different parking notes.',
    items: [
      {
        title: 'Air duct cleaning (source removal)',
        text: 'HEPA negative pressure on the trunk, agitation through supplies and returns, registers included. [EPA duct guidance](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) still cautions against health overclaims — we remove debris and show photos. [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Small-lot homes often route dryers through bent interior walls; lint packs elbows before the dryer “feels” slow. Fire risk is the other honest driver — see [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). Full brush-out to the exterior cap. [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional antimicrobial on hard duct surfaces',
        text: 'After mechanical cleaning, EPA-registered product on hard metal when inspection shows biological film — not whole-home mold remediation and not a substitute for fixing water intrusion Fairfax County Health describes. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'What usually brings us to Falls Church homes',
    items: [
      {
        title: 'Mediation does not order mold work',
        text: 'City [tenant–landlord assistance](https://www.fallschurchva.gov/691/Tenant-Landlord-Property-Assistance) can facilitate conversation; it does not compel landlords to remediate mold or clean ducts. Separate housing disputes from the mechanical scope you hire us for.',
      },
      {
        title: 'County Health, city streets',
        text: 'Mold education and referral paths run through [Fairfax County Health](https://www.fairfaxcounty.gov/health/environment/mold) for Falls Church residents. We clean HVAC pathways — we do not replace County environmental health services.',
      },
      {
        title: 'Beltway particulate on short runs',
        text: 'Traffic dust plus street-tree pollen loads returns on pre-war and mid-century trunks retrofitted after walls were closed. Cleaning removes what is already inside; filters and humidity control slow the return.',
      },
      {
        title: 'Flat rate + photos from Burke',
        text: 'Quote locked before agitation; before/after images at close-out. Alley parking and narrow driveways go on the work order the morning of the visit.',
      },
    ],
  },
  communities: {
    heading: 'City streets we stage for from Burke',
    intro: 'Confirm city limits when you book — edge blocks touch Arlington and Fairfax County.',
    groups: [
      {
        title: 'Downtown & Broad Street',
        places: 'Broad Street, Washington Street, City Hall blocks, Eden Center edge',
      },
      {
        title: 'West End & Tinner Hill',
        places: 'Tinner Hill, West End, Cherry Hill, Lincoln Park area',
      },
      {
        title: 'City edges',
        places: 'Streets toward [Arlington](/locations/arlington), Seven Corners-adjacent blocks — ask if your parcel is city or county',
      },
    ],
  },
  process: {
    heading: 'Burke → Falls Church visit flow',
    intro: 'We separate City/landlord pathways from duct and dryer scope on the walkthrough.',
    steps: [
      {
        title: 'Confirm jurisdiction',
        text: 'City of Falls Church vs Fairfax County address changes which civic links we mention — not the flat-rate menu.',
      },
      {
        title: 'Building type',
        text: 'Basement handler, attic trunk, or second-floor laundry closet? Tight joist bays are routine here, not upsell bait.',
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
        text: 'Moisture tips aligned with County Health summer advice, filter interval, (571) 460-0001 for follow-up.',
      },
    ],
  },
  faqIntro:
    'Falls Church City questions — mediation limits and County Health links included. Book: (571) 460-0001 (Burke).',
  faq: [
    {
      q: 'Can the City of Falls Church order my landlord to fix mold or clean ducts?',
      a: 'No. [Tenant, Landlord & Property Assistance](https://www.fallschurchva.gov/691/Tenant-Landlord-Property-Assistance) explains that mediation **cannot order** remedies. Mold questions are steered to [Fairfax County Health](https://www.fairfaxcounty.gov/health/environment/mold), which does not test indoor air or perform remediation for you. We are a private duct and dryer-vent cleaner.',
    },
    {
      q: 'Does Falls Church inspect mold inside my HVAC system?',
      a: 'City [Code Administration](https://www.fallschurchva.gov/1846/Code-Administration) handles city permits and property standards; mold prevention materials are part of broader housing guidance. Neither Code nor County Health certifies duct cleanliness on a service visit — we document our mechanical cleaning with photos.',
    },
    {
      q: 'I live in “Falls Church” but my mail says Fairfax — is this the right page?',
      a: 'Many addresses use Falls Church mailing names while sitting in Fairfax County. This page targets the **independent City**. If you are county-only, see [Fairfax](/locations/fairfax) or call (571) 460-0001 and we will match the right service area.',
    },
    {
      q: 'Why mention EPA and NFPA on a city page?',
      a: '[EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) frames routine duct cleaning carefully on health claims; [NFPA](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines) documents dryer-fire patterns. Honest drivers: debris removal, lint fire risk, airflow — not “County approved.”',
    },
    {
      q: 'Will VDH recommend your company for mold?',
      a: '[VDH mold contact guidance](https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/) does not recommend specific contractors. Judge us on flat-rate scope and before/after photos.',
    },
    {
      q: 'Which office dispatches Falls Church jobs?',
      a: 'Burke, VA (5641 Burke Centre Pkwy Ste 119). Call (571) 460-0001. Combined duct + dryer packages available when both are booked up front.',
    },
  ],
}
