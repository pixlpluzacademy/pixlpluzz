import type { Metadata } from 'next'
import { getCourses } from '@/lib/data'
import { CoursesContent } from '@/components/courses/CoursesContent'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Courses',
  description:
    'Explore AI-integrated courses in digital marketing, web development, data science, and cybersecurity at Pixl Pluz Academy, Kochi.',
  path: '/courses',
})

export default function CoursesPage() {
  const courses = getCourses()

  return <CoursesContent courses={courses} />
}
