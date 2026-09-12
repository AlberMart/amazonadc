'use client'

import React, { useEffect, useState } from 'react'
import Script from 'next/script'

import { countryOptions } from '@/blocks/Form/Country/options'
import { stateOptions } from '@/blocks/Form/State/options'
import {
  fieldColClass,
  type PublicForm,
  type PublicFormField,
} from '@/utilities/contactFormShared'

const inputClass =
  'w-full rounded-md border border-[var(--site-border)] bg-white px-3 py-2 text-[var(--site-heading)]'

type ContactFormClientProps = {
  sourcePage?: string
  phoneDisplay?: string
  phoneHref?: string
  email?: string
  heading?: string
  intro?: string
  submitLabel?: string
  submittingLabel?: string
  successMessage?: string
  form: PublicForm | null
  formToken: string
  turnstileSiteKey?: string | null
}

function FieldControl({ field }: { field: PublicFormField }) {
  const name = field.name || field.blockType
  const required = Boolean(field.required)
  const label = field.label || name
  const defaultValue =
    field.defaultValue === true || field.defaultValue === false
      ? undefined
      : field.defaultValue == null
        ? undefined
        : String(field.defaultValue)

  if (field.blockType === 'message') {
    return field.message ? <p className="site-body text-sm sm:col-span-12">{field.message}</p> : null
  }

  if (field.blockType === 'checkbox') {
    return (
      <label className={`flex items-center gap-2 text-sm ${fieldColClass(field.width)}`}>
        <input
          type="checkbox"
          name={name}
          defaultChecked={Boolean(field.defaultValue)}
          required={required}
        />
        <span>
          {label}
          {required ? '*' : ''}
        </span>
      </label>
    )
  }

  if (field.blockType === 'textarea') {
    return (
      <label className={`grid gap-1 text-sm ${fieldColClass(field.width)}`}>
        {label}
        {required ? '*' : ''}
        <textarea
          required={required}
          name={name}
          rows={6}
          defaultValue={defaultValue}
          placeholder={field.placeholder}
          className={inputClass}
        />
      </label>
    )
  }

  if (field.blockType === 'select' || field.blockType === 'country' || field.blockType === 'state') {
    const options =
      field.blockType === 'country'
        ? countryOptions
        : field.blockType === 'state'
          ? stateOptions
          : field.options || []

    return (
      <label className={`grid gap-1 text-sm ${fieldColClass(field.width)}`}>
        {label}
        {required ? '*' : ''}
        <select
          required={required}
          name={name}
          defaultValue={defaultValue || ''}
          className={inputClass}
        >
          <option value="">{field.placeholder || 'Select…'}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    )
  }

  const type =
    field.blockType === 'email' ? 'email' : field.blockType === 'number' ? 'number' : 'text'

  return (
    <label className={`grid gap-1 text-sm ${fieldColClass(field.width)}`}>
      {label}
      {required ? '*' : ''}
      <input
        required={required}
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={field.placeholder}
        className={inputClass}
      />
    </label>
  )
}

export function ContactFormClient({
  sourcePage = '/',
  phoneDisplay,
  phoneHref,
  email,
  heading = 'Contact Us',
  intro,
  submitLabel = 'Send',
  submittingLabel = 'Sending…',
  successMessage = 'Your message has been sent. Thank you!',
  form,
  formToken,
  turnstileSiteKey,
}: ContactFormClientProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [doneMessage, setDoneMessage] = useState(successMessage)
  const [jsCheck, setJsCheck] = useState('')
  const [token, setToken] = useState(formToken)

  useEffect(() => {
    const timer = window.setTimeout(() => setJsCheck('1'), 400)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    setToken(formToken)
  }, [formToken])

  const fields = form?.fields?.length
    ? form.fields
    : ([
        { blockType: 'text', name: 'name', label: 'Full name', required: true, width: 50 },
        { blockType: 'email', name: 'email', label: 'Email', required: true, width: 50 },
        { blockType: 'text', name: 'phone', label: 'Phone', required: true, width: 100 },
        { blockType: 'text', name: 'address', label: 'Address', required: false, width: 100 },
        { blockType: 'textarea', name: 'message', label: 'Message', required: true, width: 100 },
      ] satisfies PublicFormField[])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError(null)

    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    const values: Record<string, string> = {}

    fields.forEach((field) => {
      if (!field.name || field.blockType === 'message') return
      if (field.blockType === 'checkbox') {
        values[field.name] = formData.get(field.name) ? 'true' : 'false'
        return
      }
      values[field.name] = String(formData.get(field.name) || '')
    })

    const payload = {
      formId: form?.id,
      values,
      sourcePage,
      website: String(formData.get('website') || ''),
      fax: String(formData.get('fax') || ''),
      company_url: String(formData.get('company_url') || ''),
      formToken: token,
      jsCheck,
      turnstileToken: String(formData.get('cf-turnstile-response') || ''),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.formToken) setToken(data.formToken)
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      const nextMessage = data.confirmationMessage || form?.confirmationMessage || successMessage
      setDoneMessage(nextMessage)
      setStatus('success')
      formEl.reset()

      if (form?.confirmationType === 'redirect' && (data.redirectUrl || form.redirectUrl)) {
        window.location.assign(data.redirectUrl || form.redirectUrl)
      }
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Unable to send message')
    }
  }

  const telHref = phoneHref ? (phoneHref.startsWith('tel:') ? phoneHref : `tel:${phoneHref}`) : undefined

  return (
    <section id="contact" className="container py-16">
      <div className="mx-auto max-w-2xl">
        <h2 className="site-heading mb-2 text-3xl font-semibold tracking-tight">{heading}</h2>
        <p className="site-body mb-6">
          {intro || (
            <>
              Our specialists will contact you immediately.{' '}
              {phoneDisplay && telHref ? (
                <a className="underline" href={telHref}>
                  {phoneDisplay}
                </a>
              ) : null}{' '}
              {phoneDisplay && email ? ' · ' : null}
              {email ? (
                <a className="underline" href={`mailto:${email}`}>
                  {email}
                </a>
              ) : null}
            </>
          )}
        </p>

        <form onSubmit={onSubmit} className="relative grid gap-4" noValidate>
          <div className="hidden" aria-hidden="true">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
            <label>
              Fax
              <input type="text" name="fax" tabIndex={-1} autoComplete="off" />
            </label>
            <label>
              Company URL
              <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
            {fields.map((field, index) => (
              <FieldControl key={`${field.name || field.blockType}-${index}`} field={field} />
            ))}
          </div>

          {turnstileSiteKey ? (
            <>
              <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                strategy="afterInteractive"
              />
              <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
            </>
          ) : null}

          {status === 'success' ? <p className="text-sm text-green-700">{doneMessage}</p> : null}
          {status === 'error' && error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={status === 'loading' || jsCheck !== '1'}
            className="site-btn site-btn-secondary disabled:opacity-60"
          >
            {status === 'loading' ? submittingLabel : form?.submitButtonLabel || submitLabel}
          </button>
        </form>
      </div>
    </section>
  )
}
