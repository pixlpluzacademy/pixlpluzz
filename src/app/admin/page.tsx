import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, FileText, Calendar, GraduationCap, Briefcase, ArrowRight } from 'lucide-react'
import { getCourses, getBlogs, getEvents, getPlacement, getCareers } from '@/lib/data'

export const metadata: Metadata = { title: 'Dashboard' }

export default function AdminDashboard() {
  const courses   = getCourses()
  const blogs     = getBlogs()
  const events    = getEvents()
  const placement = getPlacement()
  const careers   = getCareers()

  const STATS = [
    { label: 'Courses',   value: courses.length,   icon: BookOpen,      href: '/admin/courses',   color: 'text-blue-primary dark:text-blue-primary' },
    { label: 'Blog Posts',value: blogs.length,     icon: FileText,      href: '/admin/blogs',     color: 'text-green-accent' },
    { label: 'Events',    value: events.length,    icon: Calendar,      href: '/admin/events',    color: 'text-purple-400' },
    { label: 'Placements',value: placement.length, icon: GraduationCap, href: '/admin/placement', color: 'text-yellow-400' },
    { label: 'Careers',   value: careers.length,   icon: Briefcase,     href: '/admin/careers',   color: 'text-red-400' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Dashboard</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Welcome back. Here&apos;s an overview of your content.</p>
      <p className="mb-8 rounded border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-200">
        Admin login is not enabled yet. Anyone with this URL can edit content until authentication is added.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {STATS.map(s => (
          <Link
            key={s.label}
            href={s.href}
            className="group bg-white dark:bg-navy-900 border border-gray-100 dark:border-white/5 hover:border-blue-primary dark:hover:border-green-accent p-5 pixel-corner transition-all"
          >
            <s.icon size={20} className={`${s.color} mb-3`} />
            <p className="text-3xl font-black text-gray-900 dark:text-white">{s.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Add New Course',     href: '/admin/courses/new' },
          { label: 'Add New Blog Post',  href: '/admin/blogs/new' },
          { label: 'Add New Event',      href: '/admin/events/new' },
          { label: 'Add Placed Student', href: '/admin/placement/new' },
          { label: 'Add Career Listing', href: '/admin/careers/new' },
        ].map(a => (
          <Link
            key={a.href}
            href={a.href}
            className="flex items-center justify-between bg-blue-primary text-white px-5 py-4 pixel-corner hover:brightness-110 transition-colors group"
          >
            <span className="font-bold text-sm">{a.label}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>
    </div>
  )
}
