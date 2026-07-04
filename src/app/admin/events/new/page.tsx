import type { Metadata } from 'next'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { EventForm } from '@/components/admin/forms/EventForm'

export const metadata: Metadata = { title: 'New Event' }

export default function NewEventPage() {
  return (
    <div>
      <AdminPageHeader title="Add New Event" backHref="/admin/events" backLabel="Back to Events" />
      <EventForm mode="create" />
    </div>
  )
}
