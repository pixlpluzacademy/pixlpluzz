'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/** Proportions match the Pixl Pluz mark — everything in units of frame thickness `u`. */
const U = 100
const H = 4 * U
const W_SMALL = 4 * U
const W_BIG = 6 * U // was 7.5 — shorter expand so neighbors aren't covered
const VIEW_W = 950
const CX = VIEW_W / 2
const CY = 300
const DURATION = 800
const LIFT_SCALE = 1.18 // peak portrait scale (bottom-anchored)
const BLUE = '#153e90'
const GREEN = '#54e346'
const HIT_W_SMALL = W_SMALL + 2 * U

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function geometry(W: number) {
  const x1 = CX - W / 2
  const x2 = CX + W / 2
  const y1 = CY - H / 2
  const y2 = CY + H / 2

  const frameD =
    `M${x1} ${y1} H${x2 - U} V${y1 + U} H${x2} V${y2} H${x1} Z ` +
    `M${x1 + U} ${y1 + U} H${x2 - U} V${y2 - U} H${x1 + U} Z`

  const greenPoints = [
    [x2 - U, y1 - U],
    [x2 + U, y1 - U],
    [x2 + U, y1 + U],
    [x2, y1 + U],
    [x2, y1],
    [x2 - U, y1],
  ]
    .map((p) => p.join(','))
    .join(' ')

  return {
    frameD,
    greenPoints,
    block: { x: x1 - U, y: y2, w: U, h: U },
    portrait: { x: x1, y: y1, w: W, h: H },
    hit: {
      x: x1 - U,
      y: y1 - U,
      w: W + 2 * U,
      h: H + 2 * U,
    },
  }
}

const GEO_SMALL = geometry(W_SMALL)
const PORTRAIT = GEO_SMALL.portrait

/**
 * Full cutout at logo width — bottom on logo, head free above.
 * Horizontally centered on the logo frame.
 */
const CUTOUT_H = PORTRAIT.h * 2.45
const CUTOUT_W = PORTRAIT.w * 1.2
const CUTOUT = {
  x: CX - CUTOUT_W / 2,
  y: PORTRAIT.y + PORTRAIT.h - CUTOUT_H + U * 0.22,
  w: CUTOUT_W,
  h: CUTOUT_H,
}
const CUTOUT_OX = CUTOUT.x + CUTOUT.w / 2
const CUTOUT_OY = CUTOUT.y + CUTOUT.h

/** Fixed vertical span for viewBox (cutout top → logo hit bottom) */
const VIEW_TOP = Math.min(CUTOUT.y, GEO_SMALL.hit.y)
const VIEW_BOTTOM = Math.max(CUTOUT.y + CUTOUT.h, GEO_SMALL.hit.y + GEO_SMALL.hit.h)
const VIEW_H = VIEW_BOTTOM - VIEW_TOP
/** Layout height ignores empty head space above the logo — heads overflow upward. */
const LAYOUT_TOP = GEO_SMALL.hit.y
const LAYOUT_H = VIEW_BOTTOM - LAYOUT_TOP
const SVG_HEIGHT_PCT = (VIEW_H / LAYOUT_H) * 100

function canHoverFine() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

interface ExpandableLogoPortraitProps {
  src: string
  alt: string
  className?: string
}

export function ExpandableLogoPortrait({
  src,
  alt,
  className,
}: ExpandableLogoPortraitProps) {
  const progressRef = useRef(0)
  const targetRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastTRef = useRef(0)
  const [geo, setGeo] = useState(() => geometry(W_SMALL))
  const [lift, setLift] = useState(1)
  const [expanded, setExpanded] = useState(false)

  const draw = useCallback((W: number, liftScale: number) => {
    setGeo(geometry(W))
    setLift(liftScale)
  }, [])

  const tick = useCallback(
    (now: number) => {
      const duration = prefersReducedMotion() ? 1 : DURATION
      const dt = (now - lastTRef.current) / duration
      lastTRef.current = now
      const target = targetRef.current
      let p = progressRef.current
      p = target > p ? Math.min(p + dt, target) : Math.max(p - dt, target)
      progressRef.current = p
      const eased = easeInOutCubic(p)
      draw(
        W_SMALL + (W_BIG - W_SMALL) * eased,
        1 + (LIFT_SCALE - 1) * eased,
      )
      if (p !== target) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        rafRef.current = null
      }
    },
    [draw],
  )

  const setTarget = useCallback(
    (t: number) => {
      targetRef.current = t
      setExpanded(t === 1)
      if (rafRef.current === null) {
        lastTRef.current = performance.now()
        rafRef.current = requestAnimationFrame(tick)
      }
    },
    [tick],
  )

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const onPointerEnter = () => {
    if (canHoverFine()) setTarget(1)
  }

  const onPointerLeave = () => {
    if (canHoverFine()) setTarget(0)
  }

  const onClick = () => {
    if (!canHoverFine()) setTarget(targetRef.current === 1 ? 0 : 1)
  }

  // Same expand math as the original demo — width grows, centered on hover
  const widthPct = (geo.hit.w / HIT_W_SMALL) * 100

  return (
    <div
      className={cn('relative w-full overflow-visible', expanded && 'z-30', className)}
      style={{ aspectRatio: `${HIT_W_SMALL} / ${LAYOUT_H}` }}
    >
      <div
        className="absolute bottom-0 left-1/2 origin-bottom cursor-pointer select-none overflow-visible"
        style={{
          width: `${widthPct}%`,
          height: `${SVG_HEIGHT_PCT}%`,
          transform: 'translateX(-50%)',
        }}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onClick={onClick}
        role="img"
        aria-label={alt}
      >
        <svg
          viewBox={`${geo.hit.x} ${VIEW_TOP} ${geo.hit.w} ${VIEW_H}`}
          className="h-full w-full overflow-visible"
          overflow="visible"
          aria-hidden
        >
          <rect
            x={geo.hit.x}
            y={geo.hit.y}
            width={geo.hit.w}
            height={geo.hit.h}
            fill="transparent"
          />

          {/* Logo only — expands / shrinks from center (original animation) */}
          <path d={geo.frameD} fill={BLUE} fillRule="evenodd" />
          <polygon points={geo.greenPoints} fill={GREEN} />
          <rect
            x={geo.block.x}
            y={geo.block.y}
            width={geo.block.w}
            height={geo.block.h}
            fill={BLUE}
          />

          {/* Cutout lift shares logo progress + ease (bottom pivot) */}
          <image
            href={src}
            x={CUTOUT.x}
            y={CUTOUT.y}
            width={CUTOUT.w}
            height={CUTOUT.h}
            preserveAspectRatio="xMidYMax meet"
            transform={`translate(${CUTOUT_OX} ${CUTOUT_OY}) scale(${lift}) translate(${-CUTOUT_OX} ${-CUTOUT_OY})`}
          />
        </svg>
      </div>
    </div>
  )
}
