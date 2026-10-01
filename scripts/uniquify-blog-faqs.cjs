/**
 * Uniquify blog FAQs for traffic + zero verbatim reuse.
 * Run: node scripts/uniquify-blog-faqs.cjs
 */
const fs = require('fs')
const path = require('path')

const DIR = path.join(__dirname, '..', 'src/content/blog')
const EVERGREEN = new Set([
  'how-often-clean-air-ducts',
  '7-signs-air-ducts-need-cleaning',
  'why-clean-dryer-vents',
  'how-dirty-air-ducts-increase-energy-bills',
  'can-dirty-air-ducts-cause-allergies',
  'never-clean-air-ducts',
])

const CITY_BY_SLUG = {
  'how-potomac-humidity-affects-arlington-air-quality': { city: 'Arlington', loc: 'arlington' },
  'how-potomac-humidity-affects-alexandria-air-quality': { city: 'Alexandria', loc: 'alexandria' },
  'dc-humidity-row-houses-indoor-air': { city: 'Washington, DC', loc: 'washington-dc' },
  'mclean-tree-pollen-basement-humidity': { city: 'McLean', loc: 'mclean' },
  'reston-town-center-dust-air-ducts': { city: 'Reston', loc: 'reston' },
  'herndon-construction-dust-air-ducts': { city: 'Herndon', loc: 'herndon' },
  'vienna-tree-pollen-basement-air-ducts': { city: 'Vienna', loc: 'vienna' },
  'great-falls-estates-humidity-air-ducts': { city: 'Great Falls', loc: 'great-falls' },
  'falls-church-close-in-dust-air-ducts': { city: 'Falls Church', loc: 'falls-church' },
  'chantilly-route-28-dust-air-ducts': { city: 'Chantilly', loc: 'chantilly' },
  'oakton-canopy-pollen-air-ducts': { city: 'Oakton', loc: 'oakton' },
  'lorton-i95-occoquan-air-ducts': { city: 'Lorton', loc: 'lorton' },
  'mount-vernon-potomac-humidity-air-ducts': { city: 'Mount Vernon', loc: 'mount-vernon' },
  'fair-oaks-townhomes-dust-air-ducts': { city: 'Fair Oaks', loc: 'fair-oaks' },
  'germantown-i270-townhome-air-ducts': { city: 'Germantown', loc: 'germantown' },
  'potomac-tree-canopy-humidity-air-ducts': { city: 'Potomac', loc: 'potomac' },
  'wheaton-urban-dust-air-ducts': { city: 'Wheaton', loc: 'wheaton' },
  'takoma-park-bungalow-humidity-air-ducts': { city: 'Takoma Park', loc: 'takoma-park' },
  'kensington-colonials-pollen-air-ducts': { city: 'Kensington', loc: 'kensington' },
  'olney-rambler-pollen-air-ducts': { city: 'Olney', loc: 'olney' },
  'hyattsville-route-1-humidity-air-ducts': { city: 'Hyattsville', loc: 'hyattsville' },
  'columbia-village-townhomes-air-ducts': { city: 'Columbia', loc: 'columbia' },
  'ellicott-city-flood-humidity-air-ducts': { city: 'Ellicott City', loc: 'ellicott-city' },
  'frederick-downtown-humidity-air-ducts': { city: 'Frederick', loc: 'frederick' },
  'montgomery-village-townhomes-air-ducts': { city: 'Montgomery Village', loc: 'montgomery-village' },
  'clarksburg-new-construction-dust-air-ducts': { city: 'Clarksburg', loc: 'clarksburg' },
  'fairfax-ramblers-pollen-air-ducts': { city: 'Fairfax', loc: 'fairfax' },
  'springfield-mixing-bowl-dust-air-ducts': { city: 'Springfield', loc: 'springfield' },
  'loudoun-construction-dust-pollen-air-ducts': { city: 'Loudoun', loc: 'loudoun' },
  'prince-william-occoquan-humidity-air-ducts': { city: 'Prince William', loc: 'prince-william' },
  'silver-spring-brick-houses-urban-dust-air-ducts': { city: 'Silver Spring', loc: 'silver-spring' },
  'gaithersburg-kentlands-basement-humidity-air-ducts': { city: 'Gaithersburg', loc: 'gaithersburg' },
  'college-park-rentals-pollen-air-ducts': { city: 'College Park', loc: 'college-park' },
  'rockville-basement-humidity-air-ducts': { city: 'Rockville', loc: 'rockville' },
}

