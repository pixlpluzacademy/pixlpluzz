import type { Metadata } from 'next'
import { getEvents } from '@/lib/data'
import { EventContent } from '@/components/event/EventContent'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  breadcrumbSchema,
  eventSchema,
  webPageSchema,
} from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'

const description =
  'Upcoming events, bootcamps, workshops, and scholarship tests at Pixl Pluz Academy in Kochi.'

export const metadata: Metadata = pageMetadata({
  title: 'Events',
  description,
  path: '/event',
})

export default function EventPage() {
  const events = getEvents()
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: '/event',
            name: 'Events',
            description,
            type: 'CollectionPage',
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Events', path: '/event' },
          ]),
          ...events.map(eventSchema),
        ]}
      />
      <EventContent events={events} />
    </>
  )
}
