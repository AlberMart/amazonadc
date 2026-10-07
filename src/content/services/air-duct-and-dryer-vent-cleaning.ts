import type { ServiceContent } from '@/utilities/services'

export const airDuctAndDryerVentCleaning: ServiceContent = {
  slug: 'air-duct-and-dryer-vent-cleaning',
  title: 'Air Duct & Dryer Vent Cleaning Combo',
  description:
    'Combo air duct & dryer vent cleaning from $399. Unlimited vents, dryer brush-out, photos. Serving VA, MD & Washington DC.',
  summary:
    'Complete air duct system cleaning plus dryer vent cleaning — our most popular package. Optional antimicrobial on request.',
  price: 399,
  orderUrl: 'https://buy.stripe.com/4gM00k18z6zvdpJeb64AU02',
  heroImage: '/img/Amazon_DRYER_VENT_CLEANING.webp',
  heroAlt:
    'Air Duct Cleaning, Dryer Vent Cleaning & Sanitization Service in Virginia, Maryland & Washington DC',
  includesIntro:
    'This is for detailed cleaning of one (1) complete air duct system and one (1) dryer vent including:',
  includesImage: '/img/AmazonDC-179.webp',
  includesImageAlt: 'Air duct and dryer vent cleaning service',
  includes: [
    'Unlimited Supply Vents',
    'Unlimited Intake Vents',
    'Unlimited Main Duct Lines',
    'Agitating and Vacuuming of Entire Duct System',
    'Complimentary Sanitization of Air Ducts with Envirocon (Upon Request)',
    'Brushing and vacuuming the entire length of the dryer duct',
    'Proof of Cleaning with Before/After photos',
    'NO EXTRA FEES, NO EXTRA CHARGES',
  ],
  beforeAfter: [
    { src: '/img/before_after/duct_before.webp', alt: 'Air duct before cleaning' },
    { src: '/img/before_after/duct_after.webp', alt: 'Air duct after cleaning' },
    { src: '/img/before_after/dryer_before.webp', alt: 'Dryer vent before cleaning' },
    { src: '/img/before_after/dryer_after.webp', alt: 'Dryer vent after cleaning' },
  ],
  why: {
    heading: 'Two systems, one visit — debris removal and dryer fire risk',
    paragraphs: [
      'Your HVAC ducts and your dryer vent are separate systems. Dust and debris can collect inside air ducts; [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned) does not treat routine duct cleaning as a proven health treatment. Separately, lint in dryer vents is a documented fire-related hazard — [NFPA’s 2014–2018 home dryer fire analysis](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines) finds failure to clean in about 32% of dryer fires.',
      'Booking both in one visit is efficient: we source-remove debris from the duct system and brush/vacuum the full dryer run, with before/after photos. Optional antimicrobial on ducts is available on request — not a medical claim.',
    ],
    image: '/img/blog/7-signs-air-ducts-need-cleaning.webp',
    imageAlt: 'Professional air duct and dryer vent cleaning service',
  },
  listBlocks: [
    {
      heading: 'Signs you may want both services',
      items: [
        'Visible dust around vents or debris discharging from supplies',
        'Clothes needing more than one dryer cycle',
        'Musty HVAC odor or renovation dust in the home',
        'Dryer or laundry room running unusually hot',
        'More than a year since the last dryer vent cleaning',
        'You prefer one flat-rate visit for ducts and the dryer vent',
      ],
    },
    {
      heading: 'What the bundle covers',
      items: [
        'Source-removal cleaning of one complete air duct system',
        'Full-length dryer vent brushing and vacuuming',
        'Optional EPA-registered antimicrobial on ducts upon request',
        'Before/after photos for both systems',
        'Addresses lint-related dryer fire hazard (see NFPA dryer-fire data)',
        'Does not claim to cure allergies or prevent all fires',
      ],
    },
  ],
  process: {
    heading: 'Our Complete Cleaning Process',
    intro: 'Both systems are serviced in a single visit, following a thorough step-by-step process.',
    steps: [
      {
        title: 'Inspection',
        text: 'Our technicians assess both the HVAC duct system and the dryer vent before work begins.',
      },
      {
        title: 'Preparation',
        text: 'Floors and furniture near vents are protected. The dryer is disconnected safely.',
      },
      {
        title: 'Negative Pressure & Push-and-Pull Cleaning',
        text: 'High-powered HEPA-filtered vacuums create negative pressure throughout the duct system while our technicians manually utilize specialized tools to dislodge stuck debris from the air ducts.',
      },
      {
        title: 'Dryer Vent Cleaning',
        text: 'A drill-powered brush travels up to 40 feet through the dryer duct, loosening compacted lint while industrial vacuums capture it completely.',
      },
      {
        title: 'Optional antimicrobial',
        text: 'Envirocon antimicrobial may be applied to the air duct system upon request at no additional charge — after mechanical cleaning, not as a medical treatment.',
      },
      {
        title: 'Final Verification',
        text: 'Before/after photos are taken of both systems and airflow is confirmed before the technician leaves.',
      },
    ],
  },
  faqIntro:
    'Have questions about our bundle service? Amazon Air Duct Cleaning has the answers. Call us at (800) 606-3334 or order online today.',
  faq: [
    {
      q: 'What is included in the $399 bundle service?',
      a: 'The $399 bundle covers one complete air duct system and one dryer vent: unlimited supply vents, unlimited intake vents, unlimited main duct lines, agitating and vacuuming of the entire duct system, brushing and vacuuming the full length of the dryer duct, complimentary Envirocon antimicrobial upon request, and before/after photos. No extra fees, no hidden charges.',
    },
    {
      q: 'Why book ducts and the dryer vent together?',
      a: 'One visit is often more convenient and usually costs less than two separate appointments. Duct cleaning removes debris from the HVAC; dryer vent cleaning addresses lint buildup linked to dryer fires in NFPA statistics. EPA does not treat routine duct cleaning as a proven health treatment — we are clear about that.',
    },
    {
      q: 'Is sanitization included in the bundle?',
      a: 'Complimentary Envirocon antimicrobial for air ducts is available upon request as part of the $399 bundle — after mechanical cleaning, at no additional cost. It is not a sterilizing or medical claim.',
    },
    {
      q: 'Do you provide proof that both systems were cleaned?',
      a: 'Yes. Amazon Air Duct Cleaning provides before and after photos of both the air duct system and the dryer vent with every service.',
    },
    {
      q: 'Which areas do you serve?',
      a: 'We serve Virginia, Maryland, and Washington DC, including [Arlington, VA](/locations/arlington) and [Alexandria, VA](/locations/alexandria). Call (800) 606-3334 to confirm availability.',
    },
  ],
}
