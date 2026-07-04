import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getCareers } from '@/lib/data'
import { AdminTable } from '@/components/admin/AdminTable'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Careers' }

export default function AdminCareersPage() {
  const careers = getCareers()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Careers</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{careers.length} listing{careers.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/careers/new"
          className="flex items-center gap-2 bg-blue-primary text-white px-4 py-2.5 text-sm font-bold pixel-corner-sm hover:brightness-110 transition-colors"
        >
          <Plus size={16} /> Add Career
        </Link>
      </div>

      <div className="bg-white dark:bg-navy-900 border border-gray-100 dark:border-white/5 pixel-corner p-6">
        <AdminTable
          headers={['Title', 'Type', 'Location', 'Posted', 'Deadline']}
          rows={careers.map(c => ({
            id: c.id,
            editHref: `/admin/careers/${c.id}`,
            cells: [c.title, c.type, c.location, formatDate(c.postedDate), formatDate(c.deadline)],
          }))}
          deleteEndpoint="/api/careers"
        />
      </div>
    </div>
  )
}
