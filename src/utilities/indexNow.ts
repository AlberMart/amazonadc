import { absoluteUrl } from '@/utilities/seo'
import { isNonProductionHost } from '@/utilities/getURL'
import { scheduleRevalidate } from '@/utilities/scheduleRevalidate'

/**
 * Notify IndexNow (Bing / Yandex / others) after publish so cutover URLs reindex quickly.
 * Set INDEXNOW_KEY on production. Key file: /indexnow-key.txt
 */
export function scheduleIndexNow(paths: Array<string | null | undefined>) {
  if (isNonProductionHost()) return
  const key = process.env.INDEXNOW_KEY?.trim()
  if (!key) return

  const host = new URL(absoluteUrl('/')).host
  const urlList = [
    ...new Set(
      paths
        .filter((p): p is string => Boolean(p))
        .map((p) => (p.startsWith('http') ? p : absoluteUrl(p.startsWith('/') ? p : `/${p}`))),
    ),
  ]
  if (!urlList.length) return

  scheduleRevalidate(() => {
    void fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key,
        keyLocation: absoluteUrl('/indexnow-key.txt'),
        urlList,
      }),
    }).catch(() => {
      /* non-blocking */
    })
  })
}
