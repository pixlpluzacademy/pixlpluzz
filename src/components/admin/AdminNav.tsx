'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, BookOpen, FileText, Calendar,
  GraduationCap, Briefcase,
} from 'lucide-react'

const NAV = [
  { href: '/admin',           label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/admin/courses',   label: 'Courses',    icon: BookOpen },
  { href: '/admin/blogs',     label: 'Blog Posts', icon: FileText },
  { href: '/admin/events',    label: 'Events',     icon: Calendar },
  { href: '/admin/placement', label: 'Placement',  icon: GraduationCap },
  { href: '/admin/careers',   label: 'Careers',    icon: Briefcase },
]

export function AdminNav() {
  const path = usePathname()

  return (
    <nav className="flex gap-1 overflow-x-auto p-3 lg:flex-1 lg:flex-col lg:space-y-1 lg:p-4">
      {NAV.map(item => {
        const active = path === item.href || (item.href !== '/admin' && path.startsWith(item.href))
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex shrink-0 items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors pixel-corner-sm ${
              active
                ? 'bg-blue-primary text-white'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={16} />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
