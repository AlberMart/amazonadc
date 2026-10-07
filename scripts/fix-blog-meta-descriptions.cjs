/**
 * Finish blog + index meta descriptions (≤155 chars).
 * Escapes $ in replace strings ($$).
 * Run: node scripts/fix-blog-meta-descriptions.cjs
 */
const fs = require('fs')
const path = require('path')

const MAX = 155

const BLOGS = {
  '7-signs-air-ducts-need-cleaning':
    'Seven practical signs your air ducts may need cleaning — from dusty vents to musty startup smells. What to check before you book.',
  'can-dirty-air-ducts-cause-allergies':
    'Can dirty air ducts cause allergies? What EPA says, what ducts can and cannot fix, and when cleaning still makes sense.',
  'chantilly-route-28-dust-air-ducts':
    'Why Chantilly and Sully Station homes still blow construction dust — builder fines, Route 28 film, and when to clean.',
  'clarksburg-new-construction-dust-air-ducts':
    'Why new Clarksburg homes often need a first duct cleaning after builder dust and neighboring construction pads.',
  'college-park-rentals-pollen-air-ducts':
    'How College Park rentals and campus pollen load air ducts between tenants — and when a turnover cleaning helps most.',
  'columbia-village-townhomes-air-ducts':
    'Columbia village townhomes and humid dryer closets: lake-edge pollen, stacked laundry, and how ductwork loads up.',
  'dc-humidity-row-houses-indoor-air':
    'How Potomac humidity and retrofitted ducts in DC row houses make registers musty — and what cleaning can honestly fix.',
  'ellicott-city-flood-humidity-air-ducts':
    'Flood humidity and air ducts in Ellicott City: Main Street cellars, hillside homes, and moisture-first next steps.',
  'fair-oaks-townhomes-dust-air-ducts':
    'Fair Oaks and Fair Lakes townhome dust: attic handlers, corridor grit, and what we find in 1980s–2000s trunks.',
  'fairfax-ramblers-pollen-air-ducts':
    'City of Fairfax ramblers, oak pollen, and cool basement trunks — why registers get dusty again each spring season.',
  'falls-church-close-in-dust-air-ducts':
    'Falls Church close-in dust: small-lot homes, Beltway grit, and retrofitted ducts in a compact independent city.',
  'frederick-downtown-humidity-air-ducts':
    'Frederick downtown humidity vs Urbana new pads — two duct problems under one city name, and when cleaning helps.',
  'gaithersburg-kentlands-basement-humidity-air-ducts':
    'Gaithersburg Kentlands humidity and Crown dryer vents: cool trunks, party-wall chases, and I-270 corridor dust.',
  'germantown-i270-townhome-air-ducts':
    'Germantown townhome closets and I-270 dust: packed mechanical rooms, dryer lint, and corridor particulate loads.',
  'great-falls-estates-humidity-air-ducts':
    'Long dryer runs and humid basements in Great Falls homes — estate trunks, crawl spaces, and Potomac moisture.',
  'herndon-construction-dust-air-ducts':
    'Construction dust near Herndon corridors: what ends up in HVAC returns and when a first cleaning makes sense.',
  'how-dirty-air-ducts-increase-energy-bills':
    'Do dirty air ducts raise energy bills? What EPA, ENERGY STAR, and DOE actually say — and when cleaning still helps.',
  'how-often-clean-air-ducts':
    'How often should you clean air ducts? EPA sets no health interval — signs, dryer vents, and realistic booking timing.',
  'how-potomac-humidity-affects-alexandria-air-quality':
    'Old Town humidity and Alexandria air ducts: what homeowners notice first, and how cleaning fits without overclaiming.',
  'how-potomac-humidity-affects-arlington-air-quality':
    'Why Arlington condos near the Potomac get musty ducts in summer humidity — and when professional cleaning helps.',
  'hyattsville-route-1-humidity-air-ducts':
    'Renovation dust and humidity in Hyattsville air ducts along Route 1 and the Arts District housing corridor.',
  'kensington-colonials-pollen-air-ducts':
    'Kensington colonials, street-tree pollen, and basement handlers — why close-in Montgomery ducts reload quickly.',
  'lorton-i95-occoquan-air-ducts':
    'How I-95 dust and Occoquan humidity affect Lorton ducts in new townhomes and older Laurel Hill homes.',
  'loudoun-construction-dust-pollen-air-ducts':
    'Ashburn construction dust vs Leesburg basement humidity — two Loudoun duct patterns homeowners ask about often.',
  'mclean-tree-pollen-basement-humidity':
    'McLean tree pollen and basement humidity: how large-lot trunks and finished lower levels hold debris for years.',
  'montgomery-village-townhomes-air-ducts':
    'Why Montgomery Village townhome ducts load up over time — 1970s runs, lake humidity, and tight dryer closets.',
  'mount-vernon-potomac-humidity-air-ducts':
    'Mount Vernon Potomac humidity and older metal ducts: Parkway moisture, colonials, and when cleaning helps.',
  'never-clean-air-ducts':
    'What happens if you never clean your air ducts? Debris buildup, dryer vents, and when waiting gets costly.',
  'oakton-canopy-pollen-air-ducts':
    'Oakton canopy pollen and finished basements: how large-lot colonials load duct trunks every spring season.',
  'olney-rambler-pollen-air-ducts':
    'Olney ramblers and split-levels: finished rec rooms, canopy pollen, and why ductwork hides debris for years.',
  'potomac-tree-canopy-humidity-air-ducts':
    'Potomac tree canopy and long HVAC trunks: pollen, river-corridor humidity, and large-home duct cleaning cues.',
  'prince-william-occoquan-humidity-air-ducts':
    'Prince William Occoquan humidity and I-66 dust — how Woodbridge, Lake Ridge, and Manassas ducts differ.',
  'reston-town-center-dust-air-ducts':
    'Reston Toll Road dust and humid summers: village HVAC, stacked laundry risers, and filmed-over registers.',
  'rockville-basement-humidity-air-ducts':
    'Rockville basement humidity and cool trunks: why Montgomery County homes reload dusty registers in summer.',
  'silver-spring-brick-houses-urban-dust-air-ducts':
    'Silver Spring brick houses and urban dust: retrofitted trunks, Georgia Avenue particles, and cleaning cues.',
  'springfield-mixing-bowl-dust-air-ducts':
    'Springfield Mixing Bowl dust and split-level basements — why Franconia-area registers coat with road grit.',
  'takoma-park-bungalow-humidity-air-ducts':
    'Takoma Park bungalow humidity: crawl-space retrofits, canopy moisture, and ducts added decades after build.',
  'vienna-tree-pollen-basement-air-ducts':
    'Vienna tree pollen and finished basements: why Maple Avenue colonials reload dusty supply trunks each year.',
  'wheaton-urban-dust-air-ducts':
    'Wheaton urban dust and mid-century brick: Veirs Mill grit, plaster-era ducts, and when cleaning helps most.',
  'why-clean-dryer-vents':
    'Why clean dryer vents? Lint, fire risk (NFPA), longer dry times — and how professional cleaning helps homes.',
}

const blogDir = path.join('src/content/blog')
const indexPath = path.join(blogDir, 'index.json')
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'))

let updated = 0
for (const [slug, desc] of Object.entries(BLOGS)) {
  if (desc.length > MAX) throw new Error(`${slug} ${desc.length}`)
  if (desc.length < 110) console.warn('short', desc.length, slug)
  const file = path.join(blogDir, `${slug}.json`)
  if (!fs.existsSync(file)) throw new Error('missing ' + slug)
  const doc = JSON.parse(fs.readFileSync(file, 'utf8'))
  doc.description = desc
  fs.writeFileSync(file, JSON.stringify(doc, null, 2) + '\n')
  const row = index.find((item) => item.slug === slug)
  if (row) row.description = desc
  updated++
}

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n')
console.log('blogs updated', updated)

// Also fix any remaining long index-only rows
for (const row of index) {
  if ((row.description || '').length > MAX) {
    console.warn('index still long', row.slug, row.description.length)
  }
}
