import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { HomeContent } from '@/content/home'
import { homeContentSeed } from '@/content/home'

function texts(rows?: Array<{ text?: string | null } | null> | null): string[] {
  return (rows || []).map((row) => row?.text || '').filter(Boolean)
}

function items(rows?: Array<{ item?: string | null } | null> | null): string[] {
  return (rows || []).map((row) => row?.item || '').filter(Boolean)
}

function mapHomeContent(raw: Record<string, unknown> | null | undefined): HomeContent {
  if (!raw) return homeContentSeed

  return {
    heroEyebrow: String(raw.heroEyebrow || homeContentSeed.heroEyebrow),
    heroHeadline: String(raw.heroHeadline || homeContentSeed.heroHeadline),
    heroSubheadline: String(raw.heroSubheadline || homeContentSeed.heroSubheadline),
    heroCtaLabel: String(raw.heroCtaLabel || homeContentSeed.heroCtaLabel),
    heroCtaHref: String(raw.heroCtaHref || homeContentSeed.heroCtaHref),
    heroPhoneDisplay: String(raw.heroPhoneDisplay || homeContentSeed.heroPhoneDisplay),
    heroPhoneHref: String(raw.heroPhoneHref || homeContentSeed.heroPhoneHref),
    heroImage: String(raw.heroImage || homeContentSeed.heroImage),
    heroImageAlt: String(raw.heroImageAlt || homeContentSeed.heroImageAlt),
    aboutHeading: String(raw.aboutHeading || homeContentSeed.aboutHeading),
    aboutParagraphs: texts(raw.aboutParagraphs as Array<{ text?: string | null }>) ||
      homeContentSeed.aboutParagraphs,
    aboutClosing: raw.aboutClosing ? String(raw.aboutClosing) : homeContentSeed.aboutClosing,
    aboutPhoneDisplay: raw.aboutPhoneDisplay
      ? String(raw.aboutPhoneDisplay)
      : homeContentSeed.aboutPhoneDisplay,
    aboutPhoneHref: raw.aboutPhoneHref
      ? String(raw.aboutPhoneHref)
      : homeContentSeed.aboutPhoneHref,
    offersHeading: String(raw.offersHeading || homeContentSeed.offersHeading),
    offersIntro: String(raw.offersIntro || homeContentSeed.offersIntro),
    pricingHeading: String(raw.pricingHeading || homeContentSeed.pricingHeading),
    pricingIntro: String(raw.pricingIntro || homeContentSeed.pricingIntro),
    pricingHighlights:
      items(raw.pricingHighlights as Array<{ item?: string | null }>) ||
      homeContentSeed.pricingHighlights,
    pricingParagraphs:
      texts(raw.pricingParagraphs as Array<{ text?: string | null }>) ||
      homeContentSeed.pricingParagraphs,
    airDuctHeading: String(raw.airDuctHeading || homeContentSeed.airDuctHeading),
    airDuctParagraphs:
      texts(raw.airDuctParagraphs as Array<{ text?: string | null }>) ||
      homeContentSeed.airDuctParagraphs,
    airDuctImage: String(raw.airDuctImage || homeContentSeed.airDuctImage),
    airDuctImageAlt: String(raw.airDuctImageAlt || homeContentSeed.airDuctImageAlt),
    airDuctCtaLabel: String(raw.airDuctCtaLabel || homeContentSeed.airDuctCtaLabel),
    airDuctCtaHref: String(raw.airDuctCtaHref || homeContentSeed.airDuctCtaHref),
    dryerHeading: String(raw.dryerHeading || homeContentSeed.dryerHeading),
    dryerParagraphs:
      texts(raw.dryerParagraphs as Array<{ text?: string | null }>) ||
      homeContentSeed.dryerParagraphs,
    dryerImage: String(raw.dryerImage || homeContentSeed.dryerImage),
    dryerImageAlt: String(raw.dryerImageAlt || homeContentSeed.dryerImageAlt),
    dryerCtaLabel: String(raw.dryerCtaLabel || homeContentSeed.dryerCtaLabel),
    dryerCtaHref: String(raw.dryerCtaHref || homeContentSeed.dryerCtaHref),
    whyHeading: String(raw.whyHeading || homeContentSeed.whyHeading),
    whyIntro: String(raw.whyIntro || homeContentSeed.whyIntro),
    whyPhoneDisplay: raw.whyPhoneDisplay
      ? String(raw.whyPhoneDisplay)
      : homeContentSeed.whyPhoneDisplay,
    whyPhoneHref: raw.whyPhoneHref ? String(raw.whyPhoneHref) : homeContentSeed.whyPhoneHref,
    whyItems: (
      (raw.whyItems as Array<{ title?: string | null; text?: string | null } | null>) || []
    )
      .filter(Boolean)
      .map((item) => ({
        title: String(item?.title || ''),
        text: String(item?.text || ''),
      })),
    processHeading: String(raw.processHeading || homeContentSeed.processHeading),
    processIntro: String(raw.processIntro || homeContentSeed.processIntro),
    processImage: String(raw.processImage || homeContentSeed.processImage),
    processImageAlt: String(raw.processImageAlt || homeContentSeed.processImageAlt),
    processSteps: (
      (raw.processSteps as Array<{ title?: string | null; text?: string | null } | null>) || []
    )
      .filter(Boolean)
      .map((step) => ({
        title: String(step?.title || ''),
        text: String(step?.text || ''),
      })),
    servicesHeading: String(raw.servicesHeading || homeContentSeed.servicesHeading),
    servicesIntro: String(raw.servicesIntro || homeContentSeed.servicesIntro),
    serviceItems: (
      (raw.serviceItems as Array<{ title?: string | null; text?: string | null } | null>) || []
    )
      .filter(Boolean)
      .map((item) => ({
        title: String(item?.title || ''),
        text: String(item?.text || ''),
      })),
    blogHeading: String(raw.blogHeading || homeContentSeed.blogHeading),
    blogIntro: String(raw.blogIntro || homeContentSeed.blogIntro),
    blogViewAllLabel: String(raw.blogViewAllLabel || homeContentSeed.blogViewAllLabel),
    faqHeading: String(raw.faqHeading || homeContentSeed.faqHeading),
    faqIntro: String(raw.faqIntro || homeContentSeed.faqIntro),
    faqPhoneDisplay: raw.faqPhoneDisplay
      ? String(raw.faqPhoneDisplay)
      : homeContentSeed.faqPhoneDisplay,
    faqPhoneHref: raw.faqPhoneHref ? String(raw.faqPhoneHref) : homeContentSeed.faqPhoneHref,
    faqItems: (
      (raw.faqItems as Array<{ question?: string | null; answer?: string | null } | null>) || []
    )
      .filter(Boolean)
      .map((item) => ({
        q: String(item?.question || ''),
        a: String(item?.answer || ''),
      })),
    reviewsHeading: String(raw.reviewsHeading || homeContentSeed.reviewsHeading),
    reviewsIntro: String(raw.reviewsIntro || homeContentSeed.reviewsIntro),
    reviews: (
      (raw.reviews as Array<{
        initials?: string | null
        author?: string | null
        text?: string | null
        googleUrl?: string | null
      } | null>) || []
    )
      .filter(Boolean)
      .map((review) => ({
        initials: String(review?.initials || ''),
        author: String(review?.author || ''),
        text: String(review?.text || ''),
        googleUrl: String(review?.googleUrl || ''),
      })),
  }
}

