import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const contactSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  phone: z.string().min(7).max(50),
  address: z.string().max(255).optional().or(z.literal('')),
  message: z.string().min(1).max(5000),
  sourcePage: z.string().max(500).optional(),
  website: z.string().max(0).optional(), // honeypot — must be empty
  turnstileToken: z.string().optional(),
})

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000
  const max = 8
  const entry = rateLimitMap.get(ip)

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return false
  }

  entry.count += 1
  return entry.count > max
}

async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    // Allow local/dev without Turnstile configured
    return process.env.NODE_ENV !== 'production'
  }
  if (!token) return false

  const body = new URLSearchParams()
  body.set('secret', secret)
  body.set('response', token)
  body.set('remoteip', ip)

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  })
  const data = (await res.json()) as { success?: boolean }
  return Boolean(data.success)
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const json = await req.json()
    const parsed = contactSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form data', details: parsed.error.flatten() }, { status: 400 })
    }

    const data = parsed.data

    // Honeypot filled => pretend success
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ ok: true })
    }

    const turnstileOk = await verifyTurnstile(data.turnstileToken, ip)
    if (!turnstileOk) {
      return NextResponse.json({ error: 'Spam verification failed' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'leads',
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address || undefined,
        message: data.message,
        sourcePage: data.sourcePage,
        ip,
        status: 'new',
      },
    })

    // Email delivery can be wired via Payload email adapter / Resend later.
    // Lead is always stored in admin for follow-up.

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form error', error)
    return NextResponse.json({ error: 'Unable to send message' }, { status: 500 })
  }
}
