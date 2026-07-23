'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const COURSES = [
  'Digital Marketing',
  'Web Development',
  'Data Science',
  'Cybersecurity',
  'Not sure yet',
] as const

const FIELD =
  'w-full border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-green-accent focus:bg-black/55'

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [course, setCourse] = useState<(typeof COURSES)[number]>('Digital Marketing')
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    message: '',
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'contact',
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          interest: course,
          message: form.message,
          website: '',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
        return
      }
      setSent(true)
    } catch {
      setError('Network error. Please try again.')
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center py-12 text-center">
        <CheckCircle size={56} className="mb-4 text-green-accent" />
        <h3 className="mb-2 text-2xl font-black text-white">Message Sent!</h3>
        <p className="text-gray-400">We will get back to you within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Full Name *
          </label>
          <input
            required
            type="text"
            placeholder="Your name"
            value={form.full_name}
            onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
            className={FIELD}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Email *
          </label>
          <input
            required
            type="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={FIELD}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          Phone Number *
        </label>
        <input
          required
          type="tel"
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className={FIELD}
        />
      </div>

      <div>
        <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          Interested Course
        </p>
        <div className="flex flex-wrap gap-2">
          {COURSES.map((item) => {
            const active = course === item
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCourse(item)}
                className={cn(
                  'border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition-colors',
                  active
                    ? 'border-green-accent bg-green-accent text-black'
                    : 'border-white/15 bg-transparent text-gray-300 hover:border-white/35 hover:text-white',
                )}
              >
                {item}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          Message
        </label>
        <textarea
          rows={4}
          placeholder="Tell us how we can help..."
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={`${FIELD} min-h-[7rem] resize-none`}
        />
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-glaze btn-cta-green mt-2 w-full py-3.5 text-sm font-bold uppercase tracking-widest disabled:opacity-60"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
