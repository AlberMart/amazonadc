/** Infer Before/After overlay from alt or filename (not parent folder names like before_after/). */
export function overlayFromAltOrSrc(alt: string, src?: string): 'before' | 'after' | 'none' {
  if (/\bafter\b/i.test(alt)) return 'after'
  if (/\bbefore\b/i.test(alt)) return 'before'
  const file = (src || '').split('/').pop() || ''
  if (/after/i.test(file)) return 'after'
  if (/before/i.test(file)) return 'before'
  return 'none'
}
