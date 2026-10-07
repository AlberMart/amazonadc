import {
  ABOUT_TRUST_CLOSING,
  DRYER_LINT_GUARANTEE,
  DUCT_CLEANING_FREQUENCY_FAQ,
  REVIEWS_INTRO,
  SATISFACTION_HEADLINE,
  SATISFACTION_PRICING_PARAGRAPH,
  SATISFACTION_TAGLINE,
  SATISFACTION_WHY_CARD,
} from '@/utilities/serviceCopy'
import { SEO_HOME_H1 } from '@/utilities/seoCopy'

export type HomeContent = {
  heroEyebrow: string
  heroHeadline: string
  heroSubheadline: string
  heroCtaLabel: string
  heroCtaHref: string
  heroPhoneDisplay: string
  heroPhoneHref: string
  heroImage: string
  heroImageAlt: string
  aboutHeading: string
  aboutParagraphs: string[]
  aboutClosing?: string
  aboutPhoneDisplay?: string
  aboutPhoneHref?: string
  offersHeading: string
  offersIntro: string
  pricingHeading: string
  pricingIntro: string
  pricingHighlights: string[]
  pricingParagraphs: string[]
  airDuctHeading: string
  airDuctParagraphs: string[]
  airDuctImage: string
  airDuctImageAlt: string
  airDuctCtaLabel: string
  airDuctCtaHref: string
  dryerHeading: string
  dryerParagraphs: string[]
  dryerImage: string
  dryerImageAlt: string
  dryerCtaLabel: string
  dryerCtaHref: string
  whyHeading: string
  whyIntro: string
  whyPhoneDisplay?: string
  whyPhoneHref?: string
  whyItems: Array<{ title: string; text: string }>
  processHeading: string
  processIntro: string
  processImage: string
  processImageAlt: string
  processSteps: Array<{ title: string; text: string }>
  servicesHeading: string
  servicesIntro: string
  serviceItems: Array<{ title: string; text: string }>
  blogHeading: string
  blogIntro: string
  blogViewAllLabel: string
  faqHeading: string
  faqIntro: string
  faqPhoneDisplay?: string
  faqPhoneHref?: string
  faqItems: Array<{ q: string; a: string }>
  reviewsHeading: string
  reviewsIntro: string
  reviews: Array<{
    initials: string
    author: string
    text: string
    googleUrl: string
  }>
}

