'use client'

import React, { useState } from 'react'

type ContactFormProps = {
  sourcePage?: string
  phoneDisplay?: string
  phoneHref?: string
  email?: string
  heading?: string
  intro?: string
  submitLabel?: string
  submittingLabel?: string
  successMessage?: string
}

export function ContactForm({
  sourcePage = '/',
  phoneDisplay = '(800) 606-3334',
  phoneHref = '+18006063334',
  email = 'support@amazonadc.com',
  heading = 'Contact Us',
  intro,
  submitLabel = 'Send',
  submittingLabel = 'Sending…',
  successMessage = 'Your message has been sent. Thank you!',
}: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      address: String(formData.get('address') || ''),
      message: String(formData.get('message') || ''),
      sourcePage,
      website: String(formData.get('website') || ''),
      turnstileToken: String(formData.get('cf-turnstile-response') || ''),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Unable to send message')
    }
  }

  return (
    <section id="contact" className="container py-16">
      <div className="mx-auto max-w-2xl">
        <h2 className="site-heading mb-2 text-3xl font-semibold tracking-tight">{heading}</h2>
        <p className="site-body mb-6">
          {intro || (
            <>
              Our specialists will contact you immediately.{' '}
              <a className="underline" href={`tel:${phoneHref.replace(/^tel:/, '')}`}>
                {phoneDisplay}
              </a>{' '}
              ·{' '}
              <a className="underline" href={`mailto:${email}`}>
                {email}
              </a>
            </>
          )}
        </p>

        <form onSubmit={onSubmit} className="grid gap-4" noValidate>
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            aria-hidden="true"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1 text-sm">
              Full name*
              <input required name="name" className="rounded-md border px-3 py-2" />
            </label>
            <label className="grid gap-1 text-sm">
              Email*
              <input required type="email" name="email" className="rounded-md border px-3 py-2" />
            </label>
          </div>

          <label className="grid gap-1 text-sm">
            Phone*
            <input required name="phone" className="rounded-md border px-3 py-2" />
          </label>

          <label className="grid gap-1 text-sm">
            Address
            <input name="address" className="rounded-md border px-3 py-2" />
          </label>

          <label className="grid gap-1 text-sm">
            Message*
            <textarea required name="message" rows={6} className="rounded-md border px-3 py-2" />
          </label>

          {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
            <div
              className="cf-turnstile"
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            />
          ) : null}

          {status === 'success' ? (
            <p className="text-sm text-green-700">{successMessage}</p>
          ) : null}
          {status === 'error' && error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="site-btn site-btn-secondary disabled:opacity-60"
          >
            {status === 'loading' ? submittingLabel : submitLabel}
          </button>
        </form>
      </div>
    </section>
  )
}
