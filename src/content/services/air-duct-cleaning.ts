import type { ServiceContent } from '@/utilities/services'

export const airDuctCleaning: ServiceContent = {
  slug: 'air-duct-cleaning',
  title: 'Air Duct Cleaning & Sanitization',
  description:
    'Professional Air Duct Cleaning & Sanitization for $299. Unlimited vents, before/after photos, satisfaction guaranteed. Serving Virginia, Maryland & Washington DC.',
  summary:
    'Professional cleaning of one complete air duct system with complimentary sanitization upon request and before/after photo proof.',
  price: 299,
  compareAtPrice: 550,
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
    'Agitating and vacuuming of entire duct system',
    'Complimentary Sanitization of Air Ducts with Envirocon (Upon Request)',
    'Proof of Cleaning with Before/After photos',
    'Satisfaction Guaranteed or Your Money Back',
    'NO EXTRA FEES, NO EXTRA CHARGES',
  ],
  beforeAfter: [
    { src: '/img/before_after/duct_before.webp', alt: 'Air duct before cleaning' },
    { src: '/img/before_after/duct_after.webp', alt: 'Air duct after cleaning' },
    { src: '/img/before_after/duct_before2.webp', alt: 'Air duct before cleaning' },
    { src: '/img/before_after/duct_after2.webp', alt: 'Air duct after cleaning' },
  ],
  why: {
    heading: 'Why does your home need professional air duct cleaning?',
    paragraphs: [
      'Your HVAC system circulates air through every room in your home — but over time, dust, pollen, pet dander, mold spores, and other contaminants accumulate inside the ductwork. Every time your system runs, those particles are redistributed throughout your living space.',
      'Professional air duct cleaning removes the buildup at its source, improving indoor air quality, reducing allergens, and allowing your HVAC system to operate at peak efficiency. Amazon Air Duct Cleaning uses industry-grade equipment to clean the entire duct system — not just the visible vents.',
    ],
    image: '/img/blog/dirty-HVAC-unit.webp',
    imageAlt: 'Dirty HVAC unit with dust buildup inside air ducts',
  },
  columns: [
    {
      heading: 'Signs your air ducts need cleaning',
      items: [
        'Visible dust or debris around supply vents',
        'Increased allergy symptoms or respiratory irritation at home',
        'Musty or stale odor when the HVAC system runs',
        'Uneven airflow or reduced pressure from vents',
        'Recent renovation or construction in the home',
        'More than 3–5 years since the last professional cleaning',
      ],
    },
    {
      heading: 'Benefits of clean air ducts',
      items: [
        'Improved indoor air quality for your family',
        'Reduced dust settling on surfaces throughout the home',
        'Lower energy bills — clean systems run more efficiently',
        'Extended lifespan of your HVAC equipment',
        'Fewer allergens and irritants circulating in the air',
        'Peace of mind backed by before/after photo documentation',
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
        text: 'Technicians assess your HVAC system and ductwork to determine the scope of cleaning needed.',
      },
      {
        title: 'Preparation',
        text: 'Floors and furniture near vents are protected before work begins.',
      },
      {
        title: 'Negative Pressure Setup',
        text: 'High-powered vacuums are connected to create negative pressure throughout the duct system.',
      },
      {
        title: 'Agitation',
        text: 'Rotating brushes and compressed air dislodge dust and debris from all duct surfaces.',
      },
      {
        title: 'Full Extraction',
        text: 'All loosened contaminants are captured by the vacuum system — nothing is released into your home.',
      },
      {
        title: 'Sanitization & Final Check',
        text: 'Envirocon sanitizer is applied upon request, and before/after photos are taken to document results.',
      },
    ],
  },
  faqIntro:
    'Have questions about air duct cleaning? Amazon Air Duct Cleaning has the answers. Call us at (800) 606-3334 or order online today.',
  faq: [
    {
      q: 'What is included in the $299 air duct cleaning service?',
      a: 'The $299 service covers one complete air duct system: unlimited supply vents, unlimited intake vents, unlimited main duct lines, agitation and vacuuming of the entire system, complimentary Envirocon sanitization upon request, and before/after photo documentation. No extra fees, no surprise charges.',
    },
    {
      q: 'How often should air ducts be professionally cleaned?',
      a: 'Most homes benefit from professional air duct cleaning every 3 to 5 years. Homes with pets, allergy sufferers, recent renovations, or higher occupancy may need cleaning every 2 to 3 years.',
    },
    {
      q: 'Is sanitization included in the service?',
      a: 'Yes. Complimentary sanitization with Envirocon is included with every air duct cleaning upon request — at no additional cost.',
    },
    {
      q: 'Do you provide proof that the ducts were cleaned?',
      a: 'Absolutely. Every service includes before/after photographs of your duct system so you can see exactly what was removed. Satisfaction is guaranteed or your money back.',
    },
    {
      q: 'Which areas do you serve?',
      a: 'Amazon Air Duct Cleaning serves Virginia, Maryland, and Washington DC. Call (800) 606-3334 to confirm availability in your area.',
    },
  ],
}
