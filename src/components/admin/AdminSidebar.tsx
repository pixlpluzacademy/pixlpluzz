'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  MessageSquareText,
  Users,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { canManageUsers, type Profile } from '@/lib/supabase/types'

const NAV: {
  href: string
  label: string
  icon: typeof LayoutDashboard
  exact?: boolean
  managersOnly?: boolean
}[] = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/enquiries', label: 'Enquiries', icon: MessageSquareText },
  { href: '/admin/users', label: 'Users', icon: Users, managersOnly: true },
]

export function AdminSidebar({
  profile,
  open,
  onClose,
}: {
  profile: Profile
  open: boolean
  onClose: () => void
}) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex w-64 max-w-[85vw] flex-col border-r border-white/10 bg-[#0a0a0a] transition-transform duration-200 ease-out lg:static lg:z-auto lg:w-56 lg:max-w-none lg:translate-x-0 lg:shrink-0',
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      )}
    >
      <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-green-accent">
            Pixl Pluz
          </p>
          <p className="mt-1 text-sm font-bold text-white">Admin</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white lg:hidden"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV.map((item) => {
          if (item.managersOnly && !canManageUsers(profile.role)) {
            return null
          }
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-2.5 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-green-accent/15 text-green-accent'
                  : 'text-white/60 hover:bg-white/5 hover:text-white',
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
