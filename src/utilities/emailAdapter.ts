import type { EmailAdapter } from 'payload'
import net from 'node:net'
import tls from 'node:tls'

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

function resolveFrom() {
  const name =
    process.env.EMAIL_FROM_NAME || process.env.MAIL_FROM_NAME || 'Amazon Air Duct Cleaning'
  const address =
    process.env.EMAIL_FROM_ADDRESS || process.env.MAIL_FROM_ADDRESS || 'noreply@localhost'
  const cleanName = name.replace(/^"|"$/g, '')
  const cleanAddress = address.replace(/^"|"$/g, '')
  return {
    name: cleanName,
    address: cleanAddress,
    formatted: `${cleanName} <${cleanAddress}>`,
  }
}

function extractAddress(value: string): string {
  const match = value.match(/<([^>]+)>/)
  return (match?.[1] || value).trim()
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

function smtpConfigured() {
  return Boolean(process.env.MAIL_HOST && process.env.MAIL_USERNAME && process.env.MAIL_PASSWORD)
}

class SmtpClient {
  private socket: net.Socket | tls.TLSSocket | null = null
  private buffer = ''

  constructor(
    private host: string,
    private port: number,
    private secure: boolean,
  ) {}

  async connect() {
    this.socket = await new Promise<net.Socket | tls.TLSSocket>((resolve, reject) => {
      const sock = this.secure
        ? tls.connect({ host: this.host, port: this.port, servername: this.host })
        : net.connect({ host: this.host, port: this.port })
      sock.setEncoding('utf8')
      sock.once('error', reject)
      sock.once('connect', () => resolve(sock))
    })
    this.socket.on('data', (chunk: string) => {
      this.buffer += chunk
    })
    await this.readCode(220)
  }

  private async readCode(expected: number) {
    const started = Date.now()
    while (Date.now() - started < 30000) {
      const lines = this.buffer.split(/\r?\n/)
      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i]
        if (/^\d{3}[\s-]/.test(line)) {
          const code = Number(line.slice(0, 3))
          const done = line[3] === ' '
          if (done) {
            this.buffer = lines.slice(i + 1).join('\n')
            if (code !== expected) {
              throw new Error(`SMTP expected ${expected}, got: ${line}`)
            }
            return line
          }
        }
      }
      await new Promise((r) => setTimeout(r, 25))
    }
    throw new Error(`SMTP timeout waiting for ${expected}`)
  }

  private async command(cmd: string, expected: number) {
    if (!this.socket) throw new Error('SMTP not connected')
    this.socket.write(`${cmd}\r\n`)
    return this.readCode(expected)
  }

  async ehlo() {
    await this.command(`EHLO amazonadc.com`, 250)
  }

  async startTls() {
    if (!this.socket || this.secure) return
    await this.command('STARTTLS', 220)
    const plain = this.socket as net.Socket
    this.socket = tls.connect({
      socket: plain,
      servername: this.host,
    })
    this.socket.setEncoding('utf8')
    this.buffer = ''
    this.socket.on('data', (chunk: string) => {
      this.buffer += chunk
    })
    await new Promise<void>((resolve, reject) => {
      this.socket!.once('secureConnect', () => resolve())
      this.socket!.once('error', reject)
    })
    await this.ehlo()
  }

  async auth(user: string, pass: string) {
    await this.command('AUTH LOGIN', 334)
    await this.command(Buffer.from(user).toString('base64'), 334)
    await this.command(Buffer.from(pass).toString('base64'), 235)
  }

  async send(opts: {
    from: string
    to: string[]
    cc: string[]
    bcc: string[]
    replyTo?: string
    subject: string
    html: string
    text?: string
  }) {
    const fromAddr = extractAddress(opts.from)
    await this.command(`MAIL FROM:<${fromAddr}>`, 250)
    for (const recipient of [...opts.to, ...opts.cc, ...opts.bcc]) {
      await this.command(`RCPT TO:<${extractAddress(recipient)}>`, 250)
    }
    await this.command('DATA', 354)

    const boundary = `b_${Date.now().toString(36)}`
    const headers = [
      `From: ${opts.from}`,
      `To: ${opts.to.join(', ')}`,
      ...(opts.cc.length ? [`Cc: ${opts.cc.join(', ')}`] : []),
      ...(opts.replyTo ? [`Reply-To: ${opts.replyTo}`] : []),
      `Subject: ${opts.subject}`,
      'MIME-Version: 1.0',
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      'Content-Type: text/plain; charset=utf-8',
      'Content-Transfer-Encoding: 8bit',
      '',
      opts.text || opts.html.replace(/<[^>]+>/g, ' '),
      '',
      `--${boundary}`,
      'Content-Type: text/html; charset=utf-8',
      'Content-Transfer-Encoding: 8bit',
      '',
      opts.html,
      '',
      `--${boundary}--`,
      '.',
    ].join('\r\n')

    if (!this.socket) throw new Error('SMTP not connected')
    this.socket.write(`${headers}\r\n`)
    await this.readCode(250)
    await this.command('QUIT', 221)
    this.socket.end()
  }
}

async function sendWithSmtp(message: MailMessage, from: string) {
  if (!smtpConfigured()) return false

  const to = asList(message.to)
  if (!to.length) return false

  const host = process.env.MAIL_HOST!
  const port = Number(process.env.MAIL_PORT || 587)
  const encryption = (process.env.MAIL_ENCRYPTION || '').toLowerCase()
  const secure = encryption === 'ssl' || port === 465

  const client = new SmtpClient(host, port, secure)
  await client.connect()
  await client.ehlo()
  if (!secure && (encryption === 'tls' || port === 587)) {
    await client.startTls()
  }
  await client.auth(process.env.MAIL_USERNAME!, process.env.MAIL_PASSWORD!)
  await client.send({
    from: message.from || from,
    to,
    cc: asList(message.cc),
    bcc: asList(message.bcc),
    replyTo: message.replyTo,
    subject: message.subject || 'Website form',
    html: message.html || message.text || '',
    text: message.text || undefined,
  })

  return true
}

export const siteEmailAdapter: EmailAdapter = ({ payload }) => {
  const from = resolveFrom()

  return {
    name: 'site-email',
    defaultFromName: from.name,
    defaultFromAddress: from.address,
    sendEmail: async (message) => {
      const mail = message as MailMessage
      try {
        if (await sendWithResend(mail, from.formatted)) {
          return { sent: true, provider: 'resend' }
        }
        if (await sendWithSmtp(mail, from.formatted)) {
          return { sent: true, provider: 'smtp' }
        }
        payload.logger.info({
          msg: 'Form email skipped — set RESEND_API_KEY or MAIL_HOST/MAIL_USERNAME/MAIL_PASSWORD. Submission is still stored in admin.',
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
