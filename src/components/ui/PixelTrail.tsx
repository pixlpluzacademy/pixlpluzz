'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Grid-snapped square trail that follows the cursor over the parent element.
 * Drop inside any `position: relative` container — squares light up under
 * the pointer and fade away, giving headings a pixel hover effect.
 */
export function PixelTrail({ cell = 22 }: { cell?: number }) {
  const overlayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const parent = overlay?.parentElement
    if (!overlay || !parent) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Pointer trails make no sense on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    let lastKey = ''

    const MAX_ALIVE = 3

    const spawn = (x: number, y: number) => {
      // Cap live squares so the trail reads as pops, not a train
      while (overlay.children.length >= MAX_ALIVE) {
        overlay.firstElementChild?.remove()
      }

      // White + exclusion inverts every pixel underneath — dark bg turns
      // light, white letters turn black inside the square (creativewebmanual style)
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

    const onMove = (e: MouseEvent) => {
      const rect = overlay.getBoundingClientRect()
      const gx = Math.floor((e.clientX - rect.left) / cell)
      const gy = Math.floor((e.clientY - rect.top) / cell)
      const key = `${gx},${gy}`
      if (key === lastKey) return
      lastKey = key
      spawn(gx * cell, gy * cell)
    }

    const onLeave = () => { lastKey = '' }

    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseleave', onLeave)
    return () => {
      parent.removeEventListener('mousemove', onMove)
      parent.removeEventListener('mouseleave', onLeave)
      overlay.replaceChildren()
    }
  }, [cell])

  return (
    <span
      ref={overlayRef}
      className="pointer-events-none absolute inset-0 block overflow-hidden"
      aria-hidden
    />
  )
}
