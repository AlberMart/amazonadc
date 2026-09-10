import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#07131f] text-white">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Amazon Air Duct Cleaning
          </p>
          <p className="mt-3 max-w-sm text-sm text-sky-100/75">
            Professional air duct and dryer vent cleaning for homes and businesses across Virginia,
            Maryland, and Washington DC.
          </p>
          <p className="mt-5 text-sm">
            <a className="hover:text-amber-300" href="tel:+18006063334">
              (800) 606-3334
            </a>
            <br />
            <a className="hover:text-amber-300" href="mailto:support@amazonadc.com">
              support@amazonadc.com
            </a>
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-sky-200 uppercase">Locations</p>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>
              <Link className="hover:text-amber-300" href="/locations/burke">
                Burke, VA — 5641 Burke Centre Pkwy Ste 119
              </Link>
            </li>
            <li>
              <Link className="hover:text-amber-300" href="/locations/bethesda">
                Bethesda, MD — 7815 Old Georgetown Rd Ste 201
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-sky-200 uppercase">Explore</p>
          <nav className="mt-4 flex flex-col gap-3 text-sm text-white/80">
            <Link className="hover:text-amber-300" href="/air-duct-cleaning">
              Air Duct Cleaning
            </Link>
            <Link className="hover:text-amber-300" href="/dryer-vent-cleaning">
              Dryer Vent Cleaning
            </Link>
            <Link className="hover:text-amber-300" href="/air-duct-and-dryer-vent-cleaning">
              Combo Package
            </Link>
            <Link className="hover:text-amber-300" href="/blog">
              Blog
            </Link>
            <Link className="hover:text-amber-300" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="hover:text-amber-300" href="/terms-of-service">
              Terms of Service
            </Link>
            <Link className="hover:text-amber-300" href="/refund-policy">
              Refund Policy
            </Link>
            {navItems.map(({ link }, i) => (
              <CMSLink className="text-white/80 hover:text-amber-300" key={i} {...link} />
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Amazon Air Duct Cleaning. All rights reserved.
      </div>
    </footer>
  )
}
