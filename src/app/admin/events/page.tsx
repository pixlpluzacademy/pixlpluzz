import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getEvents } from '@/lib/data'
import { AdminTable } from '@/components/admin/AdminTable'
import { formatDate, formatPrice } from '@/lib/utils'

export const metadata: Metadata = { title: 'Events' }

export default function AdminEventsPage() {
  const events = getEvents()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Events</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{events.length} event{events.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 bg-blue-primary text-white px-4 py-2.5 text-sm font-bold pixel-corner-sm hover:brightness-110 transition-colors"
        >
          <Plus size={16} /> Add Event
        </Link>
      </div>

      <div className="bg-white dark:bg-navy-900 border border-gray-100 dark:border-white/5 pixel-corner p-6">
        <AdminTable
          headers={['Title', 'Type', 'Date', 'Location', 'Seats', 'Price']}
          rows={events.map(e => ({
            id: e.id,
            editHref: `/admin/events/${e.id}`,
            cells: [e.title, e.type, formatDate(e.date), e.location, e.seats, e.isFree ? 'Free' : formatPrice(e.price)],
          }))}
          deleteEndpoint="/api/events"
        />
      </div>
    </div>
  )
}
