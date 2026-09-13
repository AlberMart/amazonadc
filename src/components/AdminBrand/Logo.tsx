import React from 'react'

import { getSiteSeo } from '@/utilities/seo'

export default async function AdminLogo() {
  const site = await getSiteSeo()

  return (
    <span className="admin-brand">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/favicon-32.png" alt="" width={32} height={32} />
      <span className="admin-brand__name">{site.siteName}</span>
    </span>
  )
}
