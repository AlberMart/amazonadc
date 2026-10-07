import type { Theme } from './types'

export const themeLocalStorageKey = 'payload-theme'

export const defaultTheme = 'light'

/** Marketing site stays light — ignore OS prefers-color-scheme. */
export const getImplicitPreference = (): Theme | null => {
  return 'light'
}
