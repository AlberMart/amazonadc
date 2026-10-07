import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ContactForm } from '@/components/ContactForm'
import { OfficeProof } from '@/components/OfficeProof'
import { ServiceArea } from '@/components/ServiceArea'
import { SpecialOffers } from '@/components/SpecialOffers'
import { TextWithLinks } from '@/components/TextWithLinks'
import { RenderPageSections } from '@/components/RenderPageSections'
import { ReviewsSection } from '@/components/ReviewsSection'
import type { LocationContent } from '@/utilities/locations'
import { getAllOffices } from '@/utilities/offices'
import { resolveLocationPublicPhone } from '@/utilities/locationPhone'
import { getAllServiceCards } from '@/utilities/services'
import { getSiteSeo } from '@/utilities/seo'
import { locationContentToSections } from '@/utilities/sectionSeeds'

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[var(--site-heading)]">
          <span className="site-list-marker" />
          <TextWithLinks text={item} />
        </li>
      ))}
    </ul>
  )
}

export async function LocationPage({ location }: { location: LocationContent }) {
  const [cards, offices, site] = await Promise.all([
    getAllServiceCards(),
    getAllOffices(),
    getSiteSeo(),
  ])
  const offers = cards.map((service) => ({
    id: service.slug,
    title: service.title,
    slug: service.slug,
    price: service.price,
    compareAtPrice: service.compareAtPrice,
    summary: service.summary,
    thumb: service.thumb,
  }))

  const office = location.office
  const hubSibling = offices.find((o) => o.slug !== office.slug)
  const isHub = location.isOfficeHub

  const publicPhone = resolveLocationPublicPhone(location, site)
  const ctaDisplay = publicPhone.display
  const ctaHref = publicPhone.href
  const dispatchLabel =
    location.dispatchLabel ||
    (location.slug === 'washington-dc'
      ? 'our Burke and Bethesda offices'
      : `our ${office.city} office`)

  const officeReviews = office.featuredReviews.map((review) => ({
    ...review,
    officeLabel: `${office.city}, ${office.state}`,
  }))

  const hubSections = isHub ? locationContentToSections(location) : null
  const sectionsToRender = isHub
    ? hubSections
    : location.sections?.length
      ? location.sections
      : locationContentToSections(location)
  const renderViaSections = Boolean(sectionsToRender?.length)

  const ratingLine =
    isHub && office.aggregateReviewCount > 0
      ? `${office.aggregateRatingValue.toFixed(1).replace(/\.0$/, '')}★ · ${office.aggregateReviewCount} Google reviews`
      : null

  return (
    <article>
      <section className="site-hero">
        <div aria-hidden className="site-hero-wash" />
        <div className="container relative grid gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-20">
          <div>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Locations', href: '/locations' },
                { label: location.city },
              ]}
            />
            <h1 className="font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {location.title}
            </h1>
            <p className="mt-4 text-lg text-sky-100/90 md:text-xl">{location.headline}</p>
            <p className="mt-5 max-w-xl site-copy-on-dark leading-relaxed">{location.intro}</p>
            {ratingLine ? (
              <p className="mt-4 text-sm font-semibold text-amber-200/95">{ratingLine}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-4">
              {ctaHref ? (
                <a href={ctaHref} className="site-btn site-btn-primary">
                  Call {ctaDisplay}
                </a>
              ) : null}
              <Link
                href="#contact"
                className="rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/60"
              >
                Get a Free Estimate
              </Link>
              {isHub && office.googleBusinessUrl ? (
                <a
                  href={office.googleBusinessUrl}
                  className="rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/60"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Google reviews
                </a>
              ) : null}
            </div>
            <p className="mt-6 text-sm text-sky-100/80">
              {isHub ? (
                <>
                  {office.streetAddress}
                  <br />
                  {office.city}, {office.state} {office.postalCode}
                  <br />
                  Office line: {office.phoneDisplay}
                </>
              ) : (
                <>
                  Served from {dispatchLabel}
                  <br />
                  {office.streetAddress}, {office.city}, {office.state} {office.postalCode}
                </>
              )}
            </p>
          </div>
          <div className="relative aspect-[4/3] site-media shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
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

      {isHub ? (
        <OfficeProof
          office={office}
          heading={
            location.slug === 'burke'
              ? 'Burke Centre office — verify us on the map'
              : 'Old Georgetown Road office — verify us on the map'
          }
          intro={
            location.slug === 'burke'
              ? 'Northern Virginia desk for air duct cleaning, dryer vent cleaning, and duct mold treatment — plus truck staging you can verify on the map.'
              : 'Maryland desk for air duct cleaning, dryer vent cleaning (including condo risers), and duct mold treatment — with building-access notes before the truck rolls.'
          }
        />
      ) : null}

      {renderViaSections ? (
        <RenderPageSections
          sections={(sectionsToRender || []).map((section) =>
            section.type === 'serviceArea' && !isHub ? { ...section, compact: true } : section,
          )}
          services={cards}
          reviews={isHub ? officeReviews : undefined}
          sourcePage={`/locations/${location.slug}`}
          defaultPhoneDisplay={ctaDisplay}
          defaultPhoneHref={ctaHref}
        />
      ) : (
        <>
          <section className="bg-[var(--site-muted)] py-16 md:py-20">
            <div className="container max-w-4xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)]">
                {location.about.heading}
              </h2>
              {location.about.paragraphs.map((p) => (
                <p key={p} className="mt-4 site-body leading-relaxed">
                  <TextWithLinks text={p} />
                </p>
              ))}
              <div className="mt-8">
                <CheckList items={location.about.highlights} />
              </div>
            </div>
          </section>

          {isHub && officeReviews.length ? (
            <section className="bg-white py-16 md:py-20">
              <ReviewsSection
                reviews={officeReviews}
                heading={`Google reviews for the ${office.city} office`}
                intro={`${office.aggregateRatingValue}★ average from ${office.aggregateReviewCount} Google reviews for this office.`}
              />
            </section>
          ) : null}

          <SpecialOffers services={offers} title={location.offersTitle} />

          <section className="bg-[var(--site-muted)] py-16 md:py-20">
            <div className="container">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)]">
                {location.services.heading}
              </h2>
              <p className="mt-3 max-w-3xl site-body">{location.services.intro}</p>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {location.services.items.map((item) => (
                  <div key={item.title} className="site-card p-5">
                    <h3 className="font-display text-xl font-semibold text-[var(--site-heading)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed site-body">
                      <TextWithLinks text={item.text} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white py-16 md:py-20">
            <div className="container">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)]">
                {location.why.heading}
              </h2>
              <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {location.why.items.map((item) => (
                  <div key={item.title} className="site-card site-card-filled p-5">
                    <h3 className="font-display text-lg font-semibold text-[var(--site-heading)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed site-body">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[var(--site-muted)] py-16 md:py-20">
            <div className="container">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)]">
                {location.communities.heading}
              </h2>
              <p className="mt-3 max-w-3xl site-body">{location.communities.intro}</p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {location.communities.groups.map((group) => (
                  <div key={group.title} className="site-card p-5">
                    <h3 className="font-display text-lg font-semibold text-[var(--site-heading)]">
                      {group.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed site-body">
                      <TextWithLinks text={group.places} />
                    </p>
                  </div>
                ))}
              </div>
              {hubSibling ? (
                <p className="mt-8 text-sm site-body">
                  Also serving from our{' '}
                  <Link href={`/locations/${hubSibling.slug}`} className="site-link">
                    {hubSibling.city}, {hubSibling.state}
                  </Link>{' '}
                  office.
                </p>
              ) : null}
            </div>
          </section>

          <ServiceArea
            compact={!isHub}
            heading={`Serving ${location.city} from ${dispatchLabel}`}
            intro={`We cover ${location.city} and nearby communities from ${dispatchLabel}. For the full list of cities, see our locations index.`}
            callHref={ctaHref}
            callLabel={`Call ${ctaDisplay}`}
          />

          <section className="bg-white py-16 md:py-20">
            <div className="container">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)]">
                {location.process.heading}
              </h2>
              <p className="mt-3 max-w-3xl site-body">{location.process.intro}</p>
              <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {location.process.steps.map((step, i) => (
                  <div key={step.title} className="site-card site-card-filled p-5">
                    <p className="text-sm font-semibold tracking-[0.16em] text-[var(--site-link)] uppercase">
                      Step {i + 1}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-[var(--site-heading)]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed site-body">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[var(--site-muted)] py-16 md:py-20">
            <div className="container max-w-4xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)]">
                Frequently Asked Questions — {location.city}
              </h2>
              <p className="mt-3 site-body">{location.faqIntro}</p>
              <div className="mt-8 space-y-3">
                {location.faq.map((item) => (
                  <details key={item.q} className="site-card px-4 py-3">
                    <summary className="cursor-pointer font-semibold text-[var(--site-heading)]">
                      {item.q}
                    </summary>
                    <p className="mt-3 site-body leading-relaxed">
                      <TextWithLinks text={item.a} />
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <ContactForm
            sourcePage={`/locations/${location.slug}`}
            phoneDisplay={ctaDisplay}
            phoneHref={publicPhone.e164}
          />
        </>
      )}
    </article>
  )
}
