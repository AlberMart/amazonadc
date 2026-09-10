import Image from 'next/image'
import React from 'react'

import { ContactForm } from '@/components/ContactForm'
import { ServiceArea, type ServiceAreaLocation } from '@/components/ServiceArea'
import { ServiceOfferCards } from '@/components/ServiceOfferCards'
import {
  getRelatedServices,
  type ServiceContent,
} from '@/utilities/services'

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

export async function ServicePage({
  service,
  locations,
}: {
  service: ServiceContent
  locations: ServiceAreaLocation[]
}) {
  const related = await getRelatedServices(service.slug)

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
              {service.title}
            </h1>
            <p className="mt-6 text-3xl font-semibold text-white">
              ${service.price}
              <span className="ml-3 text-lg font-normal text-sky-100/70 line-through">
                ${service.compareAtPrice}
              </span>
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={service.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-amber-400 px-5 py-3 text-sm font-semibold text-[#0b1c2c] transition hover:bg-amber-300"
              >
                Order now
              </a>
              <a
                href="tel:+18006063334"
                className="rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/60"
              >
                (800) 606-3334
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#12324a] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
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

      <section className="bg-[#f4f7fa] py-16 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#0b1c2c]">
            <Image
              src={service.includesImage}
              alt={service.includesImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c]">
              What&apos;s included
            </h2>
            {service.includesIntro ? (
              <p className="mt-3 text-[#516579]">{service.includesIntro}</p>
            ) : null}
            <div className="mt-6">
              <CheckList items={service.includes} />
            </div>
            <a
              href={service.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-md bg-[#0b1c2c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12324a]"
            >
              Order now
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c]">
            Proof of Cleaning with Before/After photos
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {service.beforeAfter.map((photo) => (
              <div key={photo.src} className="relative aspect-[3/4] overflow-hidden bg-[#0b1c2c]">
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

      {service.processAside ? (
        <section className="bg-[#0b1c2c] py-16 text-white md:py-20">
          <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
                {service.processAside.heading}
              </h2>
              {service.processAside.paragraphs.map((p) => (
                <p key={p} className="mt-4 text-sky-50/85 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <ol className="space-y-5">
              {service.processAside.steps.map((step, i) => (
                <li key={`${step.title}-${i}`} className="flex gap-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-semibold text-[#0b1c2c]">
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
        <section className="bg-[#f4f7fa] py-16 md:py-20">
          <div className="container">
            <div
              className={
                service.why.image
                  ? 'grid gap-10 lg:grid-cols-2 lg:items-center'
                  : 'mx-auto max-w-3xl'
              }
            >
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c]">
                  {service.why.heading}
                </h2>
                {service.why.paragraphs.map((p) => (
                  <p key={p} className="mt-4 text-[#516579] leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              {service.why.image ? (
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0b1c2c]">
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
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[#0b1c2c] md:text-3xl">
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
          className={index % 2 === 0 ? 'bg-white py-16 md:py-20' : 'bg-[#f4f7fa] py-16 md:py-20'}
        >
          <div className="container max-w-4xl">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c]">
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
          className={`${service.listBlocks?.length ? 'bg-white' : 'bg-[#f4f7fa]'} py-16 md:py-20`}
        >
          <div className="container">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c]">
              {service.process.heading}
            </h2>
            {service.process.intro ? (
              <p className="mt-3 max-w-3xl text-[#516579]">{service.process.intro}</p>
            ) : null}
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {service.process.steps.map((step, i) => (
                <div key={step.title} className="border border-[#d5dee8] bg-white p-5">
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
      ) : null}

      {service.scheduleCta ? (
        <section className="bg-white py-16 md:py-20">
          <div className="container max-w-4xl text-center">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c]">
              {service.scheduleCta.heading}
            </h2>
            {service.scheduleCta.paragraphs.map((p) => (
              <p key={p} className="mt-4 text-[#516579] leading-relaxed">
                {p}
              </p>
            ))}
            <a
              href={service.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-md bg-amber-400 px-6 py-3 text-sm font-semibold text-[#0b1c2c] transition hover:bg-amber-300"
            >
              Order now
            </a>
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="bg-[#f4f7fa] py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c] md:text-4xl">
                More Air Duct Cleaning Services
              </h2>
              <p className="mt-3 text-[#516579]">
                Interested? Contact us at{' '}
                <a className="font-medium text-sky-700 hover:underline" href="mailto:support@amazonadc.com">
                  support@amazonadc.com
                </a>
                , or{' '}
                <a className="font-medium text-sky-700 hover:underline" href="tel:+18006063334">
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
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c]">
            Frequently Asked Questions
          </h2>
          {service.faqIntro ? <p className="mt-3 text-[#516579]">{service.faqIntro}</p> : null}
          <div className="mt-8 space-y-3">
            {service.faq.map((item) => (
              <details
                key={item.q}
                className="border border-[#d5dee8] bg-white px-4 py-3"
              >
                <summary className="cursor-pointer font-semibold text-[#0b1c2c]">{item.q}</summary>
                <p className="mt-3 text-[#516579] leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ServiceArea locations={locations} />
      <ContactForm sourcePage={`/${service.slug}`} />
    </article>
  )
}
