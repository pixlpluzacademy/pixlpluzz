'use client'

import { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Placement wall — student photos from public/images/students/
 */
const WALL_IMAGES = [
  '/images/students/offer-letter.png',
  '/images/students/career-placement-support.png',
  '/images/students/group-discussion.png',
  '/images/students/interview-preparation.png',
  '/images/students/practical-learning.png',
  '/images/students/live-project-training.png',
  '/images/students/verified-portfolio.png',
  '/images/students/industry-certification.png',
  '/images/students/industry-expert-mentors.png',
  '/images/students/clearing-doubts.jpeg',
  '/images/students/scholarship-based-courses.png',
  '/images/students/ai-tools-automation.png',
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
    <section ref={rootRef} className="border-t border-white/8 bg-black px-4 py-16 sm:px-6 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="text-4xl font-black text-green-accent sm:text-5xl">
            SUCCESS STORIES
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
