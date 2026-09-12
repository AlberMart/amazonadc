import Image from 'next/image'
import React from 'react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ContactForm } from '@/components/ContactForm'
import { TextWithLinks } from '@/components/TextWithLinks'
import { ServiceArea } from '@/components/ServiceArea'
import { ServiceOfferCards } from '@/components/ServiceOfferCards'
import { RenderPageSections } from '@/components/RenderPageSections'
import {
  getRelatedServices,
  servicePrimaryCta,
  type ServiceContent,
} from '@/utilities/services'

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[var(--site-heading)]">
          <span className="site-list-marker" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export async function ServicePage({ service }: { service: ServiceContent }) {
  const related = await getRelatedServices(service.slug)
  const cta = servicePrimaryCta(service)
  const beforeAfter = (service.beforeAfter || []).filter((photo) => photo.src)
  const useSections = Boolean(service.sections?.length)

  return (
    <article>
      <section className="site-hero">
        <div
          aria-hidden
          className="site-hero-wash"
        />
        <div className="container relative grid gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-20">
          <div>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: service.title },
              ]}
            />
            <h1 className="font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {service.title}
            </h1>
            <p className="mt-6 text-3xl font-semibold text-white">
              {typeof service.price === 'number' ? (
                <>
                  ${service.price}
                  {typeof service.compareAtPrice === 'number' ? (
                    <span className="ml-3 text-lg font-normal text-sky-100/70 line-through">
                      ${service.compareAtPrice}
                    </span>
                  ) : null}
                </>
              ) : (
                <span className="text-2xl font-semibold sm:text-3xl">Free estimate</span>
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={cta.href}
                {...(cta.isCheckout
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="site-btn site-btn-primary"
              >
                {cta.label}
              </a>
              <a
                href="tel:+18006063334"
                className="rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/60"
              >
                (800) 606-3334
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] site-media shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            <Image
              src={service.heroImage}
              alt={service.heroAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 520px"
            />
          </div>
        </div>
      </section>

      {useSections ? (
        <RenderPageSections
          sections={service.sections || []}
          services={related}
          sourcePage={`/${service.slug}`}
          offersExcludeSlug={service.slug}
        />
      ) : (
        <>
      <section className="bg-[var(--site-muted)] py-16 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] site-media">
            <Image
              src={service.includesImage}
              alt={service.includesImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)]">
              What&apos;s included
            </h2>
            {service.includesIntro ? (
              <p className="mt-3 site-body">{service.includesIntro}</p>
            ) : null}
            <div className="mt-6">
              <CheckList items={service.includes} />
            </div>
            <a
              href={cta.href}
              {...(cta.isCheckout
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="mt-8 inline-flex site-btn site-btn-secondary"
            >
              {cta.label}
            </a>
          </div>
        </div>
      </section>

      {beforeAfter.length ? (
      <section className="bg-white py-16 md:py-20">
        <div className="container">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)]">
            Proof of Cleaning with Before/After photos
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {beforeAfter.map((photo) => (
              <div key={photo.src} className="relative aspect-[3/4] site-media">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      ) : null}

      {service.processAside ? (
        <section className="bg-[var(--site-dark)] py-16 text-white md:py-20">
          <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                {service.processAside.heading}
              </h2>
              {service.processAside.paragraphs.map((p) => (
                <p key={p} className="mt-4 site-copy-on-dark leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <ol className="space-y-5">
              {service.processAside.steps.map((step, i) => (
                <li key={`${step.title}-${i}`} className="flex gap-4">
                  <span className="site-step-index">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sky-50/90 leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {service.why ? (
        <section className="bg-[var(--site-muted)] py-16 md:py-20">
          <div className="container">
            <div
              className={
                service.why.image
                  ? 'grid gap-10 lg:grid-cols-2 lg:items-center'
                  : 'mx-auto max-w-3xl'
              }
            >
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)]">
                  {service.why.heading}
                </h2>
                {service.why.paragraphs.map((p) => (
                  <p key={p} className="mt-4 site-body leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              {service.why.image ? (
                <div className="relative aspect-[4/3] site-media">
                  <Image
                    src={service.why.image}
                    alt={service.why.imageAlt || service.why.heading}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {service.columns?.length ? (
        <section className="bg-white py-16 md:py-20">
          <div className="container grid gap-10 md:grid-cols-2">
            {service.columns.map((col) => (
              <div key={col.heading}>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--site-heading)] md:text-3xl">
                  {col.heading}
                </h2>
                <div className="mt-6">
                  <CheckList items={col.items} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {service.listBlocks?.map((block, index) => (
        <section
          key={block.heading}
          className={index % 2 === 0 ? 'bg-white py-16 md:py-20' : 'bg-[var(--site-muted)] py-16 md:py-20'}
        >
          <div className="container max-w-4xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)]">
              {block.heading}
            </h2>
            <div className="mt-6">
              <CheckList items={block.items} />
            </div>
          </div>
        </section>
      ))}

      {service.process ? (
        <section
          className={`${service.listBlocks?.length ? 'bg-white' : 'bg-[var(--site-muted)]'} py-16 md:py-20`}
        >
          <div className="container">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)]">
              {service.process.heading}
            </h2>
            {service.process.intro ? (
              <p className="mt-3 max-w-3xl site-body">{service.process.intro}</p>
            ) : null}
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {service.process.steps.map((step, i) => (
                <div key={step.title} className="site-card p-5">
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
      ) : null}

      {service.scheduleCta ? (
        <section className="bg-white py-16 md:py-20">
          <div className="container max-w-4xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)]">
              {service.scheduleCta.heading}
            </h2>
            {service.scheduleCta.paragraphs.map((p) => (
              <p key={p} className="mt-4 site-body leading-relaxed">
                {p}
              </p>
            ))}
            <a
              href={cta.href}
              {...(cta.isCheckout
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="mt-8 inline-flex site-btn site-btn-primary"
            >
              {cta.label}
            </a>
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="bg-[var(--site-muted)] py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)] md:text-4xl">
                More Services
              </h2>
              <p className="mt-3 site-body">
                Interested? Contact us at{' '}
                <a className="site-link font-medium" href="mailto:support@amazonadc.com">
                  support@amazonadc.com
                </a>
                , or{' '}
                <a className="site-link font-medium" href="tel:+18006063334">
                  (800) 606-3334
                </a>
              </p>
            </div>
            <ServiceOfferCards services={related} />
          </div>
        </section>
      ) : null}

      <section className="bg-white py-16 md:py-20">
        <div className="container max-w-4xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--site-heading)]">
            Frequently Asked Questions
          </h2>
          {service.faqIntro ? <p className="mt-3 site-body">{service.faqIntro}</p> : null}
          <div className="mt-8 space-y-3">
            {service.faq.map((item) => (
              <details
                key={item.q}
                className="site-card px-4 py-3"
              >
                <summary className="cursor-pointer font-semibold text-[var(--site-heading)]">{item.q}</summary>
                <p className="mt-3 site-body leading-relaxed">
                  <TextWithLinks text={item.a} />
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ServiceArea />
      <ContactForm sourcePage={`/${service.slug}`} />
        </>
      )}
    </article>
  )
}
