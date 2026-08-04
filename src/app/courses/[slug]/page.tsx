import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourses, getCourse } from '@/lib/data'
import { CourseDetailContent } from '@/components/courses/CourseDetailContent'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getCourses().map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = getCourse(slug)
  if (!course) return { title: 'Course Not Found' }
  const title = /\bCOURSE\b$/i.test(course.title.trim())
    ? course.title
    : `${course.title} COURSE`
  return pageMetadata({
    title,
    description: course.shortDescription,
    path: `/courses/${course.slug}`,
    image: course.thumbnail,
  })
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params
  const course = getCourse(slug)
  if (!course) notFound()

  return <CourseDetailContent course={course} />
}
