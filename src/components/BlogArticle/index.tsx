import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ContactForm } from '@/components/ContactForm'
import { ServiceArea } from '@/components/ServiceArea'
import { SpecialOffers, type OfferItem } from '@/components/SpecialOffers'
import { TextWithLinks } from '@/components/TextWithLinks'
import type { BlogPost, BlogSection } from '@/utilities/blog'

function ListItem({ text }: { text: string }) {
  const colon = text.indexOf(':')
  if (colon > 0 && colon < 80) {
    const label = text.slice(0, colon + 1)
    const rest = text.slice(colon + 1).trim()
    return (
      <li className="flex gap-3 text-[var(--site-heading)]">
        <span className="site-list-marker" />
        <span>
          <span className="font-semibold">{label}</span>
          {rest ? ` ${rest}` : null}
        </span>
      </li>
    )
  }

  return (
    <li className="flex gap-3 text-[var(--site-heading)]">
      <span className="site-list-marker" />
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
        <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--site-heading)] md:text-3xl">
          {section.heading}
        </h2>
      ) : null}

      {section.image ? (
        <div className="relative mt-6 aspect-[16/10] site-media">
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
        className={`space-y-4 site-body leading-relaxed ${section.heading || section.image ? 'mt-5' : ''}`}
      >
        {section.paragraphs.map((p, i) => (
          <p key={i}>
            <TextWithLinks text={p} />
          </p>
        ))}
      </div>

      {section.listItems.length > 0 ? (
        isToc ? (
          <ol className="mt-5 list-decimal space-y-2 pl-5 text-[var(--site-heading)]">
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
    <div className="bg-[var(--site-muted)] py-14 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl space-y-14 site-card px-6 py-10 shadow-[0_18px_40px_rgba(11,28,44,0.06)] md:px-12 md:py-12">
          {children}
        </div>
      </div>
    </div>
  )
}

export async function BlogArticle({
  post,
  services,
}: {
  post: BlogPost
  services: OfferItem[]
}) {
  const offerBreak = Math.min(2, Math.max(1, post.sections.length - 1))
  const beforeOffers = post.sections.slice(0, offerBreak)
  const afterOffers = post.sections.slice(offerBreak)

  return (
    <article>
      <section className="site-hero">
        <div
          aria-hidden
          className="site-hero-wash"
        />
        <div className="container relative grid gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-end md:py-20">
          <div>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: post.title },
              ]}
            />
            <p className="text-sm font-semibold tracking-[0.24em] text-[var(--site-link-on-dark)] uppercase">Blog</p>
            <h1 className="mt-4 font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {post.headline || post.title}
            </h1>
            {post.description ? (
              <p className="mt-5 max-w-xl text-base site-copy-on-dark sm:text-lg">{post.description}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="site-btn site-btn-primary"
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
          <div className="relative aspect-[4/3] site-media shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
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
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--site-heading)] md:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-6 space-y-3">
              {post.faq.map((item) => (
                <details
                  key={item.q}
                  className="site-card site-card-filled px-4 py-3 open:bg-white"
                >
                  <summary className="cursor-pointer font-semibold text-[var(--site-heading)]">{item.q}</summary>
                  <p className="mt-3 site-body leading-relaxed">
                    <TextWithLinks text={item.a} />
                  </p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--site-border)] pt-8">
          <Link href="/blog" className="text-sm site-link">
            ← All articles
          </Link>
          <Link
            href="/#contact"
            className="site-btn site-btn-secondary"
          >
            Book now
          </Link>
        </div>
      </ArticleColumn>

      <ServiceArea />
      <ContactForm sourcePage={`/blog/${post.slug}`} />
    </article>
  )
}
