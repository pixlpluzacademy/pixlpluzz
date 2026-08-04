/** Canonical production origin for sitemap, robots, and Open Graph URLs. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://pixlpluz.com'

/** Default social preview image (served from /public). */
export const DEFAULT_OG_IMAGE = '/images/office/pixl-pluz-academy-reception.png'
