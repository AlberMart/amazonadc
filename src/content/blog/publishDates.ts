/**
 * First-publish dates for file-seeded blog posts.
 *
 * Policy (Google-safe):
 * - Start 2026-07-07 (Eastern); last city post on/before 2026-09-30 — never future.
 * - Irregular spacing (not every N days at noon) so the timeline looks editorial.
 * - dateModified stays equal to datePublished until a real substantial rewrite.
 * - Visible <time> on the article must match these values.
 *
 * Do NOT backdate to prior years: crawl history + fake multi-year archives is the
 * riskier pattern. Establishing first-publish dates within the recent launch window
 * is normal; Google may still prefer its own crawl estimate if signals conflict.
 */
export const BLOG_PUBLISH_DATES: Record<string, string> = {
  // Evergreen — July → early August 2026
  'how-often-clean-air-ducts': '2026-07-07T10:15:00-04:00',
  '7-signs-air-ducts-need-cleaning': '2026-07-11T14:40:00-04:00',
  'why-clean-dryer-vents': '2026-07-16T09:25:00-04:00',
  'can-dirty-air-ducts-cause-allergies': '2026-07-22T11:05:00-04:00',
  'do-dirty-air-ducts-raise-energy-bills': '2026-07-28T15:50:00-04:00',
  'how-dirty-air-ducts-increase-energy-bills': '2026-07-28T15:50:00-04:00',
  'never-clean-air-ducts': '2026-08-03T13:20:00-04:00',

  // Local guides — Aug 5 → Sep 30 2026
  'how-potomac-humidity-affects-arlington-air-quality': '2026-08-05T09:10:00-04:00',
  'how-potomac-humidity-affects-alexandria-air-quality': '2026-08-06T10:35:00-04:00',
  'dc-humidity-row-houses-indoor-air': '2026-08-08T11:20:00-04:00',
  'mclean-tree-pollen-basement-humidity': '2026-08-10T13:05:00-04:00',
  'rockville-basement-humidity-air-ducts': '2026-08-11T14:45:00-04:00',
  'fairfax-ramblers-pollen-air-ducts': '2026-08-13T15:30:00-04:00',
  'springfield-mixing-bowl-dust-air-ducts': '2026-08-15T16:15:00-04:00',
  'loudoun-construction-dust-pollen-air-ducts': '2026-08-16T09:10:00-04:00',
  'prince-william-occoquan-humidity-air-ducts': '2026-08-18T10:35:00-04:00',
  'silver-spring-brick-houses-urban-dust-air-ducts': '2026-08-20T11:20:00-04:00',
  'gaithersburg-kentlands-basement-humidity-air-ducts': '2026-08-22T13:05:00-04:00',
  'college-park-rentals-pollen-air-ducts': '2026-08-23T14:45:00-04:00',
  'reston-town-center-dust-air-ducts': '2026-08-25T15:30:00-04:00',
  'herndon-construction-dust-air-ducts': '2026-08-27T16:15:00-04:00',
  'vienna-tree-pollen-basement-air-ducts': '2026-08-29T09:10:00-04:00',
  'great-falls-estates-humidity-air-ducts': '2026-08-30T10:35:00-04:00',
  'falls-church-close-in-dust-air-ducts': '2026-09-01T11:20:00-04:00',
  'chantilly-route-28-dust-air-ducts': '2026-09-03T13:05:00-04:00',
  'oakton-canopy-pollen-air-ducts': '2026-09-04T14:45:00-04:00',
  'lorton-i95-occoquan-air-ducts': '2026-09-06T15:30:00-04:00',
  'mount-vernon-potomac-humidity-air-ducts': '2026-09-08T16:15:00-04:00',
  'fair-oaks-townhomes-dust-air-ducts': '2026-09-10T09:10:00-04:00',
  'germantown-i270-townhome-air-ducts': '2026-09-11T10:35:00-04:00',
  'potomac-tree-canopy-humidity-air-ducts': '2026-09-13T11:20:00-04:00',
  'wheaton-urban-dust-air-ducts': '2026-09-15T13:05:00-04:00',
  'takoma-park-bungalow-humidity-air-ducts': '2026-09-17T14:45:00-04:00',
  'kensington-colonials-pollen-air-ducts': '2026-09-18T15:30:00-04:00',
  'olney-rambler-pollen-air-ducts': '2026-09-20T16:15:00-04:00',
  'hyattsville-route-1-humidity-air-ducts': '2026-09-22T09:10:00-04:00',
  'columbia-village-townhomes-air-ducts': '2026-09-24T10:35:00-04:00',
  'ellicott-city-flood-humidity-air-ducts': '2026-09-25T11:20:00-04:00',
  'frederick-downtown-humidity-air-ducts': '2026-09-27T13:05:00-04:00',
  'montgomery-village-townhomes-air-ducts': '2026-09-29T14:45:00-04:00',
  'clarksburg-new-construction-dust-air-ducts': '2026-09-30T15:30:00-04:00',
}

export function blogPublishDate(slug: string): string | null {
  return BLOG_PUBLISH_DATES[slug] || null
}
