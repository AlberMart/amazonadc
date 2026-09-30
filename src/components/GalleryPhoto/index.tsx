import Image from 'next/image'
import React from 'react'

import { overlayFromAltOrSrc } from '@/utilities/galleryOverlay'

export type GalleryPhotoItem = {
  src: string
  alt: string
  /** CMS: none | before | after | custom | auto (infer from alt) */
  overlay?: 'none' | 'before' | 'after' | 'custom' | 'auto' | null
  overlayText?: string | null
}

export function resolvePhotoOverlay(photo: GalleryPhotoItem): string | null {
  const mode = photo.overlay || 'auto'
  if (mode === 'none') return null
  if (mode === 'before') return 'Before'
  if (mode === 'after') return 'After'
  if (mode === 'custom') {
    const text = (photo.overlayText || '').trim()
    return text || null
  }
  const inferred = overlayFromAltOrSrc(photo.alt, photo.src)
  if (inferred === 'before') return 'Before'
  if (inferred === 'after') return 'After'
  return null
}

export { overlayFromAltOrSrc }

type Props = {
  photo: GalleryPhotoItem
  sizes?: string
  priority?: boolean
  className?: string
}

export function GalleryPhoto({
  photo,
  sizes = '(max-width: 768px) 50vw, 25vw',
  priority,
  className = 'relative aspect-[3/4] site-media overflow-hidden',
}: Props) {
  const label = resolvePhotoOverlay(photo)

  return (
    <div className={className}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
      />
      {label ? (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(11,28,44,0.72),rgba(11,28,44,0.35)_55%,transparent)] px-3 py-2.5 text-center text-xs font-semibold tracking-[0.14em] text-white uppercase sm:text-sm">
          {label}
        </span>
      ) : null}
    </div>
  )
}
