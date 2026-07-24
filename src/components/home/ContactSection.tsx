'use client'

import { useState, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const INTERESTS = [
  'Digital Marketing',
  'Web Development',
  'Data Science',
  'Cybersecurity',
  'Scholarship',
  'General',
] as const

const FIELD =
  'w-full border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-green-accent focus:bg-black/55'

export function ContactSection() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [interest, setInterest] = useState<string>('General')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    message: '',
    updates: false,
  })

  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const formCard = formRef.current
    if (!section || !formCard) return

    const ctx = gsap.context(() => {
      gsap.set(formCard, { opacity: 0, y: 28 })

      gsap.to(formCard, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
          invalidateOnRefresh: true,
        },
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())
    })

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'home',
          full_name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone,
          city: form.city,
          interest,
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

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip bg-black py-[clamp(64px,6vw,96px)]"
    >
      <div className="site-container">
      {/* Image framed to content width — form height drives the block (no forced min-height) */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/images/getintouch.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 92vw, 100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 grid items-stretch gap-8 p-5 sm:p-7 lg:grid-cols-2 lg:gap-[clamp(28px,2.5vw,56px)] lg:p-8 xl:p-10">
          {/* Left — image only (empty column for balance; height follows the form) */}
          <div className="hidden lg:block" aria-hidden />

          {/* Right — sharp pixel form card (no radius) */}
          <div
            ref={formRef}
            className="@container border border-white/10 bg-[#141414] p-5 sm:p-7 lg:p-8"
            data-no-blur-text
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle size={48} className="text-green-accent" />
                </motion.div>
                <p className="text-lg font-bold text-white">Message Sent!</p>
                <p className="text-center text-sm text-gray-400">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-2">
                <div className="min-w-0 overflow-visible">
                  <h2 className="mb-1.5 w-full whitespace-nowrap font-black uppercase leading-[0.88] tracking-tight text-[clamp(1.1rem,6.8cqi,3.75rem)]">
                    <span className="text-white">Your </span>
                    <span
                      className="career-outline-word"
                      style={{ WebkitTextStroke: '2px #54e345' }}
                    >
                      AI
                    </span>
                    <span className="text-white"> Future </span>
                    <span className="text-green-accent">Is Waiting</span>
                  </h2>
                  <p className="text-sm text-gray-400">
                    Share a few details and we&apos;ll guide you to the right course.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="First Name *"
                    required
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    className={FIELD}
                  />
                  <input
                    type="text"
                    placeholder="Last Name *"
                    required
                    value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    className={FIELD}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    required
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className={FIELD}
                  />
                  <input
                    type="text"
                    placeholder="City *"
                    required
                    value={form.city}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                    className={FIELD}
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={cn(FIELD, 'sm:col-span-2')}
                  />
                </div>

                <div>
                  <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    Type of Inquiry
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map(item => {
                      const active = interest === item
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setInterest(item)}
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

                <textarea
                  placeholder="Message"
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className={cn(FIELD, 'min-h-[7rem] resize-none')}
                />

                {error && (
                  <p className="text-sm text-red-400" role="alert">
                    {error}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-glaze btn-cta-green mt-1 w-full py-3.5 text-sm font-bold uppercase tracking-widest disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
