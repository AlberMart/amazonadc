import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { ContactForm } from '@/components/ContactForm'
import { ServiceArea } from '@/components/ServiceArea'
import { SpecialOffers } from '@/components/SpecialOffers'
import type { LocationContent } from '@/utilities/locations'
import { getAllServiceCards } from '@/utilities/services'

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[#0b1c2c]">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export async function LocationPage({ location }: { location: LocationContent }) {
  const cards = await getAllServiceCards()
  const offers = cards.map((service) => ({
    id: service.slug,
    title: service.title,
    slug: service.slug,
    price: service.price,
    compareAtPrice: service.compareAtPrice,
    summary: service.summary,
    thumb: service.thumb,
  }))

  const sibling =
    location.slug === 'burke'
      ? { href: '/locations/bethesda', label: 'Bethesda, MD' }
      : { href: '/locations/burke', label: 'Burke, VA' }

  return (
    <article>
      <section className="relative isolate overflow-hidden bg-[#0b1c2c] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(56,189,248,0.22),transparent_45%),linear-gradient(160deg,#0b1c2c_0%,#12324a_55%,#0b1c2c_100%)]"
        />
        <div className="container relative grid gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-20">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl leading-tight font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {location.title}
            </h1>
            <p className="mt-4 text-lg text-sky-100/90 md:text-xl">{location.headline}</p>
            <p className="mt-5 max-w-xl text-sky-50/85 leading-relaxed">{location.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`tel:${location.phone}`}
                className="rounded-md bg-amber-400 px-5 py-3 text-sm font-semibold text-[#0b1c2c] transition hover:bg-amber-300"
              >
                Call {location.phoneDisplay}
              </a>
              <Link
                href="#contact"
                className="rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/60"
              >
                Get a Free Estimate
              </Link>
            </div>
            <p className="mt-6 text-sm text-sky-100/80">
              {location.streetAddress}
              <br />
              {location.city}, {location.state} {location.postalCode}
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#12324a] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            <Image
              src={location.heroImage}
              alt={location.heroAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 520px"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7fa] py-16 md:py-20">
        <div className="container max-w-4xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c]">
            {location.about.heading}
          </h2>
          {location.about.paragraphs.map((p) => (
            <p key={p} className="mt-4 text-[#516579] leading-relaxed">
              {p}
            </p>
          ))}
          <div className="mt-8">
            <CheckList items={location.about.highlights} />
          </div>
        </div>
      </section>

      <SpecialOffers services={offers} title={location.offersTitle} />

      <section className="bg-[#f4f7fa] py-16 md:py-20">
        <div className="container">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c]">
            {location.services.heading}
          </h2>
          <p className="mt-3 max-w-3xl text-[#516579]">{location.services.intro}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {location.services.items.map((item) => (
              <div key={item.title} className="border border-[#d5dee8] bg-white p-5">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#0b1c2c]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#516579]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c]">
            {location.why.heading}
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {location.why.items.map((item) => (
              <div key={item.title} className="border border-[#d5dee8] bg-[#f8fafc] p-5">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#0b1c2c]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#516579]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7fa] py-16 md:py-20">
        <div className="container">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c]">
            {location.communities.heading}
          </h2>
          <p className="mt-3 max-w-3xl text-[#516579]">{location.communities.intro}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {location.communities.groups.map((group) => (
              <div key={group.title} className="border border-[#d5dee8] bg-white p-5">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#0b1c2c]">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#516579]">{group.places}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-[#516579]">
            Also serving from our{' '}
            <Link href={sibling.href} className="font-semibold text-sky-700 hover:underline">
              {sibling.label}
            </Link>{' '}
            office.
          </p>
        </div>
      </section>

      <ServiceArea
        locations={[
          {
            id: location.slug,
            title: location.title,
            slug: location.slug,
            city: location.city,
            state: location.state,
            streetAddress: location.streetAddress,
            postalCode: location.postalCode,
            phone: location.phone,
          },
          ...(location.slug === 'burke'
            ? [
                {
                  id: 'bethesda',
                  title: 'Air Duct Cleaning in Bethesda, MD',
                  slug: 'bethesda',
                  city: 'Bethesda',
                  state: 'MD',
                  streetAddress: '7815 Old Georgetown Rd Ste 201',
                  postalCode: '20814',
                  phone: '+13018094544',
                },
              ]
            : [
                {
                  id: 'burke',
                  title: 'Air Duct Cleaning in Burke, VA',
                  slug: 'burke',
                  city: 'Burke',
                  state: 'VA',
                  streetAddress: '5641 Burke Centre Pkwy Ste 119',
                  postalCode: '22015',
                  phone: '+15714600001',
                },
              ]),
        ]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c]">
            {location.process.heading}
          </h2>
          <p className="mt-3 max-w-3xl text-[#516579]">{location.process.intro}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {location.process.steps.map((step, i) => (
              <div key={step.title} className="border border-[#d5dee8] bg-[#f8fafc] p-5">
                <p className="text-sm font-semibold tracking-[0.16em] text-sky-700 uppercase">
                  Step {i + 1}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[#0b1c2c]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#516579]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7fa] py-16 md:py-20">
        <div className="container max-w-4xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c]">
            Frequently Asked Questions — {location.city} Location
          </h2>
          <p className="mt-3 text-[#516579]">{location.faqIntro}</p>
          <div className="mt-8 space-y-3">
            {location.faq.map((item) => (
              <details key={item.q} className="border border-[#d5dee8] bg-white px-4 py-3">
                <summary className="cursor-pointer font-semibold text-[#0b1c2c]">{item.q}</summary>
                <p className="mt-3 text-[#516579] leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div id="contact">
        <ContactForm
          sourcePage={`/locations/${location.slug}`}
          phoneDisplay={location.phoneDisplay}
          phoneHref={location.phone}
        />
      </div>
    </article>
  )
}
