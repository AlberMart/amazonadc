import type { ServiceContent } from '@/utilities/services'

export const dryerVentCleaning: ServiceContent = {
  slug: 'dryer-vent-cleaning',
  title: 'Dryer Vent Cleaning',
  description:
    'Professional dryer vent cleaning for $199. Flat-rate brushing and vacuuming of the full duct length with before/after photos. Serving Virginia, Maryland & Washington DC.',
  summary:
    'Professional dryer vent cleaning with rotary brush and high-powered vacuum to reduce fire risk and improve dryer efficiency.',
  price: 199,
  compareAtPrice: 249,
  orderUrl: 'https://buy.stripe.com/14AfZicRh8HD99t1ok4AU01',
  heroImage: '/img/101221_AmazonDC-227.webp',
  heroAlt: 'Dryer vent cleaning service in Virginia, Maryland & Washington DC',
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
      { title: '01', text: 'We insert a 6.6-hp vacuum into one end of the vent.' },
      {
        title: '02',
        text: 'From the opposite end of the vent, we insert a drill-powered 4-inch-wide brush that agitates and loosens the lint. We have the capacity to go as far as 40 feet into the vent.',
      },
      { title: '03', text: 'We provide before and after pictures of the vent.' },
      { title: '04', text: 'We guarantee to remove all the lint, or the service is free.' },
    ],
  },
  why: {
    heading: 'Why Dryer Vent Cleaning Is Essential for Home Safety',
    paragraphs: [
      'Most homeowners clean the lint trap after every load — but the trap captures only a fraction of the lint produced during drying. The rest travels deep into the vent duct, where it accumulates over time, restricts airflow, and creates a serious fire hazard.',
      'According to USFA/FEMA, there are approximately 2,900 clothes dryer fires in the U.S. every year, resulting in 5 deaths, 100 injuries, and $35 million in property damage. Failure to clean the dryer is the leading cause, responsible for 31% of all dryer fires.',
      'Beyond fire risk, clogged dryer vents force your appliance to work harder, increasing energy consumption and shortening its lifespan. For gas dryers, a blocked vent can also allow dangerous carbon monoxide to back up into the living space. Regular professional cleaning eliminates these risks and keeps your dryer running safely and efficiently.',
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
      heading: 'Benefits of professional dryer vent cleaning',
      items: [
        'Eliminates the primary cause of dryer fires — lint buildup',
        'Clothes dry faster, saving energy and reducing utility bills',
        'Reduces wear on the dryer motor and heating element',
        'Prevents dangerous carbon monoxide buildup for gas dryer owners',
        'Extends the overall lifespan of your dryer appliance',
        'Peace of mind backed by before/after photo documentation',
      ],
    },
  ],
  scheduleCta: {
    heading: 'Schedule Your Dryer Vent Cleaning Service Today',
    paragraphs: [
      'At Amazon Air Duct Cleaning, we believe our honest, upfront service that includes a 100% money-back guarantee is our greatest strength. Rest assured our conscientious techs always respect your property and clean up after themselves. Order dryer vent cleaning online or call (800) 606-3334. We have several locations and serve multiple states across the U.S.',
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
      a: 'Unfortunately, no. Gas dryer vents also release carbon monoxide, but if the vent is clogged, it may cause a dangerous buildup of carbon monoxide, putting you and your family at risk.',
    },
    {
      q: 'Does air duct cleaning improve indoor air quality?',
      a: 'Yes — removing dust and allergens can significantly improve air quality and HVAC efficiency.',
    },
  ],
}
