import type { Metadata } from 'next'
import { getBlogs } from '@/lib/data'
import { BlogListContent } from '@/components/blog/BlogListContent'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  blogListSchema,
  breadcrumbSchema,
  webPageSchema,
} from '@/lib/schema'
import { PAGE_SEO } from '@/data/page-seo'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: PAGE_SEO.blog.title,
  description: PAGE_SEO.blog.description,
  path: '/blog',
  absoluteTitle: true,
})

export default function BlogPage() {
  const blogs = getBlogs()

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: '/blog',
            name: PAGE_SEO.blog.title,
            description: PAGE_SEO.blog.description,
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
