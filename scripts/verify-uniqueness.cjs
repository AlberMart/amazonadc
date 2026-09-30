const fs = require('fs')
const path = require('path')

const locDir = path.join(__dirname, '../src/content/locations')
const blogDir = path.join(__dirname, '../src/content/blog')
const heroDir = path.join(__dirname, '../public/img/blog/heroes')

function heading(src, parent) {
  const re = new RegExp(`${parent}:\\s*\\{[\\s\\S]*?\\n\\s*heading:\\s*(?:"([^"]+)"|'([^']+)')`)
  const m = src.match(re)
  return m ? m[1] || m[2] : null
}

const about = new Map()
const services = new Map()
let ourServices = 0

for (const f of fs.readdirSync(locDir).filter((x) => x.endsWith('.ts'))) {
  const s = fs.readFileSync(path.join(locDir, f), 'utf8')
  const a = heading(s, 'about')
  const sv = heading(s, 'services')
  if (a) about.set(a, (about.get(a) || []).concat(f))
  if (sv) {
    if (sv.startsWith('Our Services in')) ourServices++
    services.set(sv, (services.get(sv) || []).concat(f))
  }
}

let locHero = 0
const locHeroList = []
for (const f of fs.readdirSync(blogDir).filter((x) => x.endsWith('.json') && x !== 'index.json')) {
  const j = JSON.parse(fs.readFileSync(path.join(blogDir, f), 'utf8'))
  if (String(j.heroImage || '').includes('/locations/')) {
    locHero++
    locHeroList.push(`${j.slug} -> ${j.heroImage}`)
  }
}

const heroes = fs.existsSync(heroDir)
  ? fs.readdirSync(heroDir).filter((x) => x.endsWith('.webp')).length
  : 0

console.log(
  JSON.stringify(
    {
      cities: fs.readdirSync(locDir).filter((x) => x.endsWith('.ts')).length,
      uniqueAbout: about.size,
      dupAbout: [...about].filter(([, v]) => v.length > 1).map(([k, v]) => ({ k, v })),
      ourServicesLeft: ourServices,
      uniqueServices: services.size,
      locHeroRemaining: locHero,
      locHeroList,
      heroWebp: heroes,
    },
    null,
    2,
  ),
)
