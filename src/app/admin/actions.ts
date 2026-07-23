'use server'

import { revalidatePath } from 'next/cache'
import { requireActiveStaff, requireUserManager } from '@/lib/supabase/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import type { EnquiryStatus, Profile, UserRole } from '@/lib/supabase/types'

function normalizeRole(role: string): UserRole {
  if (role === 'admin') return 'admin'
  if (role === 'branch_admin') return 'branch_admin'
  return 'staff'
}

function canCreateRole(actor: Profile, target: UserRole) {
  if (actor.role === 'admin') {
    return target === 'branch_admin' || target === 'staff'
  }
  if (actor.role === 'branch_admin') {
    return target === 'staff'
  }
  return false
}

function canManageTarget(actor: Profile, target: Profile) {
  if (actor.id === target.id) return false
  if (actor.role === 'admin') return true
  if (actor.role === 'branch_admin') return target.role === 'staff'
  return false
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  try {
    await requireActiveStaff()
  } catch {
    return { error: 'Unauthorized' }
  }
  if (!['new', 'read', 'closed'].includes(status)) {
    return { error: 'Invalid status' }
  }

  const admin = createAdminClient()
  const { error } = await admin.from('enquiries').update({ status }).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin')
  revalidatePath('/admin/enquiries')
  revalidatePath(`/admin/enquiries/${id}`)
  return { ok: true }
}

export async function createStaffUser(input: {
  email: string
  password: string
  full_name: string
  role: UserRole
}) {
  let me: Profile
  try {
    me = await requireUserManager()
  } catch {
    return { error: 'Forbidden' }
  }

  const email = input.email.trim().toLowerCase()
  const full_name = input.full_name.trim()
  const role = normalizeRole(input.role)
  if (role === 'admin') {
    return { error: 'Cannot create admin accounts from this form' }
  }

  if (!canCreateRole(me, role)) {
    return { error: 'You cannot create this role' }
  }

  if (!email || !input.password || input.password.length < 8) {
    return { error: 'Email and password (min 8 chars) required' }
  }

  const admin = createAdminClient()
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password: input.password,
    email_confirm: true,
    user_metadata: { full_name, role },
  })

  if (error) return { error: error.message }

  if (data.user) {
    await admin
      .from('profiles')
      .update({
        full_name,
        role,
        email,
        is_active: true,
        plain_password: input.password,
      })
      .eq('id', data.user.id)
  }

  revalidatePath('/admin/users')
  return { ok: true, password: input.password, email }
}

export async function setUserActive(userId: string, is_active: boolean) {
  let me: Profile
  try {
    me = await requireUserManager()
  } catch {
    return { error: 'Forbidden' }
  }

  const admin = createAdminClient()
  const { data: target } = await admin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()

  if (!target) return { error: 'User not found' }
  if (!canManageTarget(me, target as Profile)) {
    return { error: 'You cannot change this user' }
  }

  const { error } = await admin.from('profiles').update({ is_active }).eq('id', userId)
  if (error) return { error: error.message }

  revalidatePath('/admin/users')
  return { ok: true }
}

export async function deleteUser(userId: string) {
  let me: Profile
  try {
    me = await requireUserManager()
  } catch {
    return { error: 'Forbidden' }
  }

  const admin = createAdminClient()
  const { data: target } = await admin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()

  if (!target) return { error: 'User not found' }
  if (!canManageTarget(me, target as Profile)) {
    return { error: 'You cannot delete this user' }
  }

  const { error } = await admin.auth.admin.deleteUser(userId)
  if (error) return { error: error.message }

  revalidatePath('/admin/users')
  return { ok: true }
}
