import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { ContactForm } from '@/components/ContactForm'
import { ReviewsSection } from '@/components/ReviewsSection'
import { ServiceArea } from '@/components/ServiceArea'
import { ServiceOfferCards } from '@/components/ServiceOfferCards'
import { JsonLd } from '@/components/JsonLd'
import { SiteButton, siteButtonVariant } from '@/components/SiteButton'
import type { BlogIndexItem } from '@/utilities/blog'
import type { HomeSection } from '@/utilities/homeSections'
import type { OfficeContent } from '@/utilities/offices'
import { appearanceVars } from '@/utilities/theme'
import {
  absoluteUrl,
  breadcrumb,
  businessNode,
  faqNode,
  jsonLd,
  officeBranchNode,
  organizationNode,
  serviceOfferNode,
  webPageNode,
  websiteNode,
  type SiteSeo,
} from '@/utilities/seo'
import type { ServiceCard } from '@/utilities/services'

function SectionShell({
  id,
  tone,
  appearance,
  children,
  className = '',
}: {
  id?: string
  tone?: string
  appearance?: HomeSection['appearance']
  children: React.ReactNode
  className?: string
}) {
  const style = appearanceVars(appearance, tone) as React.CSSProperties
  return (
    <section
      id={id}
      className={`site-section scroll-mt-24 py-16 md:py-20 ${className}`}
      data-card-style={
        appearance?.cardStyle && appearance.cardStyle !== 'inherit'
          ? appearance.cardStyle
          : undefined
      }
      data-list-style={
        appearance?.listStyle && appearance.listStyle !== 'inherit'
          ? appearance.listStyle
          : undefined
      }
      style={style}
    >
      {children}
    </section>
  )
}

