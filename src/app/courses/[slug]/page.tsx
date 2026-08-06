import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourses, getCourse } from '@/lib/data'
import { CourseDetailContent } from '@/components/courses/CourseDetailContent'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  breadcrumbSchema,
  courseSchema,
  faqPageSchema,
  webPageSchema,
} from '@/lib/schema'
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

  const title = /\bCOURSE\b$/i.test(course.title.trim())
    ? course.title
    : `${course.title} COURSE`

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: `/courses/${course.slug}`,
            name: title,
            description: course.shortDescription,
            image: course.thumbnail,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Courses', path: '/courses' },
            { name: course.title, path: `/courses/${course.slug}` },
          ]),
          courseSchema(course),
          ...(course.faqs.length ? [faqPageSchema(course.faqs)] : []),
        ]}
      />
      <CourseDetailContent course={course} />
    </>
  )
}
