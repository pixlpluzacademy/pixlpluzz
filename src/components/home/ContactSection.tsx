'use client'

import { useState, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', course: '', message: '', terms: false,
  })

  const sectionRef = useRef<HTMLElement>(null)
  const leftRef  = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const left    = leftRef.current
    const right   = rightRef.current
    if (!section || !left || !right) return

    const ctx = gsap.context(() => {
      gsap.set(left,  { opacity: 0, x: -50 })
      gsap.set(right, { opacity: 0, x:  50 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 25%',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(left,  { opacity: 1, x: 0, ease: 'power2.out', duration: 1 }, 0)
      tl.to(right, { opacity: 1, x: 0, ease: 'power2.out', duration: 1 }, 0.15)

      requestAnimationFrame(() => ScrollTrigger.refresh())
    })

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section ref={sectionRef} className="relative bg-black py-16 sm:py-24 px-4 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 30% 50%, rgba(84, 227, 70, 0.06) 0%, transparent 55%)',
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 pixel-grid-bg opacity-10" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl grid lg:grid-cols-2 gap-0 overflow-hidden pixel-corner-lg border border-white/5 lg:min-h-[38rem]">

        {/* Left panel — image only */}
        <div
          ref={leftRef}
          className="relative min-h-[26rem] sm:min-h-[28rem] lg:min-h-full overflow-hidden"
        >
          <Image
            src="/images/getintouch.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
          />
        </div>

        {/* Right panel — enquiry form */}
        <div ref={rightRef} className="bg-[#141414] p-6 sm:p-8 lg:p-10 flex flex-col justify-center min-h-[26rem] sm:min-h-[28rem] lg:min-h-full" data-no-blur-text>
          <SectionLabel className="mb-3 self-start w-fit">Get In Touch</SectionLabel>
          <h3 className="text-2xl font-black text-white mb-2">
            Get The Best Course Guidance For Your Future
          </h3>
          <p className="text-justify text-gray-400 text-sm mb-6">
            Tell us your interest and our team will help you choose the right course.
          </p>

          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <CheckCircle size={48} className="text-green-accent" />
              </motion.div>
              <p className="text-white font-bold text-lg">Message Sent!</p>
              <p className="text-gray-400 text-sm text-center">
                We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Name *"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 px-4 py-3 text-sm outline-none focus:border-green-accent focus:bg-white/8 transition-all duration-200"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 px-4 py-3 text-sm outline-none focus:border-green-accent focus:bg-white/8 transition-all duration-200"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 px-4 py-3 text-sm outline-none focus:border-green-accent focus:bg-white/8 transition-all duration-200"
                />
                <input
                  type="text"
                  placeholder="Interested Course"
                  value={form.course}
                  onChange={e => setForm(f => ({ ...f, course: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 px-4 py-3 text-sm outline-none focus:border-green-accent focus:bg-white/8 transition-all duration-200"
                />
              </div>

              <textarea
                placeholder="Message"
                rows={4}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full min-h-[6rem] bg-white/5 border border-white/10 text-white placeholder:text-gray-600 px-4 py-3 text-sm outline-none focus:border-green-accent focus:bg-white/8 transition-all duration-200 resize-none"
              />

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={form.terms}
                  onChange={e => setForm(f => ({ ...f, terms: e.target.checked }))}
                  className="mt-0.5 accent-green-accent"
                />
                <span className="text-xs text-gray-500">
                  I accept the privacy policy and terms.
                </span>
              </label>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="btn-glaze btn-cta-green w-full py-4 font-bold uppercase tracking-widest text-sm pixel-corner-sm"
              >
                Send Message
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
