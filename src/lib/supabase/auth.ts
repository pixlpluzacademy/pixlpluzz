import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/lib/supabase/types'

export async function getSessionUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  return (data as Profile | null) ?? null
}

export async function requireActiveStaff(): Promise<Profile> {
  const profile = await getCurrentProfile()
  if (!profile || !profile.is_active) {
    throw new Error('UNAUTHORIZED')
  }
  return profile
}

export async function requireAdmin(): Promise<Profile> {
  const profile = await requireActiveStaff()
  if (profile.role !== 'admin') {
    throw new Error('FORBIDDEN')
  }
  return profile
}

/** Admin or branch admin — can open Users page */
export async function requireUserManager(): Promise<Profile> {
  const profile = await requireActiveStaff()
  if (profile.role !== 'admin' && profile.role !== 'branch_admin') {
    throw new Error('FORBIDDEN')
  }
  return profile
}
