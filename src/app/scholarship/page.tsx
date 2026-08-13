import type { Metadata } from 'next'
import { ScholarshipContent } from '@/components/scholarship/ScholarshipContent'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { PAGE_SEO } from '@/data/page-seo'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: PAGE_SEO.scholarship.title,
  description: PAGE_SEO.scholarship.description,
  path: '/scholarship',
  absoluteTitle: true,
})

export default function ScholarshipPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: '/scholarship',
            name: PAGE_SEO.scholarship.title,
            description: PAGE_SEO.scholarship.description,
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
