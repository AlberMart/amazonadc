import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { ContactForm } from '@/components/ContactForm'
import { ReviewsSection } from '@/components/ReviewsSection'
import { ServiceArea, type ServiceAreaLocation } from '@/components/ServiceArea'
import { ServiceOfferCards } from '@/components/ServiceOfferCards'
import type { HomeContent } from '@/content/home'
import type { BlogIndexItem } from '@/utilities/blog'
import type { ServiceCard } from '@/utilities/services'

export function HomePageView({
  content,
  services,
  posts,
  locations,
}: {
  content: HomeContent
  services: ServiceCard[]
  posts: BlogIndexItem[]
  locations: ServiceAreaLocation[]
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://amazonadc.com/#organization',
        name: 'Amazon Air Duct Cleaning',
        url: 'https://amazonadc.com/',
        telephone: '+18006063334',
        email: 'support@amazonadc.com',
      },
      {
        '@type': ['HVACBusiness', 'HomeAndConstructionBusiness'],
        '@id': 'https://amazonadc.com/#business',
        name: 'Amazon Air Duct Cleaning',
        url: 'https://amazonadc.com/',
        telephone: '+18006063334',
        priceRange: '$$-$$$',
        areaServed: ['Virginia', 'Maryland', 'Washington DC'],
      },
      {
        '@type': 'FAQPage',
        mainEntity: content.faqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative isolate min-h-[88vh] overflow-hidden bg-[#0b1c2c] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(56,189,248,0.28),transparent_45%),radial-gradient(ellipse_at_80%_10%,rgba(251,191,36,0.18),transparent_40%),linear-gradient(160deg,#0b1c2c_0%,#12324a_55%,#0b1c2c_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22 viewBox=%220 0 80 80%22%3E%3Cpath fill=%22%23fff%22 d=%22M0 80V0h80v2H2v78z%22/%3E%3C/svg%3E')]"
        />

        <div className="container relative grid min-h-[88vh] gap-10 py-28 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24">
          <div>
            <p className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.28em] text-sky-200 uppercase animate-[fadeUp_0.7s_ease_both]">
              {content.heroEyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-semibold tracking-tight text-white sm:text-5xl md:text-6xl animate-[fadeUp_0.8s_ease_both]">
              {content.heroHeadline}
            </h1>
            <p className="mt-6 max-w-xl text-base text-sky-50/85 sm:text-lg animate-[fadeUp_0.95s_ease_both]">
              {content.heroSubheadline}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4 animate-[fadeUp_1.1s_ease_both]">
              <a
                href={content.heroCtaHref}
                className="rounded-md bg-amber-400 px-6 py-3 text-sm font-semibold text-[#0b1c2c] transition hover:bg-amber-300"
              >
                {content.heroCtaLabel}
              </a>
              <a
                href={content.heroPhoneHref}
                className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60"
              >
                {content.heroPhoneDisplay}
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#12324a] shadow-[0_24px_60px_rgba(0,0,0,0.35)] animate-[fadeUp_1s_ease_both]">
            <Image
              src={content.heroImage}
              alt={content.heroImageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 520px"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container max-w-4xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c] md:text-4xl">
            {content.aboutHeading}
          </h2>
          {content.aboutParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="mt-5 text-[#516579] leading-relaxed">
              {paragraph}
            </p>
          ))}
          {content.aboutClosing && content.aboutPhoneDisplay && content.aboutPhoneHref ? (
            <p className="mt-5 text-[#516579] leading-relaxed">
              {content.aboutClosing}{' '}
              <a
                className="font-semibold text-sky-700 hover:underline"
                href={content.aboutPhoneHref}
              >
                {content.aboutPhoneDisplay}
              </a>
              .
            </p>
          ) : null}
        </div>
      </section>

      <section className="bg-[#f4f7fa] py-16 md:py-20">
        <div className="container">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c] md:text-4xl">
            {content.offersHeading}
          </h2>
          <p className="mt-3 max-w-2xl text-[#516579]">{content.offersIntro}</p>
          <ServiceOfferCards services={services} />
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container max-w-4xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c] md:text-4xl">
            {content.pricingHeading}
          </h2>
          <p className="mt-3 text-[#516579]">{content.pricingIntro}</p>
          <ul className="mt-8 space-y-3">
            {content.pricingHighlights.map((item) => (
              <li key={item} className="flex gap-3 text-[#0b1c2c]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span className="font-semibold">{item}</span>
              </li>
            ))}
          </ul>
          {content.pricingParagraphs.map((paragraph, index) => (
            <p
              key={paragraph.slice(0, 48)}
              className={index === 0 ? 'mt-6 text-[#516579] leading-relaxed' : 'mt-4 text-[#516579] leading-relaxed'}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-[#f4f7fa] py-16 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c]">
              {content.airDuctHeading}
            </h2>
            <div className="mt-5 space-y-4 text-[#516579] leading-relaxed">
              {content.airDuctParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
            <Link
              href={content.airDuctCtaHref}
              className="mt-8 inline-flex rounded-md bg-[#0b1c2c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12324a]"
            >
              {content.airDuctCtaLabel}
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#0b1c2c]">
            <Image
              src={content.airDuctImage}
              alt={content.airDuctImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative order-2 aspect-[4/3] overflow-hidden bg-[#0b1c2c] lg:order-1">
            <Image
              src={content.dryerImage}
              alt={content.dryerImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c]">
              {content.dryerHeading}
            </h2>
            <div className="mt-5 space-y-4 text-[#516579] leading-relaxed">
              {content.dryerParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
            <Link
              href={content.dryerCtaHref}
              className="mt-8 inline-flex rounded-md bg-[#0b1c2c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12324a]"
            >
              {content.dryerCtaLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7fa] py-16 md:py-20">
        <div className="container">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c] md:text-4xl">
            {content.whyHeading}
          </h2>
          <p className="mt-3 max-w-2xl text-[#516579]">
            {content.whyIntro}
            {content.whyPhoneDisplay && content.whyPhoneHref ? (
              <>
                {' '}
                <a
                  className="font-semibold text-sky-700 hover:underline"
                  href={content.whyPhoneHref}
                >
                  {content.whyPhoneDisplay}
                </a>
                .
              </>
            ) : null}
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {content.whyItems.map((item) => (
              <div key={item.title} className="border border-[#d5dee8] bg-white p-5">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#0b1c2c]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#516579]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#0b1c2c]">
            <Image
              src={content.processImage}
              alt={content.processImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c]">
              {content.processHeading}
            </h2>
            <p className="mt-3 text-[#516579]">{content.processIntro}</p>
            <ol className="mt-8 space-y-5">
              {content.processSteps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-semibold text-[#0b1c2c]">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#0b1c2c]">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#516579]">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7fa] py-16 md:py-20">
        <div className="container">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c] md:text-4xl">
            {content.servicesHeading}
          </h2>
          <p className="mt-3 max-w-2xl text-[#516579]">{content.servicesIntro}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {content.serviceItems.map((item) => (
              <div key={item.title} className="border border-[#d5dee8] bg-white p-5">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#0b1c2c]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#516579]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceArea locations={locations} />

      <section className="bg-[#f4f7fa] py-16 md:py-20">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c] md:text-4xl">
                {content.blogHeading}
              </h2>
              <p className="mt-3 max-w-2xl text-[#516579]">{content.blogIntro}</p>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-sky-700 hover:underline">
              {content.blogViewAllLabel}
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden border border-[#d5dee8] bg-white transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_18px_40px_rgba(11,28,44,0.08)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0b1c2c]">
                  <Image
                    src={post.hero}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#0b1c2c]">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm text-[#516579]">{post.description}</p>
                  <span className="mt-5 text-sm font-semibold text-sky-700 group-hover:underline">
                    Read article
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container max-w-4xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#0b1c2c] md:text-4xl">
            {content.faqHeading}
          </h2>
          <p className="mt-3 text-[#516579]">
            {content.faqIntro}
            {content.faqPhoneDisplay && content.faqPhoneHref ? (
              <>
                {' '}
                <a
                  className="font-semibold text-sky-700 hover:underline"
                  href={content.faqPhoneHref}
                >
                  {content.faqPhoneDisplay}
                </a>{' '}
                or unlock special pricing online.
              </>
            ) : null}
          </p>
          <div className="mt-8 space-y-3">
            {content.faqItems.map((item) => (
              <details key={item.q} className="border border-[#d5dee8] px-5 py-4">
                <summary className="cursor-pointer font-medium text-[#0b1c2c]">{item.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-[#516579]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection
        reviews={content.reviews}
        heading={content.reviewsHeading}
        intro={content.reviewsIntro}
      />

      <div id="contact" className="bg-white">
        <ContactForm sourcePage="/" />
      </div>
    </main>
  )
}
