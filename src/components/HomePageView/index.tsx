import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { RenderPageSections } from '@/components/RenderPageSections'
import type { BlogIndexItem } from '@/utilities/blog'
import type { HomeSection } from '@/utilities/homeSections'
import type { OfficeContent } from '@/utilities/offices'
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
    <div>
      <JsonLd data={structuredData} />
      <RenderPageSections
        sections={sections}
        services={services}
        posts={posts}
        reviews={reviews}
        sourcePage="/"
      />
    </div>
  )
}
