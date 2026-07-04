import type { Metadata } from 'next'
import { getCourses } from '@/lib/data'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { CourseForm } from '@/components/admin/forms/CourseForm'

type Props = { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: 'Edit Course' }

export default async function EditCoursePage({ params }: Props) {
  const { id } = await params
  const course = getCourses().find(c => c.id === id) ?? null

  if (!course) {
    return (
      <div>
        <AdminPageHeader title="Course Not Found" backHref="/admin/courses" backLabel="Back to Courses" />
        <p className="text-gray-500">This course may have been deleted.</p>
      </div>
    )
  }

  return (
    <div>
      <AdminPageHeader
        title="Edit Course"
        description={course.title}
        backHref="/admin/courses"
        backLabel="Back to Courses"
        viewHref={`/courses/${course.slug}`}
      />
      <CourseForm course={course} mode="edit" />
    </div>
  )
}
