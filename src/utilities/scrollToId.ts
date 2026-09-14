export function headerOffset(): number {
  if (typeof document === 'undefined') return 0
  const header = document.querySelector('.site-header') as HTMLElement | null
  const height = header?.getBoundingClientRect().height || 0
  return height + 12
}

export function scrollWindowToTop(behavior: ScrollBehavior = 'instant') {
  if (typeof window === 'undefined') return
  const html = document.documentElement
  const body = document.body
  html.scrollTop = 0
  body.scrollTop = 0
  window.scrollTo({ top: 0, left: 0, behavior })
}

export function scrollToId(id: string, behavior: ScrollBehavior = 'instant'): boolean {
  if (typeof window === 'undefined' || !id) return false
  const target = document.getElementById(id)
  if (!target) return false
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset())
  window.scrollTo({ top, left: 0, behavior })
  return true
}

export function scrollToHash(hash: string, behavior: ScrollBehavior = 'instant'): boolean {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  if (!id) {
    scrollWindowToTop(behavior)
    return true
  }
  return scrollToId(id, behavior)
}
