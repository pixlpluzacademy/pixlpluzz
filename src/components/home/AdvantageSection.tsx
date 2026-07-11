'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect, useLayoutEffect } from 'react'
import { useLenis } from 'lenis/react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FloatingPixels } from '@/components/ui/FloatingPixels'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  { label: 'Scholarship Based Courses', image: '/images/graduation.jpg' },
  { label: 'Live Project & Training', image: '/images/class2.jpg' },
  { label: 'Industry Expert Mentors', image: '/images/student2.jpg' },
  { label: 'AI Tools & Automation', image: '/images/students2.jpg' },
  { label: '100% Placement Assistance', image: '/images/graduation2.jpg' },
  { label: 'Interview Preparation', image: '/images/students.jpg' },
  { label: 'Practical Learning', image: '/images/room.jpg' },
  { label: 'Verified Portfolio', image: '/images/boy.jpg' },
  { label: 'Industry Certification', image: '/images/student.jpg' },
]

export function AdvantageSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const gridRef = useRef<HTMLDivElement>(null)

  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)
    return () => { lenis.off('scroll', onScroll) }
  }, [lenis])

  useLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null)
    if (!cards.length) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      gsap.set(cards, { opacity: 1, scale: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.88, y: 40, immediateRender: false },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: grid,
            start: 'top 88%',
            once: true,
          },
        },
      )
    }, sectionRef)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-navy-950 py-16 sm:py-24">
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 pixel-dot-bg opacity-20"
          aria-hidden
        />

        <FloatingPixels />

        <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-10 px-4 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-no-blur-text className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel className="mb-4">
              The PixlPluz Advantage
            </SectionLabel>

            <h2 className="mb-6 text-4xl font-black leading-tight text-white lg:text-6xl">
              Digital marketing agency in kerala
            </h2>

            <p className="mb-10 max-w-xl text-gray-400 leading-relaxed">
              Pixl Pluz offers an agency-based digital marketing course in Kochi,
              Thiruvananthapuram, and Calicut. Learners can choose between our
              Live Online Program or offline classes at our institutes, with
              weekend batches available at all centres. Whether you&apos;re a
              fresh graduate, working professional, homemaker, or business owner,
              Pixl Pluz academy builds job-ready digital marketing careers through
              hands-on, agency-style training — backed by Neo Digital Hub, Dubai.
            </p>

            <Link
              href="/courses"
              className="btn-glaze btn-outline-bright inline-flex items-center gap-2 border-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all pixel-corner-sm"
            >
              Become a Student
              <ArrowRight size={14} />
            </Link>
          </div>

          <div
            ref={gridRef}
            className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3 lg:ml-auto lg:max-w-[34rem] xl:max-w-[36rem]"
          >
            {FEATURES.map(({ label, image }, i) => (
              <div
                key={label}
                ref={(el) => { cardsRef.current[i] = el }}
                className="advantage-card group relative aspect-square w-full cursor-pointer overflow-hidden border border-white/16 bg-navy-900/95"
              >
                <div className="absolute inset-0">
                  <Image
                    src={image}
                    alt=""
                    aria-hidden
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover opacity-0 scale-105 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100"
                  />
                </div>

                <div className="absolute inset-0 bg-navy-900/95 transition-opacity duration-500 group-hover:opacity-0" />

                <div className="absolute inset-0 bg-linear-to-t from-navy-950/90 via-navy-950/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute inset-0 bg-blue-primary/0 mix-blend-multiply transition-all duration-500 group-hover:bg-blue-primary/35" />

                <p className="absolute inset-x-0 bottom-0 z-10 p-3.5 text-xs font-black uppercase leading-tight tracking-wide text-white transition-transform duration-500 group-hover:translate-y-0 sm:p-4 sm:text-sm">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
