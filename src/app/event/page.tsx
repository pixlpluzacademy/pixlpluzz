import type { Metadata } from 'next'
import { getEvents } from '@/lib/data'
import { EventContent } from '@/components/event/EventContent'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Events',
  description:
    'Upcoming events, bootcamps, workshops, and scholarship tests at Pixl Pluz Academy in Kochi.',
  path: '/event',
})

export default function EventPage() {
  const events = getEvents()
  return <EventContent events={events} />
}
