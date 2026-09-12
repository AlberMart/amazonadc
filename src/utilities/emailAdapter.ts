import type { EmailAdapter } from 'payload'

type MailMessage = {
  to?: string | string[]
  cc?: string | string[]
  bcc?: string | string[]
  from?: string
  replyTo?: string
  subject?: string
  html?: string
  text?: string
}

function asList(value: string | string[] | undefined): string[] {
  if (!value) return []
  return (Array.isArray(value) ? value : [value]).map((item) => item.trim()).filter(Boolean)
}

async function sendWithResend(message: MailMessage, from: string) {
  const key = process.env.RESEND_API_KEY
  if (!key) return false

  const to = asList(message.to)
  if (!to.length) return false

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: message.from || from,
      to,
      cc: asList(message.cc),
      bcc: asList(message.bcc),
      reply_to: message.replyTo,
      subject: message.subject || 'Website form',
      html: message.html || message.text || '',
      text: message.text || undefined,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend ${res.status}: ${body}`)
  }

  return true
}

export const siteEmailAdapter: EmailAdapter = ({ payload }) => {
  const defaultFromName = process.env.EMAIL_FROM_NAME || 'Website'
  const defaultFromAddress = process.env.EMAIL_FROM_ADDRESS || 'noreply@localhost'
  const defaultFrom = `${defaultFromName} <${defaultFromAddress}>`

  return {
    name: 'site-email',
    defaultFromName,
    defaultFromAddress,
    sendEmail: async (message) => {
      const mail = message as MailMessage
      try {
        const sent = await sendWithResend(mail, defaultFrom)
        if (sent) return { sent: true, provider: 'resend' }
        payload.logger.info({
          msg: 'Form email skipped — set RESEND_API_KEY to deliver. Submission is still stored in admin.',
          to: mail.to,
          subject: mail.subject,
        })
        return { sent: false }
      } catch (error) {
        payload.logger.error({ err: error, msg: 'Form email failed' })
        return { sent: false, error: error instanceof Error ? error.message : String(error) }
      }
    },
  }
}
