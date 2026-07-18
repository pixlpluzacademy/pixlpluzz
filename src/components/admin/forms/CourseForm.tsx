'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Course } from '@/lib/data'
import { slugify } from '@/lib/utils'
import {
  submitAdminRecord,
  formatFaqsForForm,
  parseFaqsFromForm,
  formatCurriculumForForm,
  parseCurriculumFromForm,
  safeNumber,
} from '@/lib/admin-form'
import { ADMIN_INPUT, AdminField, AdminFormError } from '@/components/admin/AdminField'

const EMPTY: Omit<Course, 'id'> = {
  slug: '', title: '', shortDescription: '', description: '',
  level: 'Beginner', duration: '', durationHours: '', lessons: 0,
  price: 0, instructor: 'Pixl Pluz Team', instructorEmail: 'info@pixlpluz.com',
  thumbnail: '', videoUrl: '', featured: false,
  tags: [], features: [], curriculum: [], faqs: [],
}

interface Props {
  course?: Course
  mode: 'create' | 'edit'
}

export function CourseForm({ course, mode }: Props) {
  const router = useRouter()
  const [data, setData] = useState<Omit<Course, 'id'>>(course ?? EMPTY)
  const [faqText, setFaqText] = useState(formatFaqsForForm(course?.faqs ?? []))
  const [curriculumText, setCurriculumText] = useState(formatCurriculumForForm(course?.curriculum ?? []))
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

    const payload: Course = {
      ...data,
      id: course?.id ?? '',
      slug: data.slug.trim(),
      price: safeNumber(String(data.price)),
      lessons: safeNumber(String(data.lessons)),
      faqs: parseFaqsFromForm(faqText),
      curriculum: parseCurriculumFromForm(curriculumText),
    }

    const result = await submitAdminRecord(
      '/api/courses',
      mode === 'create' ? 'POST' : 'PUT',
      payload,
    )

    setSaving(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    router.push('/admin/courses')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
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
        <AdminField label="Slug" required hint="Used in the URL: /courses/your-slug">
          <input
            value={data.slug}
            onChange={e => { setSlugTouched(true); set('slug', slugify(e.target.value)) }}
            required
            className={ADMIN_INPUT}
          />
        </AdminField>
      </div>

      <AdminField label="Short Description" required>
        <input value={data.shortDescription} onChange={e => set('shortDescription', e.target.value)} required className={ADMIN_INPUT} />
      </AdminField>

      <AdminField label="Full Description" required>
        <textarea rows={4} value={data.description} onChange={e => set('description', e.target.value)} required className={ADMIN_INPUT + ' resize-none'} />
      </AdminField>

      <div className="grid gap-4 sm:grid-cols-3">
        <AdminField label="Level">
          <select value={data.level} onChange={e => set('level', e.target.value as Course['level'])} className={ADMIN_INPUT}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </select>
        </AdminField>
        <AdminField label="Duration">
          <input value={data.duration} onChange={e => set('duration', e.target.value)} placeholder="2 months" className={ADMIN_INPUT} />
        </AdminField>
        <AdminField label="Duration Hours">
          <input value={data.durationHours} onChange={e => set('durationHours', e.target.value)} placeholder="200 hours" className={ADMIN_INPUT} />
        </AdminField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="Price (₹)">
          <input type="number" min={0} value={data.price} onChange={e => set('price', safeNumber(e.target.value))} className={ADMIN_INPUT} />
        </AdminField>
        <AdminField label="Lessons">
          <input type="number" min={0} value={data.lessons} onChange={e => set('lessons', safeNumber(e.target.value))} className={ADMIN_INPUT} />
        </AdminField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="Instructor">
          <input value={data.instructor} onChange={e => set('instructor', e.target.value)} className={ADMIN_INPUT} />
        </AdminField>
        <AdminField label="Instructor Email">
          <input type="email" value={data.instructorEmail} onChange={e => set('instructorEmail', e.target.value)} className={ADMIN_INPUT} />
        </AdminField>
      </div>

      <AdminField label="Tags" hint="Comma separated">
        <input
          value={data.tags.join(', ')}
          onChange={e => set('tags', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
          className={ADMIN_INPUT}
          placeholder="SEO, Social Media, AI Tools"
        />
      </AdminField>

      <AdminField label="Features" hint="One per line">
        <textarea
          rows={4}
          value={data.features.join('\n')}
          onChange={e => set('features', e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
          className={ADMIN_INPUT + ' resize-none'}
        />
      </AdminField>

      <AdminField
        label="Curriculum"
        hint="One module per block. First line = module title, following lines = lessons starting with -"
      >
        <textarea
          rows={8}
          value={curriculumText}
          onChange={e => setCurriculumText(e.target.value)}
          className={ADMIN_INPUT + ' resize-y font-mono text-xs'}
          placeholder={'Module 1: Fundamentals\nShort module description\n- Introduction\n- Core concepts\n\nModule 2: Advanced'}
        />
      </AdminField>

      <AdminField label="FAQs" hint="One per line: Question|||Answer">
        <textarea
          rows={6}
          value={faqText}
          onChange={e => setFaqText(e.target.value)}
          className={ADMIN_INPUT + ' resize-y font-mono text-xs'}
          placeholder="Will I get a certificate?|||Yes, after completing the course."
        />
      </AdminField>

      <div className="flex items-center gap-2">
        <input id="featured" type="checkbox" checked={data.featured} onChange={e => set('featured', e.target.checked)} className="h-4 w-4" />
        <label htmlFor="featured" className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured course</label>
      </div>

      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={saving} className="bg-blue-primary px-6 py-3 font-bold text-white pixel-corner-sm transition-colors hover:brightness-110 disabled:opacity-60">
          {saving ? 'Saving...' : mode === 'create' ? 'Create Course' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/courses')} className="border border-gray-200 px-6 py-3 font-bold text-gray-700 pixel-corner-sm transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5">
          Cancel
        </button>
      </div>
    </form>
  )
}
