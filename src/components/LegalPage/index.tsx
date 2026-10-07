import Link from 'next/link'
import React from 'react'

import { ContactForm } from '@/components/ContactForm'
import type { LegalPageContent } from '@/utilities/legal'

/**
 * Legal pages stay document-first: policy body + contact.
 * No marketing chrome (offers / service-area maps) — those belong on service and location pages.
 */
export async function LegalPage({ page }: { page: LegalPageContent }) {
  return (
    <article>
      <header className="border-b border-[var(--site-border)] bg-[var(--site-muted)]">
        <div className="container max-w-3xl py-12 md:py-16">
          <p className="text-sm font-medium tracking-wide text-[var(--site-body)] uppercase">
            Legal
          </p>
          <h1 className="mt-3 font-display text-3xl leading-tight font-semibold tracking-tight text-[var(--site-heading)] sm:text-4xl">
            {page.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base site-body sm:text-lg">{page.intro}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link href="/privacy-policy" className="site-link">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="site-link">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="site-link">
              Refund Policy
            </Link>
          </div>
        </div>
      </header>

      <section className="py-14 md:py-16">
        <div className="container max-w-3xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--site-heading)] md:text-3xl">
            {page.detailsHeading}
          </h2>

          <div className="mt-10 space-y-8">
            {page.sections.map((section) => (
              <div key={section.heading}>
                <h3 className="font-display text-xl font-semibold text-[var(--site-heading)]">
                  {section.heading}
                </h3>
                {section.intro ? (
                  <p className="mt-3 site-body leading-relaxed">{section.intro}</p>
                ) : null}
                {section.paragraphs?.map((p) => (
                  <p key={p} className="mt-3 site-body leading-relaxed">
                    {p}
                  </p>
                ))}
                {section.items?.length ? (
                  <ul className="mt-4 space-y-2">
                    {section.items.map((item) => {
                      const isEmail = item.includes('@')
                      const isPhone = item.startsWith('(') || item.startsWith('+')
                      return (
                        <li key={item} className="flex gap-3 text-[var(--site-heading)]">
                          <span className="site-list-marker" />
                          {isEmail ? (
                            <a className="text-[var(--site-link)] hover:underline" href={`mailto:${item}`}>
                              {item}
                            </a>
                          ) : isPhone ? (
                            <a className="text-[var(--site-link)] hover:underline" href="tel:+18006063334">
                              {item}
                            </a>
                          ) : (
                            <span>{item}</span>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>

          {page.closing ? (
            <p className="mt-10 font-medium text-[var(--site-heading)]">{page.closing}</p>
          ) : null}

          <p className="mt-6 text-sm site-body">
            Questions about this page? Email{' '}
            <a className="site-link" href="mailto:support@amazonadc.com">
              support@amazonadc.com
            </a>{' '}
            or call{' '}
            <a className="site-link" href="tel:+18006063334">
              (800) 606-3334
            </a>
            .
          </p>
        </div>
      </section>

      <ContactForm sourcePage={`/${page.slug}`} />
    </article>
  )
}
