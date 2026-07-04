import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourses, getCourse } from '@/lib/data'
import { CourseDetailContent } from '@/components/courses/CourseDetailContent'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getCourses().map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = getCourse(slug)
  if (!course) return { title: 'Course Not Found' }
  return { title: course.title, description: course.shortDescription }
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params
  const course = getCourse(slug)
  if (!course) notFound()

  return <CourseDetailContent course={course} />
}
