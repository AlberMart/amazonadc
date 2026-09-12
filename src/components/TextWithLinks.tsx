import Link from 'next/link'
import React from 'react'

const LINK = /\[([^\]]+)\]\((\/[^)\s]+)\)/g

export function TextWithLinks({ text, className }: { text: string; className?: string }) {
  const parts: React.ReactNode[] = []
  let last = 0

  for (const match of text.matchAll(LINK)) {
    const index = match.index ?? 0
    if (index > last) parts.push(text.slice(last, index))
    parts.push(
      <Link key={`${match[2]}-${index}`} href={match[2]} className={className || 'site-link'}>
        {match[1]}
      </Link>,
    )
    last = index + match[0].length
  }

  if (last < text.length) parts.push(text.slice(last))
  if (parts.length === 0) return <>{text}</>
  return <>{parts}</>
}
