import type { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s — Admin | Pixl Pluz' },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-950 lg:flex">
      <AdminSidebar />
      <main className="min-h-screen flex-1 p-4 sm:p-6 lg:p-8 lg:ml-64">
        {children}
      </main>
    </div>
  )
}
