type CmsLinkLike = {
  type?: ('reference' | 'custom') | null
  url?: string | null
  label?: string | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value:
      | number
      | string
      | {
          slug?: string | null
        }
      | null
  } | null
}

export type ResolvedNavLink = {
  href: string
  label: string
  newTab?: boolean
}

/** Resolve a Payload link group to a public href (home → /, posts → /blog/...). */
export function resolveCmsHref(link?: CmsLinkLike | null): string | null {
  if (!link) return null

  if (link.type === 'custom' || !link.reference) {
    const url = link.url?.trim()
    return url || null
  }

  const value = link.reference.value
  if (!value || typeof value !== 'object') return null
  const slug = value.slug?.trim()
  if (!slug) return null

  if (link.reference.relationTo === 'posts') {
    return `/blog/${slug}`
  }

  if (slug === 'home') return '/'
  return `/${slug}`
}

export function resolveCmsLink(link?: CmsLinkLike | null): ResolvedNavLink | null {
  const href = resolveCmsHref(link)
  const label = link?.label?.trim()
  if (!href || !label) return null
  return { href, label }
}
