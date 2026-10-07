const fs = require('fs')
const path = require('path')

/** Human-searchable blog titles — keep local color without keyword stuffing. */
const BLOGS = {
  'chantilly-route-28-dust-air-ducts': {
    title: 'Why Chantilly and Sully Station Homes Still Blow Construction Dust',
    headline: 'Why Chantilly and Sully Station Homes Still Blow Construction Dust',
  },
  'clarksburg-new-construction-dust-air-ducts': {
    title: 'Why New Clarksburg Homes Often Need a First Duct Cleaning',
    headline: 'Why New Clarksburg Homes Often Need a First Duct Cleaning',
  },
  'loudoun-construction-dust-pollen-air-ducts': {
    title: 'Ashburn Construction Dust vs Leesburg Basement Humidity',
    headline: 'Ashburn Construction Dust vs Leesburg Basement Humidity',
  },
  'montgomery-village-townhomes-air-ducts': {
    title: 'Why Montgomery Village Townhome Ducts Load Up Over Time',
    headline: 'Why Montgomery Village Townhome Ducts Load Up Over Time',
  },
  'lorton-i95-occoquan-air-ducts': {
    title: 'How I-95 Dust and Occoquan Humidity Affect Lorton Ducts',
    headline: 'How I-95 Dust and Occoquan Humidity Affect Lorton Ducts',
  },
  'hyattsville-route-1-humidity-air-ducts': {
    title: 'Renovation Dust and Humidity in Hyattsville Air Ducts',
    headline: 'Renovation Dust and Humidity in Hyattsville Air Ducts',
  },
  'ellicott-city-flood-humidity-air-ducts': {
    title: 'Flood Humidity and Air Ducts in Ellicott City',
    headline: 'Flood Humidity and Air Ducts in Ellicott City',
  },
  'germantown-i270-townhome-air-ducts': {
    title: 'Germantown Townhome Closets and I-270 Corridor Dust',
    headline: 'Germantown Townhome Closets and I-270 Corridor Dust',
  },
  'great-falls-estates-humidity-air-ducts': {
    title: 'Long Dryer Runs and Humid Basements in Great Falls Homes',
    headline: 'Long Dryer Runs and Humid Basements in Great Falls Homes',
  },
  'columbia-village-townhomes-air-ducts': {
    title: 'Columbia Village Townhomes and Humid Dryer Closets',
    headline: 'Columbia Village Townhomes and Humid Dryer Closets',
  },
}

const blogDir = path.join('src', 'content', 'blog')
const indexPath = path.join(blogDir, 'index.json')
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'))

for (const [slug, upd] of Object.entries(BLOGS)) {
  const file = path.join(blogDir, `${slug}.json`)
  const doc = JSON.parse(fs.readFileSync(file, 'utf8'))
  doc.title = upd.title
  doc.headline = upd.headline
  fs.writeFileSync(file, JSON.stringify(doc, null, 2) + '\n')
  const row = index.find((item) => item.slug === slug)
  if (row) {
    row.title = upd.title
    // keep description; only title for listing
  }
  console.log('blog', slug)
}

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n')
console.log('index updated')
