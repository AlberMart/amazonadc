/**
 * Rewrite meta descriptions to SEO-safe length (target 120–155, hard max 155).
 * Run: node scripts/fix-meta-descriptions.cjs
 */
const fs = require('fs')
const path = require('path')

const MAX = 155

function assertLen(label, text) {
  const len = text.length
  if (len > MAX) throw new Error(`${label} is ${len} chars (>${MAX}): ${text}`)
  if (len < 110) console.warn(`WARN short ${len}: ${label}`)
  return text
}

function replaceTsDescription(filePath, newDesc) {
  let t = fs.readFileSync(filePath, 'utf8')
  const re = /(description:\s*\n?\s*)'((?:\\'|[^'])*)'/
  if (!re.test(t)) throw new Error(`No description in ${filePath}`)
  t = t.replace(re, `$1'${newDesc.replace(/'/g, "\\'")}'`)
  fs.writeFileSync(filePath, t)
}

// --- Home / defaults ---
const seoPath = 'src/utilities/seoCopy.ts'
let seo = fs.readFileSync(seoPath, 'utf8')
const homeMeta = assertLen(
  'SEO_META_DESCRIPTION',
  'Flat-rate air duct & dryer vent cleaning in VA, MD & DC. Source removal, before/after photos, free estimate. Call (800) 606-3334.',
)
seo = seo.replace(
  /SEO_META_DESCRIPTION\s*=\s*'((?:\\'|[^'])*)'/,
  `SEO_META_DESCRIPTION =\n  '${homeMeta.replace(/'/g, "\\'")}'`,
)
fs.writeFileSync(seoPath, seo)

const svcCopyPath = 'src/utilities/serviceCopy.ts'
let svcCopy = fs.readFileSync(svcCopyPath, 'utf8')
const ogMeta = assertLen(
  'OG_DEFAULT_DESCRIPTION',
  'Air duct and dryer vent cleaning in Virginia, Maryland & DC. Flat rates, before/after photos, payment after on-site approval.',
)
svcCopy = svcCopy.replace(
  /OG_DEFAULT_DESCRIPTION\s*=\s*'((?:\\'|[^'])*)'/,
  `OG_DEFAULT_DESCRIPTION =\n  '${ogMeta.replace(/'/g, "\\'")}'`,
)
fs.writeFileSync(svcCopyPath, svcCopy)

// --- Services ---
const SERVICES = {
  'air-duct-cleaning':
    'Professional air duct cleaning & sanitization from $299. Unlimited vents, before/after photos. Serving VA, MD & Washington DC.',
  'dryer-vent-cleaning':
    'Dryer vent cleaning from $199. Full-length brush-out, before/after photos, flat rates. Serving Virginia, Maryland & Washington DC.',
  'air-duct-and-dryer-vent-cleaning':
    'Combo air duct & dryer vent cleaning from $399. Unlimited vents, dryer brush-out, photos. Serving VA, MD & Washington DC.',
  'mold-remediation-air-ducts':
    'Mold remediation for air ducts in VA, MD & DC. HEPA extraction, EPA-registered antimicrobial when needed. Free estimate.',
}
for (const [slug, desc] of Object.entries(SERVICES)) {
  assertLen(slug, desc)
  replaceTsDescription(path.join('src/content/services', `${slug}.ts`), desc)
}

// --- Offices ---
const OFFICES = {
  burke:
    'Burke, VA office for air duct and dryer vent cleaning. Fairfax County dispatch, flat-rate packages, before/after photos. Call (571) 460-0001.',
  bethesda:
    'Bethesda, MD office for air duct and dryer vent cleaning. Montgomery County dispatch, flat rates, photos. Call (301) 809-4544.',
}
{
  const officeFile = 'src/content/offices/index.ts'
  let t = fs.readFileSync(officeFile, 'utf8')
  // Replace by slug blocks carefully — two description fields
  t = t.replace(
    /(slug: 'burke'[\s\S]*?description:\s*)'((?:\\'|[^'])*)'/,
    `$1'${OFFICES.burke.replace(/'/g, "\\'")}'`,
  )
  t = t.replace(
    /(slug: 'bethesda'[\s\S]*?description:\s*)'((?:\\'|[^'])*)'/,
    `$1'${OFFICES.bethesda.replace(/'/g, "\\'")}'`,
  )
  assertLen('office-burke', OFFICES.burke)
  assertLen('office-bethesda', OFFICES.bethesda)
  fs.writeFileSync(officeFile, t)
}

// --- Locations (unique, local, ≤155) ---
const LOCATIONS = {
  alexandria:
    'Air duct & dryer vent cleaning in Alexandria, VA. Flat rates for Old Town, Del Ray & condos. Photos included. Call (571) 460-0001.',
  arlington:
    'Air duct & dryer vent cleaning in Arlington, VA. Flat rates for corridor condos & homes. Before/after photos. Call (571) 460-0001.',
  bethesda:
    'Air duct & dryer vent cleaning from our Bethesda office on Old Georgetown Road. Flat rates, photos. Call (301) 809-4544.',
  burke:
    'Air duct & dryer vent cleaning from our Burke, VA office. Fairfax dispatch, flat rates, before/after photos. Call (571) 460-0001.',
  chantilly:
    'Air duct & dryer vent cleaning in Chantilly, VA. Flat rates for Sully Station & Route 28 homes. Photos. Call (571) 460-0001.',
  clarksburg:
    'Air duct & dryer vent cleaning in Clarksburg, MD. Flat rates for newer homes & townhomes. Photos included. Call (301) 809-4544.',
  'college-park':
    'Air duct & dryer vent cleaning in College Park, MD. Flat rates for UMD rentals & Route 1 homes. Photos. Call (301) 809-4544.',
  columbia:
    'Air duct & dryer vent cleaning in Columbia, MD. Flat rates for village townhomes & lake-edge homes. Call (301) 809-4544.',
  'ellicott-city':
    'Air duct & dryer vent cleaning in Ellicott City, MD. Flat rates for Main Street & hillside homes. Photos. Call (301) 809-4544.',
  'fair-oaks':
    'Air duct & dryer vent cleaning in Fair Oaks & Fair Lakes, VA. Flat rates, before/after photos. Call (571) 460-0001.',
  fairfax:
    'Air duct & dryer vent cleaning in Fairfax, VA. Flat rates for City homes & GMU-area rentals. Photos. Call (571) 460-0001.',
  'falls-church':
    'Air duct & dryer vent cleaning in Falls Church, VA. Flat rates for City lots & close-in homes. Photos. Call (571) 460-0001.',
  frederick:
    'Air duct & dryer vent cleaning in Frederick, MD. Flat rates for downtown & newer suburbs. Photos. Call (301) 809-4544.',
  gaithersburg:
    'Air duct & dryer vent cleaning in Gaithersburg, MD. Flat rates for Kentlands & I-270 homes. Photos. Call (301) 809-4544.',
  germantown:
    'Air duct & dryer vent cleaning in Germantown, MD. Flat rates for townhomes & corridor homes. Photos. Call (301) 809-4544.',
  'great-falls':
    'Air duct & dryer vent cleaning in Great Falls, VA. Flat rates for large-lot homes & long dryer runs. Call (571) 460-0001.',
  herndon:
    'Air duct & dryer vent cleaning in Herndon, VA. Flat rates for Elden Street & Worldgate homes. Photos. Call (571) 460-0001.',
  hyattsville:
    'Air duct & dryer vent cleaning in Hyattsville, MD. Flat rates for Arts District & Route 1 homes. Call (301) 809-4544.',
  kensington:
    'Air duct & dryer vent cleaning in Kensington, MD. Flat rates for colonials & basement handlers. Photos. Call (301) 809-4544.',
  lorton:
    'Air duct & dryer vent cleaning in Lorton, VA. Flat rates for Laurel Hill & Occoquan-area homes. Call (571) 460-0001.',
  loudoun:
    'Air duct & dryer vent cleaning in Loudoun County, VA. Flat rates for Leesburg, Ashburn & Sterling. Call (571) 460-0001.',
  mclean:
    'Air duct & dryer vent cleaning in McLean, VA. Flat rates for canopy lots, basements & Tysons condos. Call (571) 460-0001.',
  'montgomery-village':
    'Air duct & dryer vent cleaning in Montgomery Village, MD. Flat rates for townhomes & lakeside homes. Call (301) 809-4544.',
  'mount-vernon':
    'Air duct & dryer vent cleaning in Mount Vernon, VA. Flat rates for Parkway homes & colonials. Photos. Call (571) 460-0001.',
  oakton:
    'Air duct & dryer vent cleaning in Oakton, VA. Flat rates for large-lot colonials & canopy homes. Call (571) 460-0001.',
  olney:
    'Air duct & dryer vent cleaning in Olney, MD. Flat rates for ramblers & split-levels. Before/after photos. Call (301) 809-4544.',
  potomac:
    'Air duct & dryer vent cleaning in Potomac, MD. Flat rates for large-lot canopy homes. Photos included. Call (301) 809-4544.',
  'prince-william':
    'Air duct & dryer vent cleaning in Prince William County, VA. Flat rates for Woodbridge & Manassas. Call (571) 460-0001.',
  reston:
    'Air duct & dryer vent cleaning in Reston, VA. Flat rates for village homes & high-rise dryer chases. Call (571) 460-0001.',
  rockville:
    'Air duct & dryer vent cleaning in Rockville, MD. Flat rates for Town Center, King Farm & Twinbrook. Call (301) 809-4544.',
  'silver-spring':
    'Air duct & dryer vent cleaning in Silver Spring, MD. Flat rates for brick homes & urban dust. Photos. Call (301) 809-4544.',
  springfield:
    'Air duct & dryer vent cleaning in Springfield, VA. Flat rates for Franconia & Mixing Bowl homes. Call (571) 460-0001.',
  'takoma-park':
    'Air duct & dryer vent cleaning in Takoma Park, MD. Flat rates for bungalows & crawl-space retrofits. Call (301) 809-4544.',
  vienna:
    'Air duct & dryer vent cleaning in Vienna, VA. Flat rates for colonials & finished basements. Photos. Call (571) 460-0001.',
  'washington-dc':
    'Air duct & dryer vent cleaning in Washington, DC. Flat rates for row houses & condos. Before/after photos. Call (571) 460-0001.',
  wheaton:
    'Air duct & dryer vent cleaning in Wheaton, MD. Flat rates for mid-century brick & Metro-corridor homes. Call (301) 809-4544.',
}

for (const [slug, desc] of Object.entries(LOCATIONS)) {
  assertLen(`loc:${slug}`, desc)
  replaceTsDescription(path.join('src/content/locations', `${slug}.ts`), desc)
}

// --- Blogs ---
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
    'How College Park rentals and campus pollen load air ducts between tenants — and when turnover cleaning helps.',
  'columbia-village-townhomes-air-ducts':
    'Columbia village townhomes and humid dryer closets: how lake-edge pollen and stacked laundry affect ductwork.',
  'dc-humidity-row-houses-indoor-air':
    'How Potomac humidity and retrofitted ducts in DC row houses make registers musty — and what cleaning can fix.',
  'ellicott-city-flood-humidity-air-ducts':
    'Flood humidity and air ducts in Ellicott City: Main Street cellars, hillside homes, and moisture-first steps.',
  'fair-oaks-townhomes-dust-air-ducts':
    'Fair Oaks and Fair Lakes townhome dust: attic handlers, corridor grit, and what we find in 1980s–2000s trunks.',
  'fairfax-ramblers-pollen-air-ducts':
    'City of Fairfax ramblers, oak pollen, and cool basement trunks — why registers get dusty again each spring.',
  'falls-church-close-in-dust-air-ducts':
    'Falls Church close-in dust: small-lot homes, Beltway grit, and retrofitted ducts in a compact independent city.',
  'frederick-downtown-humidity-air-ducts':
    'Frederick downtown humidity vs Urbana new pads — two duct problems under one city name, and when to clean.',
  'gaithersburg-kentlands-basement-humidity-air-ducts':
    'Gaithersburg Kentlands humidity and Crown dryer vents: cool trunks, party-wall chases, and I-270 corridor dust.',
  'germantown-i270-townhome-air-ducts':
    'Germantown townhome closets and I-270 dust: packed mechanical rooms, dryer lint, and corridor particulate.',
  'great-falls-estates-humidity-air-ducts':
    'Long dryer runs and humid basements in Great Falls homes — estate trunks, crawl spaces, and Potomac moisture.',
  'herndon-construction-dust-air-ducts':
    'Construction dust near Herndon corridors: what ends up in HVAC returns and when a first cleaning makes sense.',
  'do-dirty-air-ducts-raise-energy-bills':
    'Do dirty air ducts raise energy bills? What EPA, ENERGY STAR, and DOE actually say — and when cleaning helps.',
  'how-often-clean-air-ducts':
    'How often should you clean air ducts? EPA sets no health interval — signs, dryer vents, and realistic timing.',
  'how-potomac-humidity-affects-alexandria-air-quality':
    'Old Town humidity and Alexandria air ducts: what homeowners notice first, and how cleaning fits honestly.',
  'how-potomac-humidity-affects-arlington-air-quality':
    'Why Arlington condos near the Potomac get musty ducts in summer humidity — and when cleaning helps.',
  'hyattsville-route-1-humidity-air-ducts':
    'Renovation dust and humidity in Hyattsville air ducts along Route 1 and the Arts District corridor.',
  'kensington-colonials-pollen-air-ducts':
    'Kensington colonials, street-tree pollen, and basement handlers — why close-in Montgomery ducts reload fast.',
  'lorton-i95-occoquan-air-ducts':
    'How I-95 dust and Occoquan humidity affect Lorton ducts in new townhomes and older Laurel Hill homes.',
  'loudoun-construction-dust-pollen-air-ducts':
    'Ashburn construction dust vs Leesburg basement humidity — two Loudoun duct patterns homeowners ask about.',
  'mclean-tree-pollen-basement-humidity':
    'McLean tree pollen and basement humidity: how large-lot trunks and finished lower levels hold debris.',
  'montgomery-village-townhomes-air-ducts':
    'Why Montgomery Village townhome ducts load up over time — 1970s runs, lake humidity, and dryer closets.',
  'mount-vernon-potomac-humidity-air-ducts':
    'Mount Vernon Potomac humidity and older metal ducts: Parkway moisture, colonials, and when to clean.',
  'never-clean-air-ducts':
    'What happens if you never clean your air ducts? Debris buildup, dryer vents, and when waiting gets costly.',
  'oakton-canopy-pollen-air-ducts':
    'Oakton canopy pollen and finished basements: how large-lot colonials load duct trunks each spring.',
  'olney-rambler-pollen-air-ducts':
    'Olney ramblers and split-levels: finished rec rooms, canopy pollen, and why ductwork hides debris.',
  'potomac-tree-canopy-humidity-air-ducts':
    'Potomac tree canopy and long HVAC trunks: pollen, river-corridor humidity, and large-home duct cleaning.',
  'prince-william-occoquan-humidity-air-ducts':
    'Prince William Occoquan humidity and I-66 dust — how Woodbridge, Lake Ridge, and Manassas ducts differ.',
  'reston-town-center-dust-air-ducts':
    'Reston Toll Road dust and humid summers: village HVAC, stacked laundry risers, and filmed-over registers.',
  'rockville-basement-humidity-air-ducts':
    'Rockville basement humidity and cool trunks: why Montgomery County homes reload dusty registers in summer.',
  'silver-spring-brick-houses-urban-dust-air-ducts':
    'Silver Spring brick houses and urban dust: retrofitted trunks, Georgia Avenue particles, and cleaning cues.',
  'springfield-mixing-bowl-dust-air-ducts':
    'Springfield Mixing Bowl dust and split-level basements — why Franconia-area registers coat with grit.',
  'takoma-park-bungalow-humidity-air-ducts':
    'Takoma Park bungalow humidity: crawl-space retrofits, canopy moisture, and ducts added decades later.',
  'vienna-tree-pollen-basement-air-ducts':
    'Vienna tree pollen and finished basements: why Maple Avenue colonials reload dusty supply trunks.',
  'wheaton-urban-dust-air-ducts':
    'Wheaton urban dust and mid-century brick: Veirs Mill grit, plaster-era ducts, and when cleaning helps.',
  'why-clean-dryer-vents':
    'Why clean dryer vents? Lint, fire risk (NFPA), longer dry times — and how professional cleaning helps.',
}

const blogDir = 'src/content/blog'
const indexPath = path.join(blogDir, 'index.json')
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'))

for (const [slug, desc] of Object.entries(BLOGS)) {
  assertLen(`blog:${slug}`, desc)
  const file = path.join(blogDir, `${slug}.json`)
  const doc = JSON.parse(fs.readFileSync(file, 'utf8'))
  doc.description = desc
  fs.writeFileSync(file, JSON.stringify(doc, null, 2) + '\n')
  const row = index.find((item) => item.slug === slug)
  if (row) row.description = desc
}

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n')

console.log('Updated home, OG, services, offices, 36 locations, blogs + index')
console.log('home', homeMeta.length, 'og', ogMeta.length)