function withFallbackArrays(content: HomeContent): HomeContent {
  return {
    ...content,
    aboutParagraphs: content.aboutParagraphs.length
      ? content.aboutParagraphs
      : homeContentSeed.aboutParagraphs,
    pricingHighlights: content.pricingHighlights.length
      ? content.pricingHighlights
      : homeContentSeed.pricingHighlights,
    pricingParagraphs: content.pricingParagraphs.length
      ? content.pricingParagraphs
      : homeContentSeed.pricingParagraphs,
    airDuctParagraphs: content.airDuctParagraphs.length
      ? content.airDuctParagraphs
      : homeContentSeed.airDuctParagraphs,
    dryerParagraphs: content.dryerParagraphs.length
      ? content.dryerParagraphs
      : homeContentSeed.dryerParagraphs,
    whyItems: content.whyItems.length ? content.whyItems : homeContentSeed.whyItems,
    processSteps: content.processSteps.length
      ? content.processSteps
      : homeContentSeed.processSteps,
    serviceItems: content.serviceItems.length
      ? content.serviceItems
      : homeContentSeed.serviceItems,
    faqItems: content.faqItems.length ? content.faqItems : homeContentSeed.faqItems,
    reviews: content.reviews.length ? content.reviews : homeContentSeed.reviews,
  }
}

export async function getHomeContent(): Promise<{
  content: HomeContent
  meta: { title?: string | null; description?: string | null }
}> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1,
    pagination: false,
    depth: 0,
    where: {
      and: [
        { slug: { equals: 'home' } },
        { pageKind: { equals: 'home' } },
        { _status: { equals: 'published' } },
      ],
    },
  })

  const doc = result.docs[0]
  const mapped = withFallbackArrays(
    mapHomeContent(doc?.homeContent as Record<string, unknown> | null | undefined),
  )

  return {
    content: mapped,
    meta: {
      title: doc?.meta?.title,
      description: doc?.meta?.description,
    },
  }
}
