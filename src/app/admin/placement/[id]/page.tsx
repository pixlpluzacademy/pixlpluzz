import type { Metadata } from 'next'
import { getCourses, getPlacement } from '@/lib/data'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { PlacementForm } from '@/components/admin/forms/PlacementForm'

type Props = { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: 'Edit Placement Entry' }

export default async function EditPlacementPage({ params }: Props) {
  const { id } = await params
  const student = getPlacement().find(s => s.id === id) ?? null
  const courseOptions = getCourses().map(c => c.title)

  if (!student) {
    return (
      <div>
        <AdminPageHeader title="Entry Not Found" backHref="/admin/placement" backLabel="Back to Placement" />
        <p className="text-gray-500">This placement entry may have been deleted.</p>
      </div>
    )
  }

  return (
    <div>
      <AdminPageHeader
        title="Edit Placement Entry"
        description={student.name}
        backHref="/admin/placement"
        backLabel="Back to Placement"
        viewHref="/placement"
      />
      <PlacementForm student={student} mode="edit" courseOptions={courseOptions} />
    </div>
  )
}
