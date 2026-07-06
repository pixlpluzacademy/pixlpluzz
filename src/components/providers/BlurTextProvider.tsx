'use client'

import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'

gsap.registerPlugin(ScrollTrigger)

const HEADING_SELECTOR = 'main h2, main h3'

const EXCLUDE_ANCESTOR =
  '[data-page-hero], [data-no-blur-text], .svc-cloud-track, .sch-intro-stage, .sch-reveal-white, .sch-word-stage'

function isPlainTextHeading(el: HTMLElement) {
  for (const node of el.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) continue
    if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName === 'BR') continue
    return false
  }
  return (el.textContent?.trim().length ?? 0) > 0
}

function shouldSkipHeading(el: HTMLElement) {
  if (el.closest(EXCLUDE_ANCESTOR)) return true
  if (el.dataset.blurText === 'component' || el.dataset.blurText === 'done') return true
  if (el.querySelector('.ab-word')) return true
  if (!isPlainTextHeading(el)) return true
  return false
}

function createWordSpan(word: string) {
  const span = document.createElement('span')
  span.className = 'ab-word inline-block mr-[0.26em] align-top'
  span.style.willChange = 'filter, transform, opacity'
  span.textContent = word
  return span
}

function appendWordsFromText(text: string, fragment: DocumentFragment) {
  const parts = text.split(/\s+/).filter(Boolean)
  parts.forEach((word) => fragment.appendChild(createWordSpan(word)))
}

function wrapHeadingWords(el: HTMLElement) {
  const fragment = document.createDocumentFragment()

  for (const node of el.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      appendWordsFromText(node.textContent ?? '', fragment)
    } else if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName === 'BR') {
      fragment.appendChild(document.createElement('br'))
    }
  }

  el.replaceChildren(fragment)
}

function animateHeadingWords(root: HTMLElement) {
  const words = root.querySelectorAll<HTMLElement>('.ab-word')
  if (!words.length) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) {
    gsap.set(words, { opacity: 1, y: 0, clearProps: 'filter' })
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

function scanHeadings(main: HTMLElement) {
  let added = false

  main.querySelectorAll<HTMLElement>(HEADING_SELECTOR).forEach((el) => {
    if (shouldSkipHeading(el)) return

    el.dataset.blurText = 'done'
    wrapHeadingWords(el)
    animateHeadingWords(el)
    added = true
  })

  return added
}

export function BlurTextProvider() {
  const pathname = usePathname()
  const isSiteReady = useSiteReady()

  useLayoutEffect(() => {
    if (!isSiteReady || pathname.startsWith('/admin')) return

    const main = document.querySelector('main')
    if (!main) return

    const contexts: gsap.Context[] = []
    let refreshRaf = 0
    let scanRaf = 0

    const scheduleRefresh = () => {
      cancelAnimationFrame(refreshRaf)
      refreshRaf = requestAnimationFrame(() => ScrollTrigger.refresh())
    }

    const apply = () => {
      const ctx = gsap.context(() => {
        if (scanHeadings(main)) scheduleRefresh()
      }, main)
      contexts.push(ctx)
    }

    apply()

    // Home sections load via dynamic import — apply blur when they mount
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(scanRaf)
      scanRaf = requestAnimationFrame(apply)
    })

    observer.observe(main, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      cancelAnimationFrame(scanRaf)
      cancelAnimationFrame(refreshRaf)
      contexts.forEach((ctx) => ctx.revert())
    }
  }, [isSiteReady, pathname])

  return null
}
