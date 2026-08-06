import type { Metadata } from 'next'
import { getCourses } from '@/lib/data'
import { CoursesContent } from '@/components/courses/CoursesContent'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  breadcrumbSchema,
  courseListSchema,
  webPageSchema,
} from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'

const description =
  'Explore AI-integrated courses in digital marketing, web development, data science, and cybersecurity at Pixl Pluz Academy, Kochi.'

export const metadata: Metadata = pageMetadata({
  title: 'Courses',
  description,
  path: '/courses',
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
