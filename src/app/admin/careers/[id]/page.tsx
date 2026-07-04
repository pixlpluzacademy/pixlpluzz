import type { Metadata } from 'next'
import { getCareers } from '@/lib/data'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { CareerForm } from '@/components/admin/forms/CareerForm'

type Props = { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: 'Edit Career Listing' }

export default async function EditCareerPage({ params }: Props) {
  const { id } = await params
  const career = getCareers().find(c => c.id === id) ?? null

  if (!career) {
    return (
      <div>
        <AdminPageHeader title="Listing Not Found" backHref="/admin/careers" backLabel="Back to Careers" />
        <p className="text-gray-500">This career listing may have been deleted.</p>
      </div>
    )
  }

  return (
    <div>
      <AdminPageHeader
        title="Edit Career Listing"
        description={career.title}
        backHref="/admin/careers"
        backLabel="Back to Careers"
        viewHref="/career"
      />
      <CareerForm career={career} mode="edit" />
    </div>
  )
}
