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
  const [interest, setInterest] = useState<string>('General')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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
      gsap.set(formCard, { opacity: 0, x: 40 })

      gsap.to(formCard, {
        opacity: 1,
        x: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())
    })

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-black px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24"
    >
      {/* Image framed to About-style content width — black margins separate it from the body */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/images/getintouch.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) calc(100vw - 6rem), (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 grid items-stretch gap-10 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10 xl:gap-16">
          {/* Left — image only (empty column for balance) */}
          <div className="hidden min-h-[22rem] lg:block" aria-hidden />

          {/* Right — sharp pixel form card (no radius) */}
          <div
            ref={formRef}
            className="@container border border-white/10 bg-[#141414] p-6 sm:p-8 lg:p-9"
            data-no-blur-text
          >
            {sent ? (
              <div className="flex min-h-[22rem] flex-col items-center justify-center gap-4 py-10">
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
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

                <div className="grid gap-3 sm:grid-cols-2">
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
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className={FIELD}
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={FIELD}
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

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-glaze btn-cta-green w-full py-3.5 text-sm font-bold uppercase tracking-widest"
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
