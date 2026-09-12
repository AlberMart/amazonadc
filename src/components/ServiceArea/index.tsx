import Link from 'next/link'
import React from 'react'

import { getCityPageLinks } from '@/utilities/locations'
import { getAllOffices } from '@/utilities/offices'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getSiteSeo } from '@/utilities/seo'

type RegionRow = {
  name: string
  cities: string[]
  href?: string | null
  linkLabel?: string | null
  emptyLinkLabel?: string | null
}

const fallbackRegions: RegionRow[] = [
  {
    name: 'Virginia',
    cities: ['Arlington', 'Alexandria', 'Fairfax', 'Springfield', 'Loudoun', 'Prince William'],
    href: '/locations/burke',
    linkLabel: 'Burke & more',
  },
  {
    name: 'Maryland',
    cities: ['Rockville', 'Silver Spring', 'Bethesda', 'Gaithersburg', 'College Park'],
    href: '/locations/bethesda',
    linkLabel: 'Surrounding areas',
  },
  {
    name: 'Washington DC',
    cities: ['Capitol Hill', 'Northwest', 'Northeast', 'Southeast'],
    emptyLinkLabel: 'All DC neighborhoods',
  },
]

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('1')) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  return phone
}

export async function ServiceArea({
  callHref,
  callLabel,
  heading = 'Service Area',
  intro,
  email,
  officesHeading = 'Our offices',
  mapEmbedUrl,
  mapTitle,
  estimateHref = '/#contact',
  estimateLabel = 'Free estimate',
}: {
  callHref?: string
  callLabel?: string
  heading?: string
  intro?: string
  email?: string
  officesHeading?: string
  mapEmbedUrl?: string
  mapTitle?: string
  estimateHref?: string
  estimateLabel?: string
}) {
  const [offices, cityPages, site, settings] = await Promise.all([
    getAllOffices(),
    getCityPageLinks(),
    getSiteSeo(),
    getCachedGlobal('site-settings', 0)(),
  ])

  const fromCms: RegionRow[] = ((settings as { serviceAreaRegions?: unknown[] })?.serviceAreaRegions || [])
    .map((row) => {
      const r = row as {
        name?: string
        cities?: Array<{ name?: string } | string>
        href?: string | null
        linkLabel?: string | null
        emptyLinkLabel?: string | null
      }
      return {
        name: r.name || '',
        cities: (r.cities || [])
          .map((c) => (typeof c === 'string' ? c : c?.name || ''))
          .filter(Boolean),
        href: r.href || null,
        linkLabel: r.linkLabel || null,
        emptyLinkLabel: r.emptyLinkLabel || null,
      }
    })
    .filter((r) => r.name)

  const regions = fromCms.length ? fromCms : fallbackRegions
  const resolvedMapUrl =
    mapEmbedUrl ||
    (settings as { serviceAreaMapEmbedUrl?: string })?.serviceAreaMapEmbedUrl ||
    'https://www.google.com/maps/d/u/1/embed?mid=11Gt4y_RRlKcln8C0JIn5j3intMv4_0U&ehbc=2E312F&noprof=1'
  const resolvedMapTitle =
    mapTitle ||
    (settings as { serviceAreaMapTitle?: string })?.serviceAreaMapTitle ||
    'Service area map'

  const resolvedEmail = email || site.email
  const resolvedCallHref =
    callHref || (site.phone.startsWith('tel:') ? site.phone : `tel:${site.phone}`)
  const resolvedCallLabel = callLabel || `Call ${site.phoneDisplay}`
  const cityLinks = Object.fromEntries(
    cityPages.map((page) => [page.city, `/locations/${page.slug}`]),
  )
  const seoCities = cityPages.filter((page) => !offices.some((o) => o.slug === page.slug))
  const resolvedIntro =
    intro ||
    `We serve homes and businesses across Virginia, Maryland, and Washington, DC — with local offices in Burke and Bethesda`

  return (
    <section id="service_area" className="scroll-mt-24 bg-white py-16 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)] md:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 site-body leading-relaxed">
            {resolvedIntro}
            {seoCities.length > 0 ? (
              <>
                , including{' '}
                {seoCities.map((page, index) => (
                  <React.Fragment key={page.slug}>
                    {index > 0 ? (index === seoCities.length - 1 ? ' and ' : ', ') : null}
                    <Link
                      href={`/locations/${page.slug}`}
                      className="site-link"
                    >
                      {page.city}, {page.state}
                    </Link>
                  </React.Fragment>
                ))}
              </>
            ) : null}
            .
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {regions.map((region) => (
            <div
              key={region.name}
              className="site-card site-card-filled site-card-hover flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6"
            >
              <div className="min-w-[140px] shrink-0">
                <h3 className="font-display text-xl font-semibold text-[var(--site-heading)]">
                  {region.name}
                </h3>
              </div>
              <div className="flex flex-1 flex-wrap items-center gap-x-2 gap-y-2 text-sm site-body">
                {region.cities.map((city, i) => (
                  <React.Fragment key={city}>
                    {i > 0 ? <span className="text-[#c5d0db]">·</span> : null}
                    {cityLinks[city] ? (
                      <Link href={cityLinks[city]} className="site-link font-medium">
                        {city}
                      </Link>
                    ) : (
                      <span>{city}</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="shrink-0 sm:text-right">
                {region.href && region.linkLabel ? (
                  <Link
                    href={region.href}
                    className="text-sm site-link"
                  >
                    {region.linkLabel} →
                  </Link>
                ) : region.emptyLinkLabel ? (
                  <span className="text-sm site-muted">{region.emptyLinkLabel}</span>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden border border-[var(--site-border)] bg-[var(--site-muted)]">
          <iframe
            title={resolvedMapTitle}
            src={resolvedMapUrl}
            className="h-[340px] w-full md:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {offices.length > 0 ? (
          <div id="offices" className="mt-14 scroll-mt-24">
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)] md:text-4xl">
              {officesHeading}
            </h2>
            <div className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-2">
              {offices.map((office) => (
                <Link
                  key={office.slug}
                  href={`/locations/${office.slug}`}
                  className="site-card site-card-hover group p-6"
                >
                  <p className="text-sm font-semibold tracking-[0.18em] text-[var(--site-link)] uppercase">
                    {office.state}
                  </p>
                  <p className="mt-2 font-display text-xl font-semibold text-[var(--site-heading)]">
                    {office.city}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed site-body">
                    {office.streetAddress}
                    <br />
                    {office.city}, {office.state} {office.postalCode}
                  </p>
                  <p className="mt-3 text-sm font-medium text-[var(--site-heading)]">
                    {formatPhone(office.phone)}
                  </p>
                  <span className="mt-5 inline-block site-link text-sm group-hover:underline">
                    View location page →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-4">
          <a
            href={resolvedCallHref}
            className="site-btn site-btn-primary"
          >
            {resolvedCallLabel}
          </a>
          <a
            href={`mailto:${resolvedEmail}`}
            className="site-btn site-btn-tertiary"
          >
            {resolvedEmail}
          </a>
          <Link
            href={estimateHref}
            className="site-btn site-btn-secondary"
          >
            {estimateLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
