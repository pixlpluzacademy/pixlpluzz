'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PixelButton } from '@/components/ui/PixelButton'
import { SERVICE_CLOUD_WORDS, SERVICE_DETAILS } from '@/lib/services-word-cloud'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const TONE_CLASS = {
  hero: 'svc-word-hero',
  blue: 'svc-word-blue',
  green: 'svc-word-green',
  dim: 'svc-word-dim',
} as const

function offsetScale() {
  if (typeof window === 'undefined') return 1
  return Math.min(1, window.innerWidth / 1150)
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t)
}

export function ServicesContent() {
  const trackRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const wordElsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const track = trackRef.current
    const hint = hintRef.current
    const els = wordElsRef.current.filter(Boolean) as HTMLDivElement[]
    if (!track || !els.length) return

    let ticking = false

    const render = () => {
      ticking = false
      const rect = track.getBoundingClientRect()
      const total = track.offsetHeight - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
      const s = offsetScale()

      els.forEach((el) => {
        const x = Number(el.dataset.x) * s
        const y = Number(el.dataset.y) * s
        const speed = Number(el.dataset.speed)
        const dx = Number(el.dataset.dx)
        const dy = Number(el.dataset.dy)
        const rot = Number(el.dataset.rot)
        const isHero = el.dataset.hero === 'true'

        const wp = Math.min(1, p * speed * 1.4)
        const ease = smoothstep(wp)

        let tx: number
        let ty: number
        let scale: number
        let opacity: number

        if (isHero) {
          tx = 0
          ty = 0
          scale = 1 - ease * 0.75
          opacity = 1 - ease * 1.15
        } else {
          const fly = ease * (340 + 260 * speed) * s
          tx = x + dx * fly
          ty = y + dy * fly
          scale = 1 - ease * 0.65
          opacity = 1 - ease * 1.25
        }

        el.style.transform =
          `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg) scale(${Math.max(scale, 0.05)})`
        el.style.opacity = String(Math.max(opacity, 0))
      })

      if (hint) hint.style.opacity = p > 0.05 ? '0' : '1'
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(render)
      }
    }

    els.forEach((el, i) => {
      const word = SERVICE_CLOUD_WORDS[i]
      const mag = Math.hypot(word.x, word.y) || 1
      el.dataset.x = String(word.x)
      el.dataset.y = String(word.y)
      el.dataset.rot = String(word.rotation)
      el.dataset.dx = String(word.x / mag)
      el.dataset.dy = String(word.y / mag)
      el.dataset.speed = (0.75 + (i % 7) * 0.09).toFixed(2)
      el.dataset.hero = word.tone === 'hero' ? 'true' : 'false'
    })

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    render()

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.svc-detail-card').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          opacity: 0,
          y: 48,
          duration: 0.75,
          delay: i * 0.06,
          ease: 'power3.out',
        })
      })
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      ctx.revert()
    }
  }, [])

  return (
    <div className="services-page bg-white text-navy-950">
      {/* Word cloud hero — tall track, sticky stage */}
      <div ref={trackRef} className="svc-cloud-track relative h-[320vh]">
        <div className="svc-cloud-stage sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(21,62,144,0.08), transparent 70%)',
            }}
            aria-hidden
          />

          <div className="svc-cloud relative h-[min(620px,82vh)] w-[min(1100px,96vw)]">
            {SERVICE_CLOUD_WORDS.map((word, i) => (
              <div
                key={word.text}
                ref={(el) => { wordElsRef.current[i] = el }}
                className={cn('svc-word absolute left-1/2 top-1/2', TONE_CLASS[word.tone])}
                style={word.tone !== 'hero' ? { fontSize: `${word.sizeRem}rem` } : undefined}
              >
                {word.text}
              </div>
            ))}
          </div>

          <div
            ref={hintRef}
            className="svc-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.35em] text-blue-primary/45"
          >
            Scroll to explore
          </div>
        </div>
      </div>

      {/* Detail content — appears as cloud disperses */}
      <section className="relative z-10 border-t border-blue-primary/10 bg-white px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-green-accent">
            Pixl Pluz Academy
          </p>
          <h2 className="mb-5 text-center text-3xl font-black text-blue-primary sm:text-4xl lg:text-5xl">
            Everything you need to <span className="text-green-accent">grow</span>
          </h2>
          <p className="mx-auto mb-14 max-w-2xl text-center text-base leading-relaxed text-gray-600">
            Courses, mentorship, live projects and placement support — curated for careers in
            digital, AI and creative technology.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_DETAILS.map((item) => (
              <div
                key={item.title}
                className="svc-detail-card rounded-xl border border-blue-primary/10 bg-white p-7 shadow-[0_8px_30px_rgba(21,62,144,0.06)] transition-colors hover:border-green-accent/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center">
                  <img
                    src={item.icon}
                    alt=""
                    className="h-11 w-11 object-contain"
                  />
                </div>
                <h3 className="mb-2 text-lg font-bold text-blue-primary">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-blue-primary/10 bg-[#f7f9fc] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-black text-blue-primary sm:text-3xl">
            Ready to start your journey?
          </h2>
          <p className="mb-8 text-gray-600">
            Explore our courses or apply for the ₹50 Lakh scholarship fund.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PixelButton href="/courses" variant="primary" size="lg">
              View Courses
            </PixelButton>
            <Link
              href="/scholarship"
              className="text-sm font-semibold uppercase tracking-widest text-green-accent hover:text-blue-primary transition-colors"
            >
              Apply for Scholarship →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
