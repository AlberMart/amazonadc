/**
 * Final SEO uniqueness + claims pass before deploy.
 * - Fully unique FAQ answers / process step texts per city
 * - Soften guarantee language toward refund policy
 * - Fix blog FAQ "Burke or Bethesda" to the real dispatch office
 * Run: node scripts/seo-finish-pass.cjs
 */
const fs = require('fs')
const path = require('path')

const LOC_DIR = path.join(__dirname, '..', 'src/content/locations')
const BLOG_DIR = path.join(__dirname, '..', 'src/content/blog')

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

function housingNote(city, slug) {
  if (/arlington|reston|alexandria|silver-spring|bethesda|washington-dc|college-park/.test(slug)) {
    return `condo / stacked-laundry layouts common around ${city}`
  }
  if (/great-falls|potomac|mclean|mount-vernon/.test(slug)) {
    return `long dryer runs on larger ${city} lots`
  }
  if (/clarksburg|germantown|loudoun|chantilly|fair-oaks|herndon/.test(slug)) {
    return `newer-build drywall fines still sitting in ${city} returns`
  }
  if (/frederick|olney|ellicott-city|columbia|lorton|prince-william/.test(slug)) {
    return `longer drive-time homes where arrival windows matter in ${city}`
  }
  return `basement or attic air-handler access typical in ${city}`
}

function buildFaq(city, state, office, phone, slug, h) {
  const condoish = /arlington|reston|alexandria|silver-spring|bethesda|washington-dc|college-park/.test(slug)
  const newBuild = /clarksburg|germantown|loudoun|chantilly|fair-oaks|herndon/.test(slug)
  const far = /frederick|olney|ellicott-city|columbia|loudoun|prince-william|lorton/.test(slug)
  const items = []

  items.push({
    q: [`Which office books jobs for ${city}?`, `Who dispatches the crew to ${city}, ${state}?`, `Where does the ${city} appointment leave from?`][h % 3],
    a:
      office === 'Burke'
        ? `${city} appointments leave from Burke, VA (5641 Burke Centre Pkwy Ste 119). Call ${phone} for air duct or dryer vent cleaning on your street.`
        : `${city} appointments leave from Bethesda, MD (7815A Old Georgetown Rd Ste 201). Call ${phone} for air duct or dryer vent cleaning on your street.`,
  })

  items.push({
    q: [`What access do you need before arrival?`, `How should I prep the house for the visit?`, `Anything to clear before the crew shows up?`][h % 3],
    a: [
      `In ${city}, clear a path to the air handler and dryer — ${condoish ? 'condo closets and stacked laundry especially' : 'basement trunks and dryer closets especially'}. Share gate or parking notes for your block.`,
      `${city} prep: open returns and the dryer, move fragile items near vents, mention pets or renovations when you book at ${phone}.`,
      `For this ${city}, ${state} home we need clear runs to the air handler${newBuild ? ' and unfinished spaces still shedding construction dust' : ''}. Put HOA codes on the confirmation text.`,
    ][h % 3],
  })

  items.push({
    q: [`How long is a typical visit?`, `How much time should I block on the calendar?`, `What is a realistic job length for one system?`][h % 3],
    a: [
      `Most ${city} single-system houses finish in about 2–3 hours. ${condoish ? 'High-rise dryer risers can add time after inspection.' : newBuild ? 'Long dryer runs in newer builds can add time once we see the layout.' : 'Older trunks with additions can add time after inspection.'}`,
      `Block roughly half a morning for a typical ${city} home. ${far ? 'Arrival windows already reflect the drive from ' + office + '.' : 'Dryer-vent add-ons are often possible the same day if booked together.'}`,
      `One ${city} system usually takes 2–3 hours. Multi-system or packed dryer vents are scoped before we start so the quote stays locked.`,
    ][h % 3],
  })

  items.push({
    q: [`Is pricing flat-rate or by the vent?`, `How does the quote work for this address?`, `Will the price change once equipment is out?`][h % 3],
    a: [
      `${city} residential packages are flat-rate from ${office}. We scope during the walkthrough, confirm before equipment starts, and that is what you pay — no per-vent counting.`,
      `For this ${city}, ${state} address we quote a flat package from ${office}. Walkthrough first, locked number second — not priced by counting vents.`,
      `The ${office} crew prices ${city} jobs as published flat-rate packages. Scoped on site, confirmed before unload, paid after you are satisfied.`,
    ][h % 3],
  })

  if (h % 2 === 0) {
    items.push({
      q: [`Can ducts and the dryer vent be done in one visit?`, `Do you combine duct and dryer cleaning on the same day?`][h % 2],
      a: [
        `Yes for ${city} — book the combined package up front. Call ${phone}; the ${office} crew brings both tool sets for one stop.`,
        `Same-day combined visits are normal in ${city} when both services are on the ticket. Call ${phone} to stage the ${office} team together.`,
      ][h % 2],
    })
  } else {
    items.push({
      q: [`Is antimicrobial sanitizing included?`, `Do you charge extra for Envirocon sanitizing?`][(h >> 1) % 2],
      a: [
        `On ${city} jobs Envirocon is complimentary when you request it or when inspection supports it — confirmed on site before anything is applied.`,
        `No upcharge for Envirocon on ${city} work when requested or when inspection supports it. We never spray without your OK.`,
      ][(h >> 1) % 2],
    })
  }

  if (far || h % 3 === 1) {
    items.push({
      q: [`How far ahead should I book?`, `When should I call for the next opening?`][h % 2],
      a: far
        ? `${city} is a longer run from ${office}. Book several days ahead for realistic windows; call ${phone} for the next open ${city} slot.`
        : `${city} fills fast in pollen and humid months. Same-week openings are common — call ${phone} for the next ${office} window.`,
    })
  }

  return items
}

