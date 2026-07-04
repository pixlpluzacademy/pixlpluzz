import type { Metadata } from 'next'
import { getCourses } from '@/lib/data'
import { CoursesContent } from '@/components/courses/CoursesContent'

export const metadata: Metadata = {
  title: 'Courses',
  description:
    'Explore AI-integrated courses in digital marketing, web development, data science, and cybersecurity at Pixl Pluz Academy, Kochi.',
}

export default function CoursesPage() {
  const courses = getCourses()

  return <CoursesContent courses={courses} />
}
