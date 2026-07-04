import type { Metadata } from 'next'
import { getBlogs } from '@/lib/data'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { BlogForm } from '@/components/admin/forms/BlogForm'

type Props = { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: 'Edit Blog Post' }

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params
  const blog = getBlogs().find(b => b.id === id) ?? null

  if (!blog) {
    return (
      <div>
        <AdminPageHeader title="Post Not Found" backHref="/admin/blogs" backLabel="Back to Blog Posts" />
        <p className="text-gray-500">This blog post may have been deleted.</p>
      </div>
    )
  }

  return (
    <div>
      <AdminPageHeader
        title="Edit Blog Post"
        description={blog.title}
        backHref="/admin/blogs"
        backLabel="Back to Blog Posts"
        viewHref={`/blog/${blog.slug}`}
      />
      <BlogForm blog={blog} mode="edit" />
    </div>
  )
}
