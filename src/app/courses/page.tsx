import type { Metadata } from 'next'
import { getCourses } from '@/lib/data'
import { CoursesContent } from '@/components/courses/CoursesContent'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  breadcrumbSchema,
  courseListSchema,
  webPageSchema,
} from '@/lib/schema'
import { PAGE_SEO } from '@/data/page-seo'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: PAGE_SEO.courses.title,
  description: PAGE_SEO.courses.description,
  path: '/courses',
  absoluteTitle: true,
})

export default function CoursesPage() {
  const courses = getCourses()

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: '/courses',
            name: 'Courses',
            description,
            type: 'CollectionPage',
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Courses', path: '/courses' },
          ]),
          courseListSchema(courses),
        ]}
      />
      <CoursesContent courses={courses} />
    </>
  )
}
