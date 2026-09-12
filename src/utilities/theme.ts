export const THEME_FONTS = [
  { label: 'Outfit', value: 'Outfit', weights: '400;500;600;700' },
  { label: 'Inter', value: 'Inter', weights: '400;500;600;700' },
  { label: 'DM Sans', value: 'DM Sans', weights: '400;500;600;700' },
  { label: 'Source Sans 3', value: 'Source Sans 3', weights: '400;500;600;700' },
  { label: 'Lato', value: 'Lato', weights: '400;700' },
  { label: 'Nunito', value: 'Nunito', weights: '400;600;700' },
  { label: 'Open Sans', value: 'Open Sans', weights: '400;600;700' },
  { label: 'Poppins', value: 'Poppins', weights: '400;500;600;700' },
  { label: 'Montserrat', value: 'Montserrat', weights: '400;500;600;700' },
  { label: 'Plus Jakarta Sans', value: 'Plus Jakarta Sans', weights: '400;500;600;700' },
  { label: 'Fraunces', value: 'Fraunces', weights: '400;600;700' },
  { label: 'Playfair Display', value: 'Playfair Display', weights: '400;600;700' },
  { label: 'Merriweather', value: 'Merriweather', weights: '400;700' },
  { label: 'Libre Baskerville', value: 'Libre Baskerville', weights: '400;700' },
  { label: 'Lora', value: 'Lora', weights: '400;600;700' },
  { label: 'Source Serif 4', value: 'Source Serif 4', weights: '400;600;700' },
] as const

export type ThemeFontValue = (typeof THEME_FONTS)[number]['value']

export const RADIUS_SCALE = {
  none: '0px',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
} as const

export type RadiusToken = keyof typeof RADIUS_SCALE

export const DEFAULT_THEME = {
  colors: {
    primary: '#0b1c2c',
    primaryForeground: '#ffffff',
    secondary: '#12324a',
    secondaryForeground: '#ffffff',
    tertiary: '#0369a1',
    tertiaryForeground: '#ffffff',
    accent: '#fbbf24',
    accentHover: '#fcd34d',
    accentForeground: '#0b1c2c',
    background: '#ffffff',
    muted: '#f4f7fa',
    dark: '#0b1c2c',
    footer: '#07131f',
    card: '#ffffff',
    cardMuted: '#f8fafc',
    heading: '#0b1c2c',
    body: '#516579',
    mutedText: '#7a8b9c',
    onDark: '#ffffff',
    onDarkMuted: 'rgba(240, 249, 255, 0.85)',
    link: '#0369a1',
    linkOnDark: '#bae6fd',
    border: '#d5dee8',
    badges: '#232f3e',
  },
  buttons: {
    primaryBg: '',
    primaryText: '',
    primaryHover: '',
    secondaryBg: '',
    secondaryText: '',
    secondaryHover: '',
    tertiaryBg: '',
    tertiaryText: '',
    tertiaryBorder: '',
    tertiaryHover: '',
  },
  fonts: {
    heading: 'Fraunces' as ThemeFontValue,
    body: 'Outfit' as ThemeFontValue,
  },
  radius: {
    button: 'md' as RadiusToken,
    card: 'none' as RadiusToken,
    image: 'none' as RadiusToken,
    container: 'none' as RadiusToken,
  },
  containers: {
    cardStyle: 'bordered' as 'bordered' | 'filled' | 'elevated' | 'plain',
    listStyle: 'check' as 'check' | 'disc' | 'numbered' | 'none',
  },
}

export type ResolvedTheme = {
  colors: typeof DEFAULT_THEME.colors
  buttons: {
    primaryBg: string
    primaryText: string
    primaryHover: string
    secondaryBg: string
    secondaryText: string
    secondaryHover: string
    tertiaryBg: string
    tertiaryText: string
    tertiaryBorder: string
    tertiaryHover: string
  }
  fonts: {
    heading: string
    body: string
  }
  radius: {
    button: string
    card: string
    image: string
    container: string
  }
  containers: typeof DEFAULT_THEME.containers
}

