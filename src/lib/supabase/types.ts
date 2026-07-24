export type UserRole = 'admin' | 'branch_admin' | 'staff'
export type EnquirySource = 'contact' | 'home'
export type EnquiryStatus = 'new' | 'read' | 'closed'

export type Profile = {
  id: string
  email: string
  full_name: string
  role: UserRole
  is_active: boolean
  plain_password: string
  created_at: string
  updated_at: string
}

export type Enquiry = {
  id: string
  source: EnquirySource
  full_name: string
  email: string
  phone: string
  city: string
  interest: string
  message: string
  status: EnquiryStatus
  created_at: string
}

export function canManageUsers(role: UserRole) {
  return role === 'admin' || role === 'branch_admin'
}

export function roleLabel(role: UserRole) {
  if (role === 'branch_admin') return 'Branch Admin'
  if (role === 'admin') return 'Admin'
  return 'Staff'
}
