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
    return { s: 1, fs: 1, allowRotate: true, isMobile: false }
  }
  const w = window.innerWidth
  const isMobile = w < 768
  // Mobile: keep the desktop composition, but pull words well inside the viewport
  const s = isMobile
    ? Math.min(0.36, Math.max(0.26, w / 1400))
    : Math.min(1.18, Math.max(0.7, w / 1350))
  const fs = isMobile
    ? Math.min(0.48, Math.max(0.3, w / 1200))
    : Math.min(1, Math.max(0.34, w / 1150))
  return {
    s,
    fs,
    isMobile,
    // Keep rotated (vertical) labels on mobile — same composition as desktop
    allowRotate: true,
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
      const stage = track.querySelector('.ai-tools-sticky-stage') as HTMLElement | null
      const { s, fs, allowRotate, isMobile } = layoutScales()
      syncDatasets(allowRotate)

      let p = 0
      if (isMobile && stage) {
        // Drive motion while the cloud is mid-screen — not only after it sticks to top
        const viewH = window.innerHeight
        const r = stage.getBoundingClientRect()
        const mid = r.top + r.height / 2
        const start = viewH * 0.72 // clustered when entering view
        const end = viewH * 0.32 // fully spread while still visible
        p = Math.min(1, Math.max(0, (start - mid) / Math.max(1, start - end)))
      } else {
        const rect = track.getBoundingClientRect()
        const stageH = stage?.offsetHeight ?? window.innerHeight
        const total = Math.max(1, track.offsetHeight - stageH)
        p = Math.min(1, Math.max(0, -rect.top / total))
      }

      // Hold, then ease outward — mobile still moves, but stays on-screen
      const hold = isMobile ? 0 : 0.22
      const t = Math.max(0, (p - hold) / (1 - hold))
      const capped = Math.min(t, 1)
      const disperse = smoothstep(capped) * (isMobile ? 0.45 : 0.5)
      const flyBase = isMobile ? 48 : 70
      const flySpan = isMobile ? 36 : 55
      const maxOffset = isMobile ? window.innerWidth * 0.42 : Number.POSITIVE_INFINITY

      els.forEach((el, i) => {
        const word = AI_TOOLS_CLOUD_WORDS[i]
        const x = Number(el.dataset.x) * s
        const y = Number(el.dataset.y) * s
        const speed = Number(el.dataset.speed)
        const dx = Number(el.dataset.dx)
        const dy = Number(el.dataset.dy)
        const rot = allowRotate ? Number(el.dataset.rot) : 0
        const isHero = el.dataset.hero === 'true'

        const wp = Math.min(1, capped * speed * (isMobile ? 1.25 : 1.05))
        const ease = smoothstep(wp) * (isMobile ? 0.55 : 0.5)

        let tx: number
        let ty: number
        let scale: number
        let opacity: number

        if (isHero) {
          tx = 0
          ty = 0
          scale = 1 - disperse * 0.08
          opacity = 1
        } else {
          const fly = ease * (flyBase + flySpan * speed) * s
          tx = x + dx * fly
          ty = y + dy * fly
          // Keep mobile labels inside the screen while they still move
          tx = Math.max(-maxOffset, Math.min(maxOffset, tx))
          ty = Math.max(-maxOffset * 0.9, Math.min(maxOffset * 0.9, ty))
          scale = 1 - ease * 0.1
          opacity = 1 - ease * 0.12
          el.style.fontSize = `${word.sizeRem * fs}rem`
        }

        el.style.transform =
          `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg) scale(${Math.max(scale, 0.85)})`
        el.style.opacity = String(Math.max(opacity, 0.82))
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
    <section id="ai-tools" className="ai-tools-section relative bg-black" aria-label="AI tools">
      <h2 className="sr-only">AI Tools</h2>

      <div ref={trackRef} className="ai-tools-cloud-track relative">
        <div className="ai-tools-sticky-stage relative top-0 flex items-center justify-center overflow-hidden bg-black md:sticky">
          <div className="ai-tools-cloud relative mx-auto">
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