const EVERGREEN_FAQ = {
  'how-often-clean-air-ducts': [
    {
      q: 'How often should most homes clean air ducts?',
      a: 'Every 1–3 years is typical. Pets, renovations, smokers, or allergy households often need the shorter end of that range.',
    },
    {
      q: 'How often should dryer vents be cleaned?',
      a: 'About once a year for most homes. High laundry volume or long vent runs may need service every six months.',
    },
    {
      q: 'Does a dirty filter mean the ducts need cleaning?',
      a: 'A clogged filter is a maintenance issue by itself. If registers refilm quickly after filter changes, the trunks may also need a professional clean.',
    },
    {
      q: 'Where do we book in Northern Virginia or Maryland?',
      a: 'Use the matching city page under /locations or call (800) 606-3334. Flat-rate packages start from our Burke and Bethesda offices.',
    },
  ],
  '7-signs-air-ducts-need-cleaning': [
    {
      q: 'What is the most common sign ducts need cleaning?',
      a: 'Dust returning onto surfaces within days of wiping registers — especially when filters are already being changed on schedule.',
    },
    {
      q: 'Can allergies alone prove ducts are dirty?',
      a: 'Not by themselves. Allergies plus visible dust, musty startup smells, or uneven airflow are a stronger signal to inspect.',
    },
    {
      q: 'Should I clean ducts after renovations?',
      a: 'Yes if drywall sanding or sawdust entered returns. Wait until heavy work finishes, then schedule a clean.',
    },
    {
      q: 'How do I book after noticing these signs?',
      a: 'Call (800) 606-3334 or open air duct cleaning packages for Virginia, Maryland, and DC.',
    },
  ],
  'why-clean-dryer-vents': [
    {
      q: 'How often should dryer vents be cleaned?',
      a: 'Most homes benefit from once a year. High laundry volume, long vent runs, or pets may need service every six months.',
    },
    {
      q: 'Does cleaning a dryer vent eliminate fire risk?',
      a: 'No cleaning guarantees zero risk. Clearing lint from the full duct substantially reduces a leading, preventable cause of dryer fires.',
    },
    {
      q: 'Can I clean the vent myself with a brush kit?',
      a: 'DIY kits help near the opening but often miss compacted lint deeper in long or winding runs. Pros brush and vacuum the full length and verify airflow.',
    },
    {
      q: 'Where do you schedule dryer vent jobs?',
      a: 'From Burke, VA and Bethesda, MD across Northern Virginia, Maryland, and Washington, DC. Call (800) 606-3334.',
    },
  ],
  'how-dirty-air-ducts-increase-energy-bills': [
    {
      q: 'Can dirty ducts raise energy bills?',
      a: 'Restricted airflow can make equipment run longer to hit the thermostat. Results vary by home, filter habits, and system condition — cleaning is not a guaranteed bill cut.',
    },
    {
      q: 'Will a filter change fix high bills?',
      a: 'Fresh filters help. They do not remove debris already coating trunks and coils downstream of the filter.',
    },
    {
      q: 'What should I check before calling a cleaner?',
      a: 'Filter condition, closed supply vents, and thermostat settings. If airflow still feels weak, schedule an inspection.',
    },
    {
      q: 'How do I schedule service?',
      a: 'Call (800) 606-3334 for flat-rate residential packages from Burke or Bethesda.',
    },
  ],
  'can-dirty-air-ducts-cause-allergies': [
    {
      q: 'Can dirty ducts worsen allergy symptoms?',
      a: 'Ducts can recirculate dust, pollen, pet dander, and mold spores. Cleaning reduces that load; it is not a medical treatment.',
    },
    {
      q: 'Should allergy households clean ducts more often?',
      a: 'Often yes — every 2–4 years is common when pets, pollen, or humid basements are in the mix. Ask after an inspection.',
    },
    {
      q: 'Does sanitizing help allergy homes?',
      a: 'Antimicrobial treatment is complimentary on request when inspection supports it. Mechanical cleaning still comes first.',
    },
    {
      q: 'How do I book for Northern Virginia or Maryland?',
      a: 'Call (800) 606-3334 or pick your city under Locations for local dispatch from Burke or Bethesda.',
    },
  ],
  'never-clean-air-ducts': [
    {
      q: 'What happens if ducts are never cleaned?',
      a: 'Debris accumulates, airflow can drop, and startup odors become more common — especially in humid climates and pet homes.',
    },
    {
      q: 'Is never cleaning ever okay?',
      a: 'Some lightly used systems stay cleaner longer. Visible dust, musty smells, or renovation debris are reasons not to wait indefinitely.',
    },
    {
      q: 'Will ignoring dryer vents create risk too?',
      a: 'Yes. Lint in dryer ducts is a separate fire and efficiency issue and should be cleared about yearly.',
    },
    {
      q: 'How do I get back on a maintenance schedule?',
      a: 'Call (800) 606-3334. We quote flat-rate air duct and dryer vent packages before work starts.',
    },
  ],
}

