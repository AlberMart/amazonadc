import { JsonLd } from '@/components/JsonLd'
import { getAllOffices } from '@/utilities/offices'
import { getAllServiceCards } from '@/utilities/services'
import {
  businessNode,
  getSiteSeo,
  jsonLd,
  organizationNode,
  websiteNode,
} from '@/utilities/seo'

/** Site-wide LocalBusiness graph in <head> so crawlers and rich-result tools always see NAP. */
export async function SiteJsonLd() {
  const site = await getSiteSeo()
  let offices: Awaited<ReturnType<typeof getAllOffices>> = []
  let services: Array<{ title: string; slug: string; price?: number | null }> = []

  try {
    const [officeRows, serviceRows] = await Promise.all([getAllOffices(), getAllServiceCards()])
    offices = officeRows
    services = serviceRows.map((service) => ({
      title: service.title,
      slug: service.slug,
      price: service.price,
    }))
  } catch {
    // Layout still emits Organization from Site Settings if offices/services fail.
  }

  const primary = offices.find((office) => office.slug === 'bethesda') || offices[0] || null

  return (
    <JsonLd
      data={jsonLd([
        organizationNode(site, primary),
        websiteNode(site),
        businessNode(site, offices, services),
      ])}
    />
  )
}
