import Link from 'next/link'
import React from 'react'

const MD_LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^)\s]+)\)/g
const BARE_URL = /https?:\/\/[^\s<]+/g

function isInternal(href: string) {
  return href.startsWith('/')
}

function MarkdownLink({
  href,
  label,
  className,
}: {
  href: string
  label: string
  className: string
}) {
  if (isInternal(href)) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    )
  }

  return (
    <a href={href} className={className} rel="noopener noreferrer" target="_blank">
      {label}
    </a>
  )
}

function autolink(text: string, keyPrefix: string, className: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  let last = 0

  for (const match of text.matchAll(BARE_URL)) {
    const index = match.index ?? 0
    if (index > last) parts.push(text.slice(last, index))

    const raw = match[0]
    const trailing = raw.match(/[.,;:!?)]+$/)
    const href = trailing ? raw.slice(0, -trailing[0].length) : raw
    parts.push(
      <a
        key={`${keyPrefix}-${index}`}
        href={href}
        className={className}
        rel="noopener noreferrer"
        target="_blank"
      >
        {href}
      </a>,
    )
    if (trailing) parts.push(trailing[0])
    last = index + raw.length
  }

  if (last < text.length) parts.push(text.slice(last))
  return parts
}

export function TextWithLinks({ text, className }: { text: string; className?: string }) {
  const linkClass = className || 'site-link'
  const parts: React.ReactNode[] = []
  let last = 0

  for (const match of text.matchAll(MD_LINK)) {
    const index = match.index ?? 0
    if (index > last) {
      parts.push(...autolink(text.slice(last, index), `t${index}`, linkClass))
    }
    parts.push(
      <MarkdownLink
        key={`md-${index}`}
        href={match[2]}
        label={match[1]}
        className={linkClass}
      />,
    )
    last = index + match[0].length
  }

  if (last < text.length) parts.push(...autolink(text.slice(last), 'end', linkClass))
  if (parts.length === 0) return <>{text}</>
  return <>{parts}</>
}
