import { createHmac, randomBytes, timingSafeEqual } from 'crypto'
import type { NextRequest } from 'next/server'

import { getServerSideURL } from '@/utilities/getURL'

const MIN_FILL_MS = 2800
const MAX_AGE_MS = 4 * 60 * 60 * 1000
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const URL_RE = /https?:\/\/[^\s]+/gi
const HTML_RE = /<\s*(script|iframe|object|embed|link|meta|form)\b/i
const usedNonces = new Map<string, number>()
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function secret() {
  return process.env.PAYLOAD_SECRET || process.env.CRON_SECRET || 'dev-form-secret'
}

function allowedOrigins(): string[] {
  const base = getServerSideURL().replace(/\/$/, '')
  const extras = (process.env.FORM_ALLOWED_ORIGINS || '')
    .split(',')
    .map((item) => item.trim().replace(/\/$/, ''))
    .filter(Boolean)
  return Array.from(new Set([base, ...extras]))
}

function hmac(value: string) {
  return createHmac('sha256', secret()).update(value).digest('hex')
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

function pruneNonces(now: number) {
  if (usedNonces.size < 400) return
  for (const [nonce, exp] of usedNonces) {
    if (exp < now) usedNonces.delete(nonce)
  }
}

export function issueFormToken(): string {
  const issuedAt = Date.now().toString()
  const nonce = randomBytes(16).toString('hex')
  return `${issuedAt}.${nonce}.${hmac(`${issuedAt}.${nonce}`)}`
}

export function verifyFormToken(token: string | undefined): boolean {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 3) return false
  const [issuedAtRaw, nonce, signature] = parts
  if (!issuedAtRaw || !nonce || !signature) return false
  if (!/^\d+$/.test(issuedAtRaw) || !/^[a-f0-9]{32}$/.test(nonce) || !/^[a-f0-9]{64}$/.test(signature)) {
    return false
  }
  if (!safeEqual(hmac(`${issuedAtRaw}.${nonce}`), signature)) return false

  const issuedAt = Number(issuedAtRaw)
  const now = Date.now()
  const age = now - issuedAt
  if (age < MIN_FILL_MS || age > MAX_AGE_MS) return false

  pruneNonces(now)
  if (usedNonces.has(nonce)) return false
  usedNonces.set(nonce, now + MAX_AGE_MS)
  return true
}

export function clientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

export function isAllowedOrigin(req: NextRequest): boolean {
  const allowed = allowedOrigins()
  const origin = req.headers.get('origin')
  if (origin) return allowed.includes(origin.replace(/\/$/, ''))

  const referer = req.headers.get('referer')
  if (referer) {
    return allowed.some((base) => referer === base || referer.startsWith(`${base}/`))
  }

  const fetchSite = req.headers.get('sec-fetch-site')
  return fetchSite === 'same-origin' || fetchSite === 'same-site'
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > RATE_MAX
}

export function isHoneypotFilled(values: Record<string, unknown>): boolean {
  for (const key of ['website', 'fax', 'company_url']) {
    const value = values[key]
    if (typeof value === 'string' && value.trim()) return true
  }
  return false
}

export function spamReason(values: Record<string, string>): string | null {
  const blob = Object.values(values).join('\n')
  if (HTML_RE.test(blob)) return 'blocked'
  if ((blob.match(URL_RE) || []).length > 2) return 'blocked'

  const name = (values.name || values.fullName || '').trim()
  if (name && /https?:\/\//i.test(name)) return 'blocked'
  if (name && name.length > 120) return 'blocked'

  const message = values.message || values.comments || ''
  if (message.length > 0 && message.replace(/\s/g, '').length < 2) return 'blocked'

  return null
}

export async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY
  if (!secretKey) return true
  if (!token) return false

  const body = new URLSearchParams()
  body.set('secret', secretKey)
  body.set('response', token)
  body.set('remoteip', ip)

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  })
  const data = (await res.json()) as { success?: boolean }
  return Boolean(data.success)
}
