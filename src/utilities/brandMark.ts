import type { Media } from '@/payload-types'

export type BrandMode = 'text' | 'logo' | 'both'

export type BrandMarkInput = {
  mode?: BrandMode | null
  text?: string | null
  logo?: number | Media | null
  logoPath?: string | null
  logoAlt?: string | null
} | null | undefined

export type ResolvedBrandMark = {
  mode: BrandMode
  text: string
  logoUrl: string | null
  logoAlt: string
}

export function resolveBrandMark(
  brand: BrandMarkInput,
  fallbacks: { siteName: string; logoPath?: string | null },
): ResolvedBrandMark {
  const mode = (brand?.mode || 'text') as BrandMode
  const text = brand?.text?.trim() || fallbacks.siteName
  let logoUrl: string | null = null
  if (brand?.logo && typeof brand.logo === 'object' && brand.logo.url) {
    logoUrl = brand.logo.url
  } else if (brand?.logoPath?.trim()) {
    logoUrl = brand.logoPath.trim()
  } else if (fallbacks.logoPath) {
    logoUrl = fallbacks.logoPath
  }
  return {
    mode,
    text,
    logoUrl: mode === 'text' ? null : logoUrl,
    logoAlt: brand?.logoAlt?.trim() || text,
  }
}
