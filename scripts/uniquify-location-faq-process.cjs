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

  items.push({
    q: `Who handles air duct cleaning appointments in ${city}?`,
    a: office === 'Burke'
      ? `${city} jobs leave from our Burke, VA office at 5641 Burke Centre Pkwy Ste 119. Call ${phone} to book flat-rate air duct or dryer vent cleaning.`
      : `${city} jobs leave from our Bethesda, MD office at 7815 Old Georgetown Rd Ste 201. Call ${phone} to book flat-rate air duct or dryer vent cleaning.`,
  })

  const prep = [
    `In ${city}, clear a path to the air handler and dryer before we arrive — ${condoish ? 'condo/townhome closets and stacked laundry especially' : 'basement trunks and dryer closets especially'}. Share gate or parking notes if your street needs them.`,
    `${city} prep is simple: open access to returns and the dryer, move fragile items near vents, and tell us about pets or recent renovations when you book at ${phone}.`,
    `For ${city} ${state} homes, we need clear runs to the air handler${newBuild ? ' and any unfinished spaces still shedding construction dust' : ''}. Note HOA codes on the confirmation text.`,
  ][h % 3]
  items.push({ q: `What should I prepare before the ${city} crew arrives?`, a: prep })

  const dur = [
    `Most ${city} single-system houses finish in about 2–3 hours. ${condoish ? 'High-rise dryer risers and long laundry closets can add time after inspection.' : newBuild ? 'Newer builds with long dryer runs sometimes run longer once we see the layout.' : 'Older trunks with additions can add time after inspection.'}`,
    `Plan on roughly half a morning for a typical ${city} home. ${far ? 'Arrival windows already reflect the drive from ' + office + '.' : 'Same-day dryer vent add-ons are often possible if booked together.'}`,
    `${city} duct cleaning usually takes 2–3 hours for one system. Multi-system or heavily packed dryer vents are scoped before we start so the quote stays flat-rate.`,
  ][h % 3]
  items.push({ q: `How long does air duct cleaning take in ${city}?`, a: dur })

  items.push({
    q: `Are ${city} air duct and dryer vent prices flat-rate?`,
    a: `Yes. ${city} residential packages are flat-rate from the ${office} office — the number we confirm before work starts is what you pay. No per-vent counting.`,
  })

  if (h % 2 === 0) {
    items.push({
      q: `Can duct and dryer vent cleaning be done the same day in ${city}?`,
      a: `In ${city}, yes — when you book the combined package or both services up front. Call ${phone} and we stage the ${office} crew for one visit to your street.`,
    })
  } else {
    items.push({
      q: `Is sanitizing included with ${city} duct cleaning?`,
      a: `For ${city} jobs, Envirocon antimicrobial sanitizing is complimentary when you request it or when inspection supports it — we confirm on site before applying anything.`,
    })
  }

  if (far || h % 3 === 1) {
    items.push({
      q: `How far in advance should ${city} homeowners book?`,
      a: far
        ? `${city} is a longer run from ${office}. Booking several days ahead keeps arrival windows realistic; call ${phone} for the next open ${city} slot.`
        : `Peak pollen and summer humidity fill the ${city} calendar fast. Same-week openings are common — call ${phone} for the next ${office} window serving ${city}.`,
    })
  }

  return items
}

function buildProcess(city, state, office, phone, slug, h) {
  const condoish = /arlington|reston|alexandria|silver-spring|bethesda|washington-dc|college-park/.test(slug)
  const newBuild = /clarksburg|germantown|loudoun|chantilly|fair-oaks|herndon/.test(slug)
  const estate = /great-falls|potomac|mclean|mount-vernon/.test(slug)
  const variants = [
    [
      {
        title: `Talk Through Your ${city} Home`,
        text: `We ask about pets, renovations, and ${condoish ? 'stacked laundry / riser layout common in ' + city : estate ? 'long dryer runs typical of ' + city + ' lots' : 'basement or attic air-handler access in ' + city} before quoting.`,
      },
      {
        title: `Confirm the ${city} Arrival Window`,
        text: `Morning-of text with a realistic ETA from ${office} to your ${city} street.`,
      },
      {
        title: `Agree the ${city} Flat-Rate Package`,
        text: `Duct, dryer, or both for this ${city} ${state} address — the quoted number is what you pay.`,
      },
      {
        title: `Run HEPA Cleaning in ${city}`,
        text: `${newBuild ? 'We agitate construction fines plus household dust' : 'We agitate and vacuum supplies, returns, and registers'} under negative pressure in your ${city} system.`,
      },
      {
        title: `Photos Before We Leave ${city}`,
        text: `Before/after photos, filter tips, and dryer-vent interval tailored to ${city} seasons.`,
      },
    ],
    [
      {
        title: `Scope the ${city} System`,
        text: `Walk the returns and dryer path typical of ${city} housing so nothing is surprise-priced later.`,
      },
      {
        title: `Stage Equipment for ${city}`,
        text: `If the ${city} street is tight, we switch to portable HEPA sized for local lots and townhomes.`,
      },
      {
        title: `Clean ${city} Ducts End to End`,
        text: `Rotary brushes plus negative-pressure vacuum through the trunks serving this ${city} home.`,
      },
      {
        title: `Clear the ${city} Dryer Run`,
        text: `Full-length brushing to the exterior cap when dryer service is on the ${city} ticket.`,
      },
      {
        title: `${city} Walk-Through`,
        text: `Review photos, answer questions, and leave booking notes for ${phone} if you want a ${city} follow-up.`,
      },
    ],
    [
      {
        title: `Book ${city} From the ${office} Line`,
        text: `Call ${phone} or use the form — we confirm ${city} availability the next business day.`,
      },
      {
        title: `Protect Floors in Your ${city} Home`,
        text: `We cover work paths and keep living spaces clear while equipment runs in ${city}.`,
      },
      {
        title: `Source-Removal Cleaning for ${city}`,
        text: `NADCA-style agitation under HEPA negative pressure — dust leaves in the vacuum, not your ${city} rooms.`,
      },
      {
        title: `Optional Sanitizing in ${city}`,
        text: `Complimentary Envirocon when requested or when inspection supports it on this ${city} job.`,
      },
      {
        title: `Close Out the ${city} Visit`,
        text: `Photos on file, flat-rate invoice, and tips for ${city} pollen or humidity seasons.`,
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
