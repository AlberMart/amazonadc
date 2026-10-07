import Script from 'next/script'
import React from 'react'

import { themeLocalStorageKey } from '../ThemeSelector/types'

export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    // Public marketing site is designed for light surfaces only.
    // Do not follow OS dark mode — it blacks out body and breaks contact/forms.
    document.documentElement.setAttribute('data-theme', 'light')
    try { window.localStorage.setItem('${themeLocalStorageKey}', 'light') } catch (e) {}
  })();
  `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
