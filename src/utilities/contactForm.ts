import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { Form } from '@/payload-types'
import { getCachedGlobalSafe } from '@/utilities/getGlobals'
import { lexicalPlainText } from '@/utilities/lexicalPlain'
import {
  FALLBACK_CONTACT_FIELDS,
  type PublicForm,
  type PublicFormField,
} from '@/utilities/contactFormShared'

export {
  FALLBACK_CONTACT_FIELDS,
  fieldColClass,
  pickFieldValue,
  type PublicForm,
  type PublicFormField,
} from '@/utilities/contactFormShared'

export function serializeForm(form: Form | null | undefined): PublicForm | null {
  if (!form?.id) return null

  const fields: PublicFormField[] = (form.fields || []).map((field) => {
    const base: PublicFormField = {
      blockType: field.blockType,
    }

    if ('name' in field) base.name = field.name
    if ('label' in field) base.label = field.label || undefined
    if ('required' in field) base.required = Boolean(field.required)
    if ('width' in field && field.width != null) base.width = Number(field.width)
    if ('defaultValue' in field && field.defaultValue != null) {
      base.defaultValue = field.defaultValue as string | number | boolean
    }
    if ('placeholder' in field && field.placeholder) base.placeholder = String(field.placeholder)
    if ('options' in field && Array.isArray(field.options)) {
      base.options = field.options
        .filter((row): row is { label: string; value: string } => Boolean(row?.label && row?.value))
        .map((row) => ({ label: row.label, value: row.value }))
    }
    if (field.blockType === 'message' && 'message' in field) {
      base.message = lexicalPlainText(field.message)
    }

    return base
  })

  return {
    id: form.id,
    title: form.title,
    submitButtonLabel: form.submitButtonLabel || 'Send',
    confirmationType: form.confirmationType === 'redirect' ? 'redirect' : 'message',
    confirmationMessage:
      lexicalPlainText(form.confirmationMessage) || 'Your message has been sent. Thank you!',
    redirectUrl: form.redirect?.url || undefined,
    fields: fields.length ? fields : FALLBACK_CONTACT_FIELDS,
  }
}

async function loadFormById(id: number): Promise<Form | null> {
  const payload = await getPayload({ config: configPromise })
  try {
    return (await payload.findByID({
      collection: 'forms',
      id,
      depth: 0,
    })) as Form
  } catch {
    return null
  }
}

async function findDefaultForm(): Promise<Form | null> {
  const payload = await getPayload({ config: configPromise })
  const byTitle = await payload.find({
    collection: 'forms',
    where: { title: { equals: 'Contact Form' } },
    limit: 1,
    depth: 0,
  })
  if (byTitle.docs[0]) return byTitle.docs[0] as Form

  const any = await payload.find({
    collection: 'forms',
    limit: 1,
    depth: 0,
    sort: 'createdAt',
  })
  return (any.docs[0] as Form) || null
}

export async function getPublicContactForm(formId?: number | null): Promise<PublicForm | null> {
  if (formId) {
    const byId = serializeForm(await loadFormById(formId))
    if (byId) return byId
  }

  const settings = await getCachedGlobalSafe('site-settings', 1)
  const related = settings?.contactForm
  const relatedId =
    typeof related === 'object' && related ? related.id : typeof related === 'number' ? related : null

  if (relatedId) {
    if (typeof related === 'object' && related) {
      const fromSettings = serializeForm(related)
      if (fromSettings) return fromSettings
    }
    const loaded = serializeForm(await loadFormById(relatedId))
    if (loaded) return loaded
  }

  return serializeForm(await findDefaultForm())
}

export const getCachedPublicContactForm = (formId?: number | null) =>
  unstable_cache(() => getPublicContactForm(formId), ['contact_form', String(formId || 'default')], {
    tags: ['contact_form', 'global_site-settings'],
  })