export async function HomePageView({
  sections,
  faqItems,
  services,
  posts,
  offices,
  reviews,
  site,
}: {
  sections: HomeSection[]
  faqItems: Array<{ q: string; a: string }>
  services: ServiceCard[]
  posts: BlogIndexItem[]
  offices: OfficeContent[]
  reviews: Array<{
    initials: string
    author: string
    text: string
    rating: number
    googleUrl: string
    officeLabel?: string
  }>
  site: SiteSeo
}) {
  const homeUrl = absoluteUrl('/')
  const primaryOffice = offices.find((o) => o.slug === 'bethesda') || offices[0] || null
  const hero = sections.find((section) => section.type === 'hero')
  const structuredData = jsonLd([
    organizationNode(site, primaryOffice),
    websiteNode(site),
    webPageNode({
      path: '/',
      name: site.defaultMetaTitle,
      description: site.defaultMetaDescription,
      aboutId: `${homeUrl}#business`,
      breadcrumbId: `${homeUrl}#breadcrumb`,
      image: hero?.image || site.defaultOgImage,
    }),
    breadcrumb([{ name: 'Home', path: '/' }], '/'),
    businessNode(
      site,
      offices,
      services.map((s) => ({ title: s.title, slug: s.slug, price: s.price })),
    ),
    ...offices.map((office) => officeBranchNode(office, site)),
    ...services.map((service) =>
      serviceOfferNode({
        title: service.title,
        slug: service.slug,
        description: service.summary,
        price: service.price,
        image: service.thumb || site.defaultOgImage,
        site,
        idMode: 'home',
      }),
    ),
    faqNode(faqItems, {
      pagePath: '/',
      aboutId: `${homeUrl}#business`,
      publisherId: `${homeUrl}#organization`,
    }),
  ])

  return (
    <main>
      <JsonLd data={structuredData} />
      {sections.map((section, index) => {
        const key = `${section.type}-${section.anchorId || section.heading || index}`

        if (section.type === 'hero') {
          const heroStyle = appearanceVars(section.appearance, section.tone || 'dark') as React.CSSProperties
          return (
            <section
              key={key}
              className="site-hero min-h-[88vh]"
              style={heroStyle}
            >
              <div aria-hidden className="site-hero-wash" />
              <div className="container relative grid min-h-[88vh] gap-10 py-28 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24">
                <div>
                  {section.eyebrow ? (
                    <p className="font-display text-sm font-semibold tracking-[0.28em] text-[var(--site-link-on-dark)] uppercase">
                      {section.eyebrow}
                    </p>
                  ) : null}
                  <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.05] font-semibold tracking-tight text-[var(--site-on-dark)] sm:text-5xl md:text-6xl">
                    {section.heading}
                  </h1>
                  {section.subheadline ? (
                    <p className="site-copy-on-dark mt-6 max-w-xl text-base sm:text-lg">
                      {section.subheadline}
                    </p>
                  ) : null}
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    {section.ctaLabel && section.ctaHref ? (
                      <SiteButton
                        href={section.ctaHref}
                        variant={siteButtonVariant(section.appearance?.ctaVariant, 'primary')}
                      >
                        {section.ctaLabel}
                      </SiteButton>
                    ) : null}
                    {section.phoneDisplay && section.phoneHref ? (
                      <a href={section.phoneHref} className="site-btn site-btn-ghost-on-dark">
                        {section.phoneDisplay}
                      </a>
                    ) : null}
                  </div>
                </div>
                {section.image ? (
                  <div className="site-media relative aspect-[4/3] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                    <Image
                      src={section.image}
                      alt={section.imageAlt || section.heading || ''}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 520px"
                    />
                  </div>
                ) : null}
              </div>
            </section>
          )
        }

        if (section.type === 'prose') {
          return (
            <SectionShell key={key} id={section.anchorId} tone={section.tone} appearance={section.appearance}>
              <div className="container max-w-4xl">
                {section.heading ? (
                  <h2 className="site-heading text-3xl font-semibold tracking-tight md:text-4xl">
                    {section.heading}
                  </h2>
                ) : null}
                {(section.paragraphs || []).map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="mt-5 site-body leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {section.closingText && section.phoneDisplay && section.phoneHref ? (
                  <p className="mt-5 site-body leading-relaxed">
                    {section.closingText}{' '}
                    <a
                      className="site-link"
                      href={section.phoneHref}
                    >
                      {section.phoneDisplay}
                    </a>
                    .
                  </p>
                ) : null}
              </div>
            </SectionShell>
          )
        }

        if (section.type === 'offers') {
          return (
            <SectionShell key={key} id={section.anchorId} tone={section.tone || 'muted'} appearance={section.appearance}>
              <div className="container">
                {section.heading ? (
                  <h2 className="site-heading text-3xl font-semibold tracking-tight md:text-4xl">
                    {section.heading}
                  </h2>
                ) : null}
                {section.intro ? (
                  <p className="mt-3 max-w-2xl site-body">{section.intro}</p>
                ) : null}
                <ServiceOfferCards services={services} />
              </div>
            </SectionShell>
          )
        }

        if (section.type === 'pricing') {
          return (
            <SectionShell key={key} id={section.anchorId} tone={section.tone} appearance={section.appearance}>
              <div className="container max-w-4xl">
                {section.heading ? (
                  <h2 className="site-heading text-3xl font-semibold tracking-tight md:text-4xl">
                    {section.heading}
                  </h2>
                ) : null}
                {section.intro ? <p className="mt-3 site-body">{section.intro}</p> : null}
                {(section.highlights || []).length ? (
                  <ul className="mt-8 space-y-3">
                    {section.highlights!.map((item) => (
                      <li key={item} className="flex gap-3 text-[var(--site-heading)]">
                        <span className="site-list-marker" />
                        <span className="font-semibold">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {(section.paragraphs || []).map((paragraph, i) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className={`${i === 0 ? 'mt-6' : 'mt-4'} site-body leading-relaxed`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </SectionShell>
          )
        }

        if (section.type === 'featureSplit') {
          const imageFirst = section.imagePosition === 'left'
          return (
            <SectionShell key={key} id={section.anchorId} tone={section.tone} appearance={section.appearance}>
              <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
                <div className={imageFirst ? undefined : 'lg:order-2'}>
                  {section.image ? (
                    <div className="site-media relative aspect-[4/3]">
                      <Image
                        src={section.image}
                        alt={section.imageAlt || section.heading || ''}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  ) : null}
                </div>
                <div className={imageFirst ? undefined : 'lg:order-1'}>
                  {section.heading ? (
                    <h2 className="site-heading text-3xl font-semibold tracking-tight">
                      {section.heading}
                    </h2>
                  ) : null}
                  <div className="mt-5 space-y-4 site-body leading-relaxed">
                    {(section.paragraphs || []).map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                    {section.ctaLabel && section.ctaHref ? (
                      <SiteButton
                        href={section.ctaHref}
                        variant={siteButtonVariant(section.appearance?.ctaVariant, 'secondary')}
                        className="mt-8"
                      >
                        {section.ctaLabel}
                      </SiteButton>
                    ) : null}
                </div>
              </div>
            </SectionShell>
          )
        }

        if (section.type === 'cardGrid') {
          return (
            <SectionShell key={key} id={section.anchorId} tone={section.tone || 'muted'} appearance={section.appearance}>
              <div className="container">
                {section.heading ? (
                  <h2 className="site-heading text-3xl font-semibold tracking-tight md:text-4xl">
                    {section.heading}
                  </h2>
                ) : null}
                {section.intro ? (
                  <p className="mt-3 max-w-2xl site-body">
                    {section.intro}
                    {section.phoneDisplay && section.phoneHref ? (
                      <>
                        {' '}
                        <a
                          className="site-link"
                          href={section.phoneHref}
                        >
                          {section.phoneDisplay}
                        </a>
                        .
                      </>
                    ) : null}
                  </p>
                ) : null}
                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {(section.items || []).map((item) => (
                    <div key={item.title} className="site-card p-5">
                      <h3 className="site-heading text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed site-body">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionShell>
          )
        }

        if (section.type === 'steps') {
          return (
            <SectionShell key={key} id={section.anchorId} tone={section.tone} appearance={section.appearance}>
              <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
                {section.image ? (
                  <div className="site-media relative aspect-[4/3]">
                    <Image
                      src={section.image}
                      alt={section.imageAlt || section.heading || ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ) : null}
                <div>
                  {section.heading ? (
                    <h2 className="site-heading text-3xl font-semibold tracking-tight">
                      {section.heading}
                    </h2>
                  ) : null}
                  {section.intro ? <p className="mt-3 site-body">{section.intro}</p> : null}
                  <ol className="mt-8 space-y-5">
                    {(section.steps || []).map((step, i) => (
                      <li key={step.title} className="flex gap-4">
                        <span className="site-step-index">
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold text-[var(--site-heading)]">{step.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed site-body">{step.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </SectionShell>
          )
        }

        if (section.type === 'serviceArea') {
          return (
            <ServiceArea
              key={key}
              heading={section.heading}
              intro={section.intro}
              callHref={section.phoneHref}
              callLabel={
                section.phoneDisplay
                  ? `Call ${section.phoneDisplay}`
                  : undefined
              }
            />
          )
        }

        if (section.type === 'blogTeaser') {
          return (
            <SectionShell key={key} id={section.anchorId || 'blog'} tone={section.tone || 'muted'} appearance={section.appearance}>
              <div className="container">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    {section.heading ? (
                      <h2 className="site-heading text-3xl font-semibold tracking-tight md:text-4xl">
                        {section.heading}
                      </h2>
                    ) : null}
                    {section.intro ? (
                      <p className="mt-3 max-w-2xl site-body">{section.intro}</p>
                    ) : null}
                  </div>
                  {section.viewAllLabel ? (
                    <Link
                      href={section.viewAllHref || '/blog'}
                      className="text-sm site-link"
                    >
                      {section.viewAllLabel}
                    </Link>
                  ) : null}
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="site-card site-card-hover group flex h-full flex-col overflow-hidden"
                    >
                      <div className="site-media relative aspect-[16/10]">
                        <Image
                          src={post.hero}
                          alt={post.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="site-heading text-lg font-semibold">
                          {post.title}
                        </h3>
                        <p className="mt-3 line-clamp-3 flex-1 text-sm site-body">
                          {post.description}
                        </p>
                        <span className="site-link mt-5 text-sm group-hover:underline">
                          {section.cardLinkLabel || 'Read article'}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </SectionShell>
          )
        }

        if (section.type === 'faq') {
          return (
            <SectionShell key={key} id={section.anchorId} tone={section.tone} appearance={section.appearance}>
              <div className="container max-w-4xl">
                {section.heading ? (
                  <h2 className="site-heading text-3xl font-semibold tracking-tight md:text-4xl">
                    {section.heading}
                  </h2>
                ) : null}
                {section.intro ? (
                  <p className="mt-3 site-body">
                    {section.intro}
                    {section.phoneDisplay && section.phoneHref ? (
                      <>
                        {' '}
                        <a
                          className="site-link"
                          href={section.phoneHref}
                        >
                          {section.phoneDisplay}
                        </a>{' '}
                        {section.phoneSuffix || ''}
                      </>
                    ) : null}
                  </p>
                ) : null}
                <div className="mt-8 space-y-3">
                  {(section.faqItems || []).map((item) => (
                    <details key={item.q} className="site-card px-5 py-4">
                      <summary className="cursor-pointer font-medium text-[var(--site-heading)]">{item.q}</summary>
                      <p className="mt-3 text-sm leading-relaxed site-body">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </SectionShell>
          )
        }

        if (section.type === 'reviews') {
          return (
            <SectionShell key={key} id={section.anchorId} tone={section.tone || 'muted'} appearance={section.appearance}>
              <ReviewsSection
                reviews={reviews}
                heading={section.heading}
                intro={section.intro}
              />
            </SectionShell>
          )
        }

        if (section.type === 'contact') {
          return (
            <div key={key} id={section.anchorId || 'contact'} className="site-section scroll-mt-24">
              <ContactForm
                sourcePage="/"
                heading={section.heading}
                intro={section.intro}
                phoneDisplay={section.phoneDisplay}
                phoneHref={section.phoneHref}
              />
            </div>
          )
        }

        return null
      })}
    </main>
  )
}
