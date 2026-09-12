export type OfficeReviewSeed = {
  initials: string
  author: string
  text: string
  rating: number
  googleUrl: string
}

export type OfficeSeed = {
  name: string
  slug: string
  streetAddress: string
  city: string
  state: string
  postalCode: string
  phone: string
  phoneDisplay: string
  email: string
  description: string
  latitude: number
  longitude: number
  geoRadiusMeters: number
  hasMapUrl: string
  googleBusinessUrl: string
  sameAs: Array<{ url: string }>
  /** Cities listed in LocalBusiness areaServed (from original GBP pages) */
  areaServedCities: string[]
  aggregateRatingValue: number
  aggregateReviewCount: number
  weekdayOpens: string
  weekdayCloses: string
  saturdayOpens: string
  saturdayCloses: string
  priceRange: string
  featuredReviews: OfficeReviewSeed[]
}

export const burkeOffice: OfficeSeed = {
  name: 'Amazon Air Duct Cleaning - Burke',
  slug: 'burke',
  streetAddress: '5641 Burke Centre Pkwy Ste 119',
  city: 'Burke',
  state: 'VA',
  postalCode: '22015',
  phone: '+15714600001',
  phoneDisplay: '(571) 460-0001',
  email: 'support@amazonadc.com',
  description: 'Local HVAC and air duct cleaning specialists in Burke, VA.',
  latitude: 38.7992,
  longitude: -77.3266,
  geoRadiusMeters: 30000,
  hasMapUrl: 'https://maps.app.goo.gl/nbKVRuSaWNEpahhH7',
  googleBusinessUrl: 'https://g.page/r/CcXlZgyK3QXKEBM',
  sameAs: [],
  areaServedCities: [
    'Burke',
    'Leesburg',
    'Woodburn',
    'Oatlands',
    'Ashburn',
    'Sterling',
    'Herndon',
    'Reston',
    'Great Falls',
    'Chantilly',
    'Lenah',
    'Vienna',
    'McLean',
    'Falls Church',
    'Oakton',
    'Arlington',
    'Alexandria',
    'Springfield',
    'Manassas',
    'Fair Oaks',
    'Lorton',
    'Woodbridge',
    'Gainesville',
    'Buckhall',
    'Mt Vernon',
    'Lake Ridge',
    'Fairfax',
    'Washington DC',
  ],
  aggregateRatingValue: 5,
  aggregateReviewCount: 193,
  weekdayOpens: '08:00',
  weekdayCloses: '20:00',
  saturdayOpens: '09:00',
  saturdayCloses: '20:00',
  priceRange: '$$',
  featuredReviews: [
    {
      initials: 'JW',
      author: 'Jeff Wiese',
      text: 'Highly recommend Amazon Air Duct Cleaning based both on price comparisons I made and on the service I got in both air duct cleaning and dryer vent cleaning. Michael, their tech, was very good to work with and kept me informed verbally and with pictures on his progress.',
      rating: 5,
      googleUrl: 'https://maps.app.goo.gl/B4RvipReQ5TipSr98',
    },
    {
      initials: 'VS',
      author: 'Van Schwarz',
      text: 'The air duct cleaning service had done a good job and professional that I had to leave a review for them. Mike was cleaning our 3 houses in the same day. He was on time and friendly. He did the great job on cleaning all the vents and did some extra work for us. We highly recommend their service. Reasonable price and professional.',
      rating: 5,
      googleUrl: 'https://maps.app.goo.gl/V1dhHn6WAnmks8PJ8',
    },
    {
      initials: 'SS',
      author: 'Sevi Sinanian',
      text: "Amazing service! The technicians were super friendly, fast, and thorough. They cleaned all of our air ducts and took care of a mold issue we didn't even know was spreading. The house smells clean again and we can breathe easier. Definitely a 5-star experience!",
      rating: 5,
      googleUrl: 'https://maps.app.goo.gl/yeZq9jSVNWMTzbxj9',
    },
  ],
}

export const bethesdaOffice: OfficeSeed = {
  name: 'Amazon Air Duct Cleaning - Bethesda',
  slug: 'bethesda',
  streetAddress: '7815 Old Georgetown Rd Ste 201',
  city: 'Bethesda',
  state: 'MD',
  postalCode: '20814',
  phone: '+13018094544',
  phoneDisplay: '(301) 809-4544',
  email: 'support@amazonadc.com',
  description: 'Professional duct cleaning services in Bethesda, Maryland.',
  latitude: 38.9878,
  longitude: -77.1015,
  geoRadiusMeters: 30000,
  hasMapUrl: 'https://maps.app.goo.gl/cxBzj6Snxb38gUKb6',
  googleBusinessUrl: 'https://g.page/r/Ce2KuB-pODDGEBM',
  sameAs: [{ url: 'https://www.yelp.com/biz/amazon-air-duct-cleaning-bethesda-2' }],
  areaServedCities: [
    'Bethesda',
    'Frederick',
    'Hagerstown',
    'Urbana',
    'Adamstown',
    'Mt Airy',
    'Damascus',
    'Westminster',
    'Sykesville',
    'Clarksville',
    'Ellicott City',
    'Columbia',
    'Olney',
    'Poolesville',
    'Clarksburg',
    'Montgomery Village',
    'Gaithersburg',
    'Germantown',
    'Rockville',
    'Potomac',
    'Boyds',
    'Wheaton',
    'Silver Spring',
    'Takoma Park',
    'College Park',
    'Hyattsville',
    'Darnestown',
    'Travilah',
    'Derwood',
    'Kensington',
    'Aspen Hill',
    'Washington DC',
  ],
  aggregateRatingValue: 5,
  aggregateReviewCount: 160,
  weekdayOpens: '08:00',
  weekdayCloses: '20:00',
  saturdayOpens: '09:00',
  saturdayCloses: '20:00',
  priceRange: '$$',
  featuredReviews: [
    {
      initials: 'LC',
      author: 'L Chung',
      text: 'Amazon duct cleaning is great.  Mike did a great job cleaning our house.  He was on time, professional, considerate with people in the house, and got the job done.  The price is also competitive!  If you need cleaning, contact this company.',
      rating: 5,
      googleUrl: 'https://maps.app.goo.gl/CW6XAmBQVjvXukfM7',
    },
    {
      initials: 'AC',
      author: 'Andrew Cruz',
      text: 'Mike was absolutely incredible. Meticulous, detailed oriented and made sure to show me what he was doing every step of the way. His services were literally half the price that Stanley Steemer had quoted me and his work was of a far superior quality. 12/10 recommend him. He has created a life long customer in me.',
      rating: 5,
      googleUrl: 'https://maps.app.goo.gl/NmedTKYmxHo8Mzy39',
    },
    {
      initials: 'KS',
      author: 'Kunal S',
      text: 'Mike was phenomenal. He showed up on time, was a through professional. He explained the process, captured and showed the before and after pictures. Most importantly he shut down the ac, hooked his machine to the returns and then started cleaning. At my request he even ran the fast air over the fans and my chandelier so the same dust does not circulate in the house. He spent a good 3.5 hours cleaning the system household. I highly recommend him and the company Amazon DC',
      rating: 5,
      googleUrl: 'https://maps.app.goo.gl/WhLPDuESY8UzzLG79',
    },
  ],
}

export const officesSeedSource = [burkeOffice, bethesdaOffice]
