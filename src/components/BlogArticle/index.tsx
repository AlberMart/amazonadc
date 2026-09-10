import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { ContactForm } from '@/components/ContactForm'
import { ServiceArea, type ServiceAreaLocation } from '@/components/ServiceArea'
import { SpecialOffers, type OfferItem } from '@/components/SpecialOffers'
import type { BlogPost, BlogSection } from '@/utilities/blog'

function ListItem({ text }: { text: string }) {
  const colon = text.indexOf(':')
  if (colon > 0 && colon < 80) {
    const label = text.slice(0, colon + 1)
    const rest = text.slice(colon + 1).trim()
    return (
      <li className="flex gap-3 text-[#0b1c2c]">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
        <span>
          <span className="font-semibold">{label}</span>
          {rest ? ` ${rest}` : null}
        </span>
      </li>
    )
  }

  return (
    <li className="flex gap-3 text-[#0b1c2c]">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
      <span>{text}</span>
    </li>
  )
}

function SectionBlock({ section }: { section: BlogSection }) {
  const isToc =
    section.heading?.toLowerCase().includes('in this guide') ||
    section.id === 'table_of_contents'

  return (
    <section className="scroll-mt-28">
      {section.heading ? (
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[#0b1c2c] md:text-3xl">
          {section.heading}
        </h2>
      ) : null}

      {section.image ? (
        <div className="relative mt-6 aspect-[16/10] overflow-hidden bg-[#0b1c2c]">
          <Image
            src={section.image}
            alt={section.heading || 'Blog illustration'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 880px"
          />
        </div>
      ) : null}

      <div
        className={`space-y-4 text-[#516579] leading-relaxed ${section.heading || section.image ? 'mt-5' : ''}`}
      >
        {section.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {section.listItems.length > 0 ? (
        isToc ? (
          <ol className="mt-5 list-decimal space-y-2 pl-5 text-[#0b1c2c]">
            {section.listItems.map((item) => (
              <li key={item} className="pl-1">
                {item}
              </li>
            ))}
          </ol>
        ) : (
          <ul className="mt-5 space-y-3">
            {section.listItems.map((item) => (
              <ListItem key={item} text={item} />
            ))}
          </ul>
        )
      ) : null}
    </section>
  )
}

function ArticleColumn({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#f4f7fa] py-14 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl space-y-14 border border-[#d5dee8] bg-white px-6 py-10 shadow-[0_18px_40px_rgba(11,28,44,0.06)] md:px-12 md:py-12">
          {children}
        </div>
      </div>
    </div>
  )
}

export function BlogArticle({
  post,
  services,
  locations,
}: {
  post: BlogPost
  services: OfferItem[]
  locations: ServiceAreaLocation[]
}) {
  const offerBreak = Math.min(2, Math.max(1, post.sections.length - 1))
  const beforeOffers = post.sections.slice(0, offerBreak)
  const afterOffers = post.sections.slice(offerBreak)

  return (
    <article>
      <section className="relative isolate overflow-hidden bg-[#0b1c2c] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(56,189,248,0.22),transparent_45%),linear-gradient(160deg,#0b1c2c_0%,#12324a_55%,#0b1c2c_100%)]"
        />
        <div className="container relative grid gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-end md:py-20">
          <div>
            <p className="text-sm font-semibold tracking-[0.24em] text-sky-200 uppercase">Blog</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {post.headline || post.title}
            </h1>
            {post.description ? (
              <p className="mt-5 max-w-xl text-base text-sky-50/85 sm:text-lg">{post.description}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="rounded-md bg-amber-400 px-5 py-3 text-sm font-semibold text-[#0b1c2c] transition hover:bg-amber-300"
              >
                Get a Free Estimate
              </Link>
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
              src={post.heroImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 520px"
            />
          </div>
        </div>
      </section>

      <ArticleColumn>
        {beforeOffers.map((section, index) => (
          <SectionBlock
            key={`${section.id || section.heading || 'section'}-${index}`}
            section={section}
          />
        ))}
      </ArticleColumn>

      <SpecialOffers services={services} />

      <ArticleColumn>
        {afterOffers.map((section, index) => (
          <SectionBlock
            key={`${section.id || section.heading || 'section'}-after-${index}`}
            section={section}
          />
        ))}

        {post.faq.length > 0 ? (
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[#0b1c2c] md:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-6 space-y-3">
              {post.faq.map((item) => (
                <details
                  key={item.q}
                  className="border border-[#d5dee8] bg-[#f8fafc] px-4 py-3 open:bg-white"
                >
                  <summary className="cursor-pointer font-semibold text-[#0b1c2c]">{item.q}</summary>
                  <p className="mt-3 text-[#516579] leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#d5dee8] pt-8">
          <Link href="/blog" className="text-sm font-semibold text-sky-700 hover:underline">
            ← All articles
          </Link>
          <Link
            href="/#contact"
            className="rounded-md bg-[#0b1c2c] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#12324a]"
          >
            Book now
          </Link>
        </div>
      </ArticleColumn>

      <ServiceArea locations={locations} />
      <ContactForm sourcePage={`/blog/${post.slug}`} />
    </article>
  )
}
