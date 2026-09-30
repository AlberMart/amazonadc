/**
 * Deep uniqueness pass:
 * 1) Per-city unique H2 / offers / services / communities / process headings + intros
 * 2) Dedicated blog heroes under /img/blog/heroes/ (never location photos)
 *
 * Run: node scripts/unique-cities-and-blog-heroes.cjs
 */
const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')

const ROOT = path.join(__dirname, '..')
const LOC_DIR = path.join(ROOT, 'src/content/locations')
const BLOG_DIR = path.join(ROOT, 'src/content/blog')
const HERO_DIR = path.join(ROOT, 'public/img/blog/heroes')

function extract(src, key) {
  const m = src.match(new RegExp(`${key}:\\s*('([^']*)'|"([^"]*)")`))
  return m ? m[2] || m[3] || '' : ''
}

function setQuotedField(src, key, value) {
  const re = new RegExp(`(${key}:\\s*)(?:'[^']*'|"[^"]*")`)
  if (!re.test(src)) return src
  return src.replace(re, `$1${JSON.stringify(value)}`)
}

function setNestedHeading(src, parent, value) {
  const re = new RegExp(`(${parent}:\\s*\\{[\\s\\S]*?\\n\\s*heading:\\s*)(?:'[^']*'|"[^"]*")`)
  if (!re.test(src)) {
    console.warn('no heading for', parent)
    return src
  }
  return src.replace(re, `$1${JSON.stringify(value)}`)
}

function setNestedIntro(src, parent, value) {
  const re = new RegExp(`(${parent}:\\s*\\{[\\s\\S]*?\\n\\s*intro:\\s*)(?:'[^']*'|"[^"]*")`)
  if (!re.test(src)) return src
  return src.replace(re, `$1${JSON.stringify(value)}`)
}

