'use client'

import { useRouter } from 'next/navigation'
import { LogOut, Menu } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { roleLabel, type Profile } from '@/lib/supabase/types'

export function AdminTopBar({
  profile,
  onMenuClick,
}: {
  profile: Profile
  onMenuClick: () => void
}) {
  const router = useRouter()

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/')
    router.refresh()
  }

  return (
    <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6 lg:justify-end lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-white/5 text-white transition-colors hover:border-green-accent/40 hover:text-green-accent lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden text-right sm:block">
          <p className="truncate text-xs text-white/50">{profile.email}</p>
          <p className="text-[10px] uppercase tracking-wider text-white/35">
            {roleLabel(profile.role)}
          </p>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:border-green-accent/40 hover:text-green-accent"
        >
          <LogOut size={15} />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  )
}
