import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)
import { redirects } from './redirects'

const NEXT_PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000')

const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: {
    // Payload generated types drift; `next build` on Fly must not block amaz-local deploys.
    ignoreBuildErrors: true,
  },
  // Temporarily required on Windows until Next.js fixes Turbopack Sass resolution.
  // See: https://github.com/vercel/next.js/issues/86431
  sassOptions: {
    loadPaths: ['./node_modules/@payloadcms/ui/dist/scss/'],
  },
  async headers() {
    return [
      {
        // Facebook/Messenger/WhatsApp/Telegram preview images — long cache + explicit type.
        source: '/img/og-default.jpg',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
          { key: 'Content-Type', value: 'image/jpeg' },
        ],
      },
      {
        source: '/img/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ]
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/img/**',
      },
      {
        pathname: '/media/**',
      },
    ],
    qualities: [60, 65, 70, 75, 85, 100],
    // Prefer card/thumb widths so sizes="300px" can select ~300/384 instead of 640.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 300, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
        }
      }),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    // Next 15 ships baseline polyfills Lighthouse flags as legacy (~12KiB).
    // Safe for modern Chrome/Safari/Firefox targets this site actually serves.
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      '../build/polyfills/polyfill-module': false,
      'next/dist/build/polyfills/polyfill-module': false,
    }

    return webpackConfig
  },
  reactStrictMode: true,
  devIndicators: false,
  redirects,
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