export const homeContentSeed: HomeContent = {
  heroEyebrow: '',
  heroHeadline: SEO_HOME_H1,
  heroSubheadline: SATISFACTION_TAGLINE,
  heroCtaLabel: 'Get a Free Estimate',
  heroCtaHref: '#contact',
  heroPhoneDisplay: '(800) 606-3334',
  heroPhoneHref: 'tel:+18006063334',
  heroImage: '/img/Amazon.webp',
  heroImageAlt: 'Amazon Air Duct Cleaning team providing professional HVAC services',
  aboutHeading: 'About Us',
  aboutParagraphs: [
    `Amazon Air Duct Cleaning provides professional air duct cleaning and dryer vent cleaning throughout Washington, DC, Maryland, and Virginia. We remove dust and debris from HVAC duct systems with source-removal methods, clear lint from dryer vents, and document every job with before/after photos. EPA does not treat routine duct cleaning as a proven health treatment — ${ABOUT_TRUST_CLOSING}`,
  ],
  aboutClosing: 'Call today for a detailed, no-obligation estimate at',
  aboutPhoneDisplay: '(800) 606-3334',
  aboutPhoneHref: 'tel:+18006063334',
  offersHeading: 'Current offers',
  offersIntro: 'Transparent pricing. No counting vents. No surprise add-ons.',
  pricingHeading: 'Transparent Air Duct Cleaning Pricing',
  pricingIntro: 'No hidden fees. No surprises. Just honest, flat-rate pricing.',
  pricingHighlights: [
    'Flat-Rate Pricing for Air Duct & Dryer Vent Cleaning Services',
    SATISFACTION_HEADLINE,
  ],
  pricingParagraphs: [
    'At Amazon Air Duct Cleaning, we believe in clear and transparent pricing for every service. Unlike companies that rely on hidden fees or aggressive upselling, we provide straightforward flat-rate pricing so you know exactly what to expect before we begin. No counting vents, no extra charges based on square footage, and no unexpected add-ons — the price you\'re quoted is the price you pay.',
    SATISFACTION_PRICING_PARAGRAPH,
  ],
  airDuctHeading: 'Air Duct Cleaning',
  airDuctParagraphs: [
    'Amazon Air Duct Cleaning provides professional air duct cleaning using source-removal methods: HEPA negative pressure plus agitation so debris is extracted from the system rather than blown into living spaces.',
    'EPA notes that light dust in ducts is common and that duct cleaning has not been shown to prevent health problems. We clean when you want debris removed, after renovations, or when inspection shows substantial buildup or visible mold — and we show the results with before/after photos.',
    'To ensure transparency, we can provide before-and-after duct camera documentation so you can clearly see what was removed.',
  ],
  airDuctImage: '/img/Amazon_AIR_DUCT_CLEANING.webp',
  airDuctImageAlt: 'Professional air duct cleaning service',
  airDuctCtaLabel: 'Learn more',
  airDuctCtaHref: '/air-duct-cleaning',
  dryerHeading: 'Protect Your Home With Professional Dryer Vent Cleaning',
  dryerParagraphs: [
    'Regular dryer vent inspection and cleaning matters for safety and dryer performance. [NFPA’s analysis of home dryer fires (2014–2018)](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines) finds failure to clean in about 32% of those fires — lint buildup is a documented, preventable factor.',
    'A packed vent also makes the dryer run longer and hotter. We use a drill-powered rotary brush paired with a high-powered vacuum to clear the full length of the run.',
    DRYER_LINT_GUARANTEE,
  ],
  dryerImage: '/img/dryer-vent-cleaning-tech-van.jpg',
  dryerImageAlt:
    'Technician unloading dryer vent cleaning hose and tools from a service van at a home',
  dryerCtaLabel: 'Learn more',
  dryerCtaHref: '/dryer-vent-cleaning',
  whyHeading: 'Why Choose Us?',
  whyIntro: 'For more information, see our FAQ below, or call us at',
  whyPhoneDisplay: '(800) 606-3334',
  whyPhoneHref: 'tel:+18006063334',
  whyItems: [
    {
      title: 'Transparent, Upfront Pricing',
      text: "No hidden fees, no upsells, and no surprises. The price you're quoted is exactly what you pay for your air duct and dryer vent cleaning service.",
    },
    {
      title: 'Before & After Duct Camera Inspection',
      text: 'We provide real before-and-after photos of your ductwork, so you can clearly see the results and the improvement in your HVAC system.',
    },
    {
      title: SATISFACTION_HEADLINE,
      text: SATISFACTION_WHY_CARD,
    },
    {
      title: 'Top-Rated Local Service in the DMV',
      text: 'Our expert technicians serve Washington, DC, Maryland, and Virginia with professional equipment and honest flat-rate pricing.',
    },
  ],
  processHeading: 'Professional Air Duct Cleaning Process',
  processIntro:
    'Our process follows the proven Source Removal method — an effective way to remove dust, debris, and contaminants from your HVAC system.',
  processImage: '/img/AmazonDC-57.webp',
  processImageAlt: 'Professional air duct cleaning process using source removal method',
  processSteps: [
    {
      title: 'HEPA Vacuum Setup',
      text: 'We connect a powerful HEPA-filtered vacuum to your ductwork to create negative pressure and capture dust and debris as it is loosened.',
    },
    {
      title: 'Agitation & Deep Cleaning',
      text: 'Specialized push-and-pull tools and air whips break loose stubborn dirt and debris from the interior surfaces of your air ducts.',
    },
    {
      title: 'Complete Contaminant Removal',
      text: 'Dislodged debris is extracted through the vacuum system so vents and ductwork are thoroughly cleaned of buildup.',
    },
    {
      title: 'Optional Antimicrobial Treatment',
      text: 'On request, we may apply an EPA-registered antimicrobial to hard duct surfaces after mechanical cleaning — an optional step, not a medical or sterilizing claim.',
    },
  ],
  servicesHeading: 'Our Air Duct Cleaning Services',
  servicesIntro: 'We offer full-service cleaning solutions tailored to your needs.',
  serviceItems: [
    {
      title: 'Residential Air Duct Cleaning',
      text: 'Source-removal air duct cleaning for homes throughout VA, MD & DC — debris removal with before/after proof.',
    },
    {
      title: 'Commercial Air Duct Cleaning',
      text: 'Complete duct cleaning for offices, retail, warehouses, and commercial buildings.',
    },
    {
      title: 'Dryer Vent Cleaning',
      text: 'Remove lint buildup to restore dryer airflow and reduce lint-related fire risk.',
    },
    {
      title: 'Mold Remediation for Air Ducts',
      text: 'Contamination-focused cleaning when inspection shows substantial visible mold — moisture source still matters.',
    },
    {
      title: 'HVAC System Cleaning',
      text: 'Full HVAC cleaning for clearer airflow and less debris in the system.',
    },
  ],
  blogHeading: 'Blog',
  blogIntro: 'Tips on air duct cleaning, dryer vent maintenance, and HVAC care.',
  blogViewAllLabel: 'View all articles →',
  faqHeading: 'Frequently Asked Questions',
  faqIntro: 'Have questions about air duct and dryer vent cleaning? Call',
  faqPhoneDisplay: '(800) 606-3334',
  faqPhoneHref: 'tel:+18006063334',
  faqItems: [
    {
      q: 'Why is professional air duct cleaning important?',
      a: 'Professional air duct cleaning removes dust, debris, and other buildup from HVAC duct surfaces. A clearer system can help airflow when ducts were restricted. EPA states that duct cleaning has not been shown to prevent health problems — we do not claim medical or allergy-cure results. See our air duct cleaning page for EPA-aligned expectations.',
    },
    {
      q: 'How often should air ducts and dryer vents be cleaned?',
      a: DUCT_CLEANING_FREQUENCY_FAQ,
    },
    {
      q: 'Does air duct cleaning lower energy bills?',
      a: 'Not as a promised percentage savings. EPA says little evidence shows cleaning only the ducts improves efficiency; coil/component cleaning may help more. ENERGY STAR highlights sealing leaky ducts (typical homes can lose about 20–30% of air to leaks). See our article: Do Dirty Air Ducts Raise Energy Bills?',
    },
    {
      q: 'What method do you use to clean air ducts?',
      a: 'We use the source removal method. A powerful HEPA-filtered vacuum places the HVAC system under negative pressure while specialized tools dislodge debris from the interior surfaces of the ducts. The debris is then safely removed from the system.',
    },
    {
      q: 'Do you use chemicals during the cleaning process?',
      a: 'We do not apply chemicals by default. On request, complimentary Envirocon antimicrobial may be applied to hard duct surfaces after mechanical cleaning — an EPA-registered product step, not a sterilizing or medical claim.',
    },
    {
      q: 'How long does the cleaning process take?',
      a: 'An average size single-system house takes 2 to 3 hours to complete.',
    },
    {
      q: 'Can we stay in the house during the cleaning process?',
      a: "You can be in the house during the service; however, for safety's sake, stay clear of the equipment during use.",
    },
    {
      q: 'Will there be dust in the house after the service?',
      a: 'We work under negative pressure with HEPA filtration so debris is pulled into the vacuum rather than blown into living spaces. Floors and furniture in the work path are protected. A light wipe of nearby surfaces after the visit is still good practice, as with any in-home service.',
    },
    {
      q: 'Do you have weekend and evening appointments available?',
      a: 'Yes, we provide evening and weekend appointments at no additional charge.',
    },
  ],
  reviewsHeading: 'What Our Clients Say About Us',
  reviewsIntro: REVIEWS_INTRO,
  reviews: [
    {
      initials: 'II',
      author: 'Igor Igor',
      text: 'Excellent mold remediation service! The team was professional, knowledgeable, and very thorough. They inspected the affected areas, explained everything clearly, and did a great job removing the mold and cleaning the area. They were on time, respectful, and left everything clean when the job was finished.',
      googleUrl: 'https://maps.app.goo.gl/nbKVRuSaWNEpahhH7',
    },
    {
      initials: 'BG',
      author: 'Benjamin Garibov',
      text: 'Five-star service! The team did an incredible job cleaning our air ducts and treating the mold. They were reliable, professional, and left the work area spotless. Great company with excellent customer service!',
      googleUrl: 'https://maps.app.goo.gl/nbKVRuSaWNEpahhH7',
    },
    {
      initials: 'FI',
      author: 'Fermin Ibrahimli',
      text: 'I had my air ducts cleaned and mold remediation completed, and the experience was outstanding. The technicians were knowledgeable, professional, and very thorough. They explained every step of the process and made sure everything was cleaned properly. I can already notice the difference in the air quality. Highly recommended!',
      googleUrl: 'https://maps.app.goo.gl/cxBzj6Snxb38gUKb6',
    },
    {
      initials: 'DG',
      author: 'Diana Grigoryan',
      text: 'We were very impressed with Amazon Air Duct Cleaning. Their mold remediation service was efficient, professional, and exceeded our expectations. The team answered all of our questions and made us feel confident throughout the process. Highly recommended!',
      googleUrl: 'https://maps.app.goo.gl/cxBzj6Snxb38gUKb6',
    },
    {
      initials: 'JW',
      author: 'Jeff Wiese',
      text: 'Highly recommend Amazon Air Duct Cleaning based both on price comparisons I made and on the service I got in both air duct cleaning and dryer vent cleaning. Michael, their tech, was very good to work with and kept me informed verbally and with pictures on his progress.',
      googleUrl: 'https://maps.app.goo.gl/B4RvipReQ5TipSr98',
    },
    {
      initials: 'AC',
      author: 'Andrew Cruz',
      text: 'Mike was absolutely incredible. Meticulous, detailed oriented and made sure to show me what he was doing every step of the way. His services were literally half the price that Stanley Steemer had quoted me and his work was of a far superior quality. 12/10 recommend him. He has created a life long customer in me.',
      googleUrl: 'https://maps.app.goo.gl/NmedTKYmxHo8Mzy39',
    },
  ],
}

