const fs = require('fs')
const path = require('path')

const dir = path.join('src', 'content', 'locations')

/** Varied human titles — not one identical template for every city. */
const UPDATES = {
  alexandria: {
    title: 'Air Duct Cleaning in Alexandria, VA',
    headline: 'Old Town row houses, Del Ray bungalows, and condo dryer risers — flat-rate cleaning from Burke',
  },
  arlington: {
    title: 'Arlington Air Duct & Dryer Vent Cleaning',
    headline: 'High-rise laundry chases and North Arlington basements — booked on the Burke office line',
  },
  bethesda: {
    title: 'Bethesda Air Duct Cleaning — Local Office on Old Georgetown Road',
    headline:
      'Woodmont condos, townhomes, and NIH-area homes — duct and dryer cleaning from a staffed Bethesda office',
  },
  burke: {
    title: 'Burke Air Duct Cleaning — Fairfax Office & Local Dispatch',
    headline: 'Staffed desk on Burke Centre Parkway for Lake Braddock, Fairfax Station, and Northern Virginia routes',
  },
  chantilly: {
    title: 'Air Duct Cleaning in Chantilly, VA',
    headline: 'Sully Station townhomes and Route 28 corridor homes — flat rates from Burke',
  },
  clarksburg: {
    title: 'Clarksburg Air Duct Cleaning for Newer Homes',
    headline: 'Cabin Branch and Village townhomes — first-owner construction dust and stacked laundry from Bethesda',
  },
  'college-park': {
    title: 'Air Duct & Dryer Vent Cleaning in College Park, MD',
    headline: 'Campus-area rentals and Route 1 housing — flat-rate cleaning from Bethesda',
  },
  columbia: {
    title: 'Columbia MD Air Duct & Dryer Vent Cleaning',
    headline: 'Village townhomes and lake-edge basements — scheduled from our Bethesda office',
  },
  'ellicott-city': {
    title: 'Air Duct Cleaning in Ellicott City, MD',
    headline: 'Historic Main Street humidity and hillside suburbs — Howard County jobs from Bethesda',
  },
  'fair-oaks': {
    title: 'Fair Oaks & Fair Lakes Air Duct Cleaning',
    headline: 'Mall-corridor townhomes and Route 50/I-66 dust — flat rates from Burke',
  },
  fairfax: {
    title: 'Air Duct & Dryer Vent Cleaning in Fairfax, VA',
    headline: 'City of Fairfax colonials and GMU-area rentals — short dispatch from Burke',
  },
  'falls-church': {
    title: 'Falls Church Air Duct Cleaning',
    headline: 'City lots and close-in Fairfax County streets — ducts and dryer vents from Burke',
  },
  frederick: {
    title: 'Air Duct & Dryer Vent Cleaning in Frederick, MD',
    headline: 'Downtown cellars and newer Urbana pads — longer Bethesda hop, same flat rates',
  },
  gaithersburg: {
    title: 'Gaithersburg Air Duct Cleaning',
    headline: 'Kentlands basements and I-270 corridor townhomes — from the Bethesda office',
  },
  germantown: {
    title: 'Germantown Air Duct & Dryer Vent Cleaning',
    headline: 'Milestone and Town Center townhomes — party-wall dryers and corridor dust from Bethesda',
  },
  'great-falls': {
    title: 'Great Falls VA Air Duct Cleaning',
    headline: 'Large-lot homes, long dryer runs, and walk-out basements — staged from Burke',
  },
  herndon: {
    title: 'Air Duct Cleaning in Herndon, VA',
    headline: 'Elden Street cottages and Worldgate stacks — Dulles corridor grit from Burke',
  },
  hyattsville: {
    title: 'Hyattsville Air Duct Cleaning',
    headline: 'Arts-district renovations and Route 1 housing — booked from Bethesda',
  },
  kensington: {
    title: 'Kensington MD Air Duct & Dryer Vent Cleaning',
    headline: 'Close-in Montgomery colonials — short run from Old Georgetown Road',
  },
  lorton: {
    title: 'Air Duct Cleaning in Lorton, VA',
    headline: 'Lorton Station, Laurel Hill, and Occoquan-edge homes — short hop from Burke',
  },
  loudoun: {
    title: 'Loudoun County Air Duct Cleaning',
    headline: 'Ashburn, Leesburg, and Sterling — construction dust and basement humidity from Burke',
  },
  mclean: {
    title: 'McLean Air Duct & Dryer Vent Cleaning',
    headline: 'Tree-canopy estates and Tysons-edge condos — Fairfax routes from Burke',
  },
  'montgomery-village': {
    title: 'Montgomery Village Air Duct Cleaning',
    headline: '1970s planned courts and lake-edge townhomes — Bethesda dispatch',
  },
  'mount-vernon': {
    title: 'Air Duct Cleaning in Mt Vernon, VA',
    headline: 'Fort Hunt and Parkway-side homes — river humidity and mid-century trunks from Burke',
  },
  oakton: {
    title: 'Oakton Air Duct Cleaning',
    headline: 'Canopy lots, finished basements, and long dryer paths — from Burke',
  },
  olney: {
    title: 'Air Duct & Dryer Vent Cleaning in Olney, MD',
    headline: 'Georgia Avenue ramblers and Norbeck split-levels — from Bethesda',
  },
  potomac: {
    title: 'Potomac MD Air Duct Cleaning',
    headline: 'Tree-canopy estates and long trunks — River Road routes from Bethesda',
  },
  'prince-william': {
    title: 'Air Duct & Dryer Vent Cleaning in Prince William County, VA',
    headline: 'Woodbridge, Manassas, and Gainesville — I-95 humidity and inland dust from Burke',
  },
  reston: {
    title: 'Reston Air Duct Cleaning',
    headline: 'High-rise laundry chases and village townhomes — planned-community jobs from Burke',
  },
  rockville: {
    title: 'Air Duct & Dryer Vent Cleaning in Rockville, MD',
    headline: 'Twinbrook, King Farm, and Town Center — short run from Bethesda',
  },
  'silver-spring': {
    title: 'Silver Spring Air Duct Cleaning',
    headline: 'Brick houses, corridor dust, and close-in Montgomery — from Bethesda',
  },
  springfield: {
    title: 'Springfield VA Air Duct & Dryer Vent Cleaning',
    headline: 'Franconia and West Springfield — Mixing Bowl dust and split-levels from Burke',
  },
  'takoma-park': {
    title: 'Takoma Park Air Duct Cleaning',
    headline: 'Bungalows and crawl-space humidity near the DC line — from Bethesda',
  },
  vienna: {
    title: 'Vienna Air Duct Cleaning',
    headline: 'Maple Avenue colonials and Wolf Trap canopy — pollen and basements from Burke',
  },
  'washington-dc': {
    title: 'Washington DC Air Duct Cleaning',
    headline: 'Row houses and DOEE mold context — ducts and dryer vents from Burke and Bethesda',
  },
  wheaton: {
    title: 'Wheaton MD Air Duct & Dryer Vent Cleaning',
    headline: 'Veirs Mill corridor housing — urban dust and older trunks from Bethesda',
  },
}

function replaceField(source, field, value) {
  const re = new RegExp(`${field}:\\s*(['\`"])([\\s\\S]*?)\\1`, 'm')
  if (!re.test(source)) throw new Error(`Missing ${field}`)
  const q = "'"
  const safe = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  return source.replace(re, `${field}: ${q}${safe}${q}`)
}

let ok = 0
for (const [slug, upd] of Object.entries(UPDATES)) {
  const file = path.join(dir, `${slug}.ts`)
  let text = fs.readFileSync(file, 'utf8')
  text = replaceField(text, 'title', upd.title)
  text = replaceField(text, 'headline', upd.headline)
  fs.writeFileSync(file, text)
  ok++
  console.log('updated', slug)
}
console.log('done', ok)
