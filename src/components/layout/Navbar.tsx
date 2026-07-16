'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { PixlLogo } from '@/components/ui/PixlLogo'
import { cn } from '@/lib/utils'

const COURSE_LINKS = [
  { label: 'Digital Marketing with AI', href: '/courses/digital-marketing-course' },
  { label: 'AI Web Development', href: '/courses/ai-powered-web-development-course' },
  { label: 'Data Science & AI', href: '/courses/data-science-ai-course' },
  { label: 'Cyber Security with AI', href: '/courses/cyber-security-course-with-ai' },
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

export function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen]       = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          <Link href="/" className="flex items-center gap-2 shrink-0">
            <PixlLogo variant="white" className="h-8 w-[108px]" />
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
                      'flex items-center gap-1 text-sm font-medium transition-colors',
                      pathname.startsWith(link.href)
                        ? 'text-green-accent'
                        : 'text-gray-300 hover:text-green-accent'
                    )}
                  >
                    {link.label}
                    <ChevronDown size={14} className={cn('transition-transform', coursesOpen && 'rotate-180')} />
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
              Contact Us
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
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-black/95 border-t border-white/10 px-4 py-4 space-y-1 max-h-[calc(100dvh-4rem)] overflow-y-auto backdrop-blur-md">
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
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
