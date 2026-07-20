'use client'

import { useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import { AI_TOOLS_CLOUD_WORDS } from '@/lib/ai-tools-word-cloud'
import { cn } from '@/lib/utils'

const TONE_CLASS = {
  hero: 'ai-word-hero',
  green: 'ai-word-green',
  blue: 'ai-word-blue',
  butter: 'ai-word-butter',
  white: 'ai-word-white',
} as const

function offsetScale() {
  if (typeof window === 'undefined') return 1
  return Math.min(1, window.innerWidth / 1150)
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t)
}

export function AiToolsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const wordElsRef = useRef<(HTMLDivElement | null)[]>([])
  const lenis = useLenis()

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

      // Hold the readable cloud, then partially disperse — keep words visible
      const hold = 0.14
      const t = Math.max(0, (p - hold) / (1 - hold))
      const capped = Math.min(t, 0.58)
      const disperse = smoothstep(capped)

      els.forEach((el) => {
        const x = Number(el.dataset.x) * s
        const y = Number(el.dataset.y) * s
        const speed = Number(el.dataset.speed)
        const dx = Number(el.dataset.dx)
        const dy = Number(el.dataset.dy)
        const rot = Number(el.dataset.rot)
        const isHero = el.dataset.hero === 'true'

        const wp = Math.min(1, capped * speed * 1.12)
        const ease = smoothstep(wp)

        let tx: number
        let ty: number
        let scale: number
        let opacity: number

        if (isHero) {
          tx = 0
          ty = 0
          scale = 1 - disperse * 0.18
          opacity = 1
        } else {
          const fly = ease * (160 + 120 * speed) * s
          tx = x + dx * fly
          ty = y + dy * fly
          scale = 1 - ease * 0.28
          // Stay readable — never fully fade
          opacity = 1 - ease * 0.42
        }

        el.style.transform =
          `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg) scale(${Math.max(scale, 0.55)})`
        el.style.opacity = String(Math.max(opacity, 0.45))
      })

      if (hint) hint.style.opacity = p > 0.08 ? '0' : '1'
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(render)
      }
    }

    els.forEach((el, i) => {
      const word = AI_TOOLS_CLOUD_WORDS[i]
      const mag = Math.hypot(word.x, word.y) || 1
      el.dataset.x = String(word.x)
      el.dataset.y = String(word.y)
      el.dataset.rot = String(word.rotation)
      el.dataset.dx = String(word.x / mag)
      el.dataset.dy = String(word.y / mag)
      el.dataset.speed = (0.65 + (i % 7) * 0.07).toFixed(2)
      el.dataset.hero = word.tone === 'hero' ? 'true' : 'false'
    })

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    lenis?.on('scroll', onScroll)
    render()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      lenis?.off('scroll', onScroll)
    }
  }, [lenis])

  return (
    <section className="ai-tools-section relative bg-black" aria-label="AI tools">
      <h2 className="sr-only">AI Tools</h2>

      <div
        ref={trackRef}
        className="ai-tools-cloud-track relative h-[calc(100svh+220px)] md:h-[calc(100svh+340px)]"
      >
        <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden bg-black px-4">
          <div className="relative h-[min(520px,70svh)] w-[min(1100px,96vw)] md:h-[min(620px,75svh)]">
            {AI_TOOLS_CLOUD_WORDS.map((word, i) => (
              <div
                key={`${word.text}-${i}`}
                ref={(el) => {
                  wordElsRef.current[i] = el
                }}
                className={cn('ai-word absolute left-1/2 top-1/2', TONE_CLASS[word.tone])}
                style={word.tone !== 'hero' ? { fontSize: `${word.sizeRem}rem` } : undefined}
              >
                {word.text}
              </div>
            ))}
          </div>

          {/* <div
            ref={hintRef}
            className="ai-tools-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/40"
          >
            Scroll to explore
          </div> */}
        </div>
      </div>
    </section>
  )
}
