import type { Metadata } from 'next'
import { getCareers } from '@/lib/data'
import { CareerContent } from '@/components/career/CareerContent'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  breadcrumbSchema,
  jobPostingSchema,
  webPageSchema,
} from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'

const description =
  'Join the Pixl Pluz Academy team. View open positions for trainers, instructors, and counsellors in Kochi.'

export const metadata: Metadata = pageMetadata({
  title: 'Careers',
  description,
  path: '/career',
})

export default function CareerPage() {
  const careers = getCareers()
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: '/career',
            name: 'Careers',
            description,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Careers', path: '/career' },
          ]),
          ...careers.map(jobPostingSchema),
        ]}
      />
      <CareerContent careers={careers} />
    </>
  )
}
