/** Shared pause so header section-spy doesn't steal hash mid-scroll (CTA / nav). */
let sectionSpyIgnoreUntil = 0

export function pauseSectionSpy(ms = 1400) {
  sectionSpyIgnoreUntil = Math.max(sectionSpyIgnoreUntil, Date.now() + ms)
}

export function isSectionSpyPaused() {
  return Date.now() < sectionSpyIgnoreUntil
}

export function headerOffset(): number {
  if (typeof document === 'undefined') return 0
  const header = document.querySelector('.site-header') as HTMLElement | null
  const height = header?.getBoundingClientRect().height || 0
  // Extra room under sticky header so Contact Us heading is fully visible on mobile.
  return height + 20
}

/** content-visibility:auto sections report bogus offsets until near the viewport. */
function revealForAccurateScroll(target: HTMLElement) {
  document.querySelectorAll('.site-section').forEach((node) => {
    const el = node as HTMLElement
    if (getComputedStyle(el).contentVisibility === 'auto') {
      el.style.contentVisibility = 'visible'
    }
  })
  let node: HTMLElement | null = target
  while (node) {
    if (getComputedStyle(node).contentVisibility === 'auto') {
      node.style.contentVisibility = 'visible'
    }
    node = node.parentElement
  }
  // Force layout so offsets are real before we measure.
  void document.body.offsetHeight
}

function snapTargetUnderHeader(target: HTMLElement) {
  const desired = headerOffset()
  const top = target.getBoundingClientRect().top
  const delta = top - desired
  if (Math.abs(delta) > 8) {
    window.scrollBy({ top: delta, left: 0, behavior: 'instant' })
  }
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

  revealForAccurateScroll(target)

  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset())
  window.scrollTo({ top, left: 0, behavior })

  const finalize = () => {
    revealForAccurateScroll(target)
    snapTargetUnderHeader(target)
  }

  if (behavior === 'instant') {
    requestAnimationFrame(finalize)
  } else {
    window.setTimeout(finalize, 560)
    window.setTimeout(finalize, 1100)
  }
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

/** Same-page hash navigation with spy pause + history update. */
export function navigateSamePageHash(hash: string, behavior: ScrollBehavior = 'smooth'): boolean {
  if (typeof window === 'undefined') return false
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  // Long pages need a long pause — smooth scroll + layout settle can take >2s.
  pauseSectionSpy(behavior === 'smooth' ? 3200 : 600)
  if (!id) {
    scrollWindowToTop(behavior)
    window.history.pushState(null, '', window.location.pathname + window.location.search)
    return true
  }
  if (!scrollToId(id, behavior)) return false
  window.history.pushState(null, '', `${window.location.pathname}${window.location.search}#${id}`)
  return true
}
