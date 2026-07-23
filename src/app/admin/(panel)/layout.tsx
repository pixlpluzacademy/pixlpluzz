import { redirect } from 'next/navigation'
import { getCurrentProfile } from '@/lib/supabase/auth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminTopBar } from '@/components/admin/AdminTopBar'

export const dynamic = 'force-dynamic'

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getCurrentProfile()
  if (!profile || !profile.is_active) {
    redirect('/admin/login')
  }

  return (
    <div className="flex min-h-svh bg-black text-white" data-admin-shell>
      <AdminSidebar profile={profile} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopBar profile={profile} />
        <main className="flex-1 overflow-auto p-6 sm:p-8">{children}</main>
        <footer className="border-t border-white/10 px-6 py-3 text-center sm:px-8">
          <p className="text-[11px] text-white/35">
            © {new Date().getFullYear()} Pixl Pluz
          </p>
        </footer>
      </div>
    </div>
  )
}
