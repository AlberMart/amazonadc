'use client'

import { useEffect } from 'react'

type DeferredChatraProps = {
  chatId: string
  buttonBg: string
  buttonText: string
}

type ChatraQueue = {
  (...args: unknown[]): void
  q?: unknown[]
}

/**
 * Load Chatra after LCP (idle / first gesture). Keeps ~300KB widget off the critical path.
 */
export function DeferredChatra({ chatId, buttonBg, buttonText }: DeferredChatraProps) {
  useEffect(() => {
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

      ;(window as Window & { ChatraID?: string }).ChatraID = chatId
      ;(
        window as Window & {
          ChatraSetup?: { colors: { buttonText: string; buttonBg: string } }
        }
      ).ChatraSetup = {
        colors: { buttonText, buttonBg },
      }

      const w = window as Window & { Chatra?: ChatraQueue }
      w.Chatra =
        w.Chatra ||
        (function chatraStub(...args: unknown[]) {
          const fn = w.Chatra as ChatraQueue
          fn.q = fn.q || []
          fn.q.push(args)
        } as ChatraQueue)

      const s = document.createElement('script')
      s.async = true
      s.src = 'https://call.chatra.io/chatra.js'
      document.head.appendChild(s)
    }

    const onGesture = () => load()

    window.addEventListener('scroll', onGesture, { once: true, passive: true })
    window.addEventListener('pointerdown', onGesture, { once: true })
    window.addEventListener('keydown', onGesture, { once: true })
    window.addEventListener('touchstart', onGesture, { once: true, passive: true })

    // Past LCP + PSI lab window; load only on gesture or late idle.
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
  }, [chatId, buttonBg, buttonText])

  return null
}
