/**
 * Rewrite location FAQ + process blocks so no answer/step is shared across 3+ cities.
 * Preserves everything outside those blocks. Run: node scripts/uniquify-location-faq-process.cjs
 */
const fs = require('fs')
const path = require('path')

const DIR = path.join(__dirname, '..', 'src/content/locations')

const PHONE = { burke: '(571) 460-0001', bethesda: '(301) 809-4544' }

function extract(src, key) {
  const m = src.match(new RegExp(`${key}:\\s*'([^']*)'`))
  return m ? m[1] : ''
}

function hash(s) {
  let h = 0
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0
  return Math.abs(h)
}

function buildFaq(city, state, office, phone, slug, h) {
  const condoish = /arlington|reston|alexandria|silver-spring|bethesda|washington-dc|college-park/.test(slug)
  const newBuild = /clarksburg|germantown|loudoun|chantilly|fair-oaks|herndon/.test(slug)
  const far = /frederick|olney|ellicott-city|columbia|loudoun|prince-william|lorton/.test(slug)
  const items = []

  const whoQs = [
    `Which office books jobs for ${city}?`,
    `Who dispatches the crew to ${city}, ${state}?`,
    `Where does the ${city} appointment leave from?`,
  ]
  items.push({
    q: whoQs[h % 3],
    a: office === 'Burke'
      ? `${city} appointments leave from our Burke, VA office at 5641 Burke Centre Pkwy Ste 119. Call ${phone} for air duct or dryer vent cleaning.`
      : `${city} appointments leave from our Bethesda, MD office at 7815A Old Georgetown Rd Ste 201. Call ${phone} for air duct or dryer vent cleaning.`,
  })

  const prepQs = [
    `What access do you need before arrival?`,
    `How should I prep the house for the visit?`,
    `Anything to clear before the crew shows up?`,
  ]
  const prep = [
    `Clear a path to the air handler and dryer — ${condoish ? 'condo/townhome closets and stacked laundry especially' : 'basement trunks and dryer closets especially'}. Share gate or parking notes if your ${city} street needs them.`,
    `Open access to returns and the dryer, move fragile items near vents, and mention pets or recent renovations when you book at ${phone}.`,
    `We need clear runs to the air handler${newBuild ? ' and any unfinished spaces still shedding construction dust' : ''} in this ${state} home. Note HOA codes on the confirmation text.`,
  ][h % 3]
  items.push({ q: prepQs[h % 3], a: prep })

  const durQs = [
    `How long is a typical visit?`,
    `How much time should I block on the calendar?`,
    `What is a realistic job length for one system?`,
  ]
  const dur = [
    `Most single-system houses in ${city} finish in about 2–3 hours. ${condoish ? 'High-rise dryer risers and long laundry closets can add time after inspection.' : newBuild ? 'Newer builds with long dryer runs sometimes run longer once we see the layout.' : 'Older trunks with additions can add time after inspection.'}`,
    `Plan on roughly half a morning. ${far ? 'Arrival windows already reflect the drive from ' + office + '.' : 'Same-day dryer vent add-ons are often possible if booked together.'}`,
    `One system usually takes 2–3 hours. Multi-system or heavily packed dryer vents are scoped before we start so the quote stays locked.`,
  ][h % 3]
  items.push({ q: durQs[h % 3], a: dur })

  const priceQs = [
    `Is pricing flat-rate or by the vent?`,
    `How does the quote work for this address?`,
    `Will the price change once equipment is out?`,
  ]
  items.push({
    q: priceQs[h % 3],
    a: [
      `Residential packages for ${city} are flat-rate from the ${office} office. We scope the system during the walkthrough, confirm the number before equipment starts, and that is what you pay — no per-vent counting.`,
      `For this ${city}, ${state} address we quote a flat residential package from ${office}. Scoped on the walkthrough, locked before we unload — not priced by counting vents.`,
      `The ${office} crew prices ${city} jobs as published flat-rate packages. Walkthrough first, confirmed number second, then equipment — no vent-counting surprises.`,
    ][h % 3],
  })

  if (h % 2 === 0) {
    items.push({
      q: [
        `Can ducts and the dryer vent be done in one visit?`,
        `Do you combine duct and dryer cleaning on the same day?`,
      ][h % 2],
      a: [
        `Yes — book the combined package or both services up front. Call ${phone} and we stage the ${office} crew for one stop on your ${city} street.`,
        `Same-day combined visits are normal when both services are on the ticket. Call ${phone}; the ${office} team brings duct and dryer tools together.`,
      ][h % 2],
    })
  } else {
    items.push({
      q: [
        `Is antimicrobial sanitizing included?`,
        `Do you charge extra for Envirocon sanitizing?`,
      ][(h >> 1) % 2],
      a: [
        `On ${city} jobs, Envirocon antimicrobial sanitizing is complimentary when you request it or when inspection supports it — we confirm on site before applying anything.`,
        `No upcharge for Envirocon when requested or when the ${city} inspection supports it. We never spray without confirming with you first.`,
      ][(h >> 1) % 2],
    })
  }

  if (far || h % 3 === 1) {
    items.push({
      q: [
        `How far ahead should I book?`,
        `When should I call for the next opening?`,
      ][h % 2],
      a: far
        ? `${city} is a longer run from ${office}. Booking several days ahead keeps arrival windows realistic; call ${phone} for the next open slot.`
        : `Peak pollen and summer humidity fill the calendar fast. Same-week openings are common — call ${phone} for the next ${office} window.`,
    })
  }

  return items
}

