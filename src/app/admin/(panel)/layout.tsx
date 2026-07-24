import { redirect } from 'next/navigation'
import { getCurrentProfile } from '@/lib/supabase/auth'
import { AdminShell } from '@/components/admin/AdminShell'

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

  return <AdminShell profile={profile}>{children}</AdminShell>
}
