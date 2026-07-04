import type { Metadata } from 'next'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { CourseForm } from '@/components/admin/forms/CourseForm'

export const metadata: Metadata = { title: 'New Course' }

export default function NewCoursePage() {
  return (
    <div>
      <AdminPageHeader title="Add New Course" backHref="/admin/courses" backLabel="Back to Courses" />
      <CourseForm mode="create" />
    </div>
  )
}
