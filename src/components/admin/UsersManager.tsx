'use client'

import { useState, useTransition } from 'react'
import { Eye, EyeOff, Copy, Check } from 'lucide-react'
import { createStaffUser, setUserActive, deleteUser } from '@/app/admin/actions'
import { roleLabel, type Profile, type UserRole } from '@/lib/supabase/types'

function PasswordCell({ password }: { password: string }) {
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const value = password?.trim() || ''

  if (!value) {
    return <span className="text-white/30">—</span>
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-white/80">
        {visible ? value : '•'.repeat(Math.min(value.length, 12))}
      </span>
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="p-0.5 text-white/40 hover:text-white"
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        }}
        className="p-0.5 text-white/40 hover:text-green-accent"
        aria-label="Copy password"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  )
}

export function UsersManager({
  profiles,
  currentUser,
}: {
  profiles: Profile[]
  currentUser: Profile
}) {
  const [pending, start] = useTransition()
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(true)

  const isSuperAdmin = currentUser.role === 'admin'
  const defaultRole: UserRole = 'staff'

  const [form, setForm] = useState<{
    full_name: string
    email: string
    password: string
    role: UserRole
  }>({
    full_name: '',
    email: '',
    password: '',
    role: defaultRole,
  })

  const [filterQ, setFilterQ] = useState('')
  const [filterRole, setFilterRole] = useState<'all' | UserRole>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')

  // Admin: all users. Branch admin: staff only (no admin / branch admin rows).
  const baseProfiles = isSuperAdmin
    ? profiles
    : profiles.filter((p) => p.role === 'staff')

  const q = filterQ.trim().toLowerCase()
  const visibleProfiles = baseProfiles.filter((p) => {
    if (filterRole !== 'all' && p.role !== filterRole) return false
    if (filterStatus === 'active' && !p.is_active) return false
    if (filterStatus === 'inactive' && p.is_active) return false
    if (!q) return true
    return (
      p.full_name.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q)
    )
  })

  function run(fn: () => Promise<{ error?: string; ok?: boolean }>) {
    setMessage(null)
    setError(null)
    start(async () => {
      const res = await fn()
      if (res.error) setError(res.error)
      else setMessage('Done.')
    })
  }

  return (
    <div className="mt-8 space-y-10">
      <form
        className="grid max-w-xl gap-3 border border-white/10 bg-[#0c0c0c] p-5 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault()
          run(async () => {
            const res = await createStaffUser(form)
            if (!res.error) {
              setForm({
                full_name: '',
                email: '',
                password: '',
                role: defaultRole,
              })
            }
            return res
          })
        }}
      >
        <h2 className="sm:col-span-2 text-sm font-bold uppercase tracking-wider text-white/70">
          Create user
        </h2>
        <input
          required
          placeholder="Full name"
          value={form.full_name}
          onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
          className="border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-green-accent sm:col-span-2"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-green-accent sm:col-span-2"
        />
        <div className="relative sm:col-span-2">
          <input
            required
            type={showPassword ? 'text' : 'password'}
            minLength={8}
            placeholder="Password (min 8)"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="w-full border border-white/15 bg-black/40 px-3 py-2 pr-10 text-sm text-white outline-none focus:border-green-accent"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/45 hover:text-white"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <select
          value={form.role}
          onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as UserRole }))}
          className="border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-green-accent"
        >
          <option value="staff">Staff</option>
          {isSuperAdmin && <option value="branch_admin">Branch Admin</option>}
        </select>
        <button
          type="submit"
          disabled={pending}
          className="border border-green-accent/40 bg-green-accent/10 px-4 py-2 text-sm font-bold text-green-accent disabled:opacity-50"
        >
          {pending ? 'Creating…' : 'Create'}
        </button>
      </form>

      {(error || message) && (
        <p className={`text-sm ${error ? 'text-red-400' : 'text-green-accent'}`}>
          {error || message}
        </p>
      )}

      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/40">
            Search
          </label>
          <input
            value={filterQ}
            onChange={(e) => setFilterQ(e.target.value)}
            placeholder="Name or email…"
            className="border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-green-accent"
          />
        </div>
        {isSuperAdmin && (
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/40">
              Role
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as 'all' | UserRole)}
              className="border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-green-accent"
            >
              <option value="all">All</option>
              <option value="admin">Admin</option>
              <option value="branch_admin">Branch Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>
        )}
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/40">
            Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')
            }
            className="border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-green-accent"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button
          type="button"
          onClick={() => {
            setFilterQ('')
            setFilterRole('all')
            setFilterStatus('all')
          }}
          className="px-3 py-2 text-sm text-white/45 hover:text-white"
        >
          Reset
        </button>
        <p className="pb-2 text-xs text-white/35">
          {visibleProfiles.length} user{visibleProfiles.length === 1 ? '' : 's'}
        </p>
      </div>

      <div className="overflow-x-auto border border-white/10">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-white/45">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Password</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleProfiles.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-white/40">
                  No users to show.
                </td>
              </tr>
            ) : (
              visibleProfiles.map((p) => {
                const isSelf = p.id === currentUser.id
                const canManage =
                  !isSelf &&
                  (isSuperAdmin || (currentUser.role === 'branch_admin' && p.role === 'staff'))
                return (
                  <tr key={p.id} className="border-b border-white/5">
                    <td className="px-4 py-3 text-white">{p.full_name || '—'}</td>
                    <td className="px-4 py-3 text-white/60">{p.email}</td>
                    <td className="px-4 py-3">
                      <PasswordCell password={p.plain_password || ''} />
                    </td>
                    <td className="px-4 py-3 text-white/60">{roleLabel(p.role)}</td>
                    <td className="px-4 py-3">
                      <span className={p.is_active ? 'text-green-accent' : 'text-white/40'}>
                        {p.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {canManage && (
                          <>
                            <button
                              type="button"
                              disabled={pending}
                              onClick={() => run(() => setUserActive(p.id, !p.is_active))}
                              className="text-xs font-semibold uppercase tracking-wider text-white/55 hover:text-white"
                            >
                              {p.is_active ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              type="button"
                              disabled={pending}
                              onClick={() => {
                                if (confirm(`Delete ${p.email}? This cannot be undone.`)) {
                                  run(() => deleteUser(p.id))
                                }
                              }}
                              className="text-xs font-semibold uppercase tracking-wider text-red-400/80 hover:text-red-400"
                            >
                              Delete
                            </button>
                          </>
                        )}
                        {isSelf && <span className="text-xs text-white/35">You</span>}
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
