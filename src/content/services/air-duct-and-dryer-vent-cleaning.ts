import type { ServiceContent } from '@/utilities/services'

export const airDuctAndDryerVentCleaning: ServiceContent = {
  slug: 'air-duct-and-dryer-vent-cleaning',
  title: 'Air Duct Cleaning, Dryer Vent Cleaning & Sanitization',
  description:
    'Complete air duct and dryer vent cleaning for $399. Unlimited vents, dryer duct brushing, sanitization, and before/after photos. Serving Virginia, Maryland & Washington DC.',
  summary:
    'Complete air duct system cleaning plus dryer vent cleaning and sanitization — our most popular package.',
  price: 399,
  compareAtPrice: 650,
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
    'Agitating and vacuuming of entire duct system',
    'Complimentary Sanitization of Air Ducts with Envirocon (Upon Request)',
    'Brushing and vacuuming the entire length of the dryer duct',
    'Proof of Cleaning with Before/After photos',
    'Satisfaction Guaranteed or Your Money Back',
    'NO EXTRA FEES, NO EXTRA CHARGES',
  ],
  beforeAfter: [
    { src: '/img/before_after/duct_before.webp', alt: 'Air duct before cleaning' },
    { src: '/img/before_after/duct_after.webp', alt: 'Air duct after cleaning' },
    { src: '/img/before_after/dryer_before.webp', alt: 'Dryer vent before cleaning' },
    { src: '/img/before_after/dryer_after.webp', alt: 'Dryer vent after cleaning' },
  ],
  why: {
    heading: 'Complete home air quality and fire safety in one visit',
    paragraphs: [
      'Your HVAC system and your dryer vent are two separate sources of indoor air quality problems and fire risk — and both are easy to overlook. Dust, pollen, pet dander, and mold spores accumulate inside air ducts and recirculate through every room in your home. Meanwhile, lint builds up deep inside the dryer vent, restricting airflow and creating a serious fire hazard.',
      'Booking both services together in a single visit means your home gets comprehensive protection at the best value. Amazon Air Duct Cleaning handles both systems with professional-grade equipment, leaving your home cleaner, safer, and more energy-efficient.',
    ],
    image: '/img/blog/7-signs-air-ducts-need-cleaning.webp',
    imageAlt: 'Professional air duct and dryer vent cleaning service',
  },
  listBlocks: [
    {
      heading: 'Signs you need both services',
      items: [
        'Visible dust around vents and surfaces despite regular cleaning',
        'Increased allergy symptoms or respiratory irritation at home',
        'Musty or stale odor when the HVAC system runs',
        'Clothes taking more than one cycle to fully dry',
        'The dryer or laundry room feels unusually hot during operation',
        'More than 3–5 years since the last professional duct cleaning',
      ],
    },
    {
      heading: 'Benefits of the complete bundle',
      items: [
        'Improved indoor air quality — fewer allergens and irritants circulating at home',
        'Dryer fire risk eliminated — lint buildup removed from the full duct length',
        'Lower energy bills — both systems run more efficiently after cleaning',
        'Extended lifespan of your HVAC system and dryer appliance',
        'One visit, two systems — saves time compared to booking separately',
        'Peace of mind backed by before/after photo documentation for both systems',
      ],
    },
  ],
  process: {
    heading: 'Our Complete Cleaning Process',
    intro: 'Both systems are serviced in a single visit, following a thorough step-by-step process.',
    steps: [
      {
        title: 'Inspection',
        text: 'Technicians assess both the HVAC duct system and the dryer vent before work begins.',
      },
      {
        title: 'Preparation',
        text: 'Floors and furniture near vents are protected. The dryer is disconnected safely.',
      },
      {
        title: 'Air Duct Cleaning',
        text: 'High-powered vacuums create negative pressure while rotating brushes dislodge dust and debris from the entire duct system.',
      },
      {
        title: 'Dryer Vent Cleaning',
        text: 'A drill-powered brush travels up to 40 feet through the dryer duct, loosening compacted lint while industrial vacuums capture it completely.',
      },
      {
        title: 'Sanitization',
        text: 'Envirocon sanitizer is applied to the air duct system upon request at no additional charge.',
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
      a: 'The $399 bundle covers one complete air duct system and one dryer vent: unlimited supply vents, unlimited intake vents, unlimited main duct lines, agitation and vacuuming of the entire duct system, brushing and vacuuming the full length of the dryer duct, complimentary Envirocon sanitization upon request, before/after photos, and a satisfaction guarantee. No extra fees, no hidden charges.',
    },
    {
      q: 'Why should I clean both my air ducts and dryer vent at the same time?',
      a: 'Combining both services in one visit saves time and money compared to booking separately. Both services address different contaminant sources — air ducts collect dust, pollen, and allergens while dryer vents accumulate highly flammable lint. Cleaning both at once gives you comprehensive indoor air quality improvement and fire risk reduction in a single appointment.',
    },
    {
      q: 'Is sanitization included in the bundle?',
      a: 'Yes. Complimentary sanitization of air ducts with Envirocon is included upon request as part of the $399 bundle service, at no additional cost.',
    },
    {
      q: 'Do you provide proof that both systems were cleaned?',
      a: 'Yes. Amazon Air Duct Cleaning provides before and after photos of both the air duct system and the dryer vent as proof of cleaning with every service.',
    },
    {
      q: 'Which areas do you serve?',
      a: 'Amazon Air Duct Cleaning serves Virginia, Maryland, and Washington DC. Call (800) 606-3334 to confirm availability in your area.',
    },
  ],
}
