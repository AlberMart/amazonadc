import canUseDOM from './canUseDOM'

/**
 * Canonical origin for sitemap, OG, JSON-LD, and robots.
 * Deployed apps must set NEXT_PUBLIC_SERVER_URL (amaz-local → fly.dev, production → amazonadc.com).
 * Do not hardcode a public domain here — staging and production would leak each other's URLs.
 */
export const getServerSideURL = () => {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000')
  )
}

/** True when canonical origin is a known staging / preview host (should be noindex). */
export function isNonProductionHost(url = getServerSideURL()) {
  try {
    const host = new URL(url).hostname.toLowerCase()
    if (host === 'localhost' || host === '127.0.0.1') return true
    if (host.endsWith('.fly.dev')) return true
    if (host.endsWith('.vercel.app')) return true
    return false
  } catch {
    return true
  }
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return getServerSideURL()
}
