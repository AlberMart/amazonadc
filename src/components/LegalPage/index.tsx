import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { ContactForm } from '@/components/ContactForm'
import { ServiceArea } from '@/components/ServiceArea'
import { SpecialOffers } from '@/components/SpecialOffers'
import type { LegalPageContent } from '@/utilities/legal'
import { getAllServiceCards } from '@/utilities/services'

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
      <section className="site-hero">
        <div
          aria-hidden
          className="site-hero-wash"
        />
        <div className="container relative grid gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-20">
          <div>
            <h1 className="font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-xl text-base site-copy-on-dark sm:text-lg">{page.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="tel:+18006063334"
                className="site-btn site-btn-primary"
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
          <div className="relative aspect-[4/3] site-media shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
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

      <section className="bg-[var(--site-muted)] py-16 md:py-20">
        <div className="container max-w-4xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)]">
            {page.detailsHeading}
          </h2>

          <div className="mt-10 space-y-8">
            {page.sections.map((section) => (
              <div key={section.heading} className="site-card p-6">
                <h3 className="font-display text-xl font-semibold text-[var(--site-heading)]">
                  {section.heading}
                </h3>
                {section.intro ? (
                  <p className="mt-3 site-body leading-relaxed">{section.intro}</p>
                ) : null}
                {section.paragraphs?.map((p) => (
                  <p key={p} className="mt-3 site-body leading-relaxed">
                    {p}
                  </p>
                ))}
                {section.items?.length ? (
                  <ul className="mt-4 space-y-2">
                    {section.items.map((item) => {
                      const isEmail = item.includes('@')
                      const isPhone = item.startsWith('(') || item.startsWith('+')
                      return (
                        <li key={item} className="flex gap-3 text-[var(--site-heading)]">
                          <span className="site-list-marker" />
                          {isEmail ? (
                            <a className="text-[var(--site-link)] hover:underline" href={`mailto:${item}`}>
                              {item}
                            </a>
                          ) : isPhone ? (
                            <a className="text-[var(--site-link)] hover:underline" href="tel:+18006063334">
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
            <p className="mt-8 font-medium text-[var(--site-heading)]">{page.closing}</p>
          ) : null}

          <p className="mt-6 text-sm site-body">
            Questions? Email{' '}
            <a className="site-link" href="mailto:support@amazonadc.com">
              support@amazonadc.com
            </a>{' '}
            or call{' '}
            <a className="site-link" href="tel:+18006063334">
              (800) 606-3334
            </a>
            .
          </p>
        </div>
      </section>

      <SpecialOffers services={offers} title="Current Offers" />
      <ServiceArea />
      <ContactForm sourcePage={`/${page.slug}`} />
    </article>
  )
}
