const fs = require('fs')
const path = require('path')

const paras = new Map()
for (const f of fs.readdirSync('src/content/locations').filter((x) => x.endsWith('.ts'))) {
  const src = fs.readFileSync(path.join('src/content/locations', f), 'utf8')
  const m = src.match(/paragraphs: \[([\s\S]*?)\],\s*highlights/)
  if (!m) continue
  for (const p of m[1].matchAll(/'((?:\\'|[^']){80,})'/g)) {
    const t = p[1].replace(/\\'/g, "'")
    if (!paras.has(t)) paras.set(t, [])
    paras.get(t).push(f)
  }
}
const d = [...paras].filter(([, f]) => f.length >= 2).sort((a, b) => b[1].length - a[1].length)
console.log('exact shared about paras 2+:', d.length)
d.slice(0, 8).forEach(([t, f]) => console.log(f.length, f.join(','), t.slice(0, 80)))

const bp = new Map()
for (const f of fs.readdirSync('src/content/blog').filter((x) => x.endsWith('.json') && x !== 'index.json')) {
  const p = JSON.parse(fs.readFileSync(path.join('src/content/blog', f), 'utf8'))
  for (const s of p.sections || []) {
    for (const para of s.paragraphs || []) {
      if (para.length < 60) continue
      if (!bp.has(para)) bp.set(para, [])
      bp.get(para).push(p.slug)
    }
  }
}
const bd = [...bp].filter(([, s]) => s.length >= 2).sort((a, b) => b[1].length - a[1].length)
console.log('exact shared blog paras 2+:', bd.length)
bd.slice(0, 10).forEach(([t, s]) => console.log(s.length, s.slice(0, 4).join('|'), t.slice(0, 80)))

// service item text reuse
const svc = new Map()
for (const f of fs.readdirSync('src/content/locations').filter((x) => x.endsWith('.ts'))) {
  const src = fs.readFileSync(path.join('src/content/locations', f), 'utf8')
  for (const m of src.matchAll(/text: '((?:\\'|[^']){50,})'/g)) {
    const t = m[1].replace(/\\'/g, "'")
    if (!svc.has(t)) svc.set(t, [])
    svc.get(t).push(f)
  }
}
const sd = [...svc].filter(([, f]) => f.length >= 5).sort((a, b) => b[1].length - a[1].length)
console.log('service/why texts shared 5+:', sd.length)
sd.slice(0, 6).forEach(([t, f]) => console.log(f.length, t.slice(0, 80)))
