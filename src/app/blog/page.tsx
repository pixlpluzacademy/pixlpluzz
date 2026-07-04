import type { Metadata } from 'next'
import { getBlogs } from '@/lib/data'
import { PageHeader } from '@/components/ui/PageHeader'
import { BlogListContent } from '@/components/blog/BlogListContent'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Digital marketing tips, career guides, AI tool insights, and industry news from Pixl Pluz Academy.',
}

export default function BlogPage() {
  const blogs = getBlogs()

  return (
    <>
      <PageHeader
        breadcrumb="Blog"
        title="Blog & Insights"
        subtitle="Career tips, AI tools guides, and digital marketing strategies from our instructors."
      />
      <BlogListContent blogs={blogs} />
    </>
  )
}
