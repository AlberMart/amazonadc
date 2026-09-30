/** E.164 digits for schema / CMS phoneHref (`+18006063334`). Strips a leading `tel:`. */
export function toE164(value: string | null | undefined): string {
  const trimmed = (value || '').trim()
  if (!trimmed) return ''
  const withoutTel = trimmed.replace(/^tel:/i, '').trim()
  return withoutTel.replace(/[^\d+]/g, '')
}

/** Safe `tel:+1…` href. Never doubles `tel:` and never emits an empty protocol. */
export function toTelHref(value: string | null | undefined): string {
  const e164 = toE164(value)
  return e164 ? `tel:${e164}` : ''
}

const PHONE_LINE =
  /(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}/

export function isPhoneLine(value: string): boolean {
  const trimmed = value.trim()
  if (!trimmed) return false
  if (/[a-zA-Z]/.test(trimmed) && !/\bext\.?\b/i.test(trimmed)) return false
  return PHONE_LINE.test(trimmed)
}
