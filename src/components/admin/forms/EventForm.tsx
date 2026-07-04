'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Event } from '@/lib/data'
import { submitAdminRecord, safeNumber } from '@/lib/admin-form'
import { ADMIN_INPUT, AdminField, AdminFormError } from '@/components/admin/AdminField'

const EMPTY: Omit<Event, 'id'> = {
  title: '', description: '',
  date: new Date().toISOString().split('T')[0],
  time: '', location: '', type: 'Offline',
  thumbnail: '', registrationUrl: '/contact',
  seats: 30, price: 0, isFree: true,
}

interface Props { event?: Event; mode: 'create' | 'edit' }

export function EventForm({ event, mode }: Props) {
  const router = useRouter()
  const [data, setData] = useState<Omit<Event, 'id'>>(event ?? EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function set<K extends keyof typeof data>(key: K, val: typeof data[K]) {
    setData(prev => ({ ...prev, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload: Event = {
      ...data,
      id: event?.id ?? '',
      seats: safeNumber(String(data.seats)),
      price: safeNumber(String(data.price)),
      isFree: data.price === 0,
    }

    const result = await submitAdminRecord('/api/events', mode === 'create' ? 'POST' : 'PUT', payload)
    setSaving(false)
    if (!result.ok) { setError(result.error); return }
    router.push('/admin/events')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <AdminFormError message={error} />
      <AdminField label="Title" required>
        <input value={data.title} onChange={e => set('title', e.target.value)} required className={ADMIN_INPUT} />
      </AdminField>
      <AdminField label="Description" required>
        <textarea rows={3} value={data.description} onChange={e => set('description', e.target.value)} required className={ADMIN_INPUT + ' resize-none'} />
      </AdminField>
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminField label="Date" required>
          <input type="date" value={data.date} onChange={e => set('date', e.target.value)} required className={ADMIN_INPUT} />
        </AdminField>
        <AdminField label="Time" required>
          <input value={data.time} onChange={e => set('time', e.target.value)} placeholder="10:00 AM – 5:00 PM" required className={ADMIN_INPUT} />
        </AdminField>
        <AdminField label="Type">
          <select value={data.type} onChange={e => set('type', e.target.value as Event['type'])} className={ADMIN_INPUT}>
            <option>Offline</option>
            <option>Online</option>
          </select>
        </AdminField>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="Location" required>
          <input value={data.location} onChange={e => set('location', e.target.value)} required className={ADMIN_INPUT} />
        </AdminField>
        <AdminField label="Seats">
          <input type="number" min={0} value={data.seats} onChange={e => set('seats', safeNumber(e.target.value))} className={ADMIN_INPUT} />
        </AdminField>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="Price (₹)" hint="Set 0 for free events">
          <input
            type="number"
            min={0}
            value={data.price}
            onChange={e => {
              const v = safeNumber(e.target.value)
              set('price', v)
              set('isFree', v === 0)
            }}
            className={ADMIN_INPUT}
          />
        </AdminField>
        <AdminField label="Registration URL" required>
          <input value={data.registrationUrl} onChange={e => set('registrationUrl', e.target.value)} required className={ADMIN_INPUT} placeholder="/contact or https://..." />
        </AdminField>
      </div>
      <div className="flex items-center gap-2">
        <input
          id="isFree"
          type="checkbox"
          checked={data.isFree}
          onChange={e => {
            set('isFree', e.target.checked)
            if (e.target.checked) set('price', 0)
          }}
          className="h-4 w-4"
        />
        <label htmlFor="isFree" className="text-sm font-medium text-gray-700 dark:text-gray-300">Free event</label>
      </div>
      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={saving} className="bg-blue-primary px-6 py-3 font-bold text-white pixel-corner-sm hover:brightness-110 disabled:opacity-60">
          {saving ? 'Saving...' : mode === 'create' ? 'Create Event' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/events')} className="border border-gray-200 px-6 py-3 font-bold text-gray-700 pixel-corner-sm dark:border-white/10 dark:text-gray-300">
          Cancel
        </button>
      </div>
    </form>
  )
}
