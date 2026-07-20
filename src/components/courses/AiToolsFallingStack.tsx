'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const TONES = ['is-green', 'is-blue', 'is-white', 'is-outline'] as const
const WIDTHS = [92, 100, 86, 96, 88, 98, 90, 94]
const ROTS = [-11, 9, -7, 13, -12, 8, -10, 11]

/**
 * AI tool pills drop one-by-one into a stack (AE falling-pile feel).
 * Course detail only.
 */
export function AiToolsFallingStack({ tools }: { tools: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const pileRef = useRef<HTMLDivElement>(null)
  const isSiteReady = useSiteReady()
  const items = tools.slice(0, 8)

  useLayoutEffect(() => {
    if (!isSiteReady) return
    const root = rootRef.current
    const pile = pileRef.current
    if (!root || !pile) return

    const blocks = gsap.utils.toArray<HTMLElement>(
      pile.querySelectorAll('.ai-tools-stack-block'),
    )
    if (!blocks.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(blocks, { clearProps: 'transform,opacity', opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      // Park each pill high above the stage (off-screen)
      gsap.set(blocks, {
        y: -420,
        scale: 0.35,
        opacity: 0,
        rotation: (i) => (ROTS[i % ROTS.length] ?? 0) * 2.2,
        transformOrigin: '50% 100%',
      })

      const tl = gsap.timeline({
        paused: true,
        defaults: { overwrite: 'auto' },
      })

      blocks.forEach((block, i) => {
        tl.to(
          block,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            rotation: ROTS[i % ROTS.length] ?? 0,
            duration: 0.85,
            ease: 'bounce.out',
          },
          i * 0.32,
        )
      })

      ScrollTrigger.create({
        trigger: root,
        start: 'top 80%',
        onEnter: () => {
          tl.restart()
        },
        onEnterBack: () => {
          tl.restart()
        },
      })

      // If already in view on load / navigation, drop immediately
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        const rect = root.getBoundingClientRect()
        const inView =
          rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.1
        if (inView) tl.restart()
      })
    }, root)

    return () => ctx.revert()
  }, [isSiteReady, items.join('|')])

  return (
    <aside
      ref={rootRef}
      className="ai-tools-stack"
      aria-label="AI tools used in this course"
    >
      <div className="ai-tools-stack-stage">
        <p className="ai-tools-stack-label">AI Tools</p>
        <div ref={pileRef} className="ai-tools-stack-pile">
          {items.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className={cn('ai-tools-stack-block', TONES[i % TONES.length])}
              style={{ width: `${WIDTHS[i % WIDTHS.length]}%` }}
            >
              <span>{name}</span>
            </div>
          ))}
        </div>
        <div className="ai-tools-stack-shadow" aria-hidden />
      </div>
    </aside>
  )
}