export type CmsTheme = {
  primary?: string | null
  primaryForeground?: string | null
  secondary?: string | null
  secondaryForeground?: string | null
  tertiary?: string | null
  tertiaryForeground?: string | null
  accent?: string | null
  accentHover?: string | null
  accentForeground?: string | null
  background?: string | null
  muted?: string | null
  dark?: string | null
  footer?: string | null
  card?: string | null
  cardMuted?: string | null
  heading?: string | null
  body?: string | null
  mutedText?: string | null
  onDark?: string | null
  onDarkMuted?: string | null
  link?: string | null
  linkOnDark?: string | null
  border?: string | null
  badges?: string | null
  buttonPrimaryBg?: string | null
  buttonPrimaryText?: string | null
  buttonPrimaryHover?: string | null
  buttonSecondaryBg?: string | null
  buttonSecondaryText?: string | null
  buttonSecondaryHover?: string | null
  buttonTertiaryBg?: string | null
  buttonTertiaryText?: string | null
  buttonTertiaryBorder?: string | null
  buttonTertiaryHover?: string | null
  headingFont?: string | null
  bodyFont?: string | null
  buttonRadius?: string | null
  cardRadius?: string | null
  imageRadius?: string | null
  containerRadius?: string | null
  cardStyle?: string | null
  listStyle?: string | null
}

function pick(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed || fallback
}

function radiusPx(value: string | null | undefined, fallback: RadiusToken): string {
  const token = (value || fallback) as RadiusToken
  return RADIUS_SCALE[token] || RADIUS_SCALE[fallback]
}

export function resolveTheme(input?: CmsTheme | null): ResolvedTheme {
  const colors = {
    primary: pick(input?.primary, DEFAULT_THEME.colors.primary),
    primaryForeground: pick(input?.primaryForeground, DEFAULT_THEME.colors.primaryForeground),
    secondary: pick(input?.secondary, DEFAULT_THEME.colors.secondary),
    secondaryForeground: pick(input?.secondaryForeground, DEFAULT_THEME.colors.secondaryForeground),
    tertiary: pick(input?.tertiary, DEFAULT_THEME.colors.tertiary),
    tertiaryForeground: pick(input?.tertiaryForeground, DEFAULT_THEME.colors.tertiaryForeground),
    accent: pick(input?.accent, DEFAULT_THEME.colors.accent),
    accentHover: pick(input?.accentHover, DEFAULT_THEME.colors.accentHover),
    accentForeground: pick(input?.accentForeground, DEFAULT_THEME.colors.accentForeground),
    background: pick(input?.background, DEFAULT_THEME.colors.background),
    muted: pick(input?.muted, DEFAULT_THEME.colors.muted),
    dark: pick(input?.dark, DEFAULT_THEME.colors.dark),
    footer: pick(input?.footer, DEFAULT_THEME.colors.footer),
    card: pick(input?.card, DEFAULT_THEME.colors.card),
    cardMuted: pick(input?.cardMuted, DEFAULT_THEME.colors.cardMuted),
    heading: pick(input?.heading, DEFAULT_THEME.colors.heading),
    body: pick(input?.body, DEFAULT_THEME.colors.body),
    mutedText: pick(input?.mutedText, DEFAULT_THEME.colors.mutedText),
    onDark: pick(input?.onDark, DEFAULT_THEME.colors.onDark),
    onDarkMuted: pick(input?.onDarkMuted, DEFAULT_THEME.colors.onDarkMuted),
    link: pick(input?.link, DEFAULT_THEME.colors.link),
    linkOnDark: pick(input?.linkOnDark, DEFAULT_THEME.colors.linkOnDark),
    border: pick(input?.border, DEFAULT_THEME.colors.border),
    badges: pick(input?.badges, DEFAULT_THEME.colors.badges),
  }

  const buttons = {
    primaryBg: pick(input?.buttonPrimaryBg, colors.accent),
    primaryText: pick(input?.buttonPrimaryText, colors.accentForeground),
    primaryHover: pick(input?.buttonPrimaryHover, colors.accentHover),
    secondaryBg: pick(input?.buttonSecondaryBg, colors.primary),
    secondaryText: pick(input?.buttonSecondaryText, colors.primaryForeground),
    secondaryHover: pick(input?.buttonSecondaryHover, colors.secondary),
    tertiaryBg: pick(input?.buttonTertiaryBg, 'transparent'),
    tertiaryText: pick(input?.buttonTertiaryText, colors.heading),
    tertiaryBorder: pick(input?.buttonTertiaryBorder, colors.border),
    tertiaryHover: pick(input?.buttonTertiaryHover, colors.muted),
  }

  const cardStyle = input?.cardStyle
  const listStyle = input?.listStyle

  return {
    colors,
    buttons,
    fonts: {
      heading: pick(input?.headingFont, DEFAULT_THEME.fonts.heading),
      body: pick(input?.bodyFont, DEFAULT_THEME.fonts.body),
    },
    radius: {
      button: radiusPx(input?.buttonRadius, DEFAULT_THEME.radius.button),
      card: radiusPx(input?.cardRadius, DEFAULT_THEME.radius.card),
      image: radiusPx(input?.imageRadius, DEFAULT_THEME.radius.image),
      container: radiusPx(input?.containerRadius, DEFAULT_THEME.radius.container),
    },
    containers: {
      cardStyle:
        cardStyle === 'filled' ||
        cardStyle === 'elevated' ||
        cardStyle === 'plain' ||
        cardStyle === 'bordered'
          ? cardStyle
          : DEFAULT_THEME.containers.cardStyle,
      listStyle:
        listStyle === 'disc' ||
        listStyle === 'numbered' ||
        listStyle === 'none' ||
        listStyle === 'check'
          ? listStyle
          : DEFAULT_THEME.containers.listStyle,
    },
  }
}