export function mapHomeContentToSeed(content: HomeContent) {
  return {
    heroEyebrow: content.heroEyebrow,
    heroHeadline: content.heroHeadline,
    heroSubheadline: content.heroSubheadline,
    heroCtaLabel: content.heroCtaLabel,
    heroCtaHref: content.heroCtaHref,
    heroPhoneDisplay: content.heroPhoneDisplay,
    heroPhoneHref: content.heroPhoneHref,
    heroImage: content.heroImage,
    heroImageAlt: content.heroImageAlt,
    aboutHeading: content.aboutHeading,
    aboutParagraphs: content.aboutParagraphs.map((text) => ({ text })),
    aboutClosing: content.aboutClosing,
    aboutPhoneDisplay: content.aboutPhoneDisplay,
    aboutPhoneHref: content.aboutPhoneHref,
    offersHeading: content.offersHeading,
    offersIntro: content.offersIntro,
    pricingHeading: content.pricingHeading,
    pricingIntro: content.pricingIntro,
    pricingHighlights: content.pricingHighlights.map((item) => ({ item })),
    pricingParagraphs: content.pricingParagraphs.map((text) => ({ text })),
    airDuctHeading: content.airDuctHeading,
    airDuctParagraphs: content.airDuctParagraphs.map((text) => ({ text })),
    airDuctImage: content.airDuctImage,
    airDuctImageAlt: content.airDuctImageAlt,
    airDuctCtaLabel: content.airDuctCtaLabel,
    airDuctCtaHref: content.airDuctCtaHref,
    dryerHeading: content.dryerHeading,
    dryerParagraphs: content.dryerParagraphs.map((text) => ({ text })),
    dryerImage: content.dryerImage,
    dryerImageAlt: content.dryerImageAlt,
    dryerCtaLabel: content.dryerCtaLabel,
    dryerCtaHref: content.dryerCtaHref,
    whyHeading: content.whyHeading,
    whyIntro: content.whyIntro,
    whyPhoneDisplay: content.whyPhoneDisplay,
    whyPhoneHref: content.whyPhoneHref,
    whyItems: content.whyItems,
    processHeading: content.processHeading,
    processIntro: content.processIntro,
    processImage: content.processImage,
    processImageAlt: content.processImageAlt,
    processSteps: content.processSteps,
    servicesHeading: content.servicesHeading,
    servicesIntro: content.servicesIntro,
    serviceItems: content.serviceItems,
    blogHeading: content.blogHeading,
    blogIntro: content.blogIntro,
    blogViewAllLabel: content.blogViewAllLabel,
    faqHeading: content.faqHeading,
    faqIntro: content.faqIntro,
    faqPhoneDisplay: content.faqPhoneDisplay,
    faqPhoneHref: content.faqPhoneHref,
    faqItems: content.faqItems.map((item) => ({ question: item.q, answer: item.a })),
    reviewsHeading: content.reviewsHeading,
    reviewsIntro: content.reviewsIntro,
    reviews: content.reviews,
  }
}
