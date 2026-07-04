'use client'

import { useLayoutEffect, useRef } from 'react'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Tag = 'h1' | 'h2' | 'h3' | 'p'

interface BlurTextProps {
  text: string
  as?: Tag
  className?: string
  /** Animate on mount instead of on scroll */
  onLoad?: boolean
}

function animateBlurWords(
  root: HTMLElement,
  words: NodeListOf<HTMLElement>,
  onLoad: boolean,
) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!words.length) return

  if (reduceMotion) {
    gsap.set(words, { opacity: 1, y: 0, clearProps: 'filter' })
    return
  }

  if (onLoad) {
    let finished = 0
    const onWordDone = () => {
      finished += 1
      if (finished === words.length) {
        root.classList.remove('blur-text-on-load')
        gsap.set(words, { clearProps: 'filter,opacity,transform' })
      }
    }

    words.forEach((word) => {
      const getsBlur = Math.random() < 0.58
      const blurPx = getsBlur ? 6 + Math.floor(Math.random() * 18) : 0
      const delay = Math.random() * 1.05
      const y = 6 + Math.random() * 34
      const duration = 0.7 + Math.random() * 0.75

      gsap.fromTo(
        word,
        {
          opacity: 0,
          y,
          filter: blurPx ? `blur(${blurPx}px)` : 'blur(0px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration,
          delay: delay + 0.08,
          ease: 'power3.out',
          onComplete: onWordDone,
        },
      )
    })
    return
  }

  words.forEach((word) => {
    const getsBlur = Math.random() < 0.58
    const blurPx = getsBlur ? 6 + Math.floor(Math.random() * 18) : 0
    const delay = Math.random() * 1.05
    const y = 6 + Math.random() * 34
    const duration = 0.7 + Math.random() * 0.75

    gsap.from(word, {
      opacity: 0,
      y,
      filter: blurPx ? `blur(${blurPx}px)` : 'blur(0px)',
      duration,
      delay,
      ease: 'power3.out',
      clearProps: 'filter',
      scrollTrigger: {
        trigger: root,
        start: 'top 88%',
        once: true,
      },
    })
  })
}

export function splitTextIntoWords(text: string, className?: string) {
  const parts = text.split(/\s+/).filter(Boolean)
  return parts.map((word, i) => (
    <span
      key={`${word}-${i}`}
      className={cn('ab-word inline-block mr-[0.26em] align-top', className)}
      style={{ willChange: 'filter, transform, opacity' }}
    >
      {word}
    </span>
  ))
}

export function BlurText({
  text,
  as = 'h2',
  className,
  onLoad = false,
}: BlurTextProps) {
  const ref = useRef<HTMLElement>(null)
  const isSiteReady = useSiteReady()

  useLayoutEffect(() => {
    if (!isSiteReady) return

    const root = ref.current
    if (!root) return

    const words = root.querySelectorAll<HTMLElement>('.ab-word')
    const ctx = gsap.context(() => {
      animateBlurWords(root, words, onLoad)
    }, root)

    return () => ctx.revert()
  }, [onLoad, text, isSiteReady])

  const Tag = as

  return (
    <Tag
      ref={ref as never}
      className={cn(className, onLoad && 'blur-text-on-load')}
      data-blur-text="component"
    >
      {splitTextIntoWords(text)}
    </Tag>
  )
}

/** @deprecated Use BlurText from @/components/ui/BlurText */
export const AboutBlurText = BlurText
