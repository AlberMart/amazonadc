import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Leads } from './collections/Leads'
import { Locations } from './collections/Locations'
import { Media } from './collections/Media'
import { Offices } from './collections/Offices'
import { Pages } from './collections/Pages'
import { Partials } from './collections/Partials'
import { Posts } from './collections/Posts'
import { Services } from './collections/Services'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { SiteSettings } from './globals/SiteSettings'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { siteEmailAdapter } from './utilities/emailAdapter'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    meta: {
      titleSuffix: '— Admin',
      applicationName: 'Admin',
      defaultOGImageType: 'off',
      icons: {
        icon: [
          { rel: 'icon', type: 'image/x-icon', url: '/favicon.ico' },
          { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32.png' },
        ],
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
      },
    },
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
      graphics: {
        Logo: '@/components/AdminBrand/Logo',
        Icon: '@/components/AdminBrand/Icon',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      max: 20,
      idleTimeoutMillis: 20_000,
      connectionTimeoutMillis: 20_000,
      allowExitOnIdle: true,
    },
    // Dynamic lookup so Next does not inline this at Docker build time.
    push: process.env['PAYLOAD_DB_PUSH'] === 'true',
  }),
  collections: [Pages, Posts, Services, Locations, Offices, Partials, Leads, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  email: siteEmailAdapter,
  globals: [Header, Footer, SiteSettings],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
