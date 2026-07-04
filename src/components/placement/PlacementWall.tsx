'use client'

import { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

/**
 * Custom-designed placement cards — image only, no names on the page.
 * Upload at 900 × 1200 px (3:4 portrait). Drop files in public/images/placement/
 * and update this list (or wire from admin once real assets exist).
 */
const WALL_IMAGES = [
  '/images/student.jpg',
  '/images/students.jpg',
  '/images/graduation.jpg',
  '/images/student2.jpg',
  '/images/class2.jpg',
  '/images/graduation2.jpg',
  '/images/students2.jpg',
  '/images/boy.jpg',
]

export function PlacementWall() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.wall-card', root).forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 48, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            delay: (i % 4) * 0.1,
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
          },
        )
      })
    }, root)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="border-t border-white/8 bg-navy-950 px-4 py-24 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <SectionLabel className="mb-4 mx-auto">Our Alumni</SectionLabel>
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            Where Ambition Meets Achievement
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {WALL_IMAGES.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="wall-card group relative aspect-[3/4] overflow-hidden pixel-corner"
            >
              <Image
                src={src}
                alt={`Placed student ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
