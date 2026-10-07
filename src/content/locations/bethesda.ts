import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Bethesda hub + city — NIH/medical corridor, dense condos/townhomes, MoCo DEP IAQ + DHCA rental resources.
 */
export const bethesda: LocationContentSeed = {
  slug: 'bethesda',
  title: 'Bethesda Air Duct Cleaning — Local MD Office',
  headline: 'Woodmont condos, townhomes, and NIH-area homes — duct and dryer cleaning from a staffed Bethesda office',
  description:
    'Air duct & dryer vent cleaning from our Bethesda office on Old Georgetown Road. Flat rates, photos. Call (301) 809-4544.',
  intro:
    'Suite 201 at 7815A Old Georgetown Rd is where Maryland jobs are booked — not a call center. Bethesda mixes Wisconsin Avenue condos, Bradley Boulevard townhomes, and busy medical-corridor traffic that can put more dust into returns than quiet suburban streets. County DEP publishes indoor-air and mold guidance; DHCA handles many rental complaints. We clean ducts and dryer vents with photos and flat rates. (301) 809-4544.',
  heroImage: '/img/locations/bethesda.webp',
  heroAlt: 'Bethesda, MD office — Amazon Air Duct Cleaning on Old Georgetown Road',
  city: 'Bethesda',
  state: 'MD',
  servedBy: 'bethesda',
  sectionLayout: 'hubBethesda',
  about: {
    heading: 'Medical-corridor dust, stacked laundry, and County resources that actually help',
    paragraphs: [
      'Wisconsin Avenue and the NIH corridor add construction dust, shuttle film, and dense condo HVAC stacks. Woodmont Triangle, Edgemoor, and Friendship Heights often need multi-floor dryer risers and elevator reservations — access planning is part of the job, not an upsell.',
      'Montgomery DEP [Indoor Air Quality](https://www.montgomerycountymd.gov/DEP/air/indoor-air.html) and [mold guidance](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold) push roughly 30–50% humidity, outdoor dryer venting, and filter changes — the same moisture logic that makes basement handlers sweat under Bradley Boulevard canopy. Renters: [Landlord & Tenant](https://www.montgomerycountymd.gov/DHCA/housing/landlordtenant/) and [DHCA Code Enforcement](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement) for housing-condition reports — not our role.',
      'Jobs mix NIH-corridor condos, Woodmont high-rises, and Bradley Boulevard colonials. Virginia is from our [Burke office](/locations/burke) at (571) 460-0001 — same packages, separate Google listing. Inside Rockville city limits, City rental rules may apply instead of County DHCA ([Rockville](/locations/rockville)).',
    ],
    highlights: [
      'NIH / Wisconsin Ave corridor + Woodmont condo risers',
      'DEP IAQ + DHCA rental resources cited — no overclaiming',
      'Staffed Suite 201 — flat-rate photo jobs',
      '(301) 809-4544',
    ],
  },
  offersTitle: 'Bethesda & Maryland dispatch packages',
  services: {
    heading: 'Scopes we run from Old Georgetown Road',
    intro:
      'Condo stacked laundry, townhome party walls, and mid-century ramblers south of Democracy share one published rate card — different floor plans and vent runs, same flat-rate pricing.',
    items: [
      {
        title: 'Air duct cleaning (source removal)',
        text: 'HEPA negative pressure through supplies, returns, and registers — including tight closet handlers common in Bethesda townhomes. [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) still cautions on health claims from routine duct cleaning; we remove debris and show photos. [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning (condo-ready)',
        text: 'Full brush-out through shared chases to exterior or roof caps — aligned with DEP’s “vent dryers outdoors” mold-prevention theme and [NFPA dryer-fire data](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Combo + optional duct antimicrobial',
        text: 'Ducts and dryer in one visit: [combo package](/air-duct-and-dryer-vent-cleaning). After mechanical cleaning, optional EPA-registered product on hard metal when inspection supports it — not DHCA enforcement and not whole-home mold remediation. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why homeowners in Bethesda book us',
    items: [
      {
        title: 'Renters: landlord / DHCA steps before duct scope',
        text: 'When mold or maintenance is a landlord issue, start with written notice and County [Landlord & Tenant](https://www.montgomerycountymd.gov/DHCA/housing/landlordtenant/) / [DHCA Code Enforcement](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement) guidance. We clean trunks and vents you hire us for — we do not file complaints for you.',
      },
      {
        title: 'DEP humidity advice applies to your trunks',
        text: 'DEP [IAQ](https://www.montgomerycountymd.gov/DEP/air/indoor-air.html) and mold pages push dehumidification and exhaust habits. Cleaning removes what is already in the system; moisture repair slows the return.',
      },
      {
        title: 'Building access is scoped up front',
        text: 'Loading dock, elevator windows, and condo board rules go on the work order — especially Woodmont and Friendship Heights high-rises.',
      },
      {
        title: 'Price locked before equipment runs',
        text: 'Residential packages confirmed on (301) 809-4544; before/after photos at close-out.',
      },
    ],
  },
  communities: {
    heading: 'Maryland cities staged from Suite 201',
    intro: 'City pages carry neighborhood detail; this hub is the staffed Bethesda desk.',
    groups: [
      {
        title: 'Close-in Montgomery',
        places:
          '[Silver Spring](/locations/silver-spring), [Kensington](/locations/kensington), [Wheaton](/locations/wheaton), [Takoma Park](/locations/takoma-park), Chevy Chase area',
      },
      {
        title: 'I-270 corridor',
        places:
          '[Rockville](/locations/rockville), [Gaithersburg](/locations/gaithersburg), [Germantown](/locations/germantown), [Montgomery Village](/locations/montgomery-village), [Clarksburg](/locations/clarksburg)',
      },
      {
        title: 'West & north',
        places: '[Potomac](/locations/potomac), [Olney](/locations/olney), [Frederick](/locations/frederick)',
      },
      {
        title: "Prince George's & Howard",
        places:
          '[College Park](/locations/college-park), [Hyattsville](/locations/hyattsville), [Columbia](/locations/columbia), [Ellicott City](/locations/ellicott-city)',
      },
    ],
  },
  process: {
    heading: 'Bethesda intake — then I-270 and Beltway routes',
    intro: 'We plan around your building’s rules and stay in touch so the visit matches what you booked.',
    steps: [
      {
        title: 'Phone scope on the Bethesda line',
        text: 'Call (301) 809-4544. Stacked laundry, NIH-area dust concerns, basement vs closet handlers — we note it before dispatch.',
      },
      {
        title: 'Condo / HOA access notes',
        text: 'If your building needs elevator, loading-dock, or board clearance, tell us when you book — we work with those rules so the crew is not turned away at the door.',
      },
      {
        title: 'Agreed arrival window',
        text: 'We schedule a time window with you and stay reachable if traffic or building delays shift the day — no silent no-shows.',
      },
      {
        title: 'On-site package lock',
        text: 'Dryer, ducts, or both — flat-rate scope confirmed before agitation starts.',
      },
      {
        title: 'Photos and handoff',
        text: 'Before/after set, filter cadence, DEP humidity reminder, and (301) 809-4544 for follow-up.',
      },
    ],
  },
  faqIntro: 'Bethesda office + NIH-corridor housing — book (301) 809-4544.',
  faq: [
    {
      q: 'Does Montgomery County DEP clean my air ducts?',
      a: 'No. DEP’s [Indoor Air Quality](https://www.montgomerycountymd.gov/DEP/air/indoor-air.html) pages educate on humidity, mold prevention, and ventilation — they are not a residential HVAC cleaning service. We are a private flat-rate duct and dryer-vent cleaner from Suite 201.',
    },
    {
      q: 'I’m a renter near NIH with mold — duct cleaning or DHCA first?',
      a: 'If moisture or mold is a housing-condition issue, follow [Landlord & Tenant](https://www.montgomerycountymd.gov/DHCA/housing/landlordtenant/) and [DHCA Code Enforcement](https://www.montgomerycountymd.gov/department-housing-community-affairs/dhca-code-enforcement) steps after written landlord notice. Duct cleaning can help when trunks hold debris; it does not fix leaks or replace landlord remediation.',
    },
    {
      q: 'Do you handle Woodmont / Friendship Heights condo risers?',
      a: 'Yes — multi-floor dryer chases and elevator access are routine Bethesda jobs. Share the building name and any board rules when you book.',
    },
    {
      q: 'How is Bethesda different from Rockville on your site?',
      a: 'Rockville emphasizes **city** code vs County DHCA jurisdiction. Bethesda emphasizes **dense** Wisconsin/NIH corridor housing and condo logistics from the same Bethesda office.',
    },
    {
      q: 'How do I verify this office?',
      a: '7815A Old Georgetown Rd Ste 201, Bethesda MD 20814 — match our Google Business pin. (301) 809-4544 rings this desk.',
    },
    {
      q: 'Need Northern Virginia instead?',
      a: 'Book [Burke](/locations/burke) at (571) 460-0001 — same packages and pricing, separate Google Business listing.',
    },
  ],
}
