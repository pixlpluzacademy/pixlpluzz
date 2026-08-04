/**
 * Content last-modified dates for sitemap.xml.
 * Bump a value only when that route's visible content actually changes.
 * ISO date strings (YYYY-MM-DD) — never use `new Date()` at build time.
 */
export const SITEMAP_LASTMOD = {
  home: '2026-08-04',
  about: '2026-07-23',
  courses: '2026-07-20',
  /** Shared date for all /courses/[slug] pages — bump when courses.json changes */
  courseDetail: '2026-07-20',
  scholarship: '2026-07-18',
  placement: '2026-07-20',
  career: '2026-07-15',
  blog: '2026-08-04',
  contact: '2026-07-23',
  event: '2026-07-20',
} as const
