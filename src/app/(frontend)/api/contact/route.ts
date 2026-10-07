import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { Form } from '@/payload-types'
import { FALLBACK_CONTACT_FIELDS, pickFieldValue } from '@/utilities/contactForm'
import {
  clientIp,
  isAllowedOrigin,
  isHoneypotFilled,
  isRateLimited,
  issueFormToken,
  spamReason,
  verifyFormToken,
  verifyTurnstile,
} from '@/utilities/formGuard'
import { lexicalPlainText } from '@/utilities/lexicalPlain'

const bodySchema = z.object({
  formId: z.number().int().positive().optional(),
  values: z.record(z.union([z.string(), z.boolean(), z.number()])).optional(),
  name: z.string().max(255).optional(),
  email: z.string().max(255).optional(),
  phone: z.string().max(50).optional(),
  address: z.string().max(255).optional(),
  message: z.string().max(5000).optional(),
  sourcePage: z.string().max(500).optional(),
  website: z.string().max(200).optional(),
  fax: z.string().max(200).optional(),
  company_url: z.string().max(200).optional(),
  formToken: z.string().max(200).optional(),
  jsCheck: z.string().max(8).optional(),
  turnstileToken: z.string().optional(),
})

function stringifyValue(value: string | boolean | number | undefined): string {
  if (value === true) return 'true'
  if (value === false) return 'false'
  if (value == null) return ''
  return String(value)
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

/** Form Builder Emails tab uses {{fieldName}} placeholders. */
function replaceCurlys(template: string, values: Record<string, string>): string {
  return template.replace(/\{\{\s*([a-zA-Z0-9_-]+)\s*\}\}/g, (_, key: string) => values[key] ?? '')
}

/**
 * Payload form-builder hides the `emails` array unless `req.user` exists
 * (field-level access). Public /api/contact must load with overrideAccess
 * and send mail itself — the FormSubmissions afterChange hook sees empty emails.
 */
async function loadForm(
  payload: Awaited<ReturnType<typeof getPayload>>,
  id: number,
): Promise<Form | null> {
  try {
    return (await payload.findByID({
      collection: 'forms',
      id,
      depth: 0,
      overrideAccess: true,
    })) as Form
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isAllowedOrigin(req)) {
      return NextResponse.json({ error: 'Unable to send message' }, { status: 403 })
    }

    const ip = clientIp(req)

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const json = await req.json()
    const parsed = bodySchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form data', details: parsed.error.flatten() }, { status: 400 })
    }

    const data = parsed.data

    if (isHoneypotFilled(data)) {
      return NextResponse.json({ ok: true })
    }

    if (data.jsCheck !== '1' || !verifyFormToken(data.formToken)) {
      return NextResponse.json(
        { error: 'Unable to send message', formToken: issueFormToken() },
        { status: 400 },
      )
    }

    const turnstileOk = await verifyTurnstile(data.turnstileToken, ip)
    if (!turnstileOk) {
      return NextResponse.json({ error: 'Spam verification failed' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    let form: Form | null = null
    if (data.formId) {
      form = await loadForm(payload, data.formId)
    }

    if (!form) {
      const settings = await payload.findGlobal({
        slug: 'site-settings',
        depth: 0,
        overrideAccess: true,
      })
      const related = settings.contactForm
      const relatedId = typeof related === 'number' ? related : related?.id
      if (relatedId) {
        form = await loadForm(payload, relatedId)
      }
    }

    const values: Record<string, string> = {}
    if (data.values) {
      for (const [key, value] of Object.entries(data.values)) {
        values[key] = stringifyValue(value).slice(0, 5000)
      }
    }
    for (const key of ['name', 'email', 'phone', 'address', 'message'] as const) {
      if (data[key] && !values[key]) values[key] = String(data[key])
    }

    if (spamReason(values)) {
      return NextResponse.json({ ok: true })
    }

    const fields = (form?.fields || []).filter((field) => 'name' in field && field.blockType !== 'message')
    const toValidate = fields.length
      ? fields
      : FALLBACK_CONTACT_FIELDS.map((field) => ({
          blockType: field.blockType,
          name: field.name,
          required: field.required,
          label: field.label,
        }))

    for (const field of toValidate) {
      if (!('name' in field) || !field.name) continue
      const value = (values[field.name] || '').trim()
      if ('required' in field && field.required && !value) {
        return NextResponse.json(
          { error: `${('label' in field && field.label) || field.name} is required` },
          { status: 400 },
        )
      }
      if (field.blockType === 'email' && value && !isEmail(value)) {
        return NextResponse.json({ error: 'Enter a valid email' }, { status: 400 })
      }
    }

    const name =
      pickFieldValue(values, ['name', 'full-name', 'fullName', 'full_name']) || 'Website inquiry'
    const email = pickFieldValue(values, ['email'])
    const phone = pickFieldValue(values, ['phone', 'telephone', 'tel'])
    const address = pickFieldValue(values, ['address'])
    const message =
      pickFieldValue(values, ['message', 'comments', 'comment']) ||
      Object.entries(values)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')

    const submissionData = Object.entries(values).map(([field, value]) => ({ field, value }))
    if (data.sourcePage) {
      submissionData.push({ field: 'sourcePage', value: data.sourcePage })
    }

    if (form?.id) {
      await payload.create({
        collection: 'form-submissions',
        data: {
          form: form.id,
          submissionData,
        },
        overrideAccess: true,
      })
    }

    await payload.create({
      collection: 'leads',
      data: {
        name,
        email: email && isEmail(email) ? email : undefined,
        phone,
        address,
        message,
        form: form?.id,
        sourcePage: data.sourcePage,
        ip,
        status: 'new',
      },
      overrideAccess: true,
    })

    const curlyValues: Record<string, string> = {
      ...values,
      name,
      email: email || '',
      phone: phone || '',
      address: address || '',
      message,
      sourcePage: data.sourcePage || '',
    }

    const htmlRows = submissionData
      .map((row) => `<p><strong>${row.field}:</strong> ${row.value}</p>`)
      .join('')

    const emailConfigs =
      form?.emails && form.emails.length > 0
        ? form.emails
        : process.env.CONTACT_TO_EMAIL
          ? [
              {
                emailTo: process.env.CONTACT_TO_EMAIL,
                subject: `New website inquiry from ${name}`,
                message: null,
                replyTo: email && isEmail(email) ? email : undefined,
              },
            ]
          : []

    for (const cfg of emailConfigs) {
      const to = replaceCurlys(cfg.emailTo || '', curlyValues).trim()
      if (!to) continue

      const subject = replaceCurlys(
        cfg.subject || `New website inquiry from ${name}`,
        curlyValues,
      )
      const bodyFromConfig = cfg.message ? lexicalPlainText(cfg.message) : ''
      const textBody = bodyFromConfig
        ? replaceCurlys(bodyFromConfig, curlyValues)
        : message
      const htmlBody = bodyFromConfig
        ? `<div>${replaceCurlys(bodyFromConfig, curlyValues)
            .split(/\n+/)
            .map((line) => `<p>${line}</p>`)
            .join('')}</div>`
        : htmlRows || `<p>${message}</p>`

      const replyToRaw = cfg.replyTo
        ? replaceCurlys(cfg.replyTo, curlyValues).trim()
        : email && isEmail(email)
          ? email
          : undefined

      await payload.sendEmail({
        to,
        ...(cfg.emailFrom ? { from: replaceCurlys(cfg.emailFrom, curlyValues) } : {}),
        ...(cfg.cc ? { cc: replaceCurlys(cfg.cc, curlyValues) } : {}),
        ...(cfg.bcc ? { bcc: replaceCurlys(cfg.bcc, curlyValues) } : {}),
        ...(replyToRaw && isEmail(replyToRaw) ? { replyTo: replyToRaw } : {}),
        subject,
        html: htmlBody,
        text: textBody,
      })
    }

    return NextResponse.json({
      ok: true,
      formToken: issueFormToken(),
      confirmationMessage: form ? lexicalPlainText(form.confirmationMessage) : undefined,
      redirectUrl: form?.confirmationType === 'redirect' ? form.redirect?.url : undefined,
    })
  } catch (error) {
    console.error('Contact form error', error)
    return NextResponse.json({ error: 'Unable to send message' }, { status: 500 })
  }
}
