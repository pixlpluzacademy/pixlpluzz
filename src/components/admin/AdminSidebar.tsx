'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  MessageSquareText,
  Users,
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

export function AdminSidebar({ profile }: { profile: Profile }) {
  const pathname = usePathname()

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-white/10 bg-[#0a0a0a]">
      <div className="border-b border-white/10 px-4 py-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-green-accent">
          Pixl Pluz
        </p>
        <p className="mt-1 text-sm font-bold text-white">Admin</p>
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
