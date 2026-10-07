import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Columbia — Howard County Health mold (no county testing) + Tenant Mold Protection Act 15/45 via landlord-tenant pub.
 */
export const columbia: LocationContentSeed = {
  slug: 'columbia',
  title: 'Columbia MD Air Duct & Dryer Vent Cleaning',
  headline: 'Village townhomes and lake-edge basements — scheduled from our Bethesda office',
  description:
    'Air duct & dryer vent cleaning in Columbia, MD. Flat rates for village townhomes & lake-edge homes. Call (301) 809-4544.',
  intro:
    'Howard County Health Department says it has no program to evaluate mold concerns. Village townhomes and lake-adjacent houses still load ducts with pollen and damp-season film. We clean ducts and dryer vents from Bethesda with flat rates and photos. Call (301) 809-4544.',
  heroImage: '/img/locations/columbia.webp',
  heroAlt: 'Air duct cleaning in Columbia, MD — Amazon Air Duct Cleaning',
  city: 'Columbia',
  state: 'MD',
  servedBy: 'bethesda',
  sectionLayout: 'faqMid',
  about: {
    heading: 'Rouse villages + County honesty',
    paragraphs: [
      'Columbia’s ten villages mean party-wall townhomes, path-adjacent colonials, and lake-edge humidity pockets — mechanical closets sized for 1970s–90s equipment with dryer chases that modern machines pack harder. That planned-community layout is what we walk through on most Howard County jobs from Bethesda.',
      'Howard County’s [Mold](https://www.howardcountymd.gov/health/mold) page is blunt: the Health Department does not evaluate mold concerns or provide assistance programs for them; inspect for water damage, control humidity (at or below about 50% is the common target they discuss), and use trained specialists for testing if you choose it. County Inspections also states mold inspections are not performed by County personnel.',
      'Maryland’s Tenant Mold Protection Act — summarized in Howard County’s [landlord-tenant publication](https://www.howardcountymd.gov/consumer-protection/landlord-tenant-publication) — expects landlords to assess after written notice on short clocks and remediate when mold is found. Duct cleaning does not replace that housing-law path. We schedule Columbia from Bethesda with [Ellicott City](/locations/ellicott-city) nearby.',
    ],
    highlights: [
      'Howard County “no mold evaluation program” cited',
      'Village townhome + lake humidity angle',
      'Tenant mold timelines pointed to County pub',
      'Bethesda: (301) 809-4544',
    ],
  },
  offersTitle: 'Columbia packages',
  services: {
    heading: 'What we clean in village housing',
    intro: 'Townhomes and singles share the rate card; dryer chase geometry differs.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'Source removal for compact village systems. [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned). [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Party-wall and between-floor chases common in Rouse-era townhomes. [NFPA](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional duct antimicrobial',
        text: 'After mechanical cleaning when film is present — not a County mold evaluation. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why homeowners in Columbia book us',
    items: [
      {
        title: 'Health Dept will not “clear” you',
        text: 'No County mold evaluation program — photos from a cleaning visit are private documentation, not a health-department certificate.',
      },
      {
        title: 'Columbia Association vs duct cleaning',
        text: 'Columbia Association context matters for leases; it does not clean your trunks. We do when hired.',
      },
      {
        title: 'Lake-edge humidity',
        text: 'County humidity advice maps cleanly onto lake-adjacent basements and crawl spaces.',
      },
      {
        title: 'Flat rate from Bethesda',
        text: 'Howard County drive — we set a clear appointment window and stay reachable if traffic stretches it.',
      },
    ],
  },
  communities: {
    heading: 'Villages we commonly stage',
    intro: 'Named villages keep this list Columbia — not generic “Howard County.”',
    groups: [
      { title: 'Central & west', places: 'Town Center, Wilde Lake, Harper’s Choice, Hickory Ridge' },
      { title: 'South & east', places: 'Owen Brown, Oakland Mills, Long Reach, Kings Contrivance' },
      { title: 'North & newer edges', places: 'River Hill, Dorsey’s Search, lake-adjacent streets' },
    ],
  },
  process: {
    heading: 'Bethesda → Columbia',
    intro: 'Share village and parking notes when you book so the crew knows the court layout.',
    steps: [
      { title: 'Village / parking', text: 'Court parking vs open lot — tell us which.' },
      { title: 'Scope', text: 'Ducts, dryer chase, or both; flat rate first.' },
      { title: 'Clean + photos', text: 'Source removal and dryer brush-out.' },
      { title: 'Handoff', text: 'Humidity target from County mold reading; (301) 809-4544.' },
    ],
  },
  faqIntro: 'Howard County links. Book: (301) 809-4544.',
  faq: [
    {
      q: 'Will Howard County inspect mold in my Columbia townhome?',
      a: 'The Health Department [mold page](https://www.howardcountymd.gov/health/mold) says it has no program to evaluate mold concerns. County Inspections also does not perform mold inspections.',
    },
    {
      q: 'What are landlord mold timelines in Maryland?',
      a: 'Howard County’s [landlord-tenant publication](https://www.howardcountymd.gov/consumer-protection/landlord-tenant-publication) summarizes Tenant Mold Protection Act duties — including assessment after written notice and remediation windows when mold is found. Read that page for the live summary; we do not enforce it.',
    },
    {
      q: 'Do you clean Columbia Association properties?',
      a: 'We clean resident-hired HVAC ducts and dryer vents in Columbia addresses. CA facilities are out of residential scope unless separately contracted.',
    },
    {
      q: 'Which office serves Columbia?',
      a: 'Bethesda, MD. Call (301) 809-4544.',
    },
  ],
}
