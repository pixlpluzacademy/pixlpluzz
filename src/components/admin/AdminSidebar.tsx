import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { AdminNav } from './AdminNav'

export function AdminSidebar() {
  return (
    <aside className="z-40 flex w-full flex-col border-b border-white/5 bg-navy-950 lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="border-b border-white/5 p-6">
        <p className="text-lg font-black text-white">
          Pixl Pluz <span className="text-green-accent">Admin</span>
        </p>
        <p className="mt-0.5 text-xs text-gray-500">Content Management</p>
      </div>

      <AdminNav />

      <div className="border-t border-white/5 p-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-xs text-gray-500 transition-colors hover:text-gray-300"
        >
          <ExternalLink size={12} /> View Website
        </Link>
      </div>
    </aside>
  )
}