/** City-specific copy packs — handwritten angles, not find/replace templates */
const CITY = {
  burke: {
    about: 'The Burke Centre Hub Behind Northern Virginia Dispatch',
    services: 'What This Burke Office Actually Schedules',
    why: 'Why Fairfax County Jobs Start on Burke Centre Pkwy',
    communities: 'Virginia Cities Staged From Suite 119',
    process: 'Office Intake at Burke Centre — Then On the Road',
    offers: 'Flat-Rate Packages From the Burke Shop',
    servicesIntro: 'Only the packages we publish site-wide — ducts, dryer vents, and mold treatment when inspection supports it.',
    communitiesIntro: 'This page is the office hub. City pages below carry the neighborhood detail.',
    processIntro: 'How a job leaves Suite 119 and arrives at a Northern Virginia address.',
  },
  bethesda: {
    about: 'Old Georgetown Road Staging for Montgomery County',
    services: 'Maryland Packages From the Bethesda Suite',
    why: 'Why Montgomery County Crews Stage on Old Georgetown Rd',
    communities: 'Maryland Cities Covered From Suite 201',
    process: 'Bethesda Intake, Then I-270 and Beltway Routes',
    offers: 'Published Rates From the Bethesda Office',
    servicesIntro: 'The same duct, dryer, and mold packages as Virginia — staged from Bethesda.',
    communitiesIntro: 'Use city pages for neighborhood names; this hub is for the Maryland office itself.',
    processIntro: 'From the Old Georgetown suite to a Montgomery or Howard County driveway.',
  },
  'washington-dc': {
    about: 'Row Houses, Condos, and River Humidity Across Four Quadrants',
    services: 'District Packages Dispatched From Burke or Bethesda',
    why: 'Why DC Homes Book a Metro Crew Instead of a Pop-Up Shop',
    communities: 'Northwest Through Southeast — Where We Actually Park',
    process: 'District Access: Loading, Alleys, and Condo Rules First',
    offers: 'Flat Rates for Capitol Hill to Navy Yard Jobs',
    servicesIntro: 'Same published packages as the suburbs — scoped for row houses and stacked laundry.',
    communitiesIntro: 'Quadrant groups below; nearby Virginia and Maryland pages share the same two offices.',
    processIntro: 'We confirm parking and building access before the truck rolls into the District.',
  },
  arlington: {
    about: 'Rosslyn to Columbia Pike: Condos, Brick, and Potomac Air',
    services: 'Arlington Packages for Condos and Older Brick Houses',
    why: 'Why Close-In Arlington Homes Recycle Dust Faster',
    communities: 'Corridors We Drive Weekly in Arlington',
    process: 'Metro-Adjacent Scheduling From the Burke Office',
    offers: 'Arlington Flat Rates — No Vent Counting',
    servicesIntro: 'Condos with long dryer risers and brick houses with later-added trunks — same flat rates.',
    communitiesIntro: 'From Rosslyn high-rises to Columbia Pike splits — ask if your building is gated.',
    processIntro: 'Garage height and loading rules matter more here than in suburban cul-de-sacs.',
  },
  alexandria: {
    about: 'Old Town Plaster, Del Ray Townhomes, and River Moisture',
    services: 'Alexandria Cleanings for Historic and Waterfront Homes',
    why: 'Why Alexandria Registers Film Over After Humid Weeks',
    communities: 'Old Town, Del Ray, and West End Stops',
    process: 'Narrow-Street Staging Notes for Alexandria Visits',
    offers: 'Alexandria Rates Matching Our Burke Packages',
    servicesIntro: 'Historic boots and modern condo packs get the same published scopes.',
    communitiesIntro: 'Waterfront, Eisenhower, and West End streets are on the Burke dispatch list.',
    processIntro: 'We plan alley access and floor protection for plaster and narrow halls.',
  },
  mclean: {
    about: 'Tree Lots, Finished Basements, and Tysons-Edge Condos',
    services: 'McLean Packages for Large Lots and High-Rises',
    why: 'Why McLean Canopy Pollen Settles in Cool Trunks',
    communities: 'McLean Streets From Dolley Madison to Tysons',
    process: 'Estate Driveways and Condo Loading From Burke',
    offers: 'McLean Flat-Rate Duct and Dryer Packages',
    servicesIntro: 'Large single-family systems and Tysons stacks — quoted before we unroll hoses.',
    communitiesIntro: 'Langley, Chesterbrook, and Tysons-edge addresses share this Burke route.',
    processIntro: 'Gate codes and long driveways are normal; we confirm them the morning of.',
  },
  reston: {
    about: 'Village Layouts, Town Center Stacks, and Toll Road Film',
    services: 'Reston Packages for High-Rises and Lake Anne Trunks',
    why: 'Why Reston Villages Recirculate Corridor Dust',
    communities: 'Town Center, Lake Anne, South Lakes, Wiehle',
    process: 'HOA Gates and Elevator Pads on the Reston Route',
    offers: 'Reston Flat Rates From the Burke Dispatch',
    servicesIntro: 'Stacked laundry and mid-century trunks — flat-rate scopes either way.',
    communitiesIntro: 'Planned villages and Silver Line stacks; ask about loading docks early.',
    processIntro: 'We stage for Town Center docks or South Lakes driveways depending on the address.',
  },
  herndon: {
    about: 'Clock Tower Cottages Meet Dulles-Corridor Construction Dust',
    services: 'Herndon Cleanings for Downtown and Worldgate',
    why: 'Why Herndon Returns Hold Gypsum and Traffic Film',
    communities: 'Elden Street, Worldgate, and Dulles-Edge Blocks',
    process: 'Downtown Alleys and Worldgate Gates From Burke',
    offers: 'Herndon Rates — Same Packages as Reston Dispatch',
    servicesIntro: 'Cottages and stacked Worldgate units share published flat rates.',
    communitiesIntro: 'Historic core and corridor HOAs; Centreville-adjacent streets often share the day.',
    processIntro: 'We ask about alley parking downtown and gate codes at Worldgate.',
  },
  fairfax: {
    about: 'City of Fairfax Ramblers Under a Heavy County Canopy',
    services: 'Fairfax City Packages Distinct From Fair Oaks',
    why: 'Why City of Fairfax Trunks Hold Spring Pollen',
    communities: 'Old Town Fairfax, GMU Edge, Fairfax Corner Living',
    process: 'Short Run Up 123 From the Burke Office',
    offers: 'City of Fairfax Flat-Rate Cleaning Packages',
    servicesIntro: 'Ramblers and townhomes inside the city limits — not a duplicate of Fair Oaks.',
    communitiesIntro: 'This page is the City of Fairfax. Fair Oaks and Oakton have their own pages.',
    processIntro: 'A short Burke dispatch; we still confirm HOA rules when they apply.',
  },
  springfield: {
    about: 'Mixing Bowl Dust, Split-Levels, and Franconia Townhomes',
    services: 'Springfield Packages for I-95 Corridor Homes',
    why: 'Why Springfield Registers Gray Out After Beltway Weeks',
    communities: 'West Springfield, Franconia, and Burke Centre Edge',
    process: 'Next-Community Dispatch From Burke Centre',
    offers: 'Springfield Flat Rates From Minutes-Away Burke',
    servicesIntro: 'Split-levels and townhomes along the Mixing Bowl — flat rates before we start.',
    communitiesIntro: 'Burke is the next community over; this page covers Springfield streets specifically.',
    processIntro: 'Traffic windows matter; we send a morning ETA that accounts for the Mixing Bowl.',
  },
  rockville: {
    about: 'King Farm Townhomes, Twinbrook Ranches, and Basement Humidity',
    services: 'Rockville Packages From the Bethesda Office',
    why: 'Why Rockville Finished Basements Sweat at the Trunks',
    communities: 'Town Center, King Farm, Twinbrook, and Fallsmead',
    process: 'Fifteen Minutes Down Old Georgetown — Then On Site',
    offers: 'Rockville Rates Matching Bethesda Packages',
    servicesIntro: 'Colonials and townhomes with humid lower levels — quoted before cleaning.',
    communitiesIntro: 'Montgomery County core; Potomac and Gaithersburg are separate pages.',
    processIntro: 'A short Bethesda run; we still confirm basement access and dryer terminations.',
  },
  'silver-spring': {
    about: 'Brick Rows, Urban Grit, and Georgia Avenue Film',
    services: 'Silver Spring Cleanings for Brick and Mid-Rise Homes',
    why: 'Why Close-In Silver Spring Ducts Collect City Dust',
    communities: 'Downtown, Woodside, and Forest Glen Stops',
    process: 'Beltway-Adjacent Timing From Bethesda',
    offers: 'Silver Spring Flat-Rate Duct and Dryer Work',
    servicesIntro: 'Older brick and newer stacks — same published scopes from Bethesda.',
    communitiesIntro: 'Inside the Beltway grit is the story; Kensington and Takoma Park are nearby pages.',
    processIntro: 'Street parking and mid-rise loading are planned before arrival.',
  },
  gaithersburg: {
    about: 'Kentlands Basements, Crown Condos, and I-270 Dust',
    services: 'Gaithersburg Packages for HOAs and Condos',
    why: 'Why Kentlands and Lakelands Trunks Hold Humidity',
    communities: 'Kentlands, Lakelands, Crown, and Old Town Edge',
    process: 'I-270 North Dispatch From Bethesda',
    offers: 'Gaithersburg Flat Rates From Old Georgetown Rd',
    servicesIntro: 'HOA townhomes and Crown stacks — flat-rate packages either way.',
    communitiesIntro: 'Germantown and Montgomery Village are separate pages on the same corridor.',
    processIntro: 'We plan for HOA gates and condo elevator rules when you book.',
  },
  'college-park': {
    about: 'Route 1 Rentals, Family Houses, and High-Turnover Dust',
    services: 'College Park Packages for Rentals and Owner-Occupied Homes',
    why: 'Why Student Turnover Leaves Debris in Returns',
    communities: 'Campus Edge, Berwyn, and Route 1 Corridors',
    process: 'Prince George’s Timing From the Bethesda Office',
    offers: 'College Park Rates for Landlords and Homeowners',
    servicesIntro: 'Turnover cleans and owner-occupied homes use the same published packages.',
    communitiesIntro: 'Hyattsville and Takoma Park are nearby; this page is College Park specifically.',
    processIntro: 'Landlords: send unit access instructions with the booking.',
  },
  vienna: {
    about: '1950s–70s Colonials Under a Dense Tree Canopy',
    services: 'Vienna Packages for Basement Trunks and Dryer Runs',
    why: 'Why Vienna Pollen Seasons Stick to Cool Metal',
    communities: 'Maple Avenue Corridor and Neighborhood Cul-de-Sacs',
    process: 'Fairfax Canopy Route From the Burke Office',
    offers: 'Vienna Flat-Rate Cleaning Packages',
    servicesIntro: 'Colonials with finished basements are the usual Vienna job — flat rates apply.',
    communitiesIntro: 'Oakton and McLean are nearby pages; Vienna stays on its own route notes.',
    processIntro: 'Leaf season and basement returns are part of the intake questions.',
  },
  'great-falls': {
    about: 'Estate-Scale Trunks, River Humidity, and Wooded Lots',
    services: 'Great Falls Packages for Large Single-Family Systems',
    why: 'Why Estate Homes Need Longer Inspection Windows',
    communities: 'Georgetown Pike and River-Edge Properties',
    process: 'Longer Drive Planning From Burke — Said Up Front',
    offers: 'Great Falls Rates With Honest Drive Time',
    servicesIntro: 'Larger systems and longer dryer runs — still flat-rate residential packages.',
    communitiesIntro: 'McLean and Reston are closer-in pages; Great Falls is scheduled deliberately.',
    processIntro: 'We quote arrival windows that respect the drive from Burke Centre.',
  },
  'falls-church': {
    about: 'Small Lots, Beltway Dust, and Older Close-In Trunks',
    services: 'Falls Church Packages for Compact City Lots',
    why: 'Why Close-In Falls Church Homes Recycle Traffic Film',
    communities: 'City of Falls Church Streets and Near-Edge Blocks',
    process: 'Tight-Lot Staging From the Burke Office',
    offers: 'Falls Church Flat Rates — Compact Homes, Full Scopes',
    servicesIntro: 'Smaller footprints still get full trunk cleaning at published rates.',
    communitiesIntro: 'Arlington and Fairfax pages are nearby; this is the City of Falls Church.',
    processIntro: 'On-street parking plans come with the morning ETA.',
  },
  chantilly: {
    about: 'Sully HOAs, Route 28 Film, and Builder Dust That Never Left',
    services: 'Chantilly Packages for 1990s–2010s HOA Homes',
    why: 'Why Newer-Looking Chantilly Houses Still Blow Gypsum',
    communities: 'Sully Station, Greenbriar, Westfields, Stringfellow',
    process: 'Western Fairfax Dispatch Notes From Burke',
    offers: 'Chantilly Flat Rates for HOA Townhomes and Houses',
    servicesIntro: 'HOA chases and single-family trunks — flat rates either way.',
    communitiesIntro: 'Fair Oaks and Loudoun pages are neighbors; Chantilly stays Route 28–focused.',
    processIntro: 'Gate codes and townhome dryer chases are on the intake checklist.',
  },
  oakton: {
    about: 'Chain Bridge Road Colonials and Canopy Pollen',
    services: 'Oakton Packages Between Vienna and Fairfax',
    why: 'Why Oakton Trunks Hold Leaf-Season Debris',
    communities: 'Route 123 Corridor and Neighborhood Courts',
    process: 'Mid-Fairfax Timing From the Burke Office',
    offers: 'Oakton Flat-Rate Duct and Dryer Packages',
    servicesIntro: 'Large-lot colonials with long runs — quoted before equipment comes off the truck.',
    communitiesIntro: 'Vienna, Fairfax, and Fair Oaks are separate pages on related routes.',
    processIntro: 'We confirm driveway access and basement returns when you book.',
  },
  lorton: {
    about: 'I-95 Dust, Occoquan Humidity, and Newer HOA Streets',
    services: 'Lorton Packages for Corridor and River-Edge Homes',
    why: 'Why Lorton Homes Mix Traffic Film With River Moisture',
    communities: 'Lorton Station, Occoquan Edge, and Laurel Hill',
    process: 'South Fairfax Dispatch From Burke',
    offers: 'Lorton Rates on the Same Burke Packages',
    servicesIntro: 'HOA homes and older pockets share published flat rates.',
    communitiesIntro: 'Springfield and Prince William pages sit nearby on the corridor.',
    processIntro: 'I-95 timing is built into the morning arrival window.',
  },
  'mount-vernon': {
    about: 'GW Parkway Air, Older River Houses, and Humid Cellars',
    services: 'Mt Vernon Packages for Parkway and Fort Hunt Homes',
    why: 'Why Potomac-Side Trunks Sweat in Summer',
    communities: 'Fort Hunt, Hollin Hills Edge, and Parkway Streets',
    process: 'Southern Fairfax Route Notes From Burke',
    offers: 'Mt Vernon Flat Rates From the Burke Office',
    servicesIntro: 'Older metal trunks and long dryer runs — flat-rate residential scopes.',
    communitiesIntro: 'Alexandria and Lorton are nearby pages; Mt Vernon keeps its river focus.',
    processIntro: 'We ask about cellar returns and exterior dryer caps on intake.',
  },
  'fair-oaks': {
    about: 'Mall-Corridor Townhomes and Route 50 / I-66 Dust',
    services: 'Fair Oaks Packages Distinct From Fairfax City',
    why: 'Why Fair Lakes and Fair Oaks Stacks Load Corridor Film',
    communities: 'Fair Oaks Mall Edge, Fair Lakes, Fairfax Corner Living',
    process: 'Western Fairfax Scheduling From Burke',
    offers: 'Fair Oaks Flat Rates — Not a City of Fairfax Duplicate',
    servicesIntro: 'Townhome packages and single-family scopes at published rates.',
    communitiesIntro: 'This is Fair Oaks / Fair Lakes — the City of Fairfax has its own page.',
    processIntro: 'HOA gates near the mall corridor are confirmed the morning of.',
  },
  loudoun: {
    about: 'Leesburg Brick, Ashburn New-Builds, and Pollen Seasons',
    services: 'Loudoun County Packages From the Burke Office',
    why: 'Why Loudoun Construction Dust Meets Heavy Pollen',
    communities: 'Leesburg, Ashburn, Sterling, South Riding Overview',
    process: 'Longer Dulles-Corridor Drive — Planned Honestly',
    offers: 'Loudoun Flat Rates With Realistic Drive Windows',
    servicesIntro: 'New-build townhomes and older Leesburg houses — same published packages.',
    communitiesIntro: 'County overview page; Herndon and Chantilly cover closer Dulles-edge towns.',
    processIntro: 'We schedule Loudoun with honest travel time from Burke.',
  },
  'prince-william': {
    about: 'Occoquan Humidity, I-95 Townhomes, and Manassas Colonials',
    services: 'Prince William Packages From Burke Dispatch',
    why: 'Why County Homes Mix Corridor Dust With River Moisture',
    communities: 'Woodbridge, Lake Ridge, Manassas, and Dale City Overview',
    process: 'Southern Corridor Timing From Burke',
    offers: 'Prince William Flat Rates — County Overview Page',
    servicesIntro: 'Townhomes on I-95 and inland colonials share flat-rate packages.',
    communitiesIntro: 'County-level page; Lorton and Springfield cover closer Fairfax edges.',
    processIntro: 'Drive time is real; morning ETAs reflect I-95 conditions.',
  },
  germantown: {
    about: 'I-270 Townhomes, Milestone Stacks, and North Corridor Dust',
    services: 'Germantown Packages From the Bethesda Office',
    why: 'Why Germantown HOAs Recirculate Construction Film',
    communities: 'Milestone, Gunners Lake Edge, and North End Streets',
    process: 'Further Up I-270 — Still Bethesda Dispatch',
    offers: 'Germantown Flat Rates From Old Georgetown Rd',
    servicesIntro: 'Townhome dryer chases and single-family trunks at published rates.',
    communitiesIntro: 'Gaithersburg and Clarksburg are neighboring pages on the corridor.',
    processIntro: 'HOA access notes help us stage without circling the community.',
  },
  potomac: {
    about: 'Canopy Estates, River Air, and Long Trunk Runs',
    services: 'Potomac Packages for Large-Lot Houses',
    why: 'Why Potomac Estates Need Careful Scope Walks',
    communities: 'River Road, Falls Road, and Wooded Neighborhoods',
    process: 'Short Montgomery Run From Bethesda',
    offers: 'Potomac Flat Rates From the Bethesda Suite',
    servicesIntro: 'Estate-scale systems still use flat-rate residential packages after inspection.',
    communitiesIntro: 'Rockville and Bethesda hub pages sit nearby; Potomac stays canopy-focused.',
    processIntro: 'Long driveways and multiple returns are noted at booking.',
  },
  wheaton: {
    about: '1940s–60s Brick, Metro Dust, and Compact Lots',
    services: 'Wheaton Packages for Brick Ranches and Capes',
    why: 'Why Wheaton Urban Grit Settles in Older Ducts',
    communities: 'Wheaton CBD Edge and Neighborhood Grids',
    process: 'Inside-Beltway Timing From Bethesda',
    offers: 'Wheaton Flat Rates Matching Bethesda Packages',
    servicesIntro: 'Older brick homes and small additions — flat rates after a clear scope.',
    communitiesIntro: 'Silver Spring and Kensington are adjacent pages.',
    processIntro: 'Tight lots mean we confirm street parking with the morning ETA.',
  },
  'takoma-park': {
    about: 'Bungalows, DC-Line Humidity, and Later-Added Trunks',
    services: 'Takoma Park Packages for Bungalows and Duplexes',
    why: 'Why Takoma Park Homes Hold Leaf Grit and Moisture',
    communities: 'Carroll Avenue Corridor and Tree Streets',
    process: 'Border-City Scheduling From Bethesda',
    offers: 'Takoma Park Flat Rates From Old Georgetown Rd',
    servicesIntro: 'Bungalows with add-on ducts — published packages after inspection.',
    communitiesIntro: 'Silver Spring and Hyattsville sit nearby; Takoma Park keeps its own notes.',
    processIntro: 'We ask about crawlspace returns and exterior dryer caps.',
  },
  kensington: {
    about: 'Connecticut Avenue Colonials and Street-Tree Pollen',
    services: 'Kensington Packages for Close-In Colonials',
    why: 'Why Kensington Basement Trunks Hold Spring Debris',
    communities: 'Connecticut Avenue and Neighborhood Courts',
    process: 'Short Bethesda Run Into Kensington',
    offers: 'Kensington Flat Rates From the Maryland Office',
    servicesIntro: 'Colonials with finished basements — flat-rate scopes.',
    communitiesIntro: 'Wheaton and Bethesda hub pages are nearby.',
    processIntro: 'Basement access and dryer terminations are on the intake list.',
  },
  olney: {
    about: 'Ramblers Farther Up County With Thick Canopy Seasons',
    services: 'Olney Packages for Ramblers and Split-Levels',
    why: 'Why Olney Finished Basements Collect Pollen Film',
    communities: 'Olney Mill, Norbeck Edge, and Local Courts',
    process: 'Longer Montgomery Drive — Scheduled Honestly',
    offers: 'Olney Rates With Realistic Bethesda Drive Time',
    servicesIntro: 'Ramblers and additions — published packages after a walk-through.',
    communitiesIntro: 'Further than Rockville; we say so and plan the day accordingly.',
    processIntro: 'Arrival windows include the extra drive from Bethesda.',
  },
  hyattsville: {
    about: 'Route 1 Arts-District Density and Humid Older Trunks',
    services: 'Hyattsville Packages for Row and Semi-Detached Homes',
    why: 'Why Route 1 Housing Mixes Humidity With Corridor Dust',
    communities: 'Route 1, Arts District Edge, and Neighborhood Grids',
    process: 'Prince George’s Timing From Bethesda',
    offers: 'Hyattsville Flat Rates From the Maryland Office',
    servicesIntro: 'Older trunks and compact footprints — flat rates after scope lock.',
    communitiesIntro: 'College Park and Takoma Park are neighboring pages.',
    processIntro: 'Street parking and unit access notes help the morning ETA.',
  },
  columbia: {
    about: 'Village Townhomes, Lake Paths, and HOA Dryer Chases',
    services: 'Columbia Packages for Village Townhomes',
    why: 'Why Columbia Villages Recirculate Lake-Season Film',
    communities: 'Village Clusters We Already Route Through',
    process: 'Howard County Drive From Bethesda — Planned',
    offers: 'Columbia Rates With Honest Travel Windows',
    servicesIntro: 'Townhome packages at published rates; longer drive disclosed up front.',
    communitiesIntro: 'Farther than Montgomery core; Ellicott City is the next Howard page.',
    processIntro: 'We schedule Columbia with realistic Bethesda-to-Howard timing.',
  },
  'ellicott-city': {
    about: 'Mill-Town Humidity, Flood History, and Old Cellars',
    services: 'Ellicott City Packages for Historic and Hillside Homes',
    why: 'Why Flood-Season Moisture Lingers in Older Ducts',
    communities: 'Historic Main Street Edge and Hillside Neighborhoods',
    process: 'Howard County Scheduling From Bethesda',
    offers: 'Ellicott City Flat Rates — Drive Time Included Honestly',
    servicesIntro: 'Historic and newer hillside homes — flat-rate packages after inspection.',
    communitiesIntro: 'Columbia is the sister Howard County page; both dispatch from Bethesda.',
    processIntro: 'Steep drives and cellar returns are noted when you book.',
  },
  frederick: {
    about: 'Downtown Brick Humidity Meets Newer Suburb Dust',
    services: 'Frederick Packages for Downtown and Urbana-Edge Homes',
    why: 'Why Frederick Jobs Need Honest I-270 Planning',
    communities: 'Downtown, North End, and Newer Southern Suburbs',
    process: 'Longest Regular Maryland Run From Bethesda',
    offers: 'Frederick Rates With Clear Drive Expectations',
    servicesIntro: 'Downtown brick and newer suburbs — published packages either way.',
    communitiesIntro: 'Farther than Clarksburg; we schedule Frederick deliberately.',
    processIntro: 'We will not hide the drive — arrival windows reflect it.',
  },
  'montgomery-village': {
    about: '1970s Planned Courts, Lake Edges, and Townhome Chases',
    services: 'Montgomery Village Packages for Townhomes',
    why: 'Why Village Townhomes Load Pollen and Old Closet Lint',
    communities: 'Village Centers and Lake-Adjacent Clusters',
    process: 'Between Gaithersburg and Germantown From Bethesda',
    offers: 'Montgomery Village Flat Rates From Bethesda',
    servicesIntro: 'Townhome dryer chases are the usual ask — flat rates apply.',
    communitiesIntro: 'Gaithersburg and Germantown pages sit on either side of this corridor.',
    processIntro: 'HOA gate notes keep the truck from circling the village.',
  },
  clarksburg: {
    about: 'New-Construction Dust Still Sitting in Young Trunks',
    services: 'Clarksburg Packages for New HOA Homes',
    why: 'Why Brand-New Clarksburg Houses Still Need Duct Attention',
    communities: 'Clarksburg Village and Nearby New Streets',
    process: 'North I-270 Dispatch From Bethesda',
    offers: 'Clarksburg Flat Rates After Builder Dust Settles',
    servicesIntro: 'Post-construction cleans and routine packages at published rates.',
    communitiesIntro: 'Germantown and Frederick are neighboring farther/closer pages.',
    processIntro: 'If drywall work is still active next door, we may suggest waiting.',
  },
}

