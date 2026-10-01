/**
 * Safe per-line location SEO fixes (no cross-line regex).
 * Run: node scripts/seo-fix-locations-safe.cjs
 */
const fs = require('fs')
const path = require('path')

const LOC_DIR = path.join(__dirname, '..', 'src/content/locations')

const OFFICE_PHONE = {
  burke: '(571) 460-0001',
  bethesda: '(301) 809-4544',
}

function fixLine(line, phone) {
  let s = line
  s = s.replace(/\(800\)\s*606-3334/g, phone)
  s = s.replace(/For background reading \(not a booking page\), see /gi, 'More on ')
  s = s.replace(/For the climate background \(not a booking page\), read /gi, 'More on ')
  s = s.replace(/\[([a-z0-9]+(?:-[a-z0-9]+)+)\]\((\/blog\/[^)]+)\)/g, (_, slug, url) => {
    const label = slug
      .replace(/-air-ducts?$/i, '')
      .split('-')
      .map((w) => {
        if (w === 'dc') return 'DC'
        if (w === 'i270') return 'I-270'
        if (w === 'i95') return 'I-95'
        return w.charAt(0).toUpperCase() + w.slice(1)
      })
      .join(' ')
    return `[${label}](${url})`
  })
  s = s.replace(/The drive is honest:\s*/gi, '')
  s = s.replace(/ — honest farther I-270 drive/gi, '')
  s = s.replace(/ — honest Howard County drive/gi, '')
  s = s.replace(/honest farther I-270 drive/gi, 'farther I-270 drive')
  s = s.replace(/honest Howard County drive/gi, 'Howard County drive')
  s = s.replace(/honest drive times/gi, 'realistic drive times')
  s = s.replace(/with honest travel time/gi, 'with stated travel time')
  s = s.replace(/Just honest, flat-rate/gi, 'Clear flat-rate')
  s = s.replace(/and honest flat-rate/gi, 'and flat-rate')
  s = s.replace(/Scheduled Honestly/gi, 'Scheduled With Clear Windows')
  s = s.replace(/Need Honest I-270 Planning/gi, 'Need Clear I-270 Planning')
  s = s.replace(/ — not a rented [^.']+suite\.?/gi, '.')
  s = s.replace(/, not a rented [^.']+suite\.?/gi, '.')
  s = s.replace(/That is a real office at ([^,]+), not a [^.']+suite we do not staff\.?/gi, 'Dispatch is from our office at $1.')
  s = s.replace(/That office is a short drive, not a fiction\.?/gi, 'That office is a short drive away.')
  s = s.replace(/ and a farther I-270 drive we will not hide\.?/gi, '.')
  s = s.replace(/We will not hide the drive — /gi, '')
  s = s.replace(/ — not chimney sweeping or standalone [“"]HVAC unit rebuild[”"] marketing\.?/gi, '.')
  s = s.replace(/verify the address on Google Maps\.?/gi, '')
  s = s.replace(/, not separate city sites\.?/gi, '.')
  s = s.replace(/ not separate city sites\.?/gi, '.')
  s = s.replace(/, not its own page\.?/gi, '.')
  s = s.replace(/ not its own page\.?/gi, '.')
  s = s.replace(/is a community we already drive\.?/gi, 'is covered on this route.')
  s = s.replace(/is a neighborhood we already pass on the drive\.?/gi, 'is on the same drive.')
  s = s.replace(/the same flat-rate crew with flat-rate packages from the Burke crew/gi, 'the Burke crew and the same flat-rate packages')
  s = s.replace(/\[Chevy Chase area via Bethesda\]/g, '[Chevy Chase](/locations/bethesda)')
  s = s.replace(/ \., /g, '. ')
  s = s.replace(/,\s*\./g, '.')
  // Fix dangling "We serve X from Y. farther" after removing "The drive is honest:"
  s = s.replace(/\. farther than/gi, '. Farther than')
  return s
}

let count = 0
for (const f of fs.readdirSync(LOC_DIR)) {
  if (!f.endsWith('.ts')) continue
  const fp = path.join(LOC_DIR, f)
  const src = fs.readFileSync(fp, 'utf8')
  const servedBy = (src.match(/servedBy:\s*'([^']+)'/) || [])[1] || 'burke'
  const phone = OFFICE_PHONE[servedBy] || OFFICE_PHONE.burke
  const out = src
    .split(/\r?\n/)
    .map((line) => fixLine(line, phone))
    .join('\n')
  if (out !== src) {
    fs.writeFileSync(fp, out)
    count++
  }
}
console.log('location files updated:', count)

// sanity: braces
for (const f of fs.readdirSync(LOC_DIR)) {
  if (!f.endsWith('.ts')) continue
  const c = fs.readFileSync(path.join(LOC_DIR, f), 'utf8')
  const open = (c.match(/\{/g) || []).length
  const close = (c.match(/\}/g) || []).length
  if (open !== close) console.error('BRACE MISMATCH', f, open, close)
  if (/highlights:\s*\[[\s\S]*?items:\s*\[/.test(c) && !/highlights:[\s\S]*?\],[\s\S]*?services:/.test(c)) {
    console.error('HIGHLIGHTS BROKEN?', f)
  }
}
console.log('sanity done')
