import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Arlington — multi-source civic angle (not one mold URL repeated).
 * Links used:
 * - https://www.arlingtonva.us/Government/Programs/Health/Environmental-Health/Mold
 * - https://www.arlingtonva.us/Residents/Housing/Home-Health-and-Safety
 * - https://www.arlingtonva.us/Government/Programs/Health/Environmental-Health
 * - https://www.arlingtonva.us/Government/Programs/Building/Enforcement-Appeals/Code
 * - https://www.arlingtonva.us/Government/Programs/Building/Enforcement-Appeals/Code/Violations
 * - https://www.arlingtonva.us/Government/Programs/Housing/Housing-Assistance/Tenant-Landlord-Rights-Responsibilities
 * - https://www.arlingtonva.us/Government/Departments/Fire/Office-of-the-Fire-Marshal/Community-Engagement/Fire-Safety/Free-Home-Safety-Checks
 * - https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/
 * - https://law.lis.virginia.gov/vacode/title8.01/chapter3/section8.01-226.12/
 * - https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned
 * - https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines
 */
export const arlington: LocationContentSeed = {
  slug: 'arlington',
  title: 'Arlington Air Duct & Dryer Vent Cleaning',
  headline: 'High-rise laundry chases and North Arlington basements — booked on the Burke office line',
  description:
    'Air duct & dryer vent cleaning in Arlington, VA. Flat rates for corridor condos & homes. Before/after photos. Call (571) 460-0001.',
  intro:
    'Arlington is dense: Rosslyn–Ballston high-rises with long dryer risers, Columbia Pike garden apartments, and North Arlington singles with basement handlers. County pages are unusually honest about mold — they will not inspect or remove it — and they point renters to written landlord notice, Code Enforcement for leaks, and Housing Division advice. We clean ducts and dryer vents with flat rates and photos from Burke. Call (571) 460-0001.',
  heroImage: '/img/locations/arlington.webp',
  heroAlt: 'Air duct cleaning in Arlington, VA — Amazon Air Duct Cleaning',
  city: 'Arlington',
  state: 'VA',
  servedBy: 'burke',
  sectionLayout: 'faqMid',
  about: {
    heading: 'What County pages actually say — and who to call for what',
    paragraphs: [
      'Arlington’s [Mold](https://www.arlingtonva.us/Government/Programs/Health/Environmental-Health/Mold) page (also under [Home Health and Safety](https://www.arlingtonva.us/Residents/Housing/Home-Health-and-Safety)) is unusually direct: the County **cannot inspect, test, or remove mold**, and there are no “safe” mold-level standards. The civic message is moisture control — A/C or dehumidifiers in humid summers, bath/kitchen fans, fast leak cleanup.',
      'Renters: put water or mold **in writing** to the landlord and keep copies. [Code Enforcement](https://www.arlingtonva.us/Government/Programs/Building/Enforcement-Appeals/Code) (703-228-3232 / Permit Arlington) can look at moisture defects like leaks or peeling paint, but **does not address mold complaints as such** — see also [Violations](https://www.arlingtonva.us/Government/Programs/Building/Enforcement-Appeals/Code/Violations). Process basics: [Tenant–Landlord Rights & Responsibilities](https://www.arlingtonva.us/Government/Programs/Housing/Housing-Assistance/Tenant-Landlord-Rights-Responsibilities); Housing Division advice 703-228-3765.',
      'Virginia [§ 8.01-226.12](https://law.lis.virginia.gov/vacode/title8.01/chapter3/section8.01-226.12/) covers landlord duties after proper mold notice — context, not a sales pitch. Our Burke crew clears HVAC trunks and dryer risers, shows photos, and does not pretend to be County inspectors. More on humidity: [Potomac humidity and Arlington air quality](/blog/how-potomac-humidity-affects-arlington-air-quality). Neighbors: [Alexandria](/locations/alexandria), [Falls Church](/locations/falls-church), [Washington, DC](/locations/washington-dc).',
    ],
    highlights: [
      'Mold + Code Enforcement + tenant–landlord links — not one recycled URL',
      'Corridors, garden apartments, North Arlington singles',
      'Flat-rate ducts / dryer vents with before/after photos',
      'Burke: (571) 460-0001',
    ],
  },
  offersTitle: 'Arlington flat-rate packages',
  services: {
    heading: 'What we clean on Arlington jobs',
    intro:
      'Ducts, dryer vents, optional antimicrobial on hard duct surfaces — mechanical work beside County moisture guidance, not instead of it.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'HEPA negative pressure and full-system agitation through supplies, returns, and registers — including tight closet handlers in townhomes and stacked condo trunks. [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) still cautions against health overclaims for routine cleaning; we remove debris and document it. [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning (corridor-ready)',
        text: 'Rosslyn–Ballston and Pentagon City laundry closets pack lint in long vertical risers; slow dry times and overheating are the honest booking drivers. Arlington’s Fire Marshal [free home safety checklist](https://www.arlingtonva.us/Government/Departments/Fire/Office-of-the-Fire-Marshal/Community-Engagement/Fire-Safety/Free-Home-Safety-Checks) literally asks whether your clothes dryer vent is clean and properly installed — same theme as [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). Full brush-out to the exterior or roof cap. [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional duct antimicrobial',
        text: 'After mechanical cleaning, EPA-registered product on hard metal when inspection shows film — not whole-home mold remediation and not a substitute for fixing the water problem the County [mold page](https://www.arlingtonva.us/Government/Programs/Health/Environmental-Health/Mold) says must be fixed or mold returns. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why Arlington homeowners book us',
    items: [
      {
        title: 'Mold education is not mold inspection',
        text: '[Environmental Health](https://www.arlingtonva.us/Government/Programs/Health/Environmental-Health) publishes mold guidance; it does not clear your HVAC or certify indoor air. Hire us for debris and lint — use County pages when you need the official moisture story.',
      },
      {
        title: 'Leaks → Code Enforcement; mold spores → not their ticket',
        text: 'File moisture defects through [Code Enforcement](https://www.arlingtonva.us/Government/Programs/Building/Enforcement-Appeals/Code). The County is explicit that mold complaints themselves are outside that lane. Do not expect our cleaning invoice to substitute for an enforcement case.',
      },
      {
        title: 'Renters have a Housing Division, not just a duct cleaner',
        text: '[Tenant–Landlord Rights & Responsibilities](https://www.arlingtonva.us/Government/Programs/Housing/Housing-Assistance/Tenant-Landlord-Rights-Responsibilities) covers written maintenance requests, VUSBC basics, and when Code Enforcement applies. Housing Division contact is also on the mold page for advice — separate from booking Burke.',
      },
      {
        title: 'Dryer vents show up on Fire Marshal safety lists',
        text: 'The [home safety check](https://www.arlingtonva.us/Government/Departments/Fire/Office-of-the-Fire-Marshal/Community-Engagement/Fire-Safety/Free-Home-Safety-Checks) checklist includes dryer-vent condition. Corridor risers are where we spend the most hose length in Arlington.',
      },
    ],
  },
  communities: {
    heading: 'Arlington corridors we stage for',
    intro: 'Same packages; different hose runs, garage heights, and quiet hours.',
    groups: [
      { title: 'Rosslyn–Ballston corridor', places: 'Rosslyn, Court House, Clarendon, Virginia Square, Ballston' },
      { title: 'Columbia Pike & Pentagon City', places: 'Columbia Pike, Pentagon City, Crystal City, Pentagon-area apartments' },
      { title: 'North Arlington', places: 'Cherrydale, Lyon Park, Ashton Heights, East Falls Church-adjacent streets' },
    ],
  },
  process: {
    heading: 'Burke → Arlington visit flow',
    intro: 'We separate civic moisture cases from mechanical cleaning scope on the walkthrough.',
    steps: [
      {
        title: 'Building type',
        text: 'High-rise riser, garden apt, or single-family basement handler? That sets time and access notes, not the rate card.',
      },
      {
        title: 'Scope check',
        text: 'Active leak or landlord dispute stays on the County/landlord path ([Code Enforcement](https://www.arlingtonva.us/Government/Programs/Building/Enforcement-Appeals/Code) / written notice). We quote ducts and/or dryer vent for today.',
      },
      {
        title: 'Lock the number',
        text: 'Flat rate confirmed before agitation; antimicrobial only with your OK.',
      },
      {
        title: 'Clean and photograph',
        text: 'Source-removal ducts and/or full dryer brush-out, then before/after images.',
      },
      {
        title: 'Handoff',
        text: 'Filter tips, humidity reminder aligned with County summer advice, (571) 460-0001 for follow-up.',
      },
    ],
  },
  faqIntro:
    'Arlington questions with real County links. Book: (571) 460-0001.',
  faq: [
    {
      q: 'Will Arlington County inspect mold in my apartment?',
      a: 'No. The County [Mold page](https://www.arlingtonva.us/Government/Programs/Health/Environmental-Health/Mold) says Arlington cannot inspect, test, or remove mold. [Code Enforcement](https://www.arlingtonva.us/Government/Programs/Building/Enforcement-Appeals/Code) can look at moisture-related building defects (leaks, peeling paint, holes), but not mold complaints as such.',
    },
    {
      q: 'I’m a renter — who do I contact before calling a duct cleaner?',
      a: 'Put moisture or mold in writing to the landlord and keep copies ([Mold](https://www.arlingtonva.us/Government/Programs/Health/Environmental-Health/Mold)). For process and maintenance rights, read [Tenant–Landlord Rights & Responsibilities](https://www.arlingtonva.us/Government/Programs/Housing/Housing-Assistance/Tenant-Landlord-Rights-Responsibilities). Housing Division advice: 703-228-3765. Book us when you want ducts or dryer vents cleaned — that does not replace landlord duties.',
    },
    {
      q: 'How do I file a Code Enforcement complaint for a leak?',
      a: 'Use the [Code Enforcement](https://www.arlingtonva.us/Government/Programs/Building/Enforcement-Appeals/Code) hub: Permit Arlington online complaint, or call 703-228-3232. Emergency complaints are investigated quickly per County wording on [Violations](https://www.arlingtonva.us/Government/Programs/Building/Enforcement-Appeals/Code/Violations). We do not file those cases for you.',
    },
    {
      q: 'Do you test for mold?',
      a: 'No lab testing from us. Arlington’s mold page notes testing is often unnecessary when mold is visible or musty, and there are no standards for “safe” levels. We clean ducts/vents and document with photos.',
    },
    {
      q: 'Why mention the Fire Marshal on a duct-cleaning page?',
      a: 'Their [free home safety checklist](https://www.arlingtonva.us/Government/Departments/Fire/Office-of-the-Fire-Marshal/Community-Engagement/Fire-Safety/Free-Home-Safety-Checks) includes whether the clothes dryer vent is clean and properly installed — especially relevant for tall corridor risers. National fire context: [NFPA dryer-fire research](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines).',
    },
    {
      q: 'Which office serves Arlington?',
      a: 'Burke, VA (5641 Burke Centre Pkwy Ste 119). Call (571) 460-0001. Combined duct + dryer packages available in one visit. [VDH](https://www.vdh.virginia.gov/environmental-health/2018/07/17/who-do-i-contact-for-help-with-mold-removal/) does not recommend specific contractors — judge us on scope and photos.',
    },
  ],
}
