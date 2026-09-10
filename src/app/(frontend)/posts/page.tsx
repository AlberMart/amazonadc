import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { getBlogIndex } from '@/utilities/blog'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const posts = await getBlogIndex()

  return (
    <main>
      <PageClient />
      <section className="relative isolate overflow-hidden bg-[#0b1c2c] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(56,189,248,0.25),transparent_45%),linear-gradient(160deg,#0b1c2c_0%,#12324a_55%,#0b1c2c_100%)]"
        />
        <div className="container relative py-20 md:py-24">
          <p className="text-sm font-semibold tracking-[0.28em] text-sky-200 uppercase">
            Amazon Air Duct Cleaning
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
            Guides for cleaner air at home
          </h1>
          <p className="mt-5 max-w-2xl text-base text-sky-50/85 sm:text-lg">
            Practical advice on air duct cleaning, dryer vents, energy bills, and indoor air quality
            for homeowners across Virginia, Maryland, and DC.
          </p>
        </div>
      </section>

      <section className="bg-[#f4f7fa] py-16 md:py-20">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden border border-[#d5dee8] bg-white transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_18px_40px_rgba(11,28,44,0.08)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0b1c2c]">
                  <Image
                    src={post.hero}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#0b1c2c]">
                    {post.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[#516579]">
                    {post.description}
                  </p>
                  <span className="mt-6 text-sm font-semibold text-sky-700 group-hover:underline">
                    Read article
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Blog | Amazon Air Duct Cleaning',
    description:
      'Expert guides on air duct cleaning, dryer vent safety, allergies, and HVAC efficiency for homes in VA, MD, and DC.',
    openGraph: {
      title: 'Blog | Amazon Air Duct Cleaning',
      description:
        'Expert guides on air duct cleaning, dryer vent safety, allergies, and HVAC efficiency for homes in VA, MD, and DC.',
    },
  }
}
