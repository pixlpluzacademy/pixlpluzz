import type { Metadata } from 'next'
import { getCareers } from '@/lib/data'
import { CareerContent } from '@/components/career/CareerContent'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  breadcrumbSchema,
  jobPostingSchema,
  webPageSchema,
} from '@/lib/schema'
import { PAGE_SEO } from '@/data/page-seo'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: PAGE_SEO.career.title,
  description: PAGE_SEO.career.description,
  path: '/career',
  absoluteTitle: true,
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
