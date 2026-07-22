'use client'

import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { cn } from '@/lib/utils'

gsap.registerPlugin(CustomEase)
CustomEase.create('officeCurtain', '0.22, 1, 0.36, 1')

type OfficeSlide = {
  src: string
  title: string
  caption: string
}

const SLIDES: OfficeSlide[] = [
  {
    src: '/images/office/pixl-pluz-academy-reception.png',
    title: 'Welcome to Pixl Pluz',
    caption: 'Where Ideas Begin',
  },
  {
    src: '/images/office/pixl-pluz-digital-learning-lab.jpeg',
    title: 'Ideas Into Action',
    caption: 'Learning by Doing',
  },
  {
    src: '/images/office/pixl-pluz-creative-technology-studio.jpeg',
    title: 'Creative Technology Studio',
    caption: 'Create Without Limits',
  },
  {
    src: '/images/office/pixl-pluz-practical-training-classroom.jpeg',
    title: 'Learn. Apply. Grow.',
    caption: 'Skills Built Practically',
  },
  {
    src: '/images/office/pixl-pluz-focused-workspace.jpeg',
    title: 'Focused Workspaces',
    caption: 'Focus. Build. Improve.',
  },
  {
    src: '/images/office/pixl-pluz-career-guidance-room.png',
    title: 'Career Guidance Space',
    caption: 'Your Career, Guided',
  },
]

const EASE = 'officeCurtain'
const CSS_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const TRANSITION_MS = 1150
const AUTOPLAY_MS = 5000

const BRAND = {
  blue: '#143D8F',
  green: '#54E345',
  white: '#FFFFFF',
  butter: '#FFFAA4',
  navy: '#060b16',
} as const

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function AboutHeroBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: BRAND.navy }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-0 right-0 h-[480px] w-[480px] translate-x-1/3 -translate-y-1/4 rounded-full blur-[110px]"
        style={{ backgroundColor: 'rgba(20, 61, 143, 0.22)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[320px] w-[320px] -translate-x-1/4 translate-y-1/4 rounded-full blur-[90px]"
        style={{ backgroundColor: 'rgba(20, 61, 143, 0.12)' }}
        aria-hidden
      />
    </>
  )
}