function buildProcess(city, state, office, phone, slug, h) {
  const condoish = /arlington|reston|alexandria|silver-spring|bethesda|washington-dc|college-park/.test(slug)
  const newBuild = /clarksburg|germantown|loudoun|chantilly|fair-oaks|herndon/.test(slug)
  const estate = /great-falls|potomac|mclean|mount-vernon/.test(slug)
  const housing = condoish
    ? `condo / stacked-laundry layouts common around ${city}`
    : estate
      ? `long dryer runs on larger ${city} lots`
      : `basement or attic air-handler access typical in ${city}`
  const variants = [
    [
      {
        title: 'Walkthrough and quote',
        text: `We ask about pets, renovations, and ${housing} before locking a flat-rate number for this ${state} address.`,
      },
      {
        title: 'Arrival window',
        text: `Morning-of text with a realistic ETA from the ${office} office to your street.`,
      },
      {
        title: 'Agree the package',
        text: `Ducts, dryer vent, or both — scoped on site, quoted before equipment starts, paid after you are satisfied.`,
      },
      {
        title: 'HEPA source-removal cleaning',
        text: `${newBuild ? 'We agitate construction fines plus household dust' : 'We agitate and vacuum supplies, returns, and registers'} under negative pressure so debris leaves in the vacuum.`,
      },
      {
        title: 'Photos and handoff',
        text: `Before/after photos, filter tips, and a dryer-vent interval that fits ${city} pollen and humidity seasons. Questions go to ${phone}.`,
      },
    ],
    [
      {
        title: 'Inspect access and dryer path',
        text: `We walk returns and the dryer run typical of ${city} housing so nothing is surprise-priced later.`,
      },
      {
        title: 'Stage the right equipment',
        text: `Tight ${city} streets get portable HEPA; larger lots may use truck-mounted vacuum when access allows.`,
      },
      {
        title: 'Clean ducts end to end',
        text: `Rotary brushes plus negative-pressure vacuum through the trunks serving this home.`,
      },
      {
        title: 'Clear the dryer run',
        text: `Full-length brushing to the exterior cap when dryer service is on the ticket.`,
      },
      {
        title: 'Final walk-through',
        text: `Review photos together and leave booking notes for ${phone} if you want a follow-up.`,
      },
    ],
    [
      {
        title: 'Book from the office line',
        text: `Call ${phone} or use the form — we confirm availability for ${city} the next business day from ${office}.`,
      },
      {
        title: 'Protect floors and living spaces',
        text: `We cover work paths and keep rooms clear while equipment runs.`,
      },
      {
        title: 'Source-removal cleaning',
        text: `Source-removal agitation under HEPA negative pressure — dust leaves in the vacuum, not your rooms.`,
      },
      {
        title: 'Optional sanitizing',
        text: `Complimentary Envirocon spray when you request it or when inspection supports it on this job.`,
      },
      {
        title: 'Close out the visit',
        text: `Photos on file, flat-rate invoice, and seasonal tips for ${city}.`,
      },
    ],
  ]
  return variants[h % 3]
}

function replaceBlock(src, key, newLiteral) {
  // Match key: { ... }, at top level of export object — non-greedy with brace counting
  const startRe = new RegExp(`(\\n  ${key}: )\\{`)
  const m = startRe.exec(src)
  if (!m) throw new Error(`block not found: ${key}`)
  const start = m.index + m[1].length
  let i = start
  let depth = 0
  for (; i < src.length; i++) {
    const ch = src[i]
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) {
        i++
        break
      }
    }
  }
  return src.slice(0, start) + newLiteral + src.slice(i)
}

