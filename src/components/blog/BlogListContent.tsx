'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Blog } from '@/lib/data'
import { getBlogImage } from '@/lib/blog-assets'
import { formatDate, cn } from '@/lib/utils'
import { PixelTrail } from '@/components/ui/PixelTrail'

/**
 * Nova-inspired modern blog layout (editorial magazine):
 * large hero title → featured lead story → supporting grid.
 * Dark Pixl Pluz brand adaptation of
 * https://dribbble.com/shots/25832181-Nova-Modern-Blog-Page
 */
export function BlogListContent({ blogs }: { blogs: Blog[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const categories = useMemo(
    () => Array.from(new Set(blogs.map((b) => b.category))),
    [blogs],
  )

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return blogs
    return blogs.filter((b) => b.category === activeCategory)
  }, [blogs, activeCategory])

  const imageIndexById = useMemo(() => {
    const map = new Map<string, number>()
    blogs.forEach((b, i) => map.set(b.id, i))
    return map
  }, [blogs])

  const [featured, ...rest] = filtered
  const filters = ['All', ...categories]

  return (
    <div className="blog-nova bg-black" data-no-blur-text>
      {/* ── Editorial hero ── */}
      <header
        className="relative overflow-hidden border-b border-white/8 px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8"
        data-page-hero
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 15% 20%, rgba(20,61,143,0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(84,227,69,0.08), transparent 50%)',
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="relative font-black uppercase leading-[0.9] tracking-tight">
              <PixelTrail />
              <span className="block text-[clamp(3.5rem,12vw,8rem)] text-white">
                Blogs
              </span>
              <span className="mt-1 block text-[clamp(1.75rem,5vw,3rem)] text-green-accent">
                &amp; Insights
              </span>
            </h1>
            <p className="max-w-md text-justify text-base leading-relaxed text-white/55 lg:pb-2">
              Career tips, AI tools guides, and digital marketing strategies from
              Pixl Pluz instructors, built for learners who want practical
              signal, not noise.
            </p>
          </div>

          {filters.length > 1 && (
            <div
              className="mt-10 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Filter articles by category"
            >
              {filters.map((cat) => {
                const active = activeCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      'cursor-pointer border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors',
                      active
                        ? 'border-green-accent/50 bg-green-accent/10 text-green-accent'
                        : 'border-white/12 bg-white/4 text-white/55 hover:border-white/25 hover:text-white',
                    )}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {filtered.length === 0 ? (
          <p className="text-center text-white/45">
            No articles in this category yet.
          </p>
        ) : (
          <>
            {/* ── Featured lead ── */}
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group mb-14 grid overflow-hidden border border-white/10 bg-[#0c0c0c] transition-colors duration-300 hover:border-green-accent/35 lg:mb-20 lg:grid-cols-12"
              >
                <div className="relative min-h-[18rem] overflow-hidden sm:min-h-[22rem] lg:col-span-7 lg:min-h-[28rem]">
                  <Image
                    src={
                      featured.thumbnail ||
                      getBlogImage(imageIndexById.get(featured.id) ?? 0)
                    }
                    alt={featured.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-transparent lg:to-black/40" />
                  <span className="absolute left-5 top-5 border border-white/20 bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                    {featured.category}
                  </span>
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-5 lg:p-12">
                  <h2 className="mb-3 text-[clamp(1.6rem,3.2vw,2.65rem)] font-black leading-[1.1] tracking-tight text-white transition-colors group-hover:text-green-accent">
                    {featured.title}
                  </h2>
                  <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                    {formatDate(featured.date)} · {featured.author}
                  </p>
                  <p className="mb-8 text-sm leading-relaxed text-justify text-white/55 sm:text-base">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-green-accent">
                    Read full article
                    <Image
                      src="/icons/arrow.svg"
                      alt=""
                      width={28}
                      height={18}
                      className="h-[14px] w-auto transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            )}

            {/* ── Supporting grid ── */}
            {rest.length > 0 && (
              <section>
                <div className="mb-8 flex items-end justify-between gap-4 border-b border-white/8 pb-4">
                  <h2 className="text-sm font-bold uppercase tracking-[0.28em] text-green-accent">
                    Latest articles
                  </h2>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/35">
                    {rest.length} post{rest.length === 1 ? '' : 's'}
                  </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  {rest.map((blog) => (
                    <Link
                      key={blog.id}
                      href={`/blog/${blog.slug}`}
                      className="group flex flex-col"
                    >
                      <div className="relative mb-5 aspect-[16/10] overflow-hidden border border-white/8 bg-[#141414]">
                        <Image
                          src={
                            blog.thumbnail ||
                            getBlogImage(imageIndexById.get(blog.id) ?? 0)
                          }
                          alt={blog.title}
                          fill
                          sizes="(min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                        <span className="absolute left-4 top-4 border border-white/20 bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                          {blog.category}
                        </span>
                      </div>
                      <h3
                        className={cn(
                          'mb-2 text-xl font-black leading-snug tracking-tight text-white',
                          'transition-colors group-hover:text-green-accent sm:text-2xl',
                        )}
                      >
                        {blog.title}
                      </h3>
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                        {formatDate(blog.date)} · {blog.author}
                      </p>
                      <p className="mb-5 flex-1 text-sm leading-relaxed text-justify text-white/50">
                        {blog.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-green-accent">
                        Read more
                        <Image
                          src="/icons/arrow.svg"
                          alt=""
                          width={28}
                          height={18}
                          className="h-[12px] w-auto transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}
