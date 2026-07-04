import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getBlogs } from '@/lib/data'
import { AdminTable } from '@/components/admin/AdminTable'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Blog Posts' }

export default function AdminBlogsPage() {
  const blogs = getBlogs()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Blog Posts</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{blogs.length} post{blogs.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 bg-blue-primary text-white px-4 py-2.5 text-sm font-bold pixel-corner-sm hover:brightness-110 transition-colors"
        >
          <Plus size={16} /> Add Post
        </Link>
      </div>

      <div className="bg-white dark:bg-navy-900 border border-gray-100 dark:border-white/5 pixel-corner p-6">
        <AdminTable
          headers={['Title', 'Category', 'Author', 'Date', 'Views']}
          rows={blogs.map(b => ({
            id: b.id,
            editHref: `/admin/blogs/${b.id}`,
            cells: [b.title, b.category, b.author, formatDate(b.date), b.views],
          }))}
          deleteEndpoint="/api/blogs"
        />
      </div>
    </div>
  )
}