const ORIGINAL_BLOGS = new Set([
  '7-signs-air-ducts-need-cleaning.json',
  'can-dirty-air-ducts-cause-allergies.json',
  'how-often-clean-air-ducts.json',
  'how-dirty-air-ducts-increase-energy-bills.json',
  'never-clean-air-ducts.json',
  'why-clean-dryer-vents.json',
])

/** Unsplash photo IDs (static CDN) — HVAC / home / dust / humidity themed, unique per blog */
const BLOG_UNSPLASH = {
  'reston-town-center-dust-air-ducts': '1558618666-fcd25c85f82e',
  'herndon-construction-dust-air-ducts': '1503387762-592deb58ef4e',
  'vienna-tree-pollen-basement-air-ducts': '1441974231531-c6227db76b6e',
  'great-falls-estates-humidity-air-ducts': '1600585154340-be6161a56a0c',
  'falls-church-close-in-dust-air-ducts': '1449824913935-59a10b8d2000',
  'chantilly-route-28-dust-air-ducts': '1486406146926-c627a92ad1ab',
  'oakton-123-pollen-air-ducts': '1416879595882-3373a0480b5b',
  'lorton-i95-occoquan-air-ducts': '1465447142022-9c0fcf5242b3',
  'mount-vernon-potomac-humidity-air-ducts': '1506905925346-21bda4d32df4',
  'fair-oaks-townhomes-dust-air-ducts': '1560518883-ce09059eeffa',
  'germantown-i270-townhome-air-ducts': '1570129477492-45c003edd2be',
  'potomac-tree-canopy-humidity-air-ducts': '1448375240586-882707db888b',
  'wheaton-urban-dust-air-ducts': '1514565131-fce0801e5785',
  'takoma-park-bungalow-humidity-air-ducts': '1564013799919-ab600027ffc6',
  'kensington-colonials-pollen-air-ducts': '1600596542815-ffad4c1539a9',
  'olney-rambler-pollen-air-ducts': '1600585154526-990dced4db0d',
  'hyattsville-route-1-humidity-air-ducts': '1494526631456-4b7e0cc3d990',
  'columbia-village-townhomes-air-ducts': '1600047509807-ba8f99d36708',
  'ellicott-city-flood-humidity-air-ducts': '1547036967-23d11aacaee0',
  'frederick-downtown-humidity-air-ducts': '1460317442991-0ec209397118',
  'montgomery-village-townhomes-air-ducts': '1605276374104-dee2a0ed3cd6',
  'clarksburg-new-construction-dust-air-ducts': '1504307651254-167b4db273ed',
  'fairfax-ramblers-pollen-air-ducts': '1600566753190-17f0baa2a6c3',
  'springfield-mixing-bowl-dust-air-ducts': '1494412574643-ff11b5a9d0b8',
  'loudoun-construction-dust-pollen-air-ducts': '1541888946425-d81bb19240f5',
  'prince-william-occoquan-humidity-air-ducts': '1439066618861-1dcefd0411ed',
  'silver-spring-brick-houses-urban-dust-air-ducts': '1600585154363-67bd8b1c0b0b',
  'gaithersburg-kentlands-basement-humidity-air-ducts': '1600210492486-724fe5c67fb0',
  'college-park-rentals-pollen-air-ducts': '1522708323590-d24dbb6b0267',
  'rockville-basement-humidity-air-ducts': '1600607687939-ce8a6c5397c3',
  'mclean-tree-pollen-basement-humidity': '1501594907352-04cda38ebc9e',
  'dc-humidity-row-houses-indoor-air': '1555881403-64995e3e1418',
  'how-potomac-humidity-affects-arlington-air-quality': '1477959861153-0e2ebb0b6d0a',
  'how-potomac-humidity-affects-alexandria-air-quality': '1505142468610-359e7d316be0',
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    const lib = url.startsWith('https') ? https : http
    const req = lib.get(
      url,
      {
        headers: {
          'User-Agent': 'amazonadc-hero-fetch/1.0',
          Accept: 'image/*',
        },
        timeout: 60000,
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close()
          fs.unlinkSync(dest)
          return download(res.headers.location, dest).then(resolve, reject)
        }
        if (res.statusCode !== 200) {
          file.close()
          fs.unlinkSync(dest)
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`))
        }
        res.pipe(file)
        file.on('finish', () => file.close(() => resolve(dest)))
      },
    )
    req.on('error', (err) => {
      try {
        fs.unlinkSync(dest)
      } catch {}
      reject(err)
    })
  })
}

async function ensureBlogHeroes() {
  fs.mkdirSync(HERO_DIR, { recursive: true })
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.warn('sharp unavailable — saving originals only')
  }

  for (const [slug, photoId] of Object.entries(BLOG_UNSPLASH)) {
    const destWebp = path.join(HERO_DIR, `${slug}.webp`)
    const destJpg = path.join(HERO_DIR, `${slug}.jpg`)
    if (fs.existsSync(destWebp) && fs.statSync(destWebp).size > 5000) {
      console.log('hero exists', slug)
      continue
    }
    const url = `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1600&h=900&q=80`
    try {
      await download(url, destJpg)
      if (sharp) {
        await sharp(destJpg)
          .rotate()
          .resize(1600, 900, { fit: 'cover', position: 'centre' })
          .webp({ quality: 82 })
          .toFile(destWebp)
        fs.unlinkSync(destJpg)
      } else {
        fs.renameSync(destJpg, destWebp.replace(/\.webp$/, '.jpg'))
      }
      console.log('hero fetched', slug)
    } catch (err) {
      console.warn('unsplash fail', slug, err.message)
      // picsum fallback — unique seed per slug, not a city street photo
      const seed = [...slug].reduce((h, c) => (h * 33 + c.charCodeAt(0)) >>> 0, 7)
      const fallback = `https://picsum.photos/seed/${seed}/1600/900`
      try {
        await download(fallback, destJpg)
        if (sharp) {
          await sharp(destJpg)
            .resize(1600, 900, { fit: 'cover' })
            .modulate({ saturation: 0.85, brightness: 0.95 })
            .webp({ quality: 80 })
            .toFile(destWebp)
          fs.unlinkSync(destJpg)
        }
        console.log('hero picsum', slug)
      } catch (err2) {
        console.warn('hero fail', slug, err2.message)
      }
    }
  }
}