export function googleFontsHref(heading: string, body: string): string {
  const names = [...new Set([heading, body].filter(Boolean))]
  const params = names.map((name) => {
    const font = THEME_FONTS.find((item) => item.value === name)
    const family = name.replace(/ /g, '+')
    return `family=${family}:wght@${font?.weights || '400;700'}`
  })
  return `https://fonts.googleapis.com/css2?${params.join('&')}&display=swap`
}

export function themeCssVars(theme: ResolvedTheme): string {
  const { colors, buttons, fonts, radius } = theme
  const rows: Array<[string, string]> = [
    ['--site-primary', colors.primary],
    ['--site-primary-fg', colors.primaryForeground],
    ['--site-secondary', colors.secondary],
    ['--site-secondary-fg', colors.secondaryForeground],
    ['--site-tertiary', colors.tertiary],
    ['--site-tertiary-fg', colors.tertiaryForeground],
    ['--site-accent', colors.accent],
    ['--site-accent-hover', colors.accentHover],
    ['--site-accent-fg', colors.accentForeground],
    ['--site-bg', colors.background],
    ['--site-muted', colors.muted],
    ['--site-dark', colors.dark],
    ['--site-footer', colors.footer],
    ['--site-card', colors.card],
    ['--site-card-muted', colors.cardMuted],
    ['--site-heading', colors.heading],
    ['--site-body', colors.body],
    ['--site-muted-text', colors.mutedText],
    ['--site-on-dark', colors.onDark],
    ['--site-on-dark-muted', colors.onDarkMuted],
    ['--site-link', colors.link],
    ['--site-link-on-dark', colors.linkOnDark],
    ['--site-border', colors.border],
    ['--site-badges', colors.badges],
    ['--site-btn-primary-bg', buttons.primaryBg],
    ['--site-btn-primary-text', buttons.primaryText],
    ['--site-btn-primary-hover', buttons.primaryHover],
    ['--site-btn-secondary-bg', buttons.secondaryBg],
    ['--site-btn-secondary-text', buttons.secondaryText],
    ['--site-btn-secondary-hover', buttons.secondaryHover],
    ['--site-btn-tertiary-bg', buttons.tertiaryBg],
    ['--site-btn-tertiary-text', buttons.tertiaryText],
    ['--site-btn-tertiary-border', buttons.tertiaryBorder],
    ['--site-btn-tertiary-hover', buttons.tertiaryHover],
    ['--site-radius-button', radius.button],
    ['--site-radius-card', radius.card],
    ['--site-radius-image', radius.image],
    ['--site-radius-container', radius.container],
    ['--font-sans', `'${fonts.body}', ui-sans-serif, system-ui, sans-serif`],
    ['--font-display', `'${fonts.heading}', ui-serif, Georgia, serif`],
  ]
  return rows.map(([name, value]) => `${name}: ${value};`).join('\n')
}

