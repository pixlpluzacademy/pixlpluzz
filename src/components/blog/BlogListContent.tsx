'use client'

import { useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Eye } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Blog } from '@/lib/data'
import { getBlogImage } from '@/lib/blog-assets'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { formatDate } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const CATEGORY_COLORS: Record<string, string> = {
  Education:  'bg-blue-primary text-white',
  Marketing:  'bg-green-accent text-navy-900',
  Technology: 'bg-navy-700 text-white',
}

export function BlogListContent({ blogs }: { blogs: Blog[] }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      // Cards — staggered rise as each row scrolls in
      const cards = gsap.utils.toArray<HTMLElement>('.blog-card', root)
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 56, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: 'power3.out',
            delay: (i % 3) * 0.12,
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          },
        )
      })

      // Gentle parallax on card images while scrolling
      cards.forEach((card) => {
        const img = card.querySelector('.blog-card-img')
        if (!img) return
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    }, root)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-white dark:bg-navy-950 py-14 sm:py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <SectionLabel className="mb-4 mx-auto">All Articles</SectionLabel>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="blog-card group flex flex-col border border-gray-100 dark:border-white/8 hover:border-blue-primary dark:hover:border-green-accent bg-white dark:bg-navy-900/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-950/40 pixel-corner overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden">
                {/* Parallax layer is oversized so the drift never shows edges */}
                <div className="blog-card-img absolute -inset-y-6 inset-x-0">
                  <Image
                    src={getBlogImage(i)}
                    alt={blog.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/15 to-transparent" />
                <div className="absolute bottom-4 left-4 z-10">
                  <span className={`text-xs font-bold px-2.5 py-1 pixel-corner-sm ${CATEGORY_COLORS[blog.category] ?? 'bg-gray-700 text-white'}`}>
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-6">
                <p className="text-xs text-gray-400 mb-2">{formatDate(blog.date)}</p>
                <h3 className="font-black text-lg text-gray-900 dark:text-white group-hover:text-blue-primary dark:group-hover:text-green-accent transition-colors leading-snug mb-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1 leading-relaxed">
                  {blog.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-primary dark:text-green-accent">
                    Read More
                    <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Eye size={12} /> {blog.views}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
