'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { PlacementStudent } from '@/lib/data'
import { submitAdminRecord } from '@/lib/admin-form'
import { ADMIN_INPUT, AdminField, AdminFormError } from '@/components/admin/AdminField'

const EMPTY: Omit<PlacementStudent, 'id'> = {
  name: '', photo: '', course: '', company: '',
  role: '', batch: String(new Date().getFullYear()), testimonial: '',
}

interface Props {
  student?: PlacementStudent
  mode: 'create' | 'edit'
  courseOptions: string[]
}

export function PlacementForm({ student, mode, courseOptions }: Props) {
  const router = useRouter()
  const [data, setData] = useState<Omit<PlacementStudent, 'id'>>(student ?? EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function set<K extends keyof typeof data>(key: K, val: typeof data[K]) {
    setData(prev => ({ ...prev, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload: PlacementStudent = { ...data, id: student?.id ?? '' }
    const result = await submitAdminRecord('/api/placement', mode === 'create' ? 'POST' : 'PUT', payload)
    setSaving(false)
    if (!result.ok) { setError(result.error); return }
    router.push('/admin/placement')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <AdminFormError message={error} />
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="Student Name" required>
          <input value={data.name} onChange={e => set('name', e.target.value)} required className={ADMIN_INPUT} />
        </AdminField>
        <AdminField label="Batch Year">
          <input value={data.batch} onChange={e => set('batch', e.target.value)} className={ADMIN_INPUT} />
        </AdminField>
      </div>
      <AdminField label="Course Completed" required>
        <select value={data.course} onChange={e => set('course', e.target.value)} required className={ADMIN_INPUT}>
          <option value="">Select course</option>
          {courseOptions.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
      </AdminField>
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="Company" required>
          <input value={data.company} onChange={e => set('company', e.target.value)} required className={ADMIN_INPUT} />
        </AdminField>
        <AdminField label="Role / Designation" required>
          <input value={data.role} onChange={e => set('role', e.target.value)} required className={ADMIN_INPUT} />
        </AdminField>
      </div>
      <AdminField label="Photo URL" hint="e.g. /images/student.jpg — shown on the placement page">
        <input value={data.photo} onChange={e => set('photo', e.target.value)} placeholder="/images/student.jpg" className={ADMIN_INPUT} />
      </AdminField>
      <AdminField label="Testimonial">
        <textarea rows={3} value={data.testimonial} onChange={e => set('testimonial', e.target.value)} className={ADMIN_INPUT + ' resize-none'} />
      </AdminField>
      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={saving} className="bg-blue-primary px-6 py-3 font-bold text-white pixel-corner-sm hover:brightness-110 disabled:opacity-60">
          {saving ? 'Saving...' : mode === 'create' ? 'Add Student' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/placement')} className="border border-gray-200 px-6 py-3 font-bold text-gray-700 pixel-corner-sm dark:border-white/10 dark:text-gray-300">
          Cancel
        </button>
      </div>
    </form>
  )
}
