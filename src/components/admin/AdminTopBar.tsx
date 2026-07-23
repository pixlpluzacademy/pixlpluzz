'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { roleLabel, type Profile } from '@/lib/supabase/types'

export function AdminTopBar({ profile }: { profile: Profile }) {
  const router = useRouter()

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/')
    router.refresh()
  }

  return (
    <header className="flex shrink-0 items-center justify-end gap-4 border-b border-white/10 px-6 py-3 sm:px-8">
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
        Sign out
      </button>
    </header>
  )
}
