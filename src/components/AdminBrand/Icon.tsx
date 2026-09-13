import React from 'react'

import { getSiteSeo } from '@/utilities/seo'

export default async function AdminIcon() {
  const site = await getSiteSeo()

  return (
    <span className="admin-brand admin-brand--icon">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/favicon-32.png" alt={site.siteName} width={22} height={22} />
    </span>
  )
}
