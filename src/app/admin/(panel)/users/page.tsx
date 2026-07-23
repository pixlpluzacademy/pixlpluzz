import { redirect } from 'next/navigation'
import { createStaffDataClient } from '@/lib/supabase/staff-data'
import { UsersManager } from '@/components/admin/UsersManager'
import { canManageUsers, type Profile } from '@/lib/supabase/types'

export const metadata = { title: 'Users' }
export const dynamic = 'force-dynamic'

export default async function UsersPage() {
  let profile
  let supabase
  try {
    ;({ profile, supabase } = await createStaffDataClient())
  } catch {
    redirect('/admin/login')
  }

  if (!canManageUsers(profile.role)) {
    redirect('/admin')
  }

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  const subtitle =
    profile.role === 'admin'
      ? 'Create branch admins and staff. Passwords are shown in the table below.'
      : 'Create and manage staff only. Admin accounts are hidden from this view.'

  return (
    <div>
      <h1 className="text-2xl font-black text-white">Users</h1>
      <p className="mt-1 text-sm text-white/50">{subtitle}</p>
      <UsersManager
        profiles={(data ?? []) as Profile[]}
        currentUser={profile}
      />
    </div>
  )
}