function buildProcess(city, state, office, phone, slug, h) {
  const housing = housingNote(city, slug)
  const newBuild = /clarksburg|germantown|loudoun|chantilly|fair-oaks|herndon/.test(slug)
  const variants = [
    [
      {
        title: 'Walkthrough and quote',
        text: `In ${city} we ask about pets, renovations, and ${housing} before locking a flat-rate number for this ${state} address.`,
      },
      {
        title: 'Arrival window',
        text: `Morning-of text with a realistic ETA from the ${office} office to your ${city} street — not a vague all-day window.`,
      },
      {
        title: 'Agree the package',
        text: `For this ${city} home: ducts, dryer vent, or both — scoped on site, quoted before equipment starts, paid after you are satisfied.`,
      },
      {
        title: 'HEPA source-removal cleaning',
        text: `${newBuild ? `We agitate construction fines plus household dust in ${city} trunks` : `We agitate and vacuum supplies, returns, and registers in this ${city} system`} under negative pressure so debris leaves in the vacuum.`,
      },
      {
        title: 'Photos and handoff',
        text: `Before/after photos, filter tips, and a dryer-vent interval for ${city} seasons. Questions go to ${phone}.`,
      },
    ],
    [
      {
        title: 'Inspect access and dryer path',
        text: `We walk returns and the dryer run typical of ${city} housing (${housing}) so nothing is surprise-priced later.`,
      },
      {
        title: 'Stage the right equipment',
        text: `Tight ${city} streets get portable HEPA from ${office}; larger lots may use truck-mounted vacuum when access allows.`,
      },
      {
        title: 'Clean ducts end to end',
        text: `Rotary brushes plus negative-pressure vacuum through the trunks serving this ${city}, ${state} home.`,
      },
      {
        title: 'Clear the dryer run',
        text: `Full-length brushing to the exterior cap when dryer service is on the ${city} ticket.`,
      },
      {
        title: 'Final walk-through',
        text: `Review ${city} photos together and leave booking notes for ${phone} if you want a follow-up.`,
      },
    ],
    [
      {
        title: 'Book from the office line',
        text: `Call ${phone} or use the form — we confirm ${city} availability the next business day from ${office}.`,
      },
      {
        title: 'Protect floors and living spaces',
        text: `In ${city} we cover work paths and keep living spaces clear while equipment runs.`,
      },
      {
        title: 'Source-removal cleaning',
        text: `Source-removal agitation under HEPA negative pressure for this ${city} system — dust leaves in the vacuum, not your rooms.`,
      },
      {
        title: 'Optional sanitizing',
        text: `Complimentary Envirocon when you request it or when the ${city} inspection supports it.`,
      },
      {
        title: 'Close out the visit',
        text: `Photos on file, flat-rate invoice for ${city}, and seasonal tips. Call ${phone} anytime.`,
      },
    ],
  ]
  return variants[h % 3]
}

function replaceArrayBlock(src, keyNeedle, literal) {
  const faqStart = src.search(keyNeedle)
  if (faqStart < 0) throw new Error(`not found: ${keyNeedle}`)
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
  return src.slice(0, arrStart) + literal + src.slice(arrEnd)
}

