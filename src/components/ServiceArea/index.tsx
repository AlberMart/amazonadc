import Link from 'next/link'
import React from 'react'

export type ServiceAreaLocation = {
  id: string | number
  title: string
  slug: string
  city?: string | null
  state?: string | null
  streetAddress?: string | null
  postalCode?: string | null
  phone?: string | null
}

const regions = [
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
    href: null,
    linkLabel: null,
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

export function ServiceArea({
  locations,
}: {
  locations: ServiceAreaLocation[]
}) {
  return (
    <section id="service_area" className="bg-white py-16 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c] md:text-4xl">
            Service Area
          </h2>
          <p className="mt-4 text-[#516579] leading-relaxed">
            We serve homes and businesses across Virginia, Maryland, and Washington, DC — with
            local offices in Burke and Bethesda.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {regions.map((region) => (
            <div
              key={region.name}
              className="flex flex-col gap-4 border border-[#d5dee8] bg-[#f8fafc] px-5 py-5 transition hover:border-sky-300 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6"
            >
              <div className="min-w-[140px] shrink-0">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#0b1c2c]">
                  {region.name}
                </h3>
              </div>
              <div className="flex flex-1 flex-wrap items-center gap-x-2 gap-y-2 text-sm text-[#516579]">
                {region.cities.map((city, i) => (
                  <React.Fragment key={city}>
                    {i > 0 ? <span className="text-[#c5d0db]">·</span> : null}
                    <span>{city}</span>
                  </React.Fragment>
                ))}
              </div>
              <div className="shrink-0 sm:text-right">
                {region.href && region.linkLabel ? (
                  <Link
                    href={region.href}
                    className="text-sm font-semibold text-sky-700 hover:underline"
                  >
                    {region.linkLabel} →
                  </Link>
                ) : (
                  <span className="text-sm text-[#7a8b9c]">All DC neighborhoods</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden border border-[#d5dee8] bg-[#f4f7fa]">
          <iframe
            title="Amazon Air Duct Cleaning service area map covering Virginia, Maryland, and Washington DC"
            src="https://www.google.com/maps/d/u/1/embed?mid=11Gt4y_RRlKcln8C0JIn5j3intMv4_0U&ehbc=2E312F&noprof=1"
            className="h-[340px] w-full md:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {locations.length > 0 ? (
          <div className="mt-14">
            <h3 className="text-center font-[family-name:var(--font-display)] text-2xl font-semibold text-[#0b1c2c]">
              Our offices
            </h3>
            <div className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-2">
              {locations.map((loc) => {
                const phoneDisplay = loc.phone ? formatPhone(loc.phone) : null
                return (
                  <Link
                    key={loc.id}
                    href={`/locations/${loc.slug}`}
                    className="group border border-[#d5dee8] bg-white p-6 transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_18px_40px_rgba(11,28,44,0.08)]"
                  >
                    <p className="text-sm font-semibold tracking-[0.18em] text-sky-700 uppercase">
                      {loc.state || 'Office'}
                    </p>
                    <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[#0b1c2c]">
                      {loc.city || loc.title}
                    </p>
                    {loc.streetAddress ? (
                      <p className="mt-3 text-sm leading-relaxed text-[#516579]">
                        {loc.streetAddress}
                        <br />
                        {loc.city}
                        {loc.state ? `, ${loc.state}` : ''}
                        {loc.postalCode ? ` ${loc.postalCode}` : ''}
                      </p>
                    ) : null}
                    {phoneDisplay && loc.phone ? (
                      <p className="mt-3 text-sm font-medium text-[#0b1c2c]">{phoneDisplay}</p>
                    ) : null}
                    <span className="mt-5 inline-block text-sm font-semibold text-sky-700 group-hover:underline">
                      View location page →
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        ) : null}

        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-4">
          <a
            href="tel:+18006063334"
            className="rounded-md bg-amber-400 px-5 py-3 text-sm font-semibold text-[#0b1c2c] transition hover:bg-amber-300"
          >
            Call (800) 606-3334
          </a>
          <a
            href="mailto:support@amazonadc.com"
            className="rounded-md border border-[#d5dee8] bg-white px-5 py-3 text-sm font-semibold text-[#0b1c2c] transition hover:border-sky-300"
          >
            support@amazonadc.com
          </a>
          <Link
            href="/#contact"
            className="rounded-md bg-[#0b1c2c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12324a]"
          >
            Free estimate
          </Link>
        </div>
      </div>
    </section>
  )
}
