import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { ContactForm } from '@/components/ContactForm'
import { ReviewsSection } from '@/components/ReviewsSection'
import { ServiceArea } from '@/components/ServiceArea'
import { ServiceOfferCards } from '@/components/ServiceOfferCards'
import { SiteButton, siteButtonVariant } from '@/components/SiteButton'
import { TextWithLinks } from '@/components/TextWithLinks'
import { TrustBadges, type TrustBadgeItem } from '@/components/TrustBadges'
import type { BlogIndexItem } from '@/utilities/blog'
import { flattenPageSections, type HomeSection } from '@/utilities/homeSections'
import { hydrateIncludes } from '@/utilities/partials'
import { appearanceVars, sectionDividerClass, sectionPadClass } from '@/utilities/theme'
import { getCachedGlobalSafe } from '@/utilities/getGlobals'
import { resolveCmsImage } from '@/utilities/cmsImage'
import type { ServiceCard } from '@/utilities/services'

function SectionShell({
  id,
  tone,
  appearance,
  children,
  className = '',
  defaultPadding = 'default',
  fallbackBg,
}: {
  id?: string
  tone?: string
  appearance?: HomeSection['appearance']
  children: React.ReactNode
  className?: string
  defaultPadding?: 'default' | 'compact' | 'none'
  fallbackBg?: string
}) {
  const style = appearanceVars(appearance, tone, fallbackBg) as React.CSSProperties
  return (
    <section
      id={id}
      className={`site-section scroll-mt-24 ${sectionPadClass(appearance?.padding, defaultPadding)} ${sectionDividerClass(appearance?.divider)} ${className}`.trim()}
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

function CheckList({ items }: { items: string[] }) {
  if (!items.length) return null
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[var(--site-heading)]">
          <span className="site-list-marker" />
          <span>
            <TextWithLinks text={item} />
          </span>
        </li>
      ))}
    </ul>
  )
}

function gridColsClass(cols?: 2 | 3 | 4) {
  if (cols === 2) return 'md:grid-cols-2'
  if (cols === 3) return 'md:grid-cols-2 xl:grid-cols-3'
  return 'md:grid-cols-2 xl:grid-cols-4'
}

async function defaultTrustBadges(): Promise<TrustBadgeItem[]> {
  const settings = await getCachedGlobalSafe('site-settings', 1)
  return ((settings?.trustBadges || []) as Array<{
    image?: unknown
    src?: string | null
    alt?: string | null
    width?: number | null
    height?: number | null
  }>)
    .map((badge) => ({
      src: resolveCmsImage(badge.image, badge.src) || '',
      alt: badge.alt || '',
      width: badge.width || undefined,
      height: badge.height || undefined,
    }))
    .filter((badge) => badge.src && badge.alt)
}

export type RenderPageSectionsProps = {
  sections: HomeSection[]
  services?: ServiceCard[]
  posts?: BlogIndexItem[]
  reviews?: Array<{
    initials: string
    author: string
    text: string
    rating: number
    googleUrl: string
    officeLabel?: string
  }>
  sourcePage?: string
  offersExcludeSlug?: string
  defaultPhoneDisplay?: string
  defaultPhoneHref?: string
}