function softGuarantee(src, city) {
  // Soften absolute money-back / redo-only guarantee copy in why cards
  let out = src
  out = out.replace(
    /100% satisfaction guarantee/gi,
    'photo-backed satisfaction policy',
  )
  out = out.replace(
    /If the cleaning does not meet your expectations, we (return and redo|come back and redo) the (work|job) at no (extra|additional) (cost|charge)\./g,
    `If the ${city} result falls short, contact us within 7 days — we re-perform the work or refund per our refund policy.`,
  )
  out = out.replace(
    /If the cleaning does not satisfy you after the walk-through, we return and redo the job without an? additional charge\./g,
    `If the ${city} walk-through falls short, contact us within 7 days — we re-perform or refund per our refund policy.`,
  )
  out = out.replace(
    /If your [^']+ cleaning does not hold up to the walk-through, we return and redo the work at no additional charge\./g,
    `If the ${city} walk-through falls short, contact us within 7 days — we re-perform or refund per our refund policy.`,
  )
  out = out.replace(
    /Not satisfied after the [^']+ walk-through\? We return and redo the ducts at no additional charge\./g,
    `Not satisfied after the ${city} walk-through? Contact us within 7 days — we re-perform or refund per our refund policy.`,
  )
  out = out.replace(
    /If [^']+ results fall short of the agreed scope, we return and redo the work at no additional cost\./g,
    `If ${city} results fall short of the agreed scope, contact us within 7 days — we re-perform or refund per our refund policy.`,
  )
  out = out.replace(
    /If the [^']+ job does not match the photos we promised, we return and redo the work at no extra charge\./g,
    `If the ${city} job does not match the photos we promised, contact us within 7 days — we re-perform or refund per our refund policy.`,
  )
  out = out.replace(
    /If you are not satisfied after the cleaning, we return and redo the job at no extra cost\./g,
    `If you are not satisfied after the ${city} cleaning, contact us within 7 days — we re-perform or refund per our refund policy.`,
  )
  out = out.replace(
    /If the cleaning does not meet your expectations, we return and redo the job without additional charge\./g,
    `If the ${city} cleaning falls short, contact us within 7 days — we re-perform or refund per our refund policy.`,
  )
  out = out.replace(
    /Every trunk and register is photographed before and after cleaning\. If the result falls short, we return and re-clean at no additional charge\./g,
    `Every trunk and register is photographed before and after. If the ${city} result falls short, contact us within 7 days — we re-perform or refund per our refund policy.`,
  )
  out = out.replace(
    /Before-and-after documentation of every trunk and register is included\. If the result does not satisfy, the crew returns at our expense\./g,
    `Before-and-after documentation is included. If the ${city} result does not satisfy, contact us within 7 days — we re-perform or refund per our refund policy.`,
  )
  out = out.replace(
    /Every trunk section is documented photographically\. If improvement is not visible in the images, the crew returns at our cost\./g,
    `Every trunk section is documented. If improvement is not visible for this ${city} job, contact us within 7 days — we re-perform or refund per our refund policy.`,
  )
  out = out.replace(
    /Every trunk section and register is documented before and after\. If improvement is not clearly visible, we return at our expense\./g,
    `Every trunk section and register is documented. If improvement is not clear for ${city}, contact us within 7 days — we re-perform or refund per our refund policy.`,
  )
  out = out.replace(
    /Every register and trunk section is documented before and after\. If the result does not satisfy, we schedule a return visit at no cost\./g,
    `Every register and trunk is documented. If the ${city} result does not satisfy, contact us within 7 days — we re-perform or refund per our refund policy.`,
  )
  out = out.replace(
    /Every trunk and register is documented\. If the before-and-after comparison does not show clear improvement, we schedule a return at no charge\./g,
    `Every trunk and register is documented. If ${city} before/after photos do not show clear improvement, contact us within 7 days — we re-perform or refund per our refund policy.`,
  )
  out = out.replace(
    /If the result does not satisfy, we schedule a return visit at no cost\./g,
    `If the ${city} result does not satisfy, contact us within 7 days — we re-perform or refund per our refund policy.`,
  )
  return out
}

// --- locations ---
let locN = 0
const officeByCity = {}
for (const file of fs.readdirSync(LOC_DIR).filter((f) => f.endsWith('.ts'))) {
  const fp = path.join(LOC_DIR, file)
  let src = fs.readFileSync(fp, 'utf8')
  const city = extract(src, 'city') || file.replace(/\.ts$/, '')
  const state = extract(src, 'state') || 'VA'
  const servedBy = extract(src, 'servedBy') || 'burke'
  const office = servedBy === 'bethesda' ? 'Bethesda' : 'Burke'
  const phone = PHONE[servedBy] || PHONE.burke
  const slug = extract(src, 'slug') || file.replace(/\.ts$/, '')
  const h = hash(slug)
  officeByCity[city.toLowerCase()] = { office, phone, servedBy, slug }

  const faqItems = buildFaq(city, state, office, phone, slug, h)
  const faqIntro = `${city} questions — call ${phone} (dispatch: ${office}).`
  const faqLit = `[\n${faqItems
    .map((it) => `    {\n      q: '${it.q.replace(/'/g, "\\'")}',\n      a: '${it.a.replace(/'/g, "\\'")}',\n    }`)
    .join(',\n')},\n  ]`
  src = src.replace(/faqIntro:\s*'[^']*'/, `faqIntro: '${faqIntro.replace(/'/g, "\\'")}'`)
  src = replaceArrayBlock(src, /\n  faq: \[/, faqLit)

  const steps = buildProcess(city, state, office, phone, slug, h)
  const stepsLit = `[\n${steps
    .map(
      (s) =>
        `      {\n        title: '${s.title.replace(/'/g, "\\'")}',\n        text: '${s.text.replace(/'/g, "\\'")}',\n      }`,
    )
    .join(',\n')},\n    ]`
  const processIdx = src.search(/\n  process: \{/)
  const stepsKey = src.indexOf('steps:', processIdx)
  const stepsArrStart = src.indexOf('[', stepsKey)
  let depth = 0
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

  const intros = [
    `Arrival windows reflect the drive from ${office} to ${city}.`,
    `Same flat-rate flow from ${office} — scoped for ${city} housing.`,
    `From booking at ${phone} to photos at the ${city} door.`,
  ]
  src = src.replace(/(process: \{[\s\S]*?intro: ')([^']*)(')/, `$1${intros[h % 3].replace(/'/g, "\\'")}$3`)

  src = softGuarantee(src, city)
  fs.writeFileSync(fp, src)
  locN++
  console.log('location', file)
}
console.log('locations updated', locN)

// --- blog FAQ office fix ---
const cityAlias = {
  'washington, dc': 'washington-dc',
  'mount vernon': 'mount-vernon',
  'prince william': 'prince-william',
  'falls church': 'falls-church',
  'college park': 'college-park',
  'silver spring': 'silver-spring',
  'takoma park': 'takoma-park',
  'montgomery village': 'montgomery-village',
  'ellicott city': 'ellicott-city',
  'fair oaks': 'fair-oaks',
  'great falls': 'great-falls',
}

function officeForBlogCity(name) {
  const key = name.toLowerCase().trim()
  const slug = cityAlias[key] || key.replace(/\s+/g, '-')
  // DC: both offices is honest
  if (slug === 'washington-dc') return 'Burke and Bethesda'
  const hit = Object.values(officeByCity).find((o) => o.slug === slug)
  if (hit) return hit.office
  // fallback by known MD vs VA lists
  return 'Burke or Bethesda'
}

let blogN = 0
for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.json'))) {
  const fp = path.join(BLOG_DIR, file)
  let raw = fs.readFileSync(fp, 'utf8')
  if (!raw.includes('Burke or Bethesda')) continue
  const updated = raw.replace(
    /Yes — book ducts, dryer vents, or both in one visit for ([^.]+) from the Burke or Bethesda crew\./g,
    (_, cityName) => {
      const off = officeForBlogCity(cityName)
      return `Yes — book ducts, dryer vents, or both in one visit for ${cityName} from the ${off} crew.`
    },
  )
  if (updated !== raw) {
    fs.writeFileSync(fp, updated)
    blogN++
    console.log('blog faq office', file)
  }
}
console.log('blog FAQs office-fixed', blogN)

// uniqueness audit
const answers = new Map()
for (const file of fs.readdirSync(LOC_DIR).filter((f) => f.endsWith('.ts'))) {
  const src = fs.readFileSync(path.join(LOC_DIR, file), 'utf8')
  for (const m of src.matchAll(/a: '([^']+)'/g)) {
    if (!answers.has(m[1])) answers.set(m[1], [])
    answers.get(m[1]).push(file)
  }
}
const shared = [...answers.entries()].filter(([, v]) => v.length >= 3)
console.log('FAQ answers shared by 3+ cities:', shared.length)
shared.slice(0, 8).forEach(([a, v]) => console.log(v.length, a.slice(0, 70)))
