const GA_ID = /^(G|GT|UA|AW)-[A-Z0-9]+$/i
const GTM_ID = /^GTM-[A-Z0-9]+$/i
const HEX_COLOR = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i
const CHAT_ID = /^[A-Za-z0-9_-]{6,80}$/
const TAWK_ID = /^[A-Za-z0-9]{8,32}\/[A-Za-z0-9]{4,32}$/
const USERWAY_ID = /^[A-Za-z0-9]{6,40}$/

export function sanitizeGaId(value?: string | null): string | null {
  const id = value?.trim()
  if (!id) return null
  return GA_ID.test(id) ? id : null
}

export function sanitizeGtmId(value?: string | null): string | null {
  const id = value?.trim()
  if (!id) return null
  return GTM_ID.test(id) ? id : null
}

export function sanitizeChatId(provider: string | null | undefined, value?: string | null): string | null {
  const id = value?.trim()
  if (!id) return null
  if (provider === 'tawk') return TAWK_ID.test(id) ? id : null
  return CHAT_ID.test(id) ? id : null
}

export function sanitizeWidgetAccount(value?: string | null): string | null {
  const id = value?.trim()
  if (!id) return null
  return USERWAY_ID.test(id) ? id : null
}

export function sanitizeHexColor(value?: string | null, fallback = '#0071e3'): string {
  const color = value?.trim()
  return color && HEX_COLOR.test(color) ? color : fallback
}
