'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

type DeferredAnalyticsProps = {
  gaId?: string | null
  adsId?: string | null
  gtmId?: string | null
}

type GtagWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}

/**
 * gtag.js only drains queue items whose tag is `[object Arguments]`.
 * Rest/spread compiles to a real Array, and those commands are ignored — no hit is sent.
 */
function installGtag(dataLayer: unknown[]) {
  const w = window as GtagWindow
  if (typeof w.gtag === 'function') return w.gtag

  function gtag() {
    // Google's loader accepts only an Arguments object. A rest array is dropped.
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments as unknown)
  }

  w.gtag = gtag as unknown as GtagWindow['gtag']
  return w.gtag!
}

/**
 * Load GA/GTM after LCP (gesture or late idle) so lab audits don't count
 * ~170KiB of analytics against unused-JS on first paint.
 */
export function DeferredAnalytics({ gaId, adsId, gtmId }: DeferredAnalyticsProps) {
  const pathname = usePathname()
  const ready = useRef(false)
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    if (!gaId && !gtmId) return

    let loaded = false
    let idleId: number | undefined
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined

    const load = () => {
      if (loaded) return
      loaded = true

      clearTimeout(delayTimer)
      if (fallbackTimer) clearTimeout(fallbackTimer)
      if (idleId != null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      window.removeEventListener('scroll', onGesture)
      window.removeEventListener('pointerdown', onGesture)
      window.removeEventListener('keydown', onGesture)
      window.removeEventListener('touchstart', onGesture)

      const w = window as GtagWindow
      w.dataLayer = w.dataLayer || []

      if (gtmId) {
        w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
        const j = document.createElement('script')
        j.async = true
        j.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
        document.head.appendChild(j)
      }

      if (gaId) {
        const gtag = installGtag(w.dataLayer)
        gtag('js', new Date())
        gtag('config', gaId, {
          page_path: window.location.pathname,
          page_location: window.location.href,
          page_title: document.title,
        })
        if (adsId && adsId !== gaId) gtag('config', adsId)

        const s = document.createElement('script')
        s.async = true
        s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
        document.head.appendChild(s)
        ready.current = true
        lastPath.current = window.location.pathname
      }
    }

    const onGesture = () => load()

    window.addEventListener('scroll', onGesture, { once: true, passive: true })
    window.addEventListener('pointerdown', onGesture, { once: true })
    window.addEventListener('keydown', onGesture, { once: true })
    window.addEventListener('touchstart', onGesture, { once: true, passive: true })

    const delayTimer = setTimeout(() => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(() => load(), { timeout: 12000 })
      } else {
        fallbackTimer = setTimeout(load, 4000)
      }
    }, 8000)

    return () => {
      loaded = true
      clearTimeout(delayTimer)
      if (fallbackTimer) clearTimeout(fallbackTimer)
      if (idleId != null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      window.removeEventListener('scroll', onGesture)
      window.removeEventListener('pointerdown', onGesture)
      window.removeEventListener('keydown', onGesture)
      window.removeEventListener('touchstart', onGesture)
    }
  }, [gaId, adsId, gtmId])

  useEffect(() => {
    if (!gaId || !ready.current || !pathname) return
    if (lastPath.current === pathname) return
    lastPath.current = pathname
    const w = window as GtagWindow
    w.gtag?.('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
      send_to: gaId,
    })
  }, [gaId, pathname])

  return null
}
