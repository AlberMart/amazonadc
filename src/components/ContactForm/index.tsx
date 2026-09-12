import React from 'react'

import { ContactFormClient } from '@/components/ContactForm/FormClient'
import { getCachedPublicContactForm } from '@/utilities/contactForm'
import { issueFormToken } from '@/utilities/formGuard'
import { getCachedGlobalSafe } from '@/utilities/getGlobals'
import { getSiteSeo } from '@/utilities/seo'

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
  formId?: number | null
}

export async function ContactForm({
  sourcePage = '/',
  phoneDisplay,
  phoneHref,
  email,
  heading,
  intro,
  submitLabel,
  submittingLabel,
  successMessage,
  formId,
}: ContactFormProps) {
  const [form, site, settings] = await Promise.all([
    getCachedPublicContactForm(formId)(),
    getSiteSeo(),
    getCachedGlobalSafe('site-settings', 1),
  ])

  const resolvedHref = phoneHref || site.phone
  const tel = resolvedHref.startsWith('tel:') ? resolvedHref : `tel:${resolvedHref}`

  return (
    <ContactFormClient
      sourcePage={sourcePage}
      phoneDisplay={phoneDisplay || site.phoneDisplay}
      phoneHref={tel}
      email={email || site.email}
      heading={heading || settings?.contactHeading || form?.title || 'Contact Us'}
      intro={intro || settings?.contactIntro || undefined}
      submitLabel={submitLabel || settings?.contactSubmitLabel || form?.submitButtonLabel || 'Send'}
      submittingLabel={submittingLabel}
      successMessage={
        successMessage || settings?.contactSuccessMessage || form?.confirmationMessage
      }
      form={form}
      formToken={issueFormToken()}
      turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null}
    />
  )
}
