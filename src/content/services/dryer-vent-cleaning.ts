import type { ServiceContent } from '@/utilities/services'
import { DRYER_LINT_GUARANTEE } from '@/utilities/serviceCopy'

export const dryerVentCleaning: ServiceContent = {
  slug: 'dryer-vent-cleaning',
  title: 'Dryer Vent Cleaning',
  description:
    'Dryer vent cleaning from $199. Full-length brush-out, before/after photos, flat rates. Serving Virginia, Maryland & Washington DC.',
  summary:
    'Professional dryer vent cleaning with rotary brush and high-powered vacuum to reduce fire risk and improve dryer efficiency.',
  price: 199,
  orderUrl: 'https://buy.stripe.com/14AfZicRh8HD99t1ok4AU01',
  heroImage: '/img/dryer-vent-cleaning-tech-van.jpg',
  heroAlt:
    'Technician unloading dryer vent cleaning hose and tools from a service van at a home',
  includesImage: '/img/101221_AmazonDC-299.webp',
  includesImageAlt:
    'Dryer vent cleaning service includes brushing and vacuuming the entire length of the dryer duct',
  includes: [
    'The service includes brushing and vacuuming the entire length of the dryer duct, as this is the only acceptable cleaning method for this service.',
    'The price includes both cleaning and inspection to ensure the dryer vent is safe to use.',
    'The price is flat rate and does not have any restriction on the length of the dryer duct.',
  ],
  beforeAfter: [
    { src: '/img/before_after/dryer_before.webp', alt: 'Dryer vent before cleaning' },
    { src: '/img/before_after/dryer_after.webp', alt: 'Dryer vent after cleaning' },
    { src: '/img/before_after/dryer_before2.webp', alt: 'Dryer vent before cleaning' },
    { src: '/img/before_after/dryer_after2.webp', alt: 'Dryer vent after cleaning' },
  ],
  processAside: {
    heading: 'Our Source Removal Process',
    paragraphs: [
      'Our dryer duct cleaning service is quite a bit different than our air duct cleaning service. Dryer vents contain lint, which is a sticky substance that requires greater agitation from dryer vent cleaning tools to remove than does dust from a duct.',
    ],
    steps: [
      { title: 'Connect the vacuum', text: 'We insert a 6.6-hp vacuum into one end of the vent.' },
      {
        title: 'Brush the full run',
        text: 'From the opposite end of the vent, we insert a drill-powered 4-inch-wide brush that agitates and loosens the lint. We have the capacity to go as far as 40 feet into the vent.',
      },
      { title: 'Document before and after', text: 'We provide before and after pictures of the vent.' },
      {
        title: 'Lint-removal guarantee',
        text: DRYER_LINT_GUARANTEE,
      },
    ],
  },
  why: {
    heading: 'Why Dryer Vent Cleaning Matters for Fire Safety',
    paragraphs: [
      'Most homeowners clean the lint trap after every load — but the trap only catches part of the lint. The rest travels into the vent duct, where it can accumulate, restrict airflow, and create a fire hazard.',
      'According to the [National Fire Protection Association (NFPA) analysis of home dryer fires for 2014–2018](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines), U.S. fire departments responded to an estimated average of about **13,820 home dryer fires per year**. **Failure to clean** was a factor in about **32%** of those fires, and **dust, fiber, or lint** was the item first ignited in about **27%**. USFA’s dedicated topical report still covers only [2008–2010](https://www.usfa.fema.gov/downloads/pdf/statistics/v13i7.pdf) (~2,900 residential dryer fires/year, narrower scope). CPSC’s [2020–2022 residential fire-loss estimates](https://www.cpsc.gov/s3fs-public/2020-2022_Residential_Fire_Loss_Estimates-Annual_Fire_Loss_Report.pdf) put clothes-dryer fires near **~5,100/year** on average — newer counts, but without NFPA’s failure-to-clean breakdown.',
      'Beyond fire risk, a clogged vent can make clothes take longer to dry and increase dryer wear. For gas dryers, restricted exhaust can also raise concern about combustion products not leaving the home properly — clear venting supports safer operation. Professional cleaning removes packed lint along the run and restores airflow; it reduces a preventable hazard but does not make a dryer “fireproof.”',
    ],
  },
  columns: [
    {
      heading: 'Signs your dryer vent needs cleaning',
      items: [
        'Clothes take more than one cycle to fully dry',
        'The dryer or laundry room feels unusually hot during operation',
        'A burning smell is noticeable while the dryer is running',
        'Excessive lint accumulates around the dryer or exterior vent opening',
        "The exterior vent flap doesn't open properly when the dryer is on",
        'More than 12 months have passed since the last professional cleaning',
      ],
    },
    {
      heading: 'What professional vent cleaning helps with',
      items: [
        'Removes lint that NFPA identifies as a common first material ignited in dryer fires',
        'Restores exhaust airflow so clothes can dry in fewer cycles',
        'May reduce strain on the dryer when airflow was restricted',
        'Supports safer exhaust for gas dryers when the vent was blocked',
        'Documents the run with before/after photos',
        'Does not claim to eliminate all fire risk from mechanical or electrical faults',
      ],
    },
  ],
  scheduleCta: {
    heading: 'Schedule Your Dryer Vent Cleaning Service Today',
    paragraphs: [
      'At Amazon Air Duct Cleaning, we believe clear pricing and careful work are our greatest strengths. Techs respect your property, clean up after themselves, and document every dryer vent job with before/after photos. Order dryer vent cleaning online or call (800) 606-3334. We serve Virginia, Maryland, and Washington, DC from our Burke and Bethesda offices.',
    ],
  },
  faqIntro:
    'Have questions about dryer vent cleaning? Amazon Air Duct Cleaning has the answers. Call us at (800) 606-3334 or order online today.',
  faq: [
    {
      q: 'Since my dryer has a lint trap, why do I need to worry about lint buildup?',
      a: 'Even though the lint trap catches some lint, over time dust and debris still build up in the vent and get trapped there. For example, facial tissues and other forgotten items run through the dryer cycle and create quite a mess. Many vents also have a screen cap to prevent rodents, insects, and/or birds from accessing your vent, but they also make it harder for lint to blow out of the trap.',
    },
    {
      q: 'Is dryer lint flammable?',
      a: 'Yes, dryer lint is highly flammable. When lint and other debris build up in a dryer, they reduce airflow and back up exhaust air into a hot dryer — a bad combination.',
    },
    {
      q: 'Are fires the only risk from clogged dryer vents?',
      a: 'Fire risk from lint and restricted airflow is the main safety reason to keep vents clear (see NFPA dryer-fire statistics). A blocked vent can also make the dryer run longer and hotter. Gas dryers need a clear path for exhaust; if you suspect combustion-gas issues, stop use and have the vent and appliance checked.',
    },
    {
      q: 'Do you clean dryer vents in Arlington, VA?',
      a: 'Yes. Schedule flat-rate dryer vent cleaning in [Arlington](/locations/arlington) or [Alexandria](/locations/alexandria) from our Burke office, or call (800) 606-3334.',
    },
    {
      q: 'Does air duct cleaning prevent health problems?',
      a: 'EPA states that duct cleaning has not been shown to prevent health problems. We remove debris from HVAC ducts when you want source-removal cleaning or when inspection shows substantial buildup or visible mold. See [EPA duct-cleaning guidance](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned).',
    },
  ],
}
