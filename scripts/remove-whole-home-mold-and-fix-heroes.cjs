/**
 * Remove Whole-Home / mold-remediation-house everywhere + fix duplicate blog heroes.
 * Run: node scripts/remove-whole-home-mold-and-fix-heroes.cjs
 */
const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')

const ROOT = path.join(__dirname, '..')
const LOC_DIR = path.join(ROOT, 'src/content/locations')
const HERO_DIR = path.join(ROOT, 'public/img/blog/heroes')

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    const lib = url.startsWith('https') ? https : http
    const req = lib.get(
      url,
      {
        headers: { 'User-Agent': 'amazonadc-hero-fetch/1.0', Accept: 'image/*' },
        timeout: 60000,
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close()
          try {
            fs.unlinkSync(dest)
          } catch {}
          return download(res.headers.location, dest).then(resolve, reject)
        }
        if (res.statusCode !== 200) {
          file.close()
          try {
            fs.unlinkSync(dest)
          } catch {}
          return reject(new Error(`HTTP ${res.statusCode}`))
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

function stripWholeHomeFromLocation(src) {
  // Remove Whole-Home Mold Remediation service card objects (multiline)
  let out = src.replace(
    /,?\s*\{\s*\n\s*title:\s*['"]Whole-Home Mold Remediation['"],\s*\n\s*text:\s*['"][\s\S]*?['"],?\s*\n\s*\}/g,
    '',
  )

  // FAQ answers mentioning whole-home
  out = out.replace(
    /ventilation mold treatment, and whole-home mold remediation when needed/g,
    'and ventilation mold treatment when needed',
  )
  out = out.replace(
    /and mold treatment for ventilation or whole-home jobs/g,
    'and ventilation mold treatment',
  )
  out = out.replace(
    /whole-home mold remediation and HVAC ventilation mold treatment/g,
    'HVAC ventilation mold treatment',
  )
  out = out.replace(
    /two services built for that climate: HVAC ventilation mold treatment/g,
    'ventilation mold treatment built for that climate',
  )
  out = out.replace(/\[mold remediation for your home\]\(\/mold-remediation-house\)/g, '')
  out = out.replace(/See \./g, '')
  out = out.replace(/  \./g, ' ')
  out = out.replace(/whole-home mold remediation/gi, 'ventilation mold treatment')
  out = out.replace(/Whole-Home Mold Remediation/g, 'Ventilation Mold Treatment')
  out = out.replace(/\/mold-remediation-house/g, '/mold-remediation-air-ducts')

  // Clean trailing double spaces / awkward punctuation from removals
  out = out.replace(/  +/g, ' ')
  out = out.replace(/ \./g, '.')
  out = out.replace(/\.\./g, '.')

  return out
}

function cleanLocations() {
  for (const file of fs.readdirSync(LOC_DIR).filter((f) => f.endsWith('.ts'))) {
    const p = path.join(LOC_DIR, file)
    const before = fs.readFileSync(p, 'utf8')
    const after = stripWholeHomeFromLocation(before)
    if (after !== before) {
      fs.writeFileSync(p, after)
      console.log('cleaned location', file)
    }
  }
}

function cleanAirDuctsMoldFaq() {
  const p = path.join(ROOT, 'src/content/services/mold-remediation-air-ducts.ts')
  let src = fs.readFileSync(p, 'utf8')
  src = src.replace(
    /For growth beyond the ductwork, see \[mold remediation for your home\]\(\/mold-remediation-house\)\. /,
    '',
  )
  fs.writeFileSync(p, src)
  console.log('cleaned mold-remediation-air-ducts FAQ')
}

function cleanSeed() {
  const p = path.join(ROOT, 'src/seed/amazonadc.ts')
  let src = fs.readFileSync(p, 'utf8')
  src = src.replace(
    /import \{ moldRemediationHouse \} from '@\/content\/services\/mold-remediation-house'\r?\n/,
    '',
  )
  src = src.replace(
    /\s*customNav\('Mold Remediation for Your Home', '\/mold-remediation-house'\),\r?\n/,
    '\n',
  )
  src = src.replace(/\s*'mold-remediation-house': '\/img\/Amazon\.webp',\r?\n/, '\n')
  src = src.replace(/\s*mapService\(moldRemediationHouse\),\r?\n/, '\n')
  fs.writeFileSync(p, src)
  console.log('cleaned seed amazonadc.ts')
}

function deleteHouseServiceFile() {
  const p = path.join(ROOT, 'src/content/services/mold-remediation-house.ts')
  if (fs.existsSync(p)) {
    fs.unlinkSync(p)
    console.log('deleted mold-remediation-house.ts')
  }
}

function patchSeedRunDelete() {
  const p = path.join(ROOT, 'src/seed/run.ts')
  let src = fs.readFileSync(p, 'utf8')
  if (src.includes("slug: 'mold-remediation-house'")) {
    console.log('seed run already deletes mold-remediation-house')
    return
  }
  const marker = '  for (const service of servicesSeed) {'
  if (!src.includes(marker)) throw new Error('seed run marker missing')
  const inject = `  // Removed service — delete leftover CMS rows so seed never resurrects it
  {
    const dead = await payload.find({
      collection: 'services',
      where: { slug: { equals: 'mold-remediation-house' } },
      limit: 10,
      overrideAccess: true,
    })
    for (const doc of dead.docs) {
      await payload.delete({ collection: 'services', id: doc.id, context })
      console.log('deleted', 'services', 'mold-remediation-house')
    }
  }

`
  src = src.replace(marker, inject + marker)
  fs.writeFileSync(p, src)
  console.log('patched seed run to delete mold-remediation-house')
}

async function fixDuplicateHeroes() {
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    sharp = null
  }

  // Distinct Unsplash IDs — brick urban vs lakeside planned community
  const jobs = [
    {
      slug: 'silver-spring-brick-houses-urban-dust-air-ducts',
      // brick urban street / city grit
      urls: [
        'https://images.unsplash.com/photo-1449844908441-882987f99aa1?auto=format&fit=crop&w=1600&h=900&q=80',
        'https://picsum.photos/seed/silverspringbrick99/1600/900',
      ],
    },
    {
      slug: 'columbia-village-townhomes-air-ducts',
      // lakeside / suburban planned paths
      urls: [
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&h=900&q=80',
        'https://picsum.photos/seed/columbiawilde88/1600/900',
      ],
    },
  ]

  for (const job of jobs) {
    const destWebp = path.join(HERO_DIR, `${job.slug}.webp`)
    const destJpg = path.join(HERO_DIR, `${job.slug}.jpg`)
    let ok = false
    for (const url of job.urls) {
      try {
        await download(url, destJpg)
        if (sharp) {
          await sharp(destJpg)
            .rotate()
            .resize(1600, 900, { fit: 'cover', position: 'centre' })
            .webp({ quality: 82 })
            .toFile(destWebp)
          fs.unlinkSync(destJpg)
        }
        console.log('hero ok', job.slug, url.slice(0, 60))
        ok = true
        break
      } catch (err) {
        console.warn('hero fail', job.slug, err.message)
      }
    }
    if (!ok) console.error('ALL failed for', job.slug)
  }
}

async function main() {
  cleanLocations()
  cleanAirDuctsMoldFaq()
  cleanSeed()
  deleteHouseServiceFile()
  patchSeedRunDelete()
  await fixDuplicateHeroes()

  // Verify no leftover house slug in src (except seed delete + this script)
  const { execSync } = require('child_process')
  try {
    const out = execSync(
      'rg -n "mold-remediation-house|Whole-Home Mold|Mold Remediation for Your Home" src --glob "!**/remove-whole-home*"',
      { cwd: ROOT, encoding: 'utf8' },
    )
    console.log('REMAINING REFERENCES:\n' + out)
  } catch (e) {
    if (e.status === 1) console.log('verify: no remaining house-mold refs in src')
    else console.log(e.stdout || e.message)
  }
  console.log('done')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
