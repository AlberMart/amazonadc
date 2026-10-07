'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef } from 'react'

import {
  navigateSamePageHash,
  pauseSectionSpy,
  scrollToHash,
  scrollWindowToTop,
} from '@/utilities/scrollToId'

function sameOriginUrl(href: string | null): URL | null {
  if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) return null
  try {
    return new URL(href, window.location.href)
  } catch {
    return null
  }
}

export function ScrollOnNavigate() {
  const pathname = usePathname()
  const skipNext = useRef(false)

  useEffect(() => {
    const onPopState = () => {
      skipNext.current = true
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useLayoutEffect(() => {
    if (skipNext.current) {
      skipNext.current = false
      return
    }

    const apply = (fallbackToTop: boolean) => {
      const hash = window.location.hash
      if (hash) {
        pauseSectionSpy(1200)
        if (!scrollToHash(hash, 'instant') && fallbackToTop) scrollWindowToTop()
        return
      }
      scrollWindowToTop()
    }

    apply(false)
    const retry = window.setTimeout(() => apply(false), 80)
    const retryLate = window.setTimeout(() => apply(true), 500)
    return () => {
      window.clearTimeout(retry)
      window.clearTimeout(retryLate)
    }
  }, [pathname])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }
      const anchor = (event.target as HTMLElement | null)?.closest('a')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const url = sameOriginUrl(anchor.getAttribute('href'))
      if (!url || url.origin !== window.location.origin) return

      const samePath =
        url.pathname === window.location.pathname && url.search === window.location.search

      if (!samePath) return

      // Same-page hash (Get a Free Quote / Estimate, Contact Us, etc.)
      if (url.hash) {
        event.preventDefault()
        navigateSamePageHash(url.hash, 'smooth')
        return
      }

      scrollWindowToTop()
    }

    // Capture so we win over Next <Link> if a hash slipped through as Link.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
