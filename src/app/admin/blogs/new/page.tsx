import type { Metadata } from 'next'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { BlogForm } from '@/components/admin/forms/BlogForm'

export const metadata: Metadata = { title: 'New Blog Post' }

export default function NewBlogPage() {
  return (
    <div>
      <AdminPageHeader title="Add New Blog Post" backHref="/admin/blogs" backLabel="Back to Blog Posts" />
      <BlogForm mode="create" />
    </div>
  )
}
