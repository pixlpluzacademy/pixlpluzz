'use client'

import { useEffect, useRef } from 'react'
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
  const s = Math.min(1.18, Math.max(0.7, w / 1350))
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

export function AiToolsSection() {
  const wordElsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const els = wordElsRef.current.filter(Boolean) as HTMLDivElement[]
    if (!els.length) return

    const layout = () => {
      const { s, fs, allowRotate } = layoutScales()

      els.forEach((el, i) => {
        const word = AI_TOOLS_CLOUD_WORDS[i]
        const x = !allowRotate && word.mobileX !== undefined ? word.mobileX : word.x
        const y = !allowRotate && word.mobileY !== undefined ? word.mobileY : word.y
        const rot = allowRotate ? word.rotation : 0
        const isHero = word.tone === 'hero'

        if (!isHero) {
          el.style.fontSize = `${word.sizeRem * fs}rem`
        }

        el.style.transform =
          `translate(calc(-50% + ${x * s}px), calc(-50% + ${y * s}px)) rotate(${rot}deg)`
        el.style.opacity = '1'
      })
    }

    layout()
    window.addEventListener('resize', layout)
    return () => window.removeEventListener('resize', layout)
  }, [])

  return (
    <section
      className="ai-tools-section relative flex items-center justify-center overflow-hidden bg-black py-[clamp(48px,6vw,80px)]"
      aria-label="AI tools"
    >
      <h2 className="sr-only">AI Tools</h2>

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
    </section>
  )
}
