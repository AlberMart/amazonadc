import type { LocationContentSeed } from '@/utilities/locations'

/**
 * Kensington — historic Antique Row village, canopy colonials, quieter than Bethesda density.
 * Links used:
 * - https://www.montgomerycountymd.gov/DEP/air/indoor-air.html
 * - https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold
 * - https://www.montgomerycountymd.gov/DHCA/housing/landlordtenant/
 */
export const kensington: LocationContentSeed = {
  slug: 'kensington',
  title: 'Kensington MD Air Duct & Dryer Vent Cleaning',
  headline: 'Close-in Montgomery colonials — short run from Old Georgetown Road',
  description:
    'Air duct & dryer vent cleaning in Kensington, MD. Flat rates for colonials & basement handlers. Photos. Call (301) 809-4544.',
  intro:
    'Kensington is a compact town between Bethesda and Wheaton — Howard Avenue antiques, weekend foot traffic, and one of the county’s older residential canopies over 1930s–1960s colonials. Short basement trunk runs still concentrate pollen and street dust; finished rec-room handlers sweat in humid summers. DEP publishes indoor-air guidance; we clean ducts and dryer vents minutes up Connecticut Avenue. (301) 809-4544.',
  heroImage: '/img/locations/kensington.webp',
  heroAlt: 'Air duct cleaning in Kensington, MD — Amazon Air Duct Cleaning',
  city: 'Kensington',
  state: 'MD',
  servedBy: 'bethesda',
  sectionLayout: 'processFirst',
  about: {
    heading: 'Village canopy colonials and short basement trunks',
    paragraphs: [
      'Kensington is **village scale**: Antique Row, Knowles Avenue, Kensington Heights, and Rock Creek–adjacent streets where Connecticut Avenue drops pollen onto stoops from late March through June. Returns pull that organic load into **short basement trunks** — sometimes only a few feet from the air handler — so the first supply registers often carry the heaviest film even on modest lot sizes.',
      'Weekend shoppers and restaurant traffic stir fine street-level dust that finds open windows and return grilles. Finished basements keep handlers cool and prone to condensation; Montgomery DEP’s [Indoor Air Quality](https://www.montgomerycountymd.gov/DEP/air/indoor-air.html) and [mold](https://www.montgomerycountymd.gov/propertycare/air-quality-law/indoor-air-quality/mold) pages push humidity control and venting dryers outdoors — the same habits that slow mold risk on coils and metal trunks.',
      'Duplex renters near the town center may use [Landlord & Tenant](https://www.montgomerycountymd.gov/DHCA/housing/landlordtenant/) resources when maintenance is disputed. We dispatch from [Bethesda](/locations/bethesda) — one of the shortest drives on the calendar — with [Wheaton](/locations/wheaton) east and [Silver Spring](/locations/silver-spring) south. Seasonal detail: [Kensington colonials and pollen in air ducts](/blog/kensington-colonials-pollen-air-ducts).',
    ],
    highlights: [
      'Antique Row / Connecticut Avenue canopy',
      'Short basement trunks + finished rec-room handlers',
      'DEP IAQ cited; flat-rate photos',
      'Minutes from Suite 201 — (301) 809-4544',
    ],
  },
  offersTitle: 'Kensington colonial packages',
  services: {
    heading: 'What we clean in Kensington bungalows and colonials',
    intro: 'Basement laundry sidewall caps and bump-out first-floor dryers — scoped before equipment moves.',
    items: [
      {
        title: 'Air duct cleaning',
        text: 'HEPA negative pressure through basement supplies, returns, and floor registers. [EPA](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned). [Air duct cleaning](/air-duct-cleaning).',
      },
      {
        title: 'Dryer vent cleaning',
        text: 'Foundation-wall and short sidewall runs common in colonials — full brush-out and draw test. [NFPA dryer fires](https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/home-fires-involving-clothes-dryers-and-washing-machines). [Dryer vent cleaning](/dryer-vent-cleaning).',
      },
      {
        title: 'Optional duct antimicrobial',
        text: 'Hard metal after mechanical cleaning when inspection shows biological film — not whole-home remediation. [Mold remediation for air ducts](/mold-remediation-air-ducts).',
      },
    ],
  },
  why: {
    heading: 'Why shaded colonials concentrate load in short runs',
    items: [
      {
        title: 'Spring tree pollen on short runs',
        text: 'Street trees and Antique Row foot traffic add organic particulate that loads returns fast in compact colonials.',
      },
      {
        title: 'Basement temperature gap',
        text: 'Cool below-grade handlers condensate in humid months — DEP humidity guidance applies even in small homes.',
      },
      {
        title: 'Joint integrity on retrofits',
        text: 'Plaster-cut trunks get a seal check during the walk — negative pressure only works when the system holds.',
      },
      {
        title: 'Flat rate from the closest office',
        text: 'Price confirmed on (301) 809-4544 before agitation; photos at close-out.',
      },
    ],
  },
  communities: {
    heading: 'Kensington streets on the Bethesda route',
    intro: 'Quiet residential grids — not the medical corridor.',
    groups: [
      {
        title: 'Antique Row & downtown',
        places: 'Antique Row, Howard Avenue, Armory Avenue, Kensington Parkway',
      },
      {
        title: 'Connecticut Avenue corridor',
        places: 'Connecticut Avenue, Knowles Avenue, streets toward Chevy Chase and Bethesda',
      },
      {
        title: 'Kensington Heights & east',
        places: 'Kensington Heights, streets toward Wheaton and Silver Spring',
      },
    ],
  },
  process: {
    heading: 'Short Connecticut Avenue run from Bethesda',
    intro: 'Colonial basements drive the visit plan — access before agitation.',
    steps: [
      { title: 'Handler location', text: 'Basement vs closet bump-out — we note stair clearance and finished-room paths.' },
      { title: 'Dryer path traced', text: 'Sidewall cap or foundation exit — full length scoped, not just behind the dryer.' },
      { title: 'Package locked', text: 'Flat residential rate confirmed before hoses run.' },
      { title: 'Source removal + photos', text: 'Agitation under negative pressure; register images before we leave.' },
      { title: 'Handoff', text: 'Filter cadence for pollen season; (301) 809-4544 for combo follow-up.' },
    ],
  },
  faqIntro: 'Kensington village housing — (301) 809-4544 (Bethesda).',
  faq: [
    {
      q: 'How is Kensington different from Bethesda on your site?',
      a: 'Bethesda emphasizes NIH/Wisconsin **density and condo risers**. Kensington emphasizes **village canopy colonials**, Antique Row foot traffic, and short basement trunk runs.',
    },
    {
      q: 'Does DEP recommend duct cleaning for pollen?',
      a: 'DEP [IAQ](https://www.montgomerycountymd.gov/DEP/air/indoor-air.html) focuses on humidity, ventilation, and mold prevention — not endorsing vendors. We provide mechanical source removal with photos when you hire us.',
    },
    {
      q: 'My basement rec room smells musty — ducts only?',
      a: 'Musty basements often trace to moisture or drainage, not ducts alone. Fix water sources first; duct cleaning removes debris already in the trunk when booked.',
    },
    {
      q: 'Time to reach Kensington from your office?',
      a: 'Usually one of the shortest Bethesda drives — Connecticut Avenue straight to Knowles/Howard. Same-day windows depend on the calendar; call (301) 809-4544.',
    },
  ],
}
