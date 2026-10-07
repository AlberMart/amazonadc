import type { ServiceContent } from '@/utilities/services'
import {
  DUCT_CLEANING_FREQUENCY_SHORT,
  DUCT_CLEANING_SIGN_INTERVAL,
} from '@/utilities/serviceCopy'

export const airDuctCleaning: ServiceContent = {
  slug: 'air-duct-cleaning',
  title: 'Air Duct Cleaning & Sanitization',
  description:
    'Professional air duct cleaning & sanitization from $299. Unlimited vents, before/after photos. Serving VA, MD & Washington DC.',
  summary:
    'Professional cleaning of one complete air duct system with complimentary sanitization upon request and before/after photo proof.',
  price: 299,
  orderUrl: 'https://buy.stripe.com/14A7sMbNd5vr1H15EA4AU00',
  heroImage: '/img/Amazon_AIR_DUCT_CLEANING.webp',
  heroAlt: 'Air Duct Cleaning & Sanitization Service in Virginia, Maryland & Washington DC',
  includesIntro: 'This is for detailed cleaning of one (1) complete air duct system including:',
  includesImage: '/img/AmazonDC-57.webp',
  includesImageAlt: 'Air duct cleaning service',
  includes: [
    'Unlimited Supply Vents',
    'Unlimited Intake Vents',
    'Unlimited Main Duct Lines',
    'Agitating and Vacuuming of Entire Duct System',
    'Complimentary Sanitization of Air Ducts with Envirocon (Upon Request)',
    'Proof of Cleaning with Before/After photos',
    'NO EXTRA FEES, NO EXTRA CHARGES',
  ],
  beforeAfter: [
    { src: '/img/before_after/duct_before.webp', alt: 'Air duct before cleaning' },
    { src: '/img/before_after/duct_after.webp', alt: 'Air duct after cleaning' },
    { src: '/img/before_after/duct_before2.webp', alt: 'Air duct before cleaning' },
    { src: '/img/before_after/duct_after2.webp', alt: 'Air duct after cleaning' },
  ],
  why: {
    heading: 'When professional air duct cleaning makes sense',
    paragraphs: [
      'Your HVAC system moves air through every room. Over time, dust, pollen, pet dander, and other debris can collect on duct surfaces. [EPA guidance](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) notes that light dust in ducts is common and that duct cleaning has **not been shown to prevent health problems** — so we do not claim medical results.',
      'EPA says you should consider cleaning if there is substantial visible mold, pest contamination, or debris actually entering living spaces. We use source-removal methods (HEPA negative pressure plus agitation) to remove built-up debris from the system — not just wipe visible registers — and document with before/after photos.',
    ],
    image: '/img/blog/dirty-HVAC-unit.webp',
    imageAlt: 'Dirty HVAC unit with dust buildup inside air ducts',
  },
  columns: [
    {
      heading: 'Signs to consider a cleaning',
      items: [
        'Visible dust or debris discharging from supply vents',
        'Musty odor when the HVAC system runs (inspect for moisture/mold)',
        'Uneven airflow or reduced pressure from vents',
        'Recent renovation or construction dust in the home',
        'Substantial debris visible inside accessible ducts',
        DUCT_CLEANING_SIGN_INTERVAL,
      ],
    },
    {
      heading: 'What this service is designed to do',
      items: [
        'Remove accumulated dust and debris from the duct system',
        'Document results with before/after photos',
        'Support clearer airflow when restriction was debris-related',
        'Optional EPA-registered antimicrobial on request (not a medical treatment)',
        'Align expectations with EPA: not a routine health “cure”',
        'Flat-rate residential pricing with no vent counting',
      ],
    },
  ],
  process: {
    heading: 'Our Air Duct Cleaning Process',
    intro:
      'Every job follows a thorough, step-by-step process to ensure complete cleaning of your entire duct system.',
    steps: [
      {
        title: 'Inspection',
        text: 'Our technicians assess your HVAC system and ductwork to determine the scope of cleaning needed.',
      },
      {
        title: 'Preparation',
        text: 'Floors and furniture near vents are protected before work begins.',
      },
      {
        title: 'Negative Pressure Setup',
        text: 'High-powered HEPA-filtered vacuums are connected to create negative pressure throughout the duct system.',
      },
      {
        title: 'Push-and-Pull Cleaning',
        text: 'Our technicians manually utilize specialized tools to dislodge any stuck debris inside the air ducts.',
      },
      {
        title: 'Full Extraction',
        text: 'All loosened contaminants are captured by the vacuum system — nothing is released into your home.',
      },
      {
        title: 'Optional Antimicrobial & Final Check',
        text: 'Envirocon antimicrobial may be applied upon request after mechanical cleaning. Before/after photos document results.',
      },
    ],
  },
  faqIntro:
    'Have questions about air duct cleaning? Amazon Air Duct Cleaning has the answers. Call us at (800) 606-3334 or order online today.',
  faq: [
    {
      q: 'What is included in the $299 air duct cleaning service?',
      a: 'The $299 service covers one complete air duct system: unlimited supply vents, unlimited intake vents, unlimited main duct lines, agitating and vacuuming of the entire duct system, complimentary Envirocon antimicrobial upon request, and before/after photo documentation. No extra fees, no surprise charges.',
    },
    {
      q: 'How often should air ducts be professionally cleaned?',
      a: DUCT_CLEANING_FREQUENCY_SHORT,
    },
    {
      q: 'Does air duct cleaning lower energy bills?',
      a: 'Not as a guaranteed percentage cut. [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) says little evidence shows cleaning only the ducts improves efficiency; cleaning coils/fans may help more. [ENERGY STAR](https://www.energystar.gov/saveathome/heating-cooling/duct-sealing) highlights sealing leaky ducts (typical homes can lose about 20–30% of air to leaks). More detail: [Do Dirty Air Ducts Raise Energy Bills?](/blog/do-dirty-air-ducts-raise-energy-bills).',
    },
    {
      q: 'Does air duct cleaning improve indoor air quality or allergies?',
      a: 'EPA states that duct cleaning has not been shown to prevent health problems, and studies have not conclusively shown that dirty ducts raise particle levels in living spaces. Cleaning removes debris from the system; any comfort change varies by home. See [EPA: Should you have the air ducts in your home cleaned?](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned).',
    },
    {
      q: 'Is sanitization included in the service?',
      a: 'Complimentary Envirocon antimicrobial application is available upon request after mechanical cleaning — at no additional cost. It is an optional, EPA-registered product step, not a medical treatment or sterilizing claim.',
    },
    {
      q: 'Do you provide proof that the ducts were cleaned?',
      a: 'Absolutely. Every service includes before/after photographs of your duct system so you can see exactly what was removed.',
    },
    {
      q: 'Which areas do you serve?',
      a: 'We serve Virginia, Maryland, and Washington DC from offices in Burke and Bethesda, including [air duct cleaning in Arlington, VA](/locations/arlington) and [Alexandria, VA](/locations/alexandria). Call (800) 606-3334 to confirm availability.',
    },
  ],
}
