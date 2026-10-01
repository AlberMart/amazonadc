import type { LocationContent } from '@/utilities/locations'
import type { SiteSeo } from '@/utilities/seo'
import { toE164, toTelHref } from '@/utilities/tel'

export type LocationPhoneSource = 'office' | 'site' | 'custom'

export type PublicPhone = {
  display: string
  /** E.164 for schema / tel: (+1571…) */
  e164: string
  href: string
  source: LocationPhoneSource
}

/**
 * Public booking phone for a location page (header, CTAs, schema).
 * Admin: Locations → Phone source (office / site / custom).
 */
export function resolveLocationPublicPhone(
  location: Pick<
    LocationContent,
    'phoneSource' | 'phoneDisplay' | 'phoneHref' | 'office'
  >,
  site: Pick<SiteSeo, 'phoneDisplay' | 'phone'>,
): PublicPhone {
  const source = location.phoneSource || 'office'

  if (source === 'site') {
    const e164 = toE164(site.phone) || site.phone
    return {
      display: site.phoneDisplay,
      e164,
      href: toTelHref(e164),
      source,
    }
  }

  if (source === 'custom') {
    const display = (location.phoneDisplay || '').trim() || site.phoneDisplay
    const e164 =
      toE164(location.phoneHref) || toE164(location.phoneDisplay) || toE164(site.phone) || site.phone
    return {
      display,
      e164,
      href: toTelHref(e164),
      source,
    }
  }

  // Default: serving office local line (Burke 571 / Bethesda 301)
  const display = location.office.phoneDisplay || site.phoneDisplay
  const e164 = toE164(location.office.phone) || toE164(display) || toE164(site.phone) || site.phone
  return {
    display,
    e164,
    href: toTelHref(e164),
    source: 'office',
  }
}
