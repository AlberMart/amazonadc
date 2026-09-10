import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { ContactForm } from '@/components/ContactForm'
import { ServiceArea } from '@/components/ServiceArea'
import { SpecialOffers } from '@/components/SpecialOffers'
import type { LegalPageContent } from '@/utilities/legal'
import { getAllServiceCards } from '@/utilities/services'

const offices = [
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

export async function LegalPage({ page }: { page: LegalPageContent }) {
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
              {page.title}
            </h1>
            <p className="mt-5 max-w-xl text-base text-sky-50/85 sm:text-lg">{page.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="tel:+18006063334"
                className="rounded-md bg-amber-400 px-5 py-3 text-sm font-semibold text-[#0b1c2c] transition hover:bg-amber-300"
              >
                (800) 606-3334
              </a>
              <Link
                href="/#contact"
                className="rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/60"
              >
                Contact us
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#12324a] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            <Image
              src="/img/Amazon.webp"
              alt={`${page.title} — Amazon Air Duct Cleaning`}
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
            {page.detailsHeading}
          </h2>

          <div className="mt-10 space-y-8">
            {page.sections.map((section) => (
              <div key={section.heading} className="border border-[#d5dee8] bg-white p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#0b1c2c]">
                  {section.heading}
                </h3>
                {section.intro ? (
                  <p className="mt-3 text-[#516579] leading-relaxed">{section.intro}</p>
                ) : null}
                {section.paragraphs?.map((p) => (
                  <p key={p} className="mt-3 text-[#516579] leading-relaxed">
                    {p}
                  </p>
                ))}
                {section.items?.length ? (
                  <ul className="mt-4 space-y-2">
                    {section.items.map((item) => {
                      const isEmail = item.includes('@')
                      const isPhone = item.startsWith('(') || item.startsWith('+')
                      return (
                        <li key={item} className="flex gap-3 text-[#0b1c2c]">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                          {isEmail ? (
                            <a className="text-sky-700 hover:underline" href={`mailto:${item}`}>
                              {item}
                            </a>
                          ) : isPhone ? (
                            <a className="text-sky-700 hover:underline" href="tel:+18006063334">
                              {item}
                            </a>
                          ) : (
                            <span>{item}</span>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>

          {page.closing ? (
            <p className="mt-8 font-medium text-[#0b1c2c]">{page.closing}</p>
          ) : null}

          <p className="mt-6 text-sm text-[#516579]">
            Questions? Email{' '}
            <a className="font-semibold text-sky-700 hover:underline" href="mailto:support@amazonadc.com">
              support@amazonadc.com
            </a>{' '}
            or call{' '}
            <a className="font-semibold text-sky-700 hover:underline" href="tel:+18006063334">
              (800) 606-3334
            </a>
            .
          </p>
        </div>
      </section>

      <SpecialOffers services={offers} title="Current Offers" />
      <ServiceArea locations={offices} />
      <ContactForm sourcePage={`/${page.slug}`} />
    </article>
  )
}
