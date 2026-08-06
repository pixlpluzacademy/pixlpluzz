import type { Metadata } from 'next'
import { ScholarshipContent } from '@/components/scholarship/ScholarshipContent'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'

const description =
  "Apply for the Pixl Pluz Academy scholarship program. A test-based merit scholarship for students who can't afford digital education."

export const metadata: Metadata = pageMetadata({
  title: 'Scholarship',
  description,
  path: '/scholarship',
})

export default function ScholarshipPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: '/scholarship',
            name: 'Scholarship',
            description,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Scholarship', path: '/scholarship' },
          ]),
        ]}
      />
      <ScholarshipContent />
    </>
  )
}
