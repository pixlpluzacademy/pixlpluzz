import type { Metadata } from 'next'
import { getBlogs } from '@/lib/data'
import { BlogListContent } from '@/components/blog/BlogListContent'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Blog',
  description:
    'Digital marketing tips, career guides, AI tool insights, and industry news from Pixl Pluz Academy.',
  path: '/blog',
})

export default function BlogPage() {
  const blogs = getBlogs()

  return <BlogListContent blogs={blogs} />
}
