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

function layoutScales() {
  if (typeof window === 'undefined') {
    return { s: 1, fs: 1, allowRotate: true }
  }
  const w = window.innerWidth
  const s = Math.min(1, w / 1150)
  // Extra-small type on phones so flattened labels don’t collide
  const fs =
    w < 640
      ? Math.min(0.55, Math.max(0.28, w / 1300))
      : Math.min(1, Math.max(0.34, w / 1150))
  return {
    s,
    fs,
    allowRotate: w >= 900,
  }
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t)
}

export function AiToolsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const wordElsRef = useRef<(HTMLDivElement | null)[]>([])
  const lenis = useLenis()

  useEffect(() => {
    const track = trackRef.current
    const els = wordElsRef.current.filter(Boolean) as HTMLDivElement[]
    if (!track || !els.length) return

    let ticking = false

    const syncDatasets = (allowRotate: boolean) => {
      els.forEach((el, i) => {
        const word = AI_TOOLS_CLOUD_WORDS[i]
        const x = !allowRotate && word.mobileX !== undefined ? word.mobileX : word.x
        const y = !allowRotate && word.mobileY !== undefined ? word.mobileY : word.y
        const mag = Math.hypot(x, y) || 1
        el.dataset.x = String(x)
        el.dataset.y = String(y)
        el.dataset.rot = String(word.rotation)
        el.dataset.dx = String(x / mag)
        el.dataset.dy = String(y / mag)
        el.dataset.speed = (0.65 + (i % 7) * 0.07).toFixed(2)
        el.dataset.hero = word.tone === 'hero' ? 'true' : 'false'
      })
    }

    const render = () => {
      ticking = false
      const rect = track.getBoundingClientRect()
      const total = track.offsetHeight - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
      const { s, fs, allowRotate } = layoutScales()
      syncDatasets(allowRotate)

      const hold = 0.14
      const t = Math.max(0, (p - hold) / (1 - hold))
      const capped = Math.min(t, 0.58)
      const disperse = smoothstep(capped)

      els.forEach((el, i) => {
        const word = AI_TOOLS_CLOUD_WORDS[i]
        const x = Number(el.dataset.x) * s
        const y = Number(el.dataset.y) * s
        const speed = Number(el.dataset.speed)
        const dx = Number(el.dataset.dx)
        const dy = Number(el.dataset.dy)
        const rot = allowRotate ? Number(el.dataset.rot) : 0
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
          opacity = 1 - ease * 0.42
          el.style.fontSize = `${word.sizeRem * fs}rem`
        }

        el.style.transform =
          `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg) scale(${Math.max(scale, 0.55)})`
        el.style.opacity = String(Math.max(opacity, 0.45))
      })
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(render)
      }
    }

    syncDatasets(layoutScales().allowRotate)
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
        <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden bg-black px-3 sm:px-4">
          <div className="relative h-[min(560px,74svh)] w-[min(1100px,100%)] md:h-[min(640px,78svh)] xl:h-[min(720px,80svh)] xl:w-[min(1320px,100%)] 2xl:h-[min(780px,82svh)] 2xl:w-[min(1480px,100%)]">
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
        </div>
      </div>
    </section>
  )
}
