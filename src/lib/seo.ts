import type { Metadata } from 'next'
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/lib/site'

type PageMetaInput = {
  title: string
  description: string
  /** Pathname starting with `/`, e.g. `/courses` or `/blog/my-post`. */
  path: string
  image?: string
  type?: 'website' | 'article'
}

/**
 * Unique title, description, canonical, and Open Graph tags for a route.
 * Canonicals are path-relative and resolved via root `metadataBase`
 * (`https://pixlpluz.com`) so www/apex stays consistent.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
}: PageMetaInput): Metadata {
  const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '')
  const absoluteUrl =
    normalizedPath === '/' ? SITE_URL : `${SITE_URL}${normalizedPath}`
  const ogTitle = title.includes('Pixl Pluz')
    ? title
    : `${title} | Pixl Pluz Academy`

  return {
    title,
    description,
    alternates: {
      // Relative path → metadataBase (recommended Next.js pattern)
      canonical: normalizedPath === '/' ? './' : normalizedPath,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: absoluteUrl,
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
