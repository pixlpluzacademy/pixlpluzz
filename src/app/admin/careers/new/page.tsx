import type { Metadata } from 'next'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { CareerForm } from '@/components/admin/forms/CareerForm'

export const metadata: Metadata = { title: 'Add Career Listing' }

export default function NewCareerPage() {
  return (
    <div>
      <AdminPageHeader title="Add Career Listing" backHref="/admin/careers" backLabel="Back to Careers" />
      <CareerForm mode="create" />
    </div>
  )
}
