import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getCourses } from '@/lib/data'
import { AdminTable } from '@/components/admin/AdminTable'
import { formatPrice } from '@/lib/utils'

export const metadata: Metadata = { title: 'Courses' }

export default function AdminCoursesPage() {
  const courses = getCourses()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Courses</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{courses.length} course{courses.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="flex items-center gap-2 bg-blue-primary text-white px-4 py-2.5 text-sm font-bold pixel-corner-sm hover:brightness-110 transition-colors"
        >
          <Plus size={16} /> Add Course
        </Link>
      </div>

      <div className="bg-white dark:bg-navy-900 border border-gray-100 dark:border-white/5 pixel-corner p-6">
        <AdminTable
          headers={['Title', 'Level', 'Duration', 'Price', 'Featured']}
          rows={courses.map(c => ({
            id: c.id,
            editHref: `/admin/courses/${c.id}`,
            cells: [c.title, c.level, c.duration, formatPrice(c.price), c.featured ? '✓' : '—'],
          }))}
          deleteEndpoint="/api/courses"
        />
      </div>
    </div>
  )
}