export async function RenderPageSections({
  sections,
  services = [],
  posts = [],
  reviews = [],
  sourcePage = '/',
  offersExcludeSlug,
  defaultPhoneDisplay,
  defaultPhoneHref,
}: RenderPageSectionsProps) {
  const offerCards = offersExcludeSlug
    ? services.filter((service) => service.slug !== offersExcludeSlug)
    : services

  const resolved = flattenPageSections(await hydrateIncludes(sections))

  const nodes = await Promise.all(
    resolved.map(async (section, index) => {
      const key = `${section.type}-${section.anchorId || section.heading || index}`

      if (section.type === 'hero') {
        const heroStyle = appearanceVars(section.appearance, section.tone || 'dark') as React.CSSProperties
        return (
          <section key={key} className="site-hero min-h-[88vh]" style={heroStyle}>
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
                  <TextWithLinks text={paragraph} />
                </p>
              ))}
              <CheckList items={section.highlights || []} />
              {section.closingText && section.phoneDisplay && section.phoneHref ? (
                <p className="mt-5 site-body leading-relaxed">
                  {section.closingText}{' '}
                  <a className="site-link" href={section.phoneHref}>
                    {section.phoneDisplay}
                  </a>
                  .
                </p>
              ) : null}
              {section.ctaLabel && section.ctaHref ? (
                <SiteButton
                  href={section.ctaHref}
                  variant={siteButtonVariant(section.appearance?.ctaVariant, 'primary')}
                  className="mt-8"
                >
                  {section.ctaLabel}
                </SiteButton>
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
                <p className="mt-3 max-w-2xl site-body">
                  <TextWithLinks text={section.intro} />
                  {section.phoneDisplay && section.phoneHref ? (
                    <>
                      {' '}
                      <a className="site-link" href={section.phoneHref}>
                        {section.phoneDisplay}
                      </a>
                    </>
                  ) : null}
                </p>
              ) : null}
              <ServiceOfferCards services={offerCards} />
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
              <CheckList items={section.highlights || []} />
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
                {section.intro ? <p className="mt-3 site-body">{section.intro}</p> : null}
                <div className="mt-5 space-y-4 site-body leading-relaxed">
                  {(section.paragraphs || []).map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>
                      <TextWithLinks text={paragraph} />
                    </p>
                  ))}
                </div>
                <CheckList items={section.highlights || []} />
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
                  <TextWithLinks text={section.intro} />
                  {section.phoneDisplay && section.phoneHref ? (
                    <>
                      {' '}
                      <a className="site-link" href={section.phoneHref}>
                        {section.phoneDisplay}
                      </a>
                      .
                    </>
                  ) : null}
                </p>
              ) : null}
              <div className={`mt-10 grid gap-5 ${gridColsClass(section.gridCols)}`}>
                {(section.items || []).map((item) => (
                  <div key={item.title} className="site-card p-5">
                    <h3 className="site-heading text-lg font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed site-body">
                      <TextWithLinks text={item.text} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionShell>
        )
      }

      if (section.type === 'steps') {
        if (section.stepsLayout === 'cards') {
          return (
            <SectionShell key={key} id={section.anchorId} tone={section.tone} appearance={section.appearance}>
              <div className="container">
                {section.heading ? (
                  <h2 className="site-heading text-3xl font-semibold tracking-tight">
                    {section.heading}
                  </h2>
                ) : null}
                {section.intro ? <p className="mt-3 max-w-3xl site-body">{section.intro}</p> : null}
                <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {(section.steps || []).map((step, i) => (
                    <div key={`${step.title}-${i}`} className="site-card p-5">
                      <p className="text-sm font-semibold tracking-[0.16em] text-[var(--site-link)] uppercase">
                        Step {i + 1}
                      </p>
                      {step.title ? (
                        <h3 className="mt-2 font-display text-xl font-semibold text-[var(--site-heading)]">
                          {step.title}
                        </h3>
                      ) : null}
                      <p className="mt-3 text-sm leading-relaxed site-body">
                        <TextWithLinks text={step.text} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionShell>
          )
        }

        const hasImage = Boolean(section.image)
        const hasCopy = Boolean(section.heading || section.intro || (section.paragraphs || []).length)

        return (
          <SectionShell key={key} id={section.anchorId} tone={section.tone} appearance={section.appearance}>
            <div
              className={
                hasImage || hasCopy
                  ? 'container grid gap-10 lg:grid-cols-2 lg:items-center'
                  : 'container'
              }
            >
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
              ) : hasCopy ? (
                <div>
                  {section.heading ? (
                    <h2 className="site-heading text-3xl font-semibold tracking-tight">
                      {section.heading}
                    </h2>
                  ) : null}
                  {section.intro ? <p className="mt-3 site-body">{section.intro}</p> : null}
                  {(section.paragraphs || []).map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="mt-4 site-body leading-relaxed">
                      <TextWithLinks text={paragraph} />
                    </p>
                  ))}
                </div>
              ) : null}
              <div>
                {hasImage || !hasCopy ? (
                  <>
                    {section.heading ? (
                      <h2 className="site-heading text-3xl font-semibold tracking-tight">
                        {section.heading}
                      </h2>
                    ) : null}
                    {section.intro ? <p className="mt-3 site-body">{section.intro}</p> : null}
                  </>
                ) : null}
                <ol className="mt-8 space-y-5">
                  {(section.steps || []).map((step, i) => (
                    <li key={`${step.title}-${i}`} className="flex gap-4">
                      <span className="site-step-index">{i + 1}</span>
                      <div>
                        {step.title ? (
                          <h3 className="font-semibold text-[var(--site-heading)]">{step.title}</h3>
                        ) : null}
                        <p className="mt-1 text-sm leading-relaxed site-body">
                          <TextWithLinks text={step.text} />
                        </p>
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
            callHref={section.phoneHref || defaultPhoneHref}
            callLabel={
              section.phoneDisplay
                ? `Call ${section.phoneDisplay}`
                : defaultPhoneDisplay
                  ? `Call ${defaultPhoneDisplay}`
                  : undefined
            }
            mapEmbedUrl={section.mapEmbedUrl}
            mapTitle={section.mapTitle}
            regions={section.regions}
            tone={section.tone}
            appearance={section.appearance}
            anchorId={section.anchorId || 'service_area'}
          />
        )
      }

      if (section.type === 'blogTeaser') {
        return (
          <SectionShell
            key={key}
            id={section.anchorId || 'blog'}
            tone={section.tone || 'muted'}
            appearance={section.appearance}
          >
            <div className="container">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  {section.heading ? (
                    <h2 className="site-heading text-3xl font-semibold tracking-tight md:text-4xl">
                      {section.heading}
                    </h2>
                  ) : null}
                  {section.intro ? <p className="mt-3 max-w-2xl site-body">{section.intro}</p> : null}
                </div>
                {section.viewAllLabel ? (
                  <Link href={section.viewAllHref || '/blog'} className="text-sm site-link">
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
                      <h3 className="site-heading text-lg font-semibold">{post.title}</h3>
                      <p className="mt-3 line-clamp-3 flex-1 text-sm site-body">{post.description}</p>
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
                      <a className="site-link" href={section.phoneHref}>
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
                    <p className="mt-3 text-sm leading-relaxed site-body">
                      <TextWithLinks text={item.a} />
                    </p>
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
            <ReviewsSection reviews={reviews} heading={section.heading} intro={section.intro} />
          </SectionShell>
        )
      }

      if (section.type === 'contact') {
        return (
          <div key={key} id={section.anchorId || 'contact'} className="site-section scroll-mt-24">
            <ContactForm
              sourcePage={sourcePage}
              heading={section.heading}
              intro={section.intro}
              phoneDisplay={section.phoneDisplay || defaultPhoneDisplay}
              phoneHref={section.phoneHref || defaultPhoneHref}
              formId={section.formId}
            />
          </div>
        )
      }

      if (section.type === 'trustBadges') {
        const badges = section.badges?.length ? section.badges : await defaultTrustBadges()
        return (
          <SectionShell
            key={key}
            id={section.anchorId}
            tone={section.tone}
            appearance={section.appearance}
            defaultPadding="compact"
            fallbackBg="var(--site-badges)"
          >
            <TrustBadges badges={badges} />
          </SectionShell>
        )
      }

      if (section.type === 'gallery') {
        const photos = (section.photos || []).filter((photo) => photo.src)
        if (!photos.length) return null
        return (
          <SectionShell key={key} id={section.anchorId} tone={section.tone} appearance={section.appearance}>
            <div className="container">
              {section.heading ? (
                <h2 className="site-heading text-3xl font-semibold tracking-tight">
                  {section.heading}
                </h2>
              ) : null}
              {section.intro ? <p className="mt-3 max-w-3xl site-body">{section.intro}</p> : null}
              <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {photos.map((photo) => (
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
          </SectionShell>
        )
      }

      if (section.type === 'listColumns') {
        const cols = section.listColumns || []
        if (!cols.length) return null
        return (
          <SectionShell key={key} id={section.anchorId} tone={section.tone} appearance={section.appearance}>
            <div className={cols.length > 1 ? 'container grid gap-10 md:grid-cols-2' : 'container max-w-4xl'}>
              {cols.map((col) => (
                <div key={col.heading}>
                  {col.heading ? (
                    <h2 className="site-heading text-2xl font-semibold tracking-tight md:text-3xl">
                      {col.heading}
                    </h2>
                  ) : null}
                  <CheckList items={col.items} />
                </div>
              ))}
            </div>
          </SectionShell>
        )
      }

      return null
    }),
  )

  return <>{nodes}</>
}
