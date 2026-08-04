/**
 * Canonical production origin (apex / non-www).
 * Keep sitemap, robots, Open Graph, and Hostinger redirects aligned to this host.
 * Do not switch to www unless the live canonical also becomes www.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://pixlpluz.com'

/** Default social preview image (served from /public). */
export const DEFAULT_OG_IMAGE = '/images/office/pixl-pluz-academy-reception.png'
