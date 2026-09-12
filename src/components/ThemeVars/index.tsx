import React from 'react'

import {
  googleFontsHref,
  resolveTheme,
  themeCssVars,
  type ResolvedTheme,
} from '@/utilities/theme'

export function ThemeVars({ theme }: { theme?: Parameters<typeof resolveTheme>[0] }) {
  const resolved: ResolvedTheme = resolveTheme(theme)
  const href = googleFontsHref(resolved.fonts.heading, resolved.fonts.body)
  const css = themeCssVars(resolved)

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href={href} rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `:root {\n${css}\n}` }} />
    </>
  )
}
