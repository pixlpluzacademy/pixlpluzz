import type { Metadata } from 'next'
import { getEvents } from '@/lib/data'
import { EventContent } from '@/components/event/EventContent'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  breadcrumbSchema,
  eventSchema,
  webPageSchema,
} from '@/lib/schema'
import { PAGE_SEO } from '@/data/page-seo'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: PAGE_SEO.event.title,
  description: PAGE_SEO.event.description,
  path: '/event',
  absoluteTitle: true,
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
