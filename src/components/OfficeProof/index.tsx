import React from 'react'

import type { OfficeContent } from '@/utilities/offices'

function formatClock(value: string) {
  const [hRaw, mRaw] = value.split(':')
  const h = Number(hRaw)
  const m = mRaw || '00'
  if (!Number.isFinite(h)) return value
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour12 = ((h + 11) % 12) + 1
  return `${hour12}:${m} ${suffix}`
}

function officeMapEmbedUrl(office: OfficeContent) {
  const address = `${office.streetAddress}, ${office.city}, ${office.state} ${office.postalCode}`.trim()
  // Prefer street NAP so the pin matches Google’s geocode of the published address
  // (stale lat/lng in CMS previously put Burke/Bethesda hundreds of meters off).
  if (office.streetAddress && office.city) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=17&output=embed`
  }
  if (office.latitude && office.longitude) {
    return `https://maps.google.com/maps?q=${office.latitude},${office.longitude}&z=17&output=embed`
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=17&output=embed`
}

export function OfficeProof({
  office,
  heading,
  intro,
}: {
  office: OfficeContent
  heading?: string
  intro?: string
}) {
  const gbpHref = office.googleBusinessUrl || null
  // Prefer the Google Maps place short link (same pin as GBP), then GBP, then address search.
  const mapsPlaceHref = office.hasMapUrl || null
  const mapsSearchHref = office.streetAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${office.streetAddress}, ${office.city}, ${office.state} ${office.postalCode}`,
      )}`
    : office.latitude && office.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${office.latitude}%2C${office.longitude}`
      : null
  const mapHref = mapsPlaceHref || gbpHref || mapsSearchHref
  const rating =
    office.aggregateReviewCount > 0
      ? `${office.aggregateRatingValue.toFixed(1).replace(/\.0$/, '')}★ · ${office.aggregateReviewCount} Google reviews`
      : null

  return (
    <section id="office" className="site-section scroll-mt-24 bg-[var(--site-muted)] py-16 md:py-20">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-[var(--site-link)] uppercase">
              Physical office
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)] md:text-4xl">
              {heading || `${office.city} office details`}
            </h2>
            {intro ? <p className="mt-4 max-w-xl site-body leading-relaxed">{intro}</p> : null}

            <div className="mt-8 space-y-5 text-[var(--site-heading)]">
              <div>
                <p className="text-sm font-semibold tracking-wide text-[var(--site-link)] uppercase">
                  Address
                </p>
                <p className="mt-2 text-lg leading-relaxed">
                  {office.streetAddress}
                  <br />
                  {office.city}, {office.state} {office.postalCode}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide text-[var(--site-link)] uppercase">
                  Office phone
                </p>
                <a href={`tel:${office.phone}`} className="mt-2 inline-block text-lg site-link">
                  {office.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide text-[var(--site-link)] uppercase">
                  Hours
                </p>
                <p className="mt-2 text-sm leading-relaxed site-body">
                  Mon–Fri {formatClock(office.weekdayOpens)} – {formatClock(office.weekdayCloses)}
                  <br />
                  Sat {formatClock(office.saturdayOpens)} – {formatClock(office.saturdayCloses)}
                </p>
              </div>
              {rating ? (
                <div>
                  <p className="text-sm font-semibold tracking-wide text-[var(--site-link)] uppercase">
                    Google rating
                  </p>
                  <p className="mt-2 text-lg font-semibold">{rating}</p>
                </div>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {mapHref ? (
                <a
                  href={mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-btn site-btn-primary"
                >
                  View on Google Maps
                </a>
              ) : null}
              <a href={`tel:${office.phone}`} className="site-btn site-btn-tertiary">
                Call {office.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="overflow-hidden border border-[var(--site-border)] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <iframe
              title={`${office.city} office map`}
              src={officeMapEmbedUrl(office)}
              className="h-[320px] w-full md:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
