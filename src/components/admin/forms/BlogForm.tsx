'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Blog } from '@/lib/data'
import { slugify } from '@/lib/utils'
import { submitAdminRecord } from '@/lib/admin-form'
import { ADMIN_INPUT, AdminField, AdminFormError } from '@/components/admin/AdminField'

const EMPTY: Omit<Blog, 'id'> = {
  slug: '', title: '', excerpt: '', content: '',
  category: 'Education', author: 'Pixl Pluz Team',
  date: new Date().toISOString().split('T')[0],
  thumbnail: '', views: 0, tags: [],
}

interface Props { blog?: Blog; mode: 'create' | 'edit' }

export function BlogForm({ blog, mode }: Props) {
  const router = useRouter()
  const [data, setData] = useState<Omit<Blog, 'id'>>(blog ?? EMPTY)
  const [slugTouched, setSlugTouched] = useState(mode === 'edit')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function set<K extends keyof typeof data>(key: K, val: typeof data[K]) {
    setData(prev => ({ ...prev, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload: Blog = { ...data, id: blog?.id ?? '' }
    const result = await submitAdminRecord('/api/blogs', mode === 'create' ? 'POST' : 'PUT', payload)
    setSaving(false)
    if (!result.ok) { setError(result.error); return }
    router.push('/admin/blogs')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <AdminFormError message={error} />
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="Title" required>
          <input
            value={data.title}
            onChange={e => {
              const title = e.target.value
              set('title', title)
              if (!slugTouched) set('slug', slugify(title))
            }}
            required
            className={ADMIN_INPUT}
          />
        </AdminField>
        <AdminField label="Slug" required>
          <input
            value={data.slug}
            onChange={e => { setSlugTouched(true); set('slug', slugify(e.target.value)) }}
            required
            className={ADMIN_INPUT}
          />
        </AdminField>
      </div>
      <AdminField label="Excerpt" required hint="Short summary for listings and SEO">
        <textarea rows={2} value={data.excerpt} onChange={e => set('excerpt', e.target.value)} required className={ADMIN_INPUT + ' resize-none'} />
      </AdminField>
      <AdminField label="Content" required hint="Use blank lines between paragraphs">
        <textarea rows={12} value={data.content} onChange={e => set('content', e.target.value)} required className={ADMIN_INPUT + ' resize-y text-xs'} />
      </AdminField>
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminField label="Category">
          <select value={data.category} onChange={e => set('category', e.target.value)} className={ADMIN_INPUT}>
            <option>Education</option>
            <option>Marketing</option>
            <option>Technology</option>
          </select>
        </AdminField>
        <AdminField label="Author">
          <input value={data.author} onChange={e => set('author', e.target.value)} className={ADMIN_INPUT} />
        </AdminField>
        <AdminField label="Date">
          <input type="date" value={data.date} onChange={e => set('date', e.target.value)} required className={ADMIN_INPUT} />
        </AdminField>
      </div>
      <AdminField label="Tags" hint="Comma separated">
        <input value={data.tags.join(', ')} onChange={e => set('tags', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} className={ADMIN_INPUT} />
      </AdminField>
      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={saving} className="bg-blue-primary px-6 py-3 font-bold text-white pixel-corner-sm hover:brightness-110 disabled:opacity-60">
          {saving ? 'Saving...' : mode === 'create' ? 'Create Post' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/blogs')} className="border border-gray-200 px-6 py-3 font-bold text-gray-700 pixel-corner-sm dark:border-white/10 dark:text-gray-300">
          Cancel
        </button>
      </div>
    </form>
  )
}
