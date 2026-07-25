'use client'

import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Runs inside the ReactLenis context tree so useLenis() has a provider
function GSAPSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    const l = lenis

    // ── scrollerProxy ─────────────────────────────────────────────────
    // Tells GSAP ScrollTrigger to read the current scroll position
    // from Lenis (the smoothed value) instead of window.scrollY.
    // Without this, pin/scrub calculations are based on the native jump
    // position, which lags behind Lenis's smoothed position → jank.
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number): number | void {
        if (value !== undefined) {
          // GSAP is commanding a scroll (e.g. scrollTo) — bypass Lenis easing
          l.scrollTo(value, { immediate: true, force: true })
          return
        }
        // Getter: return the smoothed scroll position Lenis is currently at
        return l.scroll
      },
      getBoundingClientRect(): DOMRect {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          right: window.innerWidth,
          bottom: window.innerHeight,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        }
      },
      // Our page has no CSS transform on <html>, so pinning uses position:fixed
      pinType: 'fixed',
    })

    // All ScrollTriggers must read Lenis scroll, not native window.scrollY
    ScrollTrigger.defaults({ scroller: document.documentElement })

    // Avoid mid-scroll refreshes from mobile URL-bar resize (innerHeight flicker),
    // which rewrites sticky/scrub start-end positions and jumps the page.
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      ignoreMobileResize: true,
    })

    // Tell ScrollTrigger to refresh its trigger positions on every Lenis tick
    l.on('scroll', ScrollTrigger.update)

    // ── Unified RAF loop ──────────────────────────────────────────────
    // GSAP drives Lenis through its own ticker so both systems share one
    // animation frame. This eliminates the one-frame offset that causes
    // subtle jitter when they run on separate loops.
    function raf(time: number) {
      l.raf(time * 1000)
    }
    gsap.ticker.add(raf)

    // Disable GSAP lag-smoothing — prevents the timeline from "catching up"
    // after a long gap (tab switch, etc.) which would create a visible lurch
    gsap.ticker.lagSmoothing(0)

    // ── Refresh after full page load ──────────────────────────────────
    // Fonts and images shift layout after the first paint, making
    // ScrollTrigger's initial position calculations wrong. Refreshing on
    // load fixes ghost offsets in pinned / scrubbed sections.
    function onLoad() {
      ScrollTrigger.refresh()
    }
    if (document.readyState === 'complete') {
      ScrollTrigger.refresh()
    } else {
      window.addEventListener('load', onLoad)
    }

    return () => {
      gsap.ticker.remove(raf)
      window.removeEventListener('load', onLoad)
      // Remove the proxy on unmount so HMR / navigation doesn't stack proxies
      ScrollTrigger.scrollerProxy(document.documentElement, undefined as unknown as ScrollTrigger.ScrollerProxyVars)
    }
  }, [lenis])

  return null
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        syncTouch: true,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        // GSAP ticker drives the RAF — prevents a duplicate animation loop
        autoRaf: false,
      }}
    >
      <GSAPSync />
      {children}
    </ReactLenis>
  )
}
