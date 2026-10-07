import Link from 'next/link'
import React from 'react'

/** Inline markdown: [label](url|path|tel) plus **bold** and bare https URLs. */
const MD_LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^)\s]+|tel:[^\s)]+)\)/g
const BARE_URL = /https?:\/\/[^\s<]+/g
const BOLD = /\*\*([^*]+)\*\*/g

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
  if (href.startsWith('tel:')) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    )
  }

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

function withBold(text: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  let last = 0

  for (const match of text.matchAll(BOLD)) {
    const index = match.index ?? 0
    if (index > last) parts.push(text.slice(last, index))
    parts.push(
      <strong key={`${keyPrefix}-b${index}`} className="font-semibold text-[var(--site-heading)]">
        {match[1]}
      </strong>,
    )
    last = index + match[0].length
  }

  if (last < text.length) parts.push(text.slice(last))
  return parts.length ? parts : [text]
}

function autolink(text: string, keyPrefix: string, className: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  let last = 0

  for (const match of text.matchAll(BARE_URL)) {
    const index = match.index ?? 0
    if (index > last) {
      parts.push(...withBold(text.slice(last, index), `${keyPrefix}-t${index}`))
    }

    const raw = match[0]
    const trailing = raw.match(/[.,;:!?)]+$/)
    const href = trailing ? raw.slice(0, -trailing[0].length) : raw
    parts.push(
      <a
        key={`${keyPrefix}-u${index}`}
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

  if (last < text.length) parts.push(...withBold(text.slice(last), `${keyPrefix}-end`))
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