export const COLOR_TOKEN_OPTIONS = [
  { label: 'Inherit / default', value: 'inherit' },
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Accent', value: 'accent' },
  { label: 'Page background', value: 'background' },
  { label: 'Muted', value: 'muted' },
  { label: 'Dark', value: 'dark' },
  { label: 'Footer', value: 'footer' },
  { label: 'Badges bar', value: 'badges' },
  { label: 'Card', value: 'card' },
  { label: 'Heading text', value: 'heading' },
  { label: 'Body text', value: 'body' },
  { label: 'On dark', value: 'onDark' },
  { label: 'Custom color', value: 'custom' },
] as const

export type ColorToken = (typeof COLOR_TOKEN_OPTIONS)[number]['value']

export type SectionPadding = 'inherit' | 'default' | 'compact' | 'none'
export type SectionDivider = 'none' | 'top' | 'bottom' | 'both'

export type SectionAppearance = {
  background?: ColorToken
  backgroundCustom?: string
  headingColor?: ColorToken
  headingCustom?: string
  bodyColor?: ColorToken
  bodyCustom?: string
  cardStyle?: 'inherit' | 'bordered' | 'filled' | 'elevated' | 'plain'
  radius?: 'inherit' | RadiusToken
  listStyle?: 'inherit' | 'check' | 'disc' | 'numbered' | 'none'
  ctaVariant?: 'inherit' | 'primary' | 'secondary' | 'tertiary'
  padding?: SectionPadding
  divider?: SectionDivider
}

const TOKEN_VARS: Record<string, string> = {
  primary: 'var(--site-primary)',
  secondary: 'var(--site-secondary)',
  tertiary: 'var(--site-tertiary)',
  accent: 'var(--site-accent)',
  background: 'var(--site-bg)',
  muted: 'var(--site-muted)',
  dark: 'var(--site-dark)',
  footer: 'var(--site-footer)',
  badges: 'var(--site-badges)',
  card: 'var(--site-card)',
  heading: 'var(--site-heading)',
  body: 'var(--site-body)',
  onDark: 'var(--site-on-dark)',
}

export function tokenColor(token?: string, custom?: string): string | undefined {
  if (!token || token === 'inherit') return undefined
  if (token === 'custom') return custom?.trim() || undefined
  return TOKEN_VARS[token]
}

const DARK_BG_TOKENS = new Set(['dark', 'footer', 'badges', 'primary', 'secondary', 'onDark'])