function faqLiteral(items, faqIntro) {
  const lines = items
    .map(
      (it) => `    {\n      q: '${it.q.replace(/'/g, "\\'")}',\n      a: '${it.a.replace(/'/g, "\\'")}',\n    }`,
    )
    .join(',\n')
  // faqIntro is separate field — we only replace faq array content... actually we replace whole faq: [...]
  return `[\n${lines},\n  ]`
}

function processLiteral(steps) {
  const lines = steps
    .map(
      (s) =>
        `      {\n        title: '${s.title.replace(/'/g, "\\'")}',\n        text: '${s.text.replace(/'/g, "\\'")}',\n      }`,
    )
    .join(',\n')
  // Need full process object
  return null
}

let n = 0
for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith('.ts'))) {
  const fp = path.join(DIR, file)
  let src = fs.readFileSync(fp, 'utf8')
  const city = extract(src, 'city') || file.replace(/\.ts$/, '')
  const state = extract(src, 'state') || 'VA'
  const servedBy = extract(src, 'servedBy') || 'burke'
  const office = servedBy === 'bethesda' ? 'Bethesda' : 'Burke'
  const phone = PHONE[servedBy] || PHONE.burke
  const slug = extract(src, 'slug') || file.replace(/\.ts$/, '')
  const h = hash(slug)

  const faqItems = buildFaq(city, state, office, phone, slug, h)
  const faqIntro = `${city} questions — call ${phone} (dispatch: ${office}).`
  const faqBlock = `[\n${faqItems
    .map((it) => `    {\n      q: '${it.q.replace(/'/g, "\\'")}',\n      a: '${it.a.replace(/'/g, "\\'")}',\n    }`)
    .join(',\n')},\n  ]`

  // Replace faqIntro string
  src = src.replace(/faqIntro:\s*'[^']*'/, `faqIntro: '${faqIntro.replace(/'/g, "\\'")}'`)

  // Replace faq array with brace matching from "faq: ["
  const faqStart = src.search(/\n  faq: \[/)
  if (faqStart < 0) throw new Error(`faq not found in ${file}`)
  const arrStart = src.indexOf('[', faqStart)
  let depth = 0
  let arrEnd = arrStart
  for (let i = arrStart; i < src.length; i++) {
    if (src[i] === '[') depth++
    else if (src[i] === ']') {
      depth--
      if (depth === 0) {
        arrEnd = i + 1
        break
      }
    }
  }
  src = src.slice(0, arrStart) + faqBlock + src.slice(arrEnd)

  // Replace process.steps array inside process: { ... steps: [ ... ] }
  const steps = buildProcess(city, state, office, phone, slug, h)
  const stepsLit = `[\n${steps
    .map(
      (s) =>
        `      {\n        title: '${s.title.replace(/'/g, "\\'")}',\n        text: '${s.text.replace(/'/g, "\\'")}',\n      }`,
    )
    .join(',\n')},\n    ]`

  const processIdx = src.search(/\n  process: \{/)
  if (processIdx < 0) throw new Error(`process not found in ${file}`)
  const stepsKey = src.indexOf('steps:', processIdx)
  const stepsArrStart = src.indexOf('[', stepsKey)
  depth = 0
  let stepsArrEnd = stepsArrStart
  for (let i = stepsArrStart; i < src.length; i++) {
    if (src[i] === '[') depth++
    else if (src[i] === ']') {
      depth--
      if (depth === 0) {
        stepsArrEnd = i + 1
        break
      }
    }
  }
  src = src.slice(0, stepsArrStart) + stepsLit + src.slice(stepsArrEnd)

  // Unique process intro line lightly
  const intros = [
    `Arrival windows reflect the drive from ${office}.`,
    `Same flat-rate flow we use across ${state} — scoped for ${city} housing.`,
    `From booking at ${phone} to photos at the door.`,
  ]
  src = src.replace(/(process: \{[\s\S]*?intro: ')([^']*)(')/, `$1${intros[h % 3].replace(/'/g, "\\'")}$3`)

  fs.writeFileSync(fp, src)
  n++
  console.log('updated', file)
}
console.log('done', n)

// uniqueness audit
const answers = new Map()
for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith('.ts'))) {
  const src = fs.readFileSync(path.join(DIR, file), 'utf8')
  for (const m of src.matchAll(/a: '([^']+)'/g)) {
    const a = m[1]
    if (!answers.has(a)) answers.set(a, [])
    answers.get(a).push(file)
  }
}
const dups = [...answers.entries()].filter(([, files]) => files.length >= 3)
console.log('FAQ answers shared by 3+ cities:', dups.length)
if (dups.length) dups.slice(0, 5).forEach(([a, files]) => console.log(files.length, a.slice(0, 60), files.slice(0, 3).join(',')))
