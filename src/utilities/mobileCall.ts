import type { CSSProperties } from 'react'

import type { Header } from '@/payload-types'
import { resolveCmsImage, resolveCmsImageAlt } from '@/utilities/cmsImage'

export type MobileCallDisplay = 'icon' | 'number' | 'both'
export type MobileCallPlacement = 'header' | 'floating' | 'both'
export type MobileCallIcon = 'phone' | 'phone-outgoing' | 'custom'
export type MobileCallSize = 'sm' | 'md' | 'lg'
export type MobileCallShape = 'circle' | 'rounded' | 'square'

export type ResolvedMobileCall = {
  enabled: boolean
  display: MobileCallDisplay
  placement: MobileCallPlacement
  href: string
  label: string
  icon: MobileCallIcon
  iconSrc?: string
  iconAlt: string
  background: string
  color: string
  size: MobileCallSize
  shape: MobileCallShape
  shadow: boolean
  ariaLabel: string
}

const SIZE_PX: Record<MobileCallSize, number> = {
  sm: 36,
  md: 44,
  lg: 52,
}

const RADIUS: Record<MobileCallShape, string> = {
  circle: '9999px',
  rounded: '0.75rem',
  square: '0px',
}

function asTel(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return ''
  return trimmed.startsWith('tel:') ? trimmed : `tel:${trimmed.replace(/[^\d+]/g, '')}`
}

export function resolveMobileCall(
  header: Header | null | undefined,
  fallback: { phoneDisplay: string; phoneHref: string },
): ResolvedMobileCall {
  const raw = header?.mobileCall
  const label = (raw?.phoneDisplay || header?.phoneDisplay || fallback.phoneDisplay).trim()
  const href = asTel(raw?.phoneHref || header?.phoneHref || fallback.phoneHref)

  const size = (raw?.size as MobileCallSize) || 'md'
  const shape = (raw?.shape as MobileCallShape) || 'circle'
  const icon = (raw?.icon as MobileCallIcon) || 'phone'

  return {
    enabled: raw?.enabled !== false,
    display: (raw?.display as MobileCallDisplay) || 'icon',
    placement: (raw?.placement as MobileCallPlacement) || 'header',
    href,
    label,
    icon,
    iconSrc: resolveCmsImage(raw?.iconUpload, raw?.iconPath),
    iconAlt: resolveCmsImageAlt(raw?.iconAlt, raw?.iconUpload, 'Call'),
    background: raw?.background || '#fbbf24',
    color: raw?.iconColor || '#0b1c2c',
    size,
    shape,
    shadow: raw?.shadow !== false,
    ariaLabel: (raw?.ariaLabel || `Call ${label}`).trim(),
  }
}

export function mobileCallButtonStyle(call: ResolvedMobileCall, variant: 'icon' | 'pill') {
  const size = SIZE_PX[call.size]
  return {
    backgroundColor: call.background,
    color: call.color,
    width: variant === 'icon' ? size : undefined,
    height: size,
    minWidth: variant === 'icon' ? size : size,
    borderRadius: variant === 'icon' ? RADIUS[call.shape] : '9999px',
    boxShadow: call.shadow ? '0 10px 24px rgba(0, 0, 0, 0.28)' : undefined,
  } as CSSProperties
}

export function mobileCallIconSize(size: MobileCallSize) {
  if (size === 'sm') return 18
  if (size === 'lg') return 26
  return 22
}
