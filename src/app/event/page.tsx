import type { Metadata } from 'next'
import { getEvents } from '@/lib/data'
import { EventContent } from '@/components/event/EventContent'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming events, bootcamps, workshops, and scholarship tests at Pixl Pluz Academy.',
}

export default function EventPage() {
  const events = getEvents()
  return <EventContent events={events} />
}
