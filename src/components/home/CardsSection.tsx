'use client'

import { useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    title: 'Practical Training',
    desc: 'Learn through assignments, projects, campaign planning, content ideas, ad strategies, SEO tasks, and hands-on practice.',
    href: '/courses',
    image: '/images/class2.jpg',
    imageAlt: 'Students in a practical training session',
    tint: 'bg-blue-primary/55',
    gradient: 'from-blue-primary/70 via-blue-primary/30 to-blue-dark/15',
  },
  {
    title: 'Agency-Style Learning',
    desc: 'Understand how digital marketing, branding, advertising, and business growth projects are handled inside a professional agency environment.',
    href: '/about',
    image: '/images/students.jpg',
    imageAlt: 'Agency-style collaborative learning environment',
    tint: 'bg-blue-dark/50',
    gradient: 'from-blue-dark/75 via-blue-primary/35 to-transparent',
  },
  {
    title: 'Scholarship Entrance Test',
    desc: 'Register for our scholarship program, complete the entrance test, and show us your interest, effort, and potential.',
    href: '/scholarship',
    image: '/images/graduation.jpg',
    imageAlt: 'Graduates celebrating scholarship success',
    tint: 'bg-blue-primary/45',
    gradient: 'from-blue-dark/65 via-blue-primary/40 to-blue-primary/10',
  },
  {
    title: 'Career-Focused Support',
    desc: 'Get support for portfolio development, resume preparation, skill improvement, interview practice, and career guidance.',
    href: '/placement',
    image: '/images/student2.jpg',
    imageAlt: 'Student receiving career-focused support',
    tint: 'bg-blue-primary/50',
    gradient: 'from-navy-900/80 via-blue-primary/40 to-blue-dark/20',
  },
]

const FAN_ROTATIONS = [-9, -4, 4, 9]

export function CardsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mm = gsap.matchMedia()

    // Desktop only: sticky fan scrub. Tablets/phones use natural flow.
    mm.add('(min-width: 1024px)', () => {
      const cards = Array.from(
        section.querySelectorAll<HTMLElement>('.card-fan-item')
      )
      if (!cards.length) return

      gsap.set(cards, {
        y: 100,
        rotation: (i: number) => FAN_ROTATIONS[i] ?? 0,
        opacity: 0,
        scale: 0.88,
        transformOrigin: 'bottom center',
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          end: 'bottom bottom',
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      })

      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: i === 0 ? 0.35 : 0.5,
            ease: 'power2.out',
          },
          i === 0 ? 0 : i * 0.25
        )
      })
    })

    mm.add('(max-width: 1023px)', () => {
      const cards = Array.from(
        section.querySelectorAll<HTMLElement>('.card-fan-item')
      )
      if (!cards.length) return

      gsap.set(cards, { opacity: 0, y: 32 })
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          end: 'top 40%',
          scrub: 0.45,
        },
      })
    })

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => mm.revert()
  }, [])

  // Pin only on lg+ with a fixed scrub distance — mobile/tablet flow naturally
  return (
    <section ref={sectionRef} className="relative bg-navy-900 lg:h-[calc(38rem+480px)]">
      <div className="flex items-center overflow-hidden py-14 sm:py-20 lg:sticky lg:top-0 lg:h-[clamp(28rem,70svh,38rem)] lg:py-16">
        <div className="site-container-wide w-full">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CARDS.map((card) => (
              <div key={card.title} className="card-fan-item">
                <Link
                  href={card.href}
                  className="group relative block aspect-4/5 overflow-hidden border border-white/10 pixel-corner transition-all duration-300 hover:-translate-y-1 hover:border-green-accent/40"
                >
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 ${card.tint} mix-blend-multiply transition-opacity duration-300 group-hover:opacity-80`}
                    aria-hidden
                  />
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${card.gradient} transition-opacity duration-300 group-hover:opacity-90`}
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-navy-950/92 via-navy-950/45 to-transparent"
                    aria-hidden
                  />

                  <div className="relative z-10 flex h-full flex-col justify-end p-5">
                    <h3 className="mb-2 text-lg font-black leading-tight text-white">
                      {card.title}
                    </h3>
                    <p className="mb-4 text-xs leading-relaxed text-gray-300">
                      {card.desc}
                    </p>
                    <div className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/10 pixel-corner-sm transition-all duration-200 group-hover:border-green-accent group-hover:bg-green-accent">
                      <ArrowRight size={14} className="text-white group-hover:text-navy-950" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <AnimatedSection variant="fadeIn" delay={0.3} className="mt-10 text-center">
            <p className="text-sm text-gray-500">
              You can also{' '}
              <Link href="/contact" className="text-green-accent underline underline-offset-4 hover:text-green-accent transition-colors">
                join our counselling session
              </Link>{' '}
              to understand the right course for your career.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
