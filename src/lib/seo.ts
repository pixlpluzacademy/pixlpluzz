import type { Metadata } from 'next'
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/lib/site'

type PageMetaInput = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
}

/** Unique title, description, canonical, and Open Graph tags for a route. */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
}: PageMetaInput): Metadata {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`
  const ogTitle = title.includes('Pixl Pluz')
    ? title
    : `${title} | Pixl Pluz Academy`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
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
