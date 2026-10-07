/** E.164 digits for schema / CMS phoneHref (`+18006063334`). Strips a leading `tel:`. */
export function toE164(value: string | null | undefined): string {
  const trimmed = (value || '').trim()
  if (!trimmed) return ''
  const withoutTel = trimmed.replace(/^tel:/i, '').trim()
  const hasPlus = withoutTel.trimStart().startsWith('+')
  const digits = withoutTel.replace(/\D/g, '')
  if (!digits) return ''

  // US local 10-digit → +1XXXXXXXXXX
  if (!hasPlus && digits.length === 10) return `+1${digits}`
  // 11-digit starting with 1 → +1…
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  // Already international / explicitly +prefixed
  if (hasPlus) return `+${digits}`
  // Fallback: keep digits with leading +
  return `+${digits}`
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

/** True for in-app paths Next.js <Link> can route; false for tel/mailto/http/hash/etc. */
export function isNextLinkHref(href: string): boolean {
  const value = href.trim()
  if (!value) return false
  // Hash-only must stay native <a> — Next Link often skips scroll-to-id on mobile.
  if (value.startsWith('#')) return false
  // Home hash shortcuts (/#contact) also need native scroll after load / same-path clicks.
  if (/^\/#[\w-]+$/.test(value)) return false
  if (value.startsWith('/') && !value.startsWith('//')) return true
  return false
}
