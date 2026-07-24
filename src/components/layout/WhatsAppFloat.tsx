'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const POP_INTERVAL_MS = 8000
/** Start below the viewport edge so it feels like it rises onto the page. */
const OFFSCREEN_Y = 160

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function WhatsAppFloat() {
  const rootRef = useRef<HTMLAnchorElement>(null)
  const [hiddenByHero, setHiddenByHero] = useState(true)

  // Hide while any page hero is in view (hero already has Free Consultation → WhatsApp)
  useLayoutEffect(() => {
    const heroes = document.querySelectorAll('[data-page-hero]')
    if (heroes.length === 0) {
      setHiddenByHero(false)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setHiddenByHero(entries.some((entry) => entry.isIntersecting))
      },
      { threshold: 0.15 },
    )

    heroes.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (hiddenByHero) {
      gsap.killTweensOf(el)
      gsap.set(el, { opacity: 0, y: OFFSCREEN_Y, scale: 0.85 })
      return
    }

    if (reduceMotion) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 })
      return
    }

    const playPopFromBottom = () => {
      if (document.querySelector('[data-page-hero]') && rootRef.current?.getAttribute('data-hero-hidden') === 'true') {
        return
      }
      const tl = gsap.timeline({ overwrite: true })
      tl.to(el, {
        y: OFFSCREEN_Y,
        scale: 0.9,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
      })
      tl.fromTo(
        el,
        { y: OFFSCREEN_Y, scale: 0.85, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: 'back.out(1.6)',
        },
      )
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: OFFSCREEN_Y, scale: 0.85 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: 'back.out(1.6)',
        overwrite: true,
      },
    )

    const interval = window.setInterval(playPopFromBottom, POP_INTERVAL_MS)

    return () => {
      window.clearInterval(interval)
      gsap.killTweensOf(el)
    }
  }, [hiddenByHero])

  return (
    <a
      ref={rootRef}
      href="/whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      aria-hidden={hiddenByHero}
      tabIndex={hiddenByHero ? -1 : 0}
      data-hero-hidden={hiddenByHero ? 'true' : 'false'}
      className={`group fixed bottom-5 right-5 z-50 flex cursor-pointer items-center gap-0 border-0 bg-transparent p-0 will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
        hiddenByHero ? 'pointer-events-none' : ''
      }`}
    >
      <span
        className="pointer-events-none mr-0 max-w-0 overflow-hidden whitespace-nowrap pixel-corner-sm border border-white/10 bg-black/90 px-0 py-1.5 text-[11px] font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:mr-2.5 group-hover:max-w-[12rem] group-hover:px-3 group-hover:opacity-100 group-focus-visible:mr-2.5 group-focus-visible:max-w-[12rem] group-focus-visible:px-3 group-focus-visible:opacity-100"
      >
        Chat on WhatsApp
      </span>

      <span className="flex h-11 w-11 items-center justify-center pixel-corner-sm bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-transform duration-200 group-hover:scale-110 group-active:scale-95 sm:h-12 sm:w-12">
        <WhatsAppIcon className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]" />
      </span>
    </a>
  )
}
