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

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return getServerSideURL()
}
