import type { Metadata } from 'next'
import { canonicalUrl, DEFAULT_OG_IMAGE } from '@/lib/site'

type PageMetaInput = {
  title: string
  description: string
  /** Pathname starting with `/`, e.g. `/courses` or `/blog/my-post`. */
  path: string
  image?: string
  type?: 'website' | 'article'
  keywords?: string | string[]
  /** Set true for admin / thank-you / internal pages that must not be indexed. */
  noIndex?: boolean
  /**
   * Full SEO title from keyword plan — skip root `title.template`
   * so brand is not duplicated.
   */
  absoluteTitle?: boolean
}

/**
 * Unique title, description, canonical, and Open Graph tags for a route.
 * Canonicals are absolute apex URLs (`https://pixlpluz.com/...`) so Google
 * never inherits a www or coming-soon host from crawl context.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  keywords,
  noIndex = false,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const absolute = canonicalUrl(path)
  const useAbsolute =
    absoluteTitle ||
    /Pixl\s*Pluz/i.test(title) ||
    title.includes('|') ||
    title.includes(' - ')
  const ogTitle = useAbsolute
    ? title
    : title.includes('Pixl Pluz')
      ? title
      : `${title} | Pixl Pluz Academy`

  return {
    title: useAbsolute ? { absolute: title } : title,
    description,
    ...(keywords ? { keywords } : {}),
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true, nocache: true },
    alternates: {
      canonical: absolute,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: absolute,
      siteName: 'Pixl Pluz Academy',
      type,
      locale: 'en_IN',
      images: [{ url: image, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [image],
    },
  }
}
