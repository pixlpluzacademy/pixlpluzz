'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Grid-snapped square trail over the parent (`position: relative`).
 * Mouse: hover trail. Touch: tap + drag on the heading.
 */
export function PixelTrail({ cell = 22 }: { cell?: number }) {
  const overlayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const parent = overlay?.parentElement
    if (!overlay || !parent) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Ensure the hit layer can receive fingers (class is pointer-events-none)
    overlay.style.pointerEvents = 'auto'
    overlay.style.touchAction = 'pan-y'

    let lastKey = ''
    let armed = false
    const MAX_ALIVE = 3

    const spawn = (x: number, y: number) => {
      while (overlay.children.length >= MAX_ALIVE) {
        overlay.firstElementChild?.remove()
      }

      const sq = document.createElement('span')
      sq.style.cssText = [
        'position:absolute',
        `left:${x}px`,
        `top:${y}px`,
        `width:${cell}px`,
        `height:${cell}px`,
        'background:#ffffff',
        'pointer-events:none',
        'display:block',
        'mix-blend-mode:exclusion',
      ].join(';')
      overlay.appendChild(sq)
      gsap.to(sq, {
        opacity: 0,
        duration: 0.4,
        ease: 'steps(3)',
        onComplete: () => sq.remove(),
      })
    }

    const insideOverlay = (clientX: number, clientY: number) => {
      const rect = overlay.getBoundingClientRect()
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      )
    }

    const spawnAtClient = (clientX: number, clientY: number, force = false) => {
      if (!insideOverlay(clientX, clientY)) return
      const rect = overlay.getBoundingClientRect()
      const gx = Math.floor((clientX - rect.left) / cell)
      const gy = Math.floor((clientY - rect.top) / cell)
      const key = `${gx},${gy}`
      if (!force && key === lastKey) return
      lastKey = key
      spawn(gx * cell, gy * cell)
    }

    const arm = (clientX: number, clientY: number) => {
      if (!insideOverlay(clientX, clientY)) return
      armed = true
      lastKey = ''
      spawnAtClient(clientX, clientY, true)
    }

    const disarm = () => {
      armed = false
      lastKey = ''
    }

    const onPointerDown = (e: PointerEvent) => {
      arm(e.clientX, e.clientY)
      if (e.pointerType !== 'mouse') {
        try {
          overlay.setPointerCapture(e.pointerId)
        } catch {
          /* ignore */
        }
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        spawnAtClient(e.clientX, e.clientY)
        return
      }
      if (armed) spawnAtClient(e.clientX, e.clientY)
    }

    const onPointerUp = () => disarm()

    // Window-level touch fallback — Lenis / scroll can swallow element touchmove
    const onWindowTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      arm(t.clientX, t.clientY)
    }

    const onWindowTouchMove = (e: TouchEvent) => {
      if (!armed) return
      const t = e.touches[0]
      if (!t) return
      spawnAtClient(t.clientX, t.clientY)
    }

    const onWindowTouchEnd = () => disarm()

    overlay.addEventListener('pointerdown', onPointerDown, { passive: true })
    overlay.addEventListener('pointermove', onPointerMove, { passive: true })
    overlay.addEventListener('pointerup', onPointerUp, { passive: true })
    overlay.addEventListener('pointercancel', onPointerUp, { passive: true })
    // Mouse hover trail (no press required)
    parent.addEventListener('pointermove', onPointerMove, { passive: true })
    parent.addEventListener('pointerleave', onPointerUp)

    window.addEventListener('touchstart', onWindowTouchStart, { passive: true })
    window.addEventListener('touchmove', onWindowTouchMove, { passive: true })
    window.addEventListener('touchend', onWindowTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onWindowTouchEnd, { passive: true })

    return () => {
      overlay.style.pointerEvents = ''
      overlay.style.touchAction = ''
      overlay.removeEventListener('pointerdown', onPointerDown)
      overlay.removeEventListener('pointermove', onPointerMove)
      overlay.removeEventListener('pointerup', onPointerUp)
      overlay.removeEventListener('pointercancel', onPointerUp)
      parent.removeEventListener('pointermove', onPointerMove)
      parent.removeEventListener('pointerleave', onPointerUp)
      window.removeEventListener('touchstart', onWindowTouchStart)
      window.removeEventListener('touchmove', onWindowTouchMove)
      window.removeEventListener('touchend', onWindowTouchEnd)
      window.removeEventListener('touchcancel', onWindowTouchEnd)
      overlay.replaceChildren()
    }
  }, [cell])

  return (
    <span
      ref={overlayRef}
      className="pointer-events-none absolute inset-0 z-20 block overflow-hidden"
      aria-hidden
    />
  )
}
