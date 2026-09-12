import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

export type SiteButtonVariant = 'primary' | 'secondary' | 'tertiary'

const variantClass: Record<SiteButtonVariant, string> = {
  primary: 'site-btn site-btn-primary',
  secondary: 'site-btn site-btn-secondary',
  tertiary: 'site-btn site-btn-tertiary',
}

type Common = {
  variant?: SiteButtonVariant
  className?: string
  children: React.ReactNode
}

type AsButton = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type AsLink = Common & {
  href: string
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

export function SiteButton(props: AsButton | AsLink) {
  const { variant = 'primary', className, children } = props
  const classes = cn(variantClass[variant], className)

  if ('href' in props && props.href) {
    const { href, variant: _v, className: _c, children: _ch, ...rest } = props
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  const { variant: _v, className: _c, children: _ch, ...rest } = props as AsButton
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}

export function siteButtonVariant(
  explicit?: 'inherit' | SiteButtonVariant | null,
  fallback: SiteButtonVariant = 'primary',
): SiteButtonVariant {
  if (explicit && explicit !== 'inherit') return explicit
  return fallback
}
