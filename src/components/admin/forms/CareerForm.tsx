'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Career } from '@/lib/data'
import { submitAdminRecord } from '@/lib/admin-form'
import { ADMIN_INPUT, AdminField, AdminFormError } from '@/components/admin/AdminField'

const EMPTY: Omit<Career, 'id'> = {
  title: '', type: 'Full-time', location: 'Kochi, Kerala', description: '',
  requirements: [], responsibilities: [],
  deadline: '', postedDate: new Date().toISOString().split('T')[0],
}

interface Props { career?: Career; mode: 'create' | 'edit' }

export function CareerForm({ career, mode }: Props) {
  const router = useRouter()
  const [data, setData] = useState<Omit<Career, 'id'>>(career ?? EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function set<K extends keyof typeof data>(key: K, val: typeof data[K]) {
    setData(prev => ({ ...prev, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload: Career = { ...data, id: career?.id ?? '' }
    const result = await submitAdminRecord('/api/careers', mode === 'create' ? 'POST' : 'PUT', payload)
    setSaving(false)
    if (!result.ok) { setError(result.error); return }
    router.push('/admin/careers')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <AdminFormError message={error} />
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="Job Title" required>
          <input value={data.title} onChange={e => set('title', e.target.value)} required className={ADMIN_INPUT} />
        </AdminField>
        <AdminField label="Type">
          <select value={data.type} onChange={e => set('type', e.target.value as Career['type'])} className={ADMIN_INPUT}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
          </select>
        </AdminField>
      </div>
      <AdminField label="Location" required>
        <input value={data.location} onChange={e => set('location', e.target.value)} required className={ADMIN_INPUT} />
      </AdminField>
      <AdminField label="Description" required>
        <textarea rows={3} value={data.description} onChange={e => set('description', e.target.value)} required className={ADMIN_INPUT + ' resize-none'} />
      </AdminField>
      <AdminField label="Requirements" hint="One per line">
        <textarea
          rows={4}
          value={data.requirements.join('\n')}
          onChange={e => set('requirements', e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
          className={ADMIN_INPUT + ' resize-none'}
        />
      </AdminField>
      <AdminField label="Responsibilities" hint="One per line">
        <textarea
          rows={4}
          value={data.responsibilities.join('\n')}
          onChange={e => set('responsibilities', e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
          className={ADMIN_INPUT + ' resize-none'}
        />
      </AdminField>
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="Posted Date" required>
          <input type="date" value={data.postedDate} onChange={e => set('postedDate', e.target.value)} required className={ADMIN_INPUT} />
        </AdminField>
        <AdminField label="Application Deadline" required>
          <input type="date" value={data.deadline} onChange={e => set('deadline', e.target.value)} required className={ADMIN_INPUT} />
        </AdminField>
      </div>
      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={saving} className="bg-blue-primary px-6 py-3 font-bold text-white pixel-corner-sm hover:brightness-110 disabled:opacity-60">
          {saving ? 'Saving...' : mode === 'create' ? 'Create Listing' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/careers')} className="border border-gray-200 px-6 py-3 font-bold text-gray-700 pixel-corner-sm dark:border-white/10 dark:text-gray-300">
          Cancel
        </button>
      </div>
    </form>
  )
}
