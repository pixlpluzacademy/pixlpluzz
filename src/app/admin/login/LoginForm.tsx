'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(
    searchParams.get('error') === 'inactive'
      ? 'Your account is inactive. Contact an administrator.'
      : null,
  )
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data, error: signError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signError) {
      setError(signError.message)
      setLoading(false)
      return
    }

    const userId = data.user?.id
    if (userId) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_active, role')
        .eq('id', userId)
        .maybeSingle()

      if (!profile?.is_active) {
        await supabase.auth.signOut()
        setError('Your account is inactive. Contact an administrator.')
        setLoading(false)
        return
      }
    }

    const next = searchParams.get('next') || '/admin'
    router.replace(next.startsWith('/admin') ? next : '/admin')
    router.refresh()
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-black px-4">
      <div className="w-full max-w-md border border-white/10 bg-[#0c0c0c] p-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-green-accent">
          Pixl Pluz
        </p>
        <h1 className="mt-2 text-2xl font-black text-white">Admin login</h1>
        <p className="mt-1 text-sm text-white/50">Staff and admin access only.</p>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Email
            </label>
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-green-accent"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Password
            </label>
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-green-accent"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-glaze btn-cta-green mt-2 px-6 py-3 text-sm font-bold uppercase tracking-widest disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
