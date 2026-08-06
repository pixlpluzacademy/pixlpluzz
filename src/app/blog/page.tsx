import type { Metadata } from 'next'
import { getBlogs } from '@/lib/data'
import { BlogListContent } from '@/components/blog/BlogListContent'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  blogListSchema,
  breadcrumbSchema,
  webPageSchema,
} from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'

const description =
  'Digital marketing tips, career guides, AI tool insights, and industry news from Pixl Pluz Academy.'

export const metadata: Metadata = pageMetadata({
  title: 'Blog',
  description,
  path: '/blog',
})

export default function BlogPage() {
  const blogs = getBlogs()

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: '/blog',
            name: 'Blog',
            description,
            type: 'CollectionPage',
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]),
          blogListSchema(blogs),
        ]}
      />
      <BlogListContent blogs={blogs} />
    </>
  )
}
