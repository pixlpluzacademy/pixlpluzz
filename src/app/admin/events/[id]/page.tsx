import type { Metadata } from 'next'
import { getEvents } from '@/lib/data'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { EventForm } from '@/components/admin/forms/EventForm'

type Props = { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: 'Edit Event' }

export default async function EditEventPage({ params }: Props) {
  const { id } = await params
  const event = getEvents().find(e => e.id === id) ?? null

  if (!event) {
    return (
      <div>
        <AdminPageHeader title="Event Not Found" backHref="/admin/events" backLabel="Back to Events" />
        <p className="text-gray-500">This event may have been deleted.</p>
      </div>
    )
  }

  return (
    <div>
      <AdminPageHeader
        title="Edit Event"
        description={event.title}
        backHref="/admin/events"
        backLabel="Back to Events"
        viewHref="/event"
      />
      <EventForm event={event} mode="edit" />
    </div>
  )
}
