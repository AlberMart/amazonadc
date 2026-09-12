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
  heroHeadline: 'Cleaner air for homes across Virginia, Maryland & DC',
  heroSubheadline:
    'Flat-rate air duct and dryer vent cleaning with before/after proof and a 100% satisfaction guarantee.',
  heroCtaLabel: 'Get a Free Estimate',
  heroCtaHref: '#contact',
  heroPhoneDisplay: '(800) 606-3334',
  heroPhoneHref: 'tel:+18006063334',
  heroImage: '/img/Amazon.webp',
  heroImageAlt: 'Amazon Air Duct Cleaning team providing professional HVAC services',
  aboutHeading: 'About Us',
  aboutParagraphs: [
    'Amazon Air Duct Cleaning provides professional air duct cleaning and dryer vent cleaning services throughout Washington, DC, Maryland, and Virginia. Our certified technicians help homeowners and businesses improve indoor air quality, reduce dust and allergens, and keep HVAC systems running efficiently. We offer reliable residential and commercial duct cleaning services and mold removal, as well as upfront flat-rate pricing and a 100% satisfaction guarantee. With the latest equipment and over 40 years of combined industry experience, our team delivers exceptional results on every job.',
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
    '100% Satisfaction Guarantee',
  ],
  pricingParagraphs: [
    'At Amazon Air Duct Cleaning, we believe in clear and transparent pricing for every service. Unlike companies that rely on hidden fees or aggressive upselling, we provide straightforward flat-rate pricing so you know exactly what to expect before we begin. No counting vents, no extra charges based on square footage, and no unexpected add-ons — the price you\'re quoted is the price you pay.',
    'We stand behind the quality of our work and prioritize customer satisfaction. Payment is only required after the job is completed to your satisfaction. If you\'re not completely happy with the results, we offer a full money-back guarantee.',
  ],
  airDuctHeading: 'Air Duct Cleaning',
  airDuctParagraphs: [
    'Amazon Air Duct Cleaning provides professional air duct cleaning services using industry-recognized best practices to ensure safe, thorough, and effective results. Our process removes dust, debris, and contaminants from your HVAC system while improving indoor air quality and system performance.',
    'We use the proven Source Removal method — placing your HVAC system under negative pressure with a powerful HEPA-filtered vacuum, then using specialized tools to dislodge dirt and debris so contaminants are fully extracted instead of blown back into your home.',
    'To ensure transparency and quality, we can provide before-and-after duct camera inspection so you can clearly see the results.',
  ],
  airDuctImage: '/img/Amazon_AIR_DUCT_CLEANING.webp',
  airDuctImageAlt: 'Professional air duct cleaning service',
  airDuctCtaLabel: 'Learn more',
  airDuctCtaHref: '/air-duct-cleaning',
  dryerHeading: 'Protect Your Home With Professional Dryer Vent Cleaning',
  dryerParagraphs: [
    'Regular dryer vent inspection and cleaning is essential for both home safety and dryer performance. Failure to clean is a leading cause of home fires involving clothes dryers.',
    'Lint buildup is not only a fire hazard — it also reduces dryer efficiency, increases energy use, and shortens appliance life. We use a drill-powered rotary brush system paired with a high-powered vacuum to thoroughly clean the vent and remove built-up lint.',
    "We stand behind our work: if we don't get the lint out, your service is free.",
  ],
  dryerImage: '/img/Amazon_DRYER_VENT_CLEANING.webp',
  dryerImageAlt: 'Professional dryer vent cleaning',
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
      title: '100% Satisfaction Guarantee',
      text: "Your satisfaction is our priority. If you're not completely satisfied with our service, we'll make it right or offer a full money-back guarantee.",
    },
    {
      title: 'Top-Rated Local Service in the DMV',
      text: 'Our expert technicians serve Washington, DC, Maryland, and Virginia with professional equipment and honest flat-rate pricing.',
    },
  ],
  processHeading: 'Professional Air Duct Cleaning Process',
  processIntro:
    'Our process follows the proven Source Removal method — the most effective way to eliminate dust, debris, and contaminants from your HVAC system.',
  processImage: '/img/AmazonDC-57.webp',
  processImageAlt: 'Professional air duct cleaning process using source removal method',
  processSteps: [
    {
      title: 'HEPA Vacuum Setup',
      text: 'We connect a powerful HEPA-filtered vacuum system to your ductwork to create negative pressure and safely capture dust, allergens, and airborne particles.',
    },
    {
      title: 'Agitation & Deep Cleaning',
      text: 'Specialized brushes and air tools are used to break loose stubborn dirt and debris from the interior surfaces of your air ducts.',
    },
    {
      title: 'Complete Contaminant Removal',
      text: 'All contaminants are fully extracted through the vacuum system, ensuring your vents and ductwork are thoroughly cleaned.',
    },
    {
      title: 'Optional Anti-Microbial Treatment',
      text: 'We offer an additional treatment to help reduce bacteria, mold, and odors inside your air ducts for improved air quality.',
    },
  ],
  servicesHeading: 'Our Air Duct Cleaning Services',
  servicesIntro: 'We offer full-service cleaning solutions tailored to your needs.',
  serviceItems: [
    {
      title: 'Residential Air Duct Cleaning',
      text: 'Expert air duct cleaning for homes throughout VA, MD & DC to improve air quality and reduce allergens.',
    },
    {
      title: 'Commercial Air Duct Cleaning',
      text: 'Complete duct cleaning for offices, retail, warehouses, and commercial buildings.',
    },
    {
      title: 'Dryer Vent Cleaning',
      text: 'Remove lint build-up to increase dryer efficiency and prevent fire hazards.',
    },
    {
      title: 'Mold & Allergen Removal',
      text: 'Safe, thorough removal of mold and biological contaminants from ducts.',
    },
    {
      title: 'HVAC System Cleaning',
      text: 'Full HVAC cleaning for peak system efficiency and cleaner airflow.',
    },
  ],
  blogHeading: 'Blog',
  blogIntro: 'Expert tips on air duct cleaning, HVAC maintenance, and indoor air quality.',
  blogViewAllLabel: 'View all articles →',
  faqHeading: 'Frequently Asked Questions',
  faqIntro: 'Have questions about air duct and dryer vent cleaning? Call',
  faqPhoneDisplay: '(800) 606-3334',
  faqPhoneHref: 'tel:+18006063334',
  faqItems: [
    {
      q: 'Why is professional air duct cleaning important?',
      a: 'Professional air duct cleaning removes dust, debris, pet dander, and allergens that accumulate inside HVAC systems. According to the U.S. Department of Energy, a clean HVAC system can reduce energy waste by 25 to 40 percent. Regular cleaning improves indoor air quality, increases HVAC efficiency, and can extend the lifespan of heating and cooling equipment.',
    },
    {
      q: 'How often should air ducts and dryer vents be cleaned?',
      a: 'Most homes should have air ducts professionally cleaned every 4 to 6 years. Homes with pets, smokers, allergies, or recent renovations may require more frequent service. Dryer vents should be cleaned once per year to prevent lint buildup and reduce the risk of dryer fires.',
    },
    {
      q: 'What method do you use to clean air ducts?',
      a: 'We follow NADCA standards using the source removal method. A powerful HEPA-filtered vacuum places the HVAC system under negative pressure while specialized tools dislodge debris from the interior surfaces of the ducts. The debris is then safely removed from the system.',
    },
    {
      q: 'Do you use chemicals during the cleaning process?',
      a: 'We do not use chemicals unless the customer requests them. In that case, we offer an anti-microbial treatment as an add-on at an additional charge. This is a low-toxic, EPA-registered cleaner.',
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
      a: 'No. Absolutely no dust will be left in the house after our technicians leave. Because of the powerful negative pressure generated during the service, the HEPA filter collects the dust rather than it being blown back into the house.',
    },
    {
      q: 'Do you have weekend and evening appointments available?',
      a: 'Yes, we provide evening and weekend appointments at no additional charge.',
    },
  ],
  reviewsHeading: 'What Our Clients Say About Us',
  reviewsIntro:
    'Real reviews from customers who trusted our air duct & dryer vent cleaning services.',
  reviews: [
    {
      initials: 'JW',
      author: 'Jeff Wiese',
      text: 'Highly recommend Amazon Air Duct Cleaning based both on price comparisons I made and on the service I got in both air duct cleaning and dryer vent cleaning. Michael, their tech, was very good to work with and kept me informed verbally and with pictures on his progress.',
      googleUrl: 'https://maps.app.goo.gl/B4RvipReQ5TipSr98',
    },
    {
      initials: 'VS',
      author: 'Van Schwarz',
      text: 'The air duct cleaning service had done a good job and professional that I had to leave a review for them. Mike was cleaning our 3 houses in the same day. He was on time and friendly. He did the great job on cleaning all the vents and did some extra work for us. We highly recommend their service. Reasonable price and professional.',
      googleUrl: 'https://maps.app.goo.gl/V1dhHn6WAnmks8PJ8',
    },
    {
      initials: 'SS',
      author: 'Sevi Sinanian',
      text: "Amazing service! The technicians were super friendly, fast, and thorough. They cleaned all of our air ducts and took care of a mold issue we didn't even know was spreading. The house smells clean again and we can breathe easier. Definitely a 5-star experience!",
      googleUrl: 'https://maps.app.goo.gl/yeZq9jSVNWMTzbxj9',
    },
    {
      initials: 'LC',
      author: 'L Chung',
      text: 'Amazon duct cleaning is great. Mike did a great job cleaning our house. He was on time, professional, considerate with people in the house, and got the job done. The price is also competitive! If you need cleaning, contact this company.',
      googleUrl: 'https://maps.app.goo.gl/CW6XAmBQVjvXukfM7',
    },
    {
      initials: 'AC',
      author: 'Andrew Cruz',
      text: 'Mike was absolutely incredible. Meticulous, detailed oriented and made sure to show me what he was doing every step of the way. His services were literally half the price that Stanley Steemer had quoted me and his work was of a far superior quality. 12/10 recommend him. He has created a life long customer in me.',
      googleUrl: 'https://maps.app.goo.gl/NmedTKYmxHo8Mzy39',
    },
    {
      initials: 'KS',
      author: 'Kunal S',
      text: 'Mike was phenomenal. He showed up on time, was a through professional. He explained the process, captured and showed the before and after pictures. Most importantly he shut down the ac, hooked his machine to the returns and then started cleaning. At my request he even ran the fast air over the fans and my chandelier so the same dust does not circulate in the house. He spent a good 3.5 hours cleaning the system household. I highly recommend him and the company Amazon DC',
      googleUrl: 'https://maps.app.goo.gl/WhLPDuESY8UzzLG79',
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
