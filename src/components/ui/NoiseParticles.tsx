'use client'

import { useEffect, useRef } from 'react'

// Brand green only
const COLOR = '84, 227, 70'

type Particle = {
  /** Position along the square perimeter, 0..1 (tight dots) */
  u: number
  /** Perimeter drift speed */
  speed: number
  /** Fixed scatter away from the outline */
  scatterX: number
  scatterY: number
  /** Loose mist dots use an absolute base position instead */
  loose: boolean
  baseX: number
  baseY: number
  size: number
  alpha: number
  flicker: number
  phase: number
  /** Interaction displacement + velocity (springs back to 0) */
  dispX: number
  dispY: number
  velX: number
  velY: number
}

// Sum of 3 randoms ≈ bell curve — keeps scatter hugging the outline
const gauss = () => (Math.random() + Math.random() + Math.random()) / 3 - 0.5

/**
 * A noisy square of brand-green particles centred in the parent,
 * slowly rotating, with hover repulsion and click shockwaves.
 * Fills its nearest positioned ancestor.
 */
export function NoiseParticles({ density = 1.1 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let raf = 0
    let width = 0
    let height = 0

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const init = () => {
      const count = Math.min(9000, Math.floor(width * density * 6.5))
      particles = Array.from({ length: count }, () => {
        // 80% form the square outline, 20% flood the header as grainy mist
        const loose = Math.random() > 0.8
        const band = Math.min(width, height) * 0.06
        return {
          u: Math.random(),
          speed: (0.00004 + Math.random() * 0.00012) * (Math.random() < 0.5 ? 1 : -1),
          scatterX: gauss() * band,
          scatterY: gauss() * band,
          loose,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          size: Math.random() < 0.85 ? 1 : 1.6,
          alpha: loose ? 0.1 + Math.random() * 0.28 : 0.3 + Math.random() * 0.55,
          flicker: 0.4 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
          dispX: 0,
          dispY: 0,
          velX: 0,
          velY: 0,
        }
      })
    }

    // Point on the (rotating) square outline for perimeter position u
    const squarePoint = (u: number, t: number): [number, number] => {
      const side = Math.min(width, height) * 0.4
      const half = side / 2
      const s = ((u % 1) + 1) % 1 * 4
      const edge = Math.floor(s)
      const f = s - edge
      let px = 0
      let py = 0
      if (edge === 0)      { px = -half + f * side; py = -half }
      else if (edge === 1) { px = half;             py = -half + f * side }
      else if (edge === 2) { px = half - f * side;  py = half }
      else                 { px = -half;            py = half - f * side }

      // Slow rotation + gentle breathing
      const angle = t * 0.00006
      const breathe = 1 + Math.sin(t * 0.0005) * 0.04
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [
        width / 2 + (px * cos - py * sin) * breathe,
        height / 2 + (px * sin + py * cos) * breathe,
      ]
    }

    let lastT = 0

    // Live cursor position (canvas space); off-canvas when absent
    let mouseX = -9999
    let mouseY = -9999
    const HOVER_RADIUS = 130
    const HOVER_FORCE = 1.6

    const basePos = (p: Particle, t: number): [number, number] => {
      if (p.loose) {
        // Mist drifts sideways slowly, wrapping around
        const x = (p.baseX + t * 0.008 * (p.speed > 0 ? 1 : -1) + width) % width
        return [x, p.baseY]
      }
      p.u += p.speed * 16
      const [sx, sy] = squarePoint(p.u, t)
      return [sx + p.scatterX, sy + p.scatterY]
    }

    const tick = (t: number) => {
      lastT = t
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        const [bx, by] = basePos(p, t)

        // Continuous hover repulsion — dots flow away from the cursor
        const dx = bx + p.dispX - mouseX
        const dy = by + p.dispY - mouseY
        const distSq = dx * dx + dy * dy
        if (distSq < HOVER_RADIUS * HOVER_RADIUS && distSq > 0.25) {
          const dist = Math.sqrt(distSq)
          const push = (1 - dist / HOVER_RADIUS) * HOVER_FORCE
          p.velX += (dx / dist) * push
          p.velY += (dy / dist) * push
        }

        // Physics — velocity decays, displacement springs back
        p.dispX += p.velX
        p.dispY += p.velY
        p.velX *= 0.85
        p.velY *= 0.85
        p.dispX *= 0.93
        p.dispY *= 0.93

        // Per-frame jitter makes the field shimmer like film grain
        const x = bx + p.dispX + (Math.random() - 0.5) * 1.6
        const y = by + p.dispY + (Math.random() - 0.5) * 1.6
        if (x < -4 || x > width + 4 || y < -4 || y > height + 4) continue

        const flicker = 0.55 + 0.45 * Math.sin(t * 0.001 * p.flicker + p.phase)
        ctx.fillStyle = `rgba(${COLOR}, ${p.alpha * flicker})`
        ctx.fillRect(x, y, p.size, p.size)
      }
      raf = requestAnimationFrame(tick)
    }

    // Click sends a radial impulse — nearby dots burst away, then flow back
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      const RADIUS = Math.min(width, height) * 0.35

      for (const p of particles) {
        const [bx, by] = p.loose
          ? [(p.baseX + lastT * 0.008 * (p.speed > 0 ? 1 : -1) + width) % width, p.baseY]
          : (() => {
              const [sx, sy] = squarePoint(p.u, lastT)
              return [sx + p.scatterX, sy + p.scatterY]
            })()
        const dx = bx + p.dispX - cx
        const dy = by + p.dispY - cy
        const dist = Math.hypot(dx, dy)
        if (dist > RADIUS) continue

        const force = (1 - dist / RADIUS) * 14
        const angle = dist > 0.5 ? Math.atan2(dy, dx) : Math.random() * Math.PI * 2
        p.velX += Math.cos(angle) * force
        p.velY += Math.sin(angle) * force
      }
    }

    const parent = canvas.parentElement

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
    const onPointerLeave = () => {
      mouseX = -9999
      mouseY = -9999
    }

    resize()
    init()
    raf = requestAnimationFrame(tick)

    const onResize = () => { resize(); init() }
    window.addEventListener('resize', onResize)
    parent?.addEventListener('click', onClick)
    parent?.addEventListener('pointermove', onPointerMove)
    parent?.addEventListener('pointerleave', onPointerLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      parent?.removeEventListener('click', onClick)
      parent?.removeEventListener('pointermove', onPointerMove)
      parent?.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}