function cityFaq(post) {
  const meta = CITY_BY_SLUG[post.slug] || { city: 'your area', loc: null }
  const { city, loc } = meta
  const locLink = loc ? `[${city} service page](/locations/${loc})` : 'your city service page'
  const blob = `${post.headline || ''} ${post.title || ''} ${post.slug}`
  const construction = /construction|drywall|gypsum|new-construction|cabin|hoa|kentlands/.test(blob)
  const humidity = /humid|moisture|mold|potomac|flood|basement|row-house/.test(blob)
  const pollen = /pollen|canopy|tree|oak|rambler|bungalow/.test(blob)
  const traffic = /toll|corridor|traffic|mixing|route|i270|i95|urban|brick/.test(blob)

  const when = construction
    ? `After nearby build-out or renovations that put fines in returns — or when ${city} registers refilm within days of wiping.`
    : humidity
      ? `When musty startup smells return each humid week, or cool ${city} trunks keep turning dust into a sticky film.`
      : pollen
        ? `During and after peak canopy season if upstairs supplies in ${city} show yellow film again soon after wiping registers.`
        : traffic
          ? `When road and corridor dust around ${city} leaves gray film on supplies faster than filter changes explain.`
          : `When dust returns quickly, airflow feels weak, or dry times climb in ${city} homes.`

  const fourth = construction
    ? {
        q: `Should I wait until construction near ${city} finishes?`,
        a: `Heavy drywall dust near ${city} often shortens the useful interval. Wait until the worst dust settles, then inspect returns before booking.`,
      }
    : humidity
      ? {
          q: `Does a dehumidifier replace duct cleaning in ${city}?`,
          a: `Lower humidity helps ${city} basements, but it does not remove debris already sitting in trunks. Cleaning and moisture control work together.`,
        }
      : pollen
        ? {
            q: `Will better filters stop ${city} pollen in the ducts?`,
            a: `Better filters reduce new ${city} pollen load. They do not pull film already coating cool supply trunks.`,
          }
        : {
            q: `What proof should a ${city} cleaning include?`,
            a: `Before-and-after photos of ${city} trunks or vents, plus a flat-rate scope agreed before work starts.`,
          }

  return [
    { q: `When should ${city} homeowners consider duct cleaning?`, a: when },
    {
      q: `Where do I book air duct cleaning for ${city}?`,
      a: `Open the ${locLink} for flat-rate packages and local dispatch, or call (800) 606-3334 for ${city}.`,
    },
    {
      q: `Can ${city} duct and dryer vent cleaning happen the same day?`,
      a: `Yes — book ducts, dryer vents, or both in one visit for ${city} from the Burke or Bethesda crew.`,
    },
    fourth,
  ]
}

let n = 0
for (const file of fs.readdirSync(DIR)) {
  if (!file.endsWith('.json') || file === 'index.json') continue
  const fp = path.join(DIR, file)
  const post = JSON.parse(fs.readFileSync(fp, 'utf8'))
  post.faq = EVERGREEN.has(post.slug) ? EVERGREEN_FAQ[post.slug] : cityFaq(post)
  fs.writeFileSync(fp, JSON.stringify(post, null, 2) + '\n')
  n++
}

const posts = []
for (const file of fs.readdirSync(DIR)) {
  if (!file.endsWith('.json') || file === 'index.json') continue
  const p = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'))
  posts.push({
    slug: p.slug,
    title: p.title,
    description: p.description,
    hero: p.heroImage,
    e: EVERGREEN.has(p.slug),
  })
}
posts.sort((a, b) => (a.e === b.e ? a.slug.localeCompare(b.slug) : a.e ? -1 : 1))
fs.writeFileSync(
  path.join(DIR, 'index.json'),
  JSON.stringify(
    posts.map(({ slug, title, description, hero }) => ({ slug, title, description, hero })),
    null,
    2,
  ) + '\n',
)

const answers = new Map()
const titles = new Map()
for (const file of fs.readdirSync(DIR)) {
  if (!file.endsWith('.json') || file === 'index.json') continue
  const p = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'))
  if (!titles.has(p.title)) titles.set(p.title, [])
  titles.get(p.title).push(p.slug)
  for (const item of p.faq || []) {
    if (!answers.has(item.a)) answers.set(item.a, [])
    answers.get(item.a).push(p.slug)
  }
}
const shared = [...answers].filter(([, s]) => s.length >= 2)
console.log('updated', n)
console.log('dup titles', [...titles].filter(([, s]) => s.length > 1).length)
console.log('faq shared 2+', shared.length)
if (shared.length) shared.slice(0, 6).forEach(([a, s]) => console.log(s.length, a.slice(0, 70)))
