'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { PixelButton } from '@/components/ui/PixelButton'

const COURSES = [
  'Digital Marketing Course with AI',
  'AI Powered Web Development Course',
  'Data Science & AI Course',
  'Cyber Security Course with AI',
  'Not sure yet',
]

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-80 text-center py-16">
        <CheckCircle size={56} className="text-green-accent mb-4" />
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Message Sent!</h3>
        <p className="text-gray-500 dark:text-gray-400">We will get back to you within one business day.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Send Us a Message</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Full Name *</label>
            <input
              required
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-navy-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-primary dark:focus:border-green-accent pixel-corner-sm text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Email *</label>
            <input
              required
              type="email"
              placeholder="you@email.com"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-navy-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-primary dark:focus:border-green-accent pixel-corner-sm text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Phone Number *</label>
          <input
            required
            type="tel"
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-navy-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-primary dark:focus:border-green-accent pixel-corner-sm text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Interested Course</label>
          <select
            className="w-full px-4 py-3 bg-gray-50 dark:bg-navy-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-blue-primary dark:focus:border-green-accent pixel-corner-sm text-sm"
          >
            <option value="">Select a course</option>
            {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Message</label>
          <textarea
            rows={4}
            placeholder="Tell us how we can help..."
            className="w-full px-4 py-3 bg-gray-50 dark:bg-navy-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-primary dark:focus:border-green-accent pixel-corner-sm text-sm resize-none"
          />
        </div>


        <PixelButton type="submit" disabled={loading} className="w-full justify-center">
          {loading ? 'Sending...' : 'Send Message'}
        </PixelButton>
      </form>
    </div>
  )
}
