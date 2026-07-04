'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSiteLoaderControl } from '@/components/providers/SiteLoaderProvider'
import { PixlLogo } from '@/components/ui/PixlLogo'

gsap.registerPlugin(ScrollTrigger)

const MIN_LOAD_MS = 1400

type Phase = 'loading' | 'exit' | 'done'

export function SiteLoader() {
  const pathname = usePathname()
  const { setSiteReady } = useSiteLoaderControl()
  const [phase, setPhase] = useState<Phase>('loading')
  const [progress, setProgress] = useState(0)

  const rootRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const rafRef = useRef<number>(0)
  const runIdRef = useRef(0)

  const isAdmin = pathname.startsWith('/admin')

  const runExit = useCallback(() => {
    const root = rootRef.current
    if (!root) {
      setSiteReady(true)
      setPhase('done')
      return
    }

    setPhase('exit')
    // Start page animations while loader still covers — avoids hero text flashing through the fade
    setSiteReady(true)

    gsap.to(root, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.inOut',
      onComplete: () => {
        requestAnimationFrame(() => ScrollTrigger.refresh())
        setPhase('done')
      },
    })
  }, [setSiteReady])

  useEffect(() => {
    if (isAdmin) {
      setPhase('done')
      setSiteReady(true)
      return
    }

    const runId = ++runIdRef.current
    setSiteReady(false)
    setPhase('loading')
    setProgress(0)
    progressRef.current = 0

    document.body.style.overflow = 'hidden'

    const start = performance.now()
    let pageReady = document.readyState === 'complete'

    const onLoad = () => { pageReady = true }
    window.addEventListener('load', onLoad)

    const tick = (now: number) => {
      if (runId !== runIdRef.current) return

      const elapsed = now - start
      const timeTarget = Math.min(92, (elapsed / MIN_LOAD_MS) * 92)
      const readyTarget = pageReady ? 100 : 88
      const target = Math.min(readyTarget, timeTarget + (pageReady ? (elapsed / 400) * 12 : 0))

      progressRef.current += (target - progressRef.current) * 0.12
      const display = Math.min(100, Math.round(progressRef.current))
      setProgress(display)

      if (display >= 100) {
        window.removeEventListener('load', onLoad)
        setTimeout(() => {
          if (runId === runIdRef.current) runExit()
        }, 280)
        return
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('load', onLoad)
      cancelAnimationFrame(rafRef.current)
    }
  }, [pathname, isAdmin, runExit, setSiteReady])

  useEffect(() => {
    if (phase === 'done' || isAdmin) {
      document.body.style.overflow = ''
    }
  }, [phase, isAdmin])

  if (isAdmin || phase === 'done') return null

  return (
    <div
      ref={rootRef}
      className="site-loader-root fixed inset-0 z-[9999] bg-[#060b16]"
      aria-hidden={phase === 'exit'}
      aria-live="polite"
      aria-busy={phase === 'loading'}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none">
        <PixlLogo variant="white" className="w-[min(220px,58vw)] mb-12" />

        <div className="w-[min(320px,78vw)]">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/35">
              Loading
            </span>
            <span className="text-sm font-bold tabular-nums text-white/80">
              {progress}%
            </span>
          </div>
          <div className="h-px w-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-blue-primary transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
