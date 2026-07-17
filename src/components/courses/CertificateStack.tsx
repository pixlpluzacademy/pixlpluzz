'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

const CERTIFICATES = [
  {
    src: '/images/certificates/certificate-corporate-green.png',
    alt: 'Pixl Pluz Academy completion certificate — corporate green',
  },
  {
    src: '/images/certificates/certificate-royal-blue.png',
    alt: 'Pixl Pluz Academy completion certificate — royal blue',
  },
  {
    src: '/images/certificates/certificate-gold.png',
    alt: 'Pixl Pluz Academy completion certificate — gold',
  },
  {
    src: '/images/certificates/certificate-dark-luxury.png',
    alt: 'Pixl Pluz Academy completion certificate — dark luxury',
  },
  {
    src: '/images/certificates/certificate-modern-minimal.png',
    alt: 'Pixl Pluz Academy completion certificate — modern minimal',
  },
] as const

/** Only two visible at a time — front + one peeking behind (CDA-style). */
const FRONT = { x: 40, y: 28, scale: 1, opacity: 1, zIndex: 5 }
const BACK = { x: 0, y: 0, scale: 0.97, opacity: 0.55, zIndex: 4 }
const HIDDEN = { x: -20, y: -12, scale: 0.94, opacity: 0, zIndex: 1 }

const CYCLE_MS = 2800

function styleForDepth(depth: number) {
  if (depth === 0) return FRONT
  if (depth === 1) return BACK
  return HIDDEN
}

export function CertificateStack({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-cert-card]'))
    if (cards.length < 2) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let order = cards.map((_, i) => i)
    let timer = 0
    let busy = false

    const place = (immediate = false) => {
      order.forEach((cardIndex, depth) => {
        const style = styleForDepth(depth)
        gsap.to(cards[cardIndex], {
          x: style.x,
          y: style.y,
          scale: style.scale,
          opacity: style.opacity,
          zIndex: style.zIndex,
          duration: immediate ? 0 : 0.65,
          ease: 'power2.inOut',
          overwrite: 'auto',
        })
      })
    }

    place(true)
    gsap.set(cards, { clearProps: 'filter' })

    if (reduceMotion) return

    const cycle = () => {
      if (busy) return
      busy = true

      const frontIndex = order[0]
      const front = cards[frontIndex]

      const tl = gsap.timeline({
        onComplete: () => {
          order = [...order.slice(1), frontIndex]
          gsap.set(front, {
            x: HIDDEN.x,
            y: HIDDEN.y - 16,
            scale: HIDDEN.scale,
            opacity: 0,
            zIndex: HIDDEN.zIndex,
          })
          place(false)
          busy = false
        },
      })

      tl.to(front, {
        y: '+=36',
        opacity: 0,
        scale: 0.94,
        duration: 0.4,
        ease: 'power2.in',
      })

      // Only animate the card that becomes the new front
      const nextFront = cards[order[1]]
      tl.to(
        nextFront,
        {
          x: FRONT.x,
          y: FRONT.y,
          scale: FRONT.scale,
          opacity: FRONT.opacity,
          zIndex: FRONT.zIndex,
          duration: 0.5,
          ease: 'power2.out',
        },
        0.1,
      )

      // Next-in-line slides into the back slot
      if (order[2] !== undefined) {
        tl.to(
          cards[order[2]],
          {
            x: BACK.x,
            y: BACK.y,
            scale: BACK.scale,
            opacity: BACK.opacity,
            zIndex: BACK.zIndex,
            duration: 0.5,
            ease: 'power2.out',
          },
          0.1,
        )
      }
    }

    timer = window.setInterval(cycle, CYCLE_MS)

    return () => {
      window.clearInterval(timer)
      gsap.killTweensOf(cards)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className={cn('pointer-events-none select-none', className)}
      aria-label="Sample course completion certificates"
    >
      <div className="relative h-[170px] w-[300px] sm:h-[180px] sm:w-[320px] lg:h-[190px] lg:w-[340px]">
        {CERTIFICATES.map((cert, i) => (
          <div
            key={cert.src}
            data-cert-card
            className="absolute left-10 top-3 h-[112px] w-[200px] overflow-hidden will-change-transform sm:h-[120px] sm:w-[220px] lg:left-12 lg:h-[128px] lg:w-[236px]"
            style={{ zIndex: CERTIFICATES.length - i }}
          >
            <Image
              src={cert.src}
              alt={cert.alt}
              fill
              className="object-contain object-center"
              sizes="236px"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