export function AboutOfficeGallery() {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const captionRef = useRef<HTMLParagraphElement>(null)
  const swipeX = useRef<number | null>(null)

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const animating = useRef(false)
  const activeIndex = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const animateTo = useEffectEvent((next: number, forceDir?: 1 | -1) => {
    if (next === activeIndex.current) return

    const stage = stageRef.current
    const title = titleRef.current
    const caption = captionRef.current
    if (!stage) return

    const slides = stage.querySelectorAll<HTMLElement>('.office-feat-slide')
    const current = activeIndex.current
    const incoming = slides[next]
    const outgoing = slides[current]
    if (!incoming || !outgoing) return

    gsap.killTweensOf(slides)
    if (title) gsap.killTweensOf(title)
    if (caption) gsap.killTweensOf(caption)

    animating.current = true
    activeIndex.current = next
    setIndex(next)

    if (reduceMotion) {
      gsap.set(slides, { autoAlpha: 0, clipPath: 'inset(0 0% 0 0)', scale: 1, filter: 'none', zIndex: 1 })
      gsap.set(incoming, { autoAlpha: 1, zIndex: 2 })
      if (title) {
        gsap.set(title, { clearProps: 'clipPath' })
        title.textContent = SLIDES[next].title
      }
      if (caption) {
        gsap.set(caption, { clearProps: 'clipPath' })
        caption.textContent = SLIDES[next].caption
      }
      animating.current = false
      return
    }

    // Arrow nav uses forced direction; thumbs use shortest path
    let dir: 1 | -1
    if (forceDir) {
      dir = forceDir
    } else {
      const forward = (next - current + SLIDES.length) % SLIDES.length
      const backward = (current - next + SLIDES.length) % SLIDES.length
      dir = forward <= backward ? 1 : -1
    }

    const duration = TRANSITION_MS / 1000

    slides.forEach((el, i) => {
      if (i !== current && i !== next) {
        gsap.set(el, {
          autoAlpha: 0,
          clipPath: 'inset(0 0% 0 0)',
          scale: 1,
          filter: 'none',
          zIndex: 1,
        })
      }
    })

    const tl = gsap.timeline({
      defaults: { ease: EASE },
      onComplete: () => {
        gsap.set(outgoing, {
          autoAlpha: 0,
          clipPath: 'inset(0 0% 0 0)',
          scale: 1,
          filter: 'none',
          zIndex: 1,
        })
        gsap.set(incoming, {
          autoAlpha: 1,
          clipPath: 'inset(0 0% 0 0)',
          scale: 1,
          filter: 'none',
          zIndex: 2,
        })
        animating.current = false
      },
    })

    if (dir === 1) {
      // Forward: new image curtains in L → R over the old one
      gsap.set(outgoing, {
        autoAlpha: 1,
        clipPath: 'inset(0 0% 0 0)',
        scale: 1,
        filter: 'none',
        zIndex: 2,
      })
      gsap.set(incoming, {
        autoAlpha: 1,
        clipPath: 'inset(0 100% 0 0)',
        scale: 1.04,
        filter: 'blur(12px)',
        zIndex: 3,
      })
      tl.to(
        incoming,
        {
          clipPath: 'inset(0 0% 0 0)',
          scale: 1,
          duration,
        },
        0,
      )
      // Blur clears a beat slower so the wipe feels sharp at the end
      tl.to(
        incoming,
        {
          filter: 'blur(0px)',
          duration: duration * 0.85,
          ease: 'power2.out',
        },
        0.12,
      )
    } else {
      // Reverse: old image curtains away R ← L, revealing the new image underneath
      gsap.set(incoming, {
        autoAlpha: 1,
        clipPath: 'inset(0 0% 0 0)',
        scale: 1.04,
        filter: 'blur(12px)',
        zIndex: 2,
      })
      gsap.set(outgoing, {
        autoAlpha: 1,
        clipPath: 'inset(0 0% 0 0)',
        scale: 1,
        filter: 'none',
        zIndex: 3,
      })
      tl.to(
        outgoing,
        {
          clipPath: 'inset(0 100% 0 0)',
          duration,
        },
        0,
      )
      tl.to(
        incoming,
        {
          scale: 1,
          filter: 'blur(0px)',
          duration: duration * 0.9,
          ease: 'power2.out',
        },
        0.08,
      )
    }

    if (title && caption) {
      const copyFrom = dir === 1 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'
      title.textContent = SLIDES[next].title
      caption.textContent = SLIDES[next].caption
      gsap.set([title, caption], { clipPath: copyFrom, autoAlpha: 1 })
      tl.to(
        [title, caption],
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.7,
          stagger: 0.06,
          ease: EASE,
        },
        0.2,
      )
    }
  })

  const goTo = useCallback((next: number, forceDir?: 1 | -1) => {
    const wrapped = ((next % SLIDES.length) + SLIDES.length) % SLIDES.length
    animateTo(wrapped, forceDir)
  }, [])

  const goNext = useCallback(() => goTo(activeIndex.current + 1, 1), [goTo])
  const goPrev = useCallback(() => goTo(activeIndex.current - 1, -1), [goTo])

  useEffect(() => {
    if (paused || reduceMotion) return
    const id = window.setInterval(() => {
      goNext()
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused, reduceMotion, goNext, index])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const root = rootRef.current
      if (!root) return
      const rect = root.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setPaused(true)
        goNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setPaused(true)
        goPrev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const slides = stage.querySelectorAll<HTMLElement>('.office-feat-slide')
    gsap.set(slides, { autoAlpha: 0, clipPath: 'inset(0 0% 0 0)', scale: 1, filter: 'none', zIndex: 1 })
    if (slides[0]) gsap.set(slides[0], { autoAlpha: 1, zIndex: 2 })
  }, [])

  const onPointerDown = (e: ReactPointerEvent) => {
    swipeX.current = e.clientX
  }

  const onPointerUp = (e: ReactPointerEvent) => {
    if (swipeX.current == null) return
    const dx = e.clientX - swipeX.current
    swipeX.current = null
    if (Math.abs(dx) < 48) return
    setPaused(true)
    if (dx < 0) goNext()
    else goPrev()
  }

  const slide = SLIDES[index]

  return (
    <section
      ref={rootRef}
      className="about-hero relative overflow-hidden border-b border-blue-primary/20"
      aria-label="Pixl Pluz office gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={e => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false)
      }}
    >
      <AboutHeroBackground />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14 lg:px-16 lg:py-16 xl:px-20">
        <div className="grid items-stretch gap-5 sm:gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10 xl:gap-12">
          <div className="relative min-w-0">
            <div
              ref={stageRef}
              className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 touch-pan-y sm:aspect-[16/10] lg:aspect-[16/11] lg:min-h-[22rem] lg:max-h-[32rem]"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => {
                swipeX.current = null
              }}
            >
              {SLIDES.map((s, i) => (
                <div
                  key={s.src}
                  className="office-feat-slide absolute inset-0"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                  aria-hidden={i !== index}
                >
                  <Image
                    src={s.src}
                    alt={s.title}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 flex-col justify-between gap-5 sm:gap-6 lg:py-1">
            <div className="min-w-0">
              <div className="mb-4 hidden items-center gap-4 lg:flex">
                <span
                  className="font-black tabular-nums tracking-tight text-[clamp(1.5rem,2.5vw,2rem)]"
                  style={{ color: BRAND.green }}
                  aria-live="polite"
                >
                  {pad(index + 1)}
                  <span className="mx-1.5 font-semibold" style={{ color: 'rgba(255,255,255,0.28)' }}>
                    /
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.35)' }}>{pad(SLIDES.length)}</span>
                </span>
                <div className="flex gap-2">
                  <NavButton direction="prev" onClick={() => { setPaused(true); goPrev() }} />
                  <NavButton direction="next" onClick={() => { setPaused(true); goNext() }} />
                </div>
              </div>

              <div className="overflow-hidden">
                <h3
                  ref={titleRef}
                  className="break-words font-black uppercase leading-[1.12] tracking-tight text-white text-[clamp(1.35rem,6vw,2.5rem)]"
                >
                  {slide.title}
                </h3>
              </div>
              <div className="mt-2 overflow-hidden sm:mt-3">
                <p
                  ref={captionRef}
                  className="text-sm leading-relaxed tracking-[0.04em] sm:text-base"
                  style={{ color: 'rgba(255, 250, 164, 0.9)' }}
                >
                  {slide.caption}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 lg:hidden">
                <NavButton direction="prev" onClick={() => { setPaused(true); goPrev() }} />
                <span
                  className="rounded-sm bg-black/55 px-3 py-1.5 font-black tabular-nums text-sm tracking-widest text-white backdrop-blur-sm"
                  aria-live="polite"
                >
                  {pad(index + 1)} / {pad(SLIDES.length)}
                </span>
                <NavButton direction="next" onClick={() => { setPaused(true); goNext() }} />
              </div>
            </div>

            <div className="hidden grid-cols-3 gap-2.5 sm:gap-3 lg:grid" role="tablist" aria-label="Office spaces">
              {SLIDES.map((s, i) => (
                <Thumbnail
                  key={s.src}
                  slide={s}
                  active={i === index}
                  onSelect={() => {
                    setPaused(true)
                    goTo(i)
                  }}
                />
              ))}
            </div>

            <div
              className="flex gap-2.5 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory lg:hidden [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Office spaces"
            >
              {SLIDES.map((s, i) => (
                <Thumbnail
                  key={`m-${s.src}`}
                  slide={s}
                  active={i === index}
                  compact
                  onSelect={() => {
                    setPaused(true)
                    goTo(i)
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function NavButton({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
}) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous image' : 'Next image'}
      className="flex h-10 w-10 items-center justify-center border border-white/15 bg-black/40 text-white transition-colors hover:border-[#54E345]/60 hover:text-[#54E345] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#54E345]"
    >
      <Icon size={18} strokeWidth={2.25} />
    </button>
  )
}

function Thumbnail({
  slide,
  active,
  onSelect,
  compact = false,
}: {
  slide: OfficeSlide
  active: boolean
  onSelect: () => void
  compact?: boolean
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-label={slide.title}
      className={cn(
        'group relative shrink-0 overflow-hidden border bg-black/30 transition-[border-color,box-shadow] duration-300',
        compact ? 'h-16 w-[30%] min-w-[5.5rem] max-w-[7rem] snap-start sm:h-[4.5rem] sm:w-28' : 'aspect-[4/3] w-full',
        active
          ? 'border-[#54E345] shadow-[0_0_16px_rgba(84,227,69,0.28)]'
          : 'border-white/10 hover:border-[rgba(20,61,143,0.75)]',
      )}
      style={{ transitionTimingFunction: CSS_EASE }}
      onMouseEnter={() => {
        // Hover-to-select is desktop-only; touch devices use tap via onClick.
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          onSelect()
        }
      }}
      onClick={onSelect}
    >
      <Image
        src={slide.src}
        alt=""
        fill
        sizes={compact ? '112px' : '(min-width: 1024px) 12vw, 112px'}
        className={cn(
          'object-cover transition-transform duration-500',
          active ? 'scale-100' : 'scale-[1.03] group-hover:scale-100',
        )}
        style={{ transitionTimingFunction: CSS_EASE }}
      />
      <span
        className={cn(
          'pointer-events-none absolute inset-0 transition-opacity duration-300',
          active ? 'opacity-0' : 'opacity-35 bg-black group-hover:opacity-15',
        )}
        aria-hidden
      />
    </button>
  )
}
