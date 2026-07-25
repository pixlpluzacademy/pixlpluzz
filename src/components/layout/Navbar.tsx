'use client'

import { useState, useEffect, useLayoutEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'
import { Menu, X } from 'lucide-react'
import { PixlLogo } from '@/components/ui/PixlLogo'
import { cn } from '@/lib/utils'

const COURSE_LINKS = [
  { label: 'AI Digital Marketing', href: '/courses/digital-marketing-course' },
  { label: 'AI Web Development', href: '/courses/ai-powered-web-development-course' },
  { label: 'AI Data Science', href: '/courses/data-science-ai-course' },
  { label: 'AI Cybersecurity', href: '/courses/cyber-security-course-with-ai' },
]

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses', children: COURSE_LINKS },
  { label: 'Scholarship', href: '/scholarship' },
  { label: 'Placement',   href: '/placement' },
  { label: 'Careers',     href: '/career' },
  { label: 'Blog',        href: '/blog' },
  { label: 'Event',       href: '/event' },
]

const NAV_OFFSET = 72

export function Navbar() {
  const pathname = usePathname()
  const lenis = useLenis()
  const [menuOpen, setMenuOpen]       = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)
  /** Transparent over hero; light-gray glass once scrolled past (or on pages without a hero). */
  const [glass, setGlass] = useState(true)

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useLayoutEffect(() => {
    const update = () => {
      const hero = document.querySelector<HTMLElement>('[data-page-hero]')
      // Courses listing keeps the solid glass bar (like scrolled state on other pages)
      if (hero?.hasAttribute('data-nav-solid')) {
        setGlass(true)
        return
      }
      if (!hero) {
        setGlass(true)
        return
      }
      // Stay clear while the hero still covers the nav strip; glass after it scrolls away
      setGlass(hero.getBoundingClientRect().bottom <= NAV_OFFSET)
    }

    update()

    if (lenis) {
      lenis.on('scroll', update)
      return () => { lenis.off('scroll', update) }
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [pathname, lenis])

  const showBar = glass || menuOpen

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-3 sm:pt-3.5">
      <div
        className={cn(
          'site-container transition-[background,box-shadow,border-color,backdrop-filter] duration-300',
          showBar
            ? 'border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-md'
            : 'border border-transparent bg-transparent shadow-none',
        )}
        style={
          showBar
            ? {
                background:
                  'linear-gradient(105deg, rgba(6,10,18,0.94) 0%, rgba(20,61,143,0.28) 42%, rgba(10,16,14,0.92) 68%, rgba(84,227,69,0.14) 100%)',
              }
            : undefined
        }
      >
        <div className="flex h-[4.5rem] items-center justify-between px-4 sm:px-6">

          <Link href="/" className="flex items-center gap-2 shrink-0">
            <PixlLogo variant="white" className="h-11 w-[148px] sm:h-12 sm:w-[162px]" />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(link =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setCoursesOpen(true)}
                  onMouseLeave={() => setCoursesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'text-sm font-medium transition-colors',
                      pathname.startsWith(link.href)
                        ? 'text-green-accent'
                        : 'text-gray-300 hover:text-green-accent'
                    )}
                  >
                    {link.label}
                  </Link>
                  <div
                    className={cn(
                      'absolute top-full left-0 pt-2 w-56 transition-all duration-200',
                      coursesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                    )}
                  >
                    <div className="bg-black/95 border border-white/10 shadow-xl pixel-corner-sm overflow-hidden backdrop-blur-md">
                      {link.children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-blue-primary hover:text-white transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-green-accent'
                      : 'text-gray-300 hover:text-green-accent'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-glaze btn-primary-fill hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide pixel-corner-sm"
            >
              Let's Talk
            </Link>

            <button
              onClick={() => setMenuOpen(v => !v)}
              className="lg:hidden p-2 text-gray-300"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden max-h-[calc(100dvh-5.5rem)] space-y-1 overflow-y-auto border-t border-white/10 px-4 py-4 sm:px-6">
            {NAV_LINKS.map(link =>
              link.children ? (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      'block px-3 py-2.5 text-sm font-medium',
                      pathname === link.href || pathname.startsWith(`${link.href}/`)
                        ? 'text-green-accent'
                        : 'text-gray-300'
                    )}
                  >
                    {link.label}
                  </Link>
                  {link.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-6 py-2 text-sm text-gray-300 hover:text-green-accent"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block px-3 py-2.5 text-sm font-medium',
                    pathname === link.href
                      ? 'text-green-accent'
                      : 'text-gray-300'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-2">
              <Link
                href="/contact"
                className="btn-glaze btn-primary-fill block text-center px-5 py-3 text-sm font-semibold uppercase tracking-wide pixel-corner-sm"
              >
                Let's Talk
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
