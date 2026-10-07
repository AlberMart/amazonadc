import React from 'react'

import { ContactFormClient } from '@/components/ContactForm/FormClient'
import { getCachedPublicContactForm } from '@/utilities/contactForm'
import { issueFormToken } from '@/utilities/formGuard'
import { getCachedGlobalSafe } from '@/utilities/getGlobals'
import { getSiteSeo } from '@/utilities/seo'
import { toTelHref } from '@/utilities/tel'

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
  /** Anchor for in-page CTAs. Default `contact`. Pass `''` when a parent already sets the id. */
  anchorId?: string
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
  anchorId = 'contact',
}: ContactFormProps) {
  const [form, site, settings] = await Promise.all([
    getCachedPublicContactForm(formId)(),
    getSiteSeo(),
    getCachedGlobalSafe('site-settings', 1),
  ])

  const tel = toTelHref(phoneHref || site.phone)

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
      anchorId={anchorId}
      form={form}
      formToken={issueFormToken()}
      turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null}
    />
  )
}
