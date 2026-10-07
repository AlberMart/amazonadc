/** Curated footer city hubs — full list lives on /locations. */
export const footerCityLinks = [
  { label: 'Arlington, VA', url: '/locations/arlington' },
  { label: 'Alexandria, VA', url: '/locations/alexandria' },
  { label: 'Fairfax, VA', url: '/locations/fairfax' },
  { label: 'Reston, VA', url: '/locations/reston' },
  { label: 'McLean, VA', url: '/locations/mclean' },
  { label: 'Washington, DC', url: '/locations/washington-dc' },
  { label: 'Rockville, MD', url: '/locations/rockville' },
  { label: 'Silver Spring, MD', url: '/locations/silver-spring' },
  { label: 'Gaithersburg, MD', url: '/locations/gaithersburg' },
  { label: 'Columbia, MD', url: '/locations/columbia' },
  { label: 'Frederick, MD', url: '/locations/frederick' },
  { label: 'All locations', url: '/locations' },
] as const

export function footerCityNavRows() {
  return footerCityLinks.map(({ label, url }) => ({
    link: {
      type: 'custom' as const,
      label,
      url,
    },
  }))
}
