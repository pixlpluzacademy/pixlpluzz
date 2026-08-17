/**
 * Canonical production origin (www).
 * Keep sitemap, robots, Open Graph, and Hostinger redirects aligned to this host.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://www.pixlpluz.com'

/**
 * Absolute canonical URL for a path.
 * Home always ends with `/` (preferred form: https://www.pixlpluz.com/).
 * Other routes have no trailing slash.
 */
export function canonicalUrl(path = '/'): string {
  const normalized = path === '/' ? '/' : path.replace(/\/$/, '')
  return normalized === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalized}`
}

/** Default social preview image (served from /public). */
export const DEFAULT_OG_IMAGE = '/media/images/office/pixl-pluz-academy-reception.png'