function rewriteLocations() {
  for (const file of fs.readdirSync(LOC_DIR).filter((f) => f.endsWith('.ts'))) {
    const p = path.join(LOC_DIR, file)
    let src = fs.readFileSync(p, 'utf8')
    const slug = extract(src, 'slug')
    const pack = CITY[slug]
    if (!pack) {
      console.warn('no pack', slug)
      continue
    }
    src = setNestedHeading(src, 'about', pack.about)
    src = setNestedHeading(src, 'services', pack.services)
    src = setNestedIntro(src, 'services', pack.servicesIntro)
    src = setNestedHeading(src, 'why', pack.why)
    src = setNestedHeading(src, 'communities', pack.communities)
    src = setNestedIntro(src, 'communities', pack.communitiesIntro)
    src = setNestedHeading(src, 'process', pack.process)
    src = setNestedIntro(src, 'process', pack.processIntro)
    src = setQuotedField(src, 'offersTitle', pack.offers)
    fs.writeFileSync(p, src)
    console.log('city h2', slug)
  }
}

function rewriteBlogs() {
  for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.json') && f !== 'index.json')) {
    const p = path.join(BLOG_DIR, file)
    const post = JSON.parse(fs.readFileSync(p, 'utf8'))
    if (ORIGINAL_BLOGS.has(file)) {
      // keep dedicated originals; ensure not pointing at locations/
      if (String(post.heroImage || '').includes('/locations/')) {
        console.warn('original blog had location image', file)
      }
      continue
    }
    const slug = post.slug || file.replace(/\.json$/, '')
    const webp = `/img/blog/heroes/${slug}.webp`
    const abs = path.join(ROOT, 'public', webp.replace(/^\//, ''))
    const jpg = abs.replace(/\.webp$/, '.jpg')
    if (fs.existsSync(abs)) post.heroImage = webp
    else if (fs.existsSync(jpg)) post.heroImage = webp.replace(/\.webp$/, '.jpg')
    else console.warn('missing hero file for', slug)

    // Vary FAQ heading-like first section titles already unique; strip location photo refs in body images if any
    if (Array.isArray(post.sections)) {
      for (const section of post.sections) {
        if (section.image && String(section.image).includes('/locations/')) {
          section.image = '/img/blog/clogged-dryer-vent-lint.webp'
        }
      }
    }
    fs.writeFileSync(p, JSON.stringify(post, null, 2) + '\n')
    console.log('blog hero', slug, post.heroImage)
  }

  const indexPath = path.join(BLOG_DIR, 'index.json')
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'))
  for (const row of index) {
    const full = path.join(BLOG_DIR, `${row.slug}.json`)
    if (!fs.existsSync(full)) continue
    const post = JSON.parse(fs.readFileSync(full, 'utf8'))
    row.title = post.title
    row.description = post.description
    row.hero = post.heroImage
  }
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n')
}

function patchFaqHeadings() {
  // Make FAQ H2 less uniform via sectionSeeds — done in code file separately
}

async function main() {
  rewriteLocations()
  await ensureBlogHeroes()
  rewriteBlogs()
  console.log('done')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
