import type { Media } from '@/payload-types'

export function mediaUrl(value: unknown): string | undefined {
  if (!value || typeof value !== 'object') return undefined
  const url = (value as Media).url
  return url || undefined
}

export function resolveCmsImage(upload: unknown, path?: string | null): string | undefined {
  return mediaUrl(upload) || (path?.trim() ? path.trim() : undefined)
}

export function resolveCmsImageAlt(
  alt?: string | null,
  upload?: unknown,
  fallback = '',
): string {
  if (alt?.trim()) return alt.trim()
  if (upload && typeof upload === 'object' && 'alt' in upload) {
    const fromMedia = (upload as Media).alt
    if (fromMedia?.trim()) return fromMedia.trim()
  }
  return fallback
}
