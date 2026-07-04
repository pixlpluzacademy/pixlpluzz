import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getPlacement } from '@/lib/data'
import { AdminTable } from '@/components/admin/AdminTable'

export const metadata: Metadata = { title: 'Placement' }

export default function AdminPlacementPage() {
  const students = getPlacement()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Placement</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{students.length} student{students.length !== 1 ? 's' : ''} placed</p>
        </div>
        <Link
          href="/admin/placement/new"
          className="flex items-center gap-2 bg-blue-primary text-white px-4 py-2.5 text-sm font-bold pixel-corner-sm hover:brightness-110 transition-colors"
        >
          <Plus size={16} /> Add Student
        </Link>
      </div>

      <div className="bg-white dark:bg-navy-900 border border-gray-100 dark:border-white/5 pixel-corner p-6">
        <AdminTable
          headers={['Name', 'Course', 'Company', 'Role', 'Batch']}
          rows={students.map(s => ({
            id: s.id,
            editHref: `/admin/placement/${s.id}`,
            cells: [s.name, s.course, s.company, s.role, s.batch],
          }))}
          deleteEndpoint="/api/placement"
        />
      </div>
    </div>
  )
}
