import type { Metadata } from 'next'
import { getCourses } from '@/lib/data'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { PlacementForm } from '@/components/admin/forms/PlacementForm'

export const metadata: Metadata = { title: 'Add Placed Student' }

export default function NewPlacementPage() {
  const courseOptions = getCourses().map(c => c.title)

  return (
    <div>
      <AdminPageHeader title="Add Placed Student" backHref="/admin/placement" backLabel="Back to Placement" />
      <PlacementForm mode="create" courseOptions={courseOptions} />
    </div>
  )
}
