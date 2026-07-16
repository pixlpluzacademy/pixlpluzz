'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect, useLayoutEffect, useState } from 'react'
import { useLenis } from 'lenis/react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FloatingPixels } from '@/components/ui/FloatingPixels'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  { label: 'Scholarship Based Courses', image: '/images/students/scholarship-based-courses.png' },
  { label: 'Live Project & Training', image: '/images/students/live-project-training.png' },
  { label: 'Industry Expert Mentors', image: '/images/students/industry-expert-mentors.png' },
  { label: 'AI Tools & Automation', image: '/images/students/ai-tools-automation.png' },
  { label: 'Career & Placement Support', image: '/images/students/career-placement-support.png' },
  { label: 'Interview Preparation', image: '/images/students/interview-preparation.png' },
  { label: 'Practical Learning', image: '/images/students/practical-learning.png' },
  { label: 'Verified Portfolio', image: '/images/students/verified-portfolio.png' },
  { label: 'Industry Certification', image: '/images/students/industry-certification.png' },
]

export function AdvantageSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const gridRef = useRef<HTMLDivElement>(null)
  const [openIdx, setOpenIdx] = useState<number | null>(null)

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
    <section ref={sectionRef} className="relative bg-black py-16 sm:py-24 overflow-hidden">
      <div className="relative overflow-hidden">
        <FloatingPixels />

        <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-10 px-4 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-no-blur-text className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel className="mb-4">
              The PixlPluz Advantage
            </SectionLabel>

            <h2 className="mb-6 text-4xl font-black leading-tight text-white lg:text-6xl">
              Digital marketing agency in kerala
            </h2>

            <div className="mb-10 max-w-xl space-y-4">
              <p className="m-0 text-justify text-white leading-relaxed">
                Pixl Pluz offers an agency-based digital marketing course in Kochi,
                Thiruvananthapuram, and Calicut. Learners can choose between our
                Live Online Program or offline classes at our institutes, with
                weekend batches available at all centres.
              </p>
              <p className="m-0 text-justify text-white leading-relaxed">
                Whether you&apos;re a fresh graduate, working professional, homemaker,
                or business owner, Pixl Pluz Academy builds job-ready digital marketing
                careers through hands-on, agency-style training — backed by Neo Digital Hub, Dubai.
              </p>
              <p className="m-0 text-justify text-white leading-relaxed">
                Every module is designed around real campaigns, mentor feedback, and
                portfolio work so you leave with skills employers recognise. From SEO and
                paid ads to AI tools and content systems, you train the way modern agencies work.
              </p>
              <p className="m-0 text-justify text-white leading-relaxed">
                Join a learning environment built for clarity, practice, and career growth —
                with scholarship pathways, interview preparation, and placement support to
                help you take the next step confidently.
              </p>
            </div>

            <Link
              href="/courses"
              className="btn-glaze btn-cta-green inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all pixel-corner-sm"
            >
              Become a Student
              <ArrowRight size={14} />
            </Link>
          </div>

          <div
            ref={gridRef}
            className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3 lg:ml-auto lg:max-w-[34rem] xl:max-w-[36rem]"
          >
            {FEATURES.map(({ label, image }, i) => {
              const isOpen = openIdx === i
              const isHidden = openIdx !== null && !isOpen

              return (
                <div
                  key={label}
                  ref={(el) => { cardsRef.current[i] = el }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-label={isOpen ? `Collapse ${label}` : `Expand ${label}`}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setOpenIdx(isOpen ? null : i)
                    }
                  }}
                  className={cn(
                    'advantage-card group relative w-full cursor-pointer overflow-hidden border border-white/10 bg-[#141414]',
                    'transition-all duration-[400ms] ease-out',
                    'hover:border-green-accent/40 hover:shadow-lg hover:shadow-green-accent/10',
                    isOpen
                      ? 'col-span-full z-40 mx-auto aspect-square w-full max-w-[min(100%,28rem)] sm:max-w-[32rem] border-green-accent/40 shadow-lg shadow-green-accent/15'
                      : 'aspect-square',
                    isHidden && 'hidden',
                  )}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={image}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={cn(
                        'object-cover transition-all duration-500 ease-out',
                        isOpen
                          ? 'scale-100 blur-none brightness-100'
                          : 'scale-110 blur-[6px] brightness-75 group-hover:scale-100 group-hover:blur-none group-hover:brightness-100',
                      )}
                    />
                  </div>

                  <div
                    className={cn(
                      'absolute inset-0 transition-colors duration-500',
                      isOpen ? 'bg-black/20' : 'bg-black/55 group-hover:bg-black/25',
                    )}
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                  <p
                    className={cn(
                      'absolute inset-x-0 bottom-0 z-10 p-3.5 font-black uppercase leading-tight tracking-wide text-white sm:p-4',
                      isOpen ? 'text-sm sm:text-base md:text-lg' : 'text-xs sm:text-sm',
                    )}
                  >
                    {label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