export function appearanceVars(
  appearance?: SectionAppearance,
  tone?: string,
  fallbackBg?: string,
): Record<string, string> {
  const vars: Record<string, string> = {}
  const background =
    tokenColor(appearance?.background, appearance?.backgroundCustom) ||
    (tone === 'muted'
      ? 'var(--site-muted)'
      : tone === 'dark'
        ? 'var(--site-dark)'
        : fallbackBg || 'var(--site-bg)')
  vars['--section-bg'] = background
  const usedFallback =
    !tokenColor(appearance?.background, appearance?.backgroundCustom) &&
    tone !== 'muted' &&
    tone !== 'dark'
  const darkEdge =
    tone === 'dark' || DARK_BG_TOKENS.has(appearance?.background || '') || (usedFallback && Boolean(fallbackBg))
  vars['--section-edge'] = darkEdge ? 'rgb(255 255 255 / 0.1)' : 'var(--site-border)'

  const heading = tokenColor(appearance?.headingColor, appearance?.headingCustom)
  const body = tokenColor(appearance?.bodyColor, appearance?.bodyCustom)
  if (heading) vars['--site-heading'] = heading
  else if (tone === 'dark' && appearance?.headingColor !== 'custom') {
    vars['--site-heading'] = 'var(--site-on-dark)'
  }
  if (body) vars['--site-body'] = body
  else if (tone === 'dark' && appearance?.bodyColor !== 'custom') {
    vars['--site-body'] = 'var(--site-on-dark-muted)'
  }
  if (tone === 'dark') {
    vars.color = 'var(--site-on-dark)'
  }

  if (appearance?.radius && appearance.radius !== 'inherit') {
    const value = RADIUS_SCALE[appearance.radius]
    vars['--site-radius-card'] = value
    vars['--site-radius-image'] = value
    vars['--site-radius-container'] = value
  }

  return vars
}

export function cardClassName(style?: SectionAppearance['cardStyle']): string {
  if (style === 'filled') return 'site-card site-card-filled'
  if (style === 'elevated') return 'site-card site-card-elevated'
  if (style === 'plain') return 'site-card site-card-plain'
  if (style === 'bordered') return 'site-card'
  return 'site-card'
}

export function sectionPadClass(
  padding?: SectionPadding | null,
  fallback: Exclude<SectionPadding, 'inherit'> = 'default',
): string {
  const value = !padding || padding === 'inherit' ? fallback : padding
  if (value === 'none') return 'py-0'
  if (value === 'compact') return 'py-6 md:py-8'
  return 'py-16 md:py-20'
}

export function sectionDividerClass(divider?: SectionDivider | null): string {
  if (!divider || divider === 'none') return ''
  if (divider === 'top') return 'site-section-edge-top'
  if (divider === 'bottom') return 'site-section-edge-bottom'
  return 'site-section-edge-top site-section-edge-bottom'
}

export function listClassName(style?: SectionAppearance['listStyle']): string {
  if (style === 'disc') return 'site-list site-list-disc'
  if (style === 'numbered') return 'site-list site-list-numbered'
  if (style === 'none') return 'site-list site-list-none'
  if (style === 'check') return 'site-list site-list-check'
  return 'site-list'
}

export const themeSeed = {
  ...DEFAULT_THEME.colors,
  buttonPrimaryBg: DEFAULT_THEME.colors.accent,
  buttonPrimaryText: DEFAULT_THEME.colors.accentForeground,
  buttonPrimaryHover: DEFAULT_THEME.colors.accentHover,
  buttonSecondaryBg: DEFAULT_THEME.colors.primary,
  buttonSecondaryText: DEFAULT_THEME.colors.primaryForeground,
  buttonSecondaryHover: DEFAULT_THEME.colors.secondary,
  buttonTertiaryBg: 'transparent',
  buttonTertiaryText: DEFAULT_THEME.colors.heading,
  buttonTertiaryBorder: DEFAULT_THEME.colors.border,
  buttonTertiaryHover: DEFAULT_THEME.colors.muted,
  headingFont: DEFAULT_THEME.fonts.heading,
  bodyFont: DEFAULT_THEME.fonts.body,
  buttonRadius: DEFAULT_THEME.radius.button,
  cardRadius: DEFAULT_THEME.radius.card,
  imageRadius: DEFAULT_THEME.radius.image,
  containerRadius: DEFAULT_THEME.radius.container,
  cardStyle: DEFAULT_THEME.containers.cardStyle,
  listStyle: DEFAULT_THEME.containers.listStyle,
}
