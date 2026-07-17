'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Eye } from 'lucide-react'
import type { Blog } from '@/lib/data'
import { getBlogImage } from '@/lib/blog-assets'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { formatDate } from '@/lib/utils'

export function BlogListContent({ blogs }: { blogs: Blog[] }) {
  return (
    <section className="bg-black px-4 pb-14 pt-6 sm:pb-20 sm:pt-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-10">
          <SectionLabel className="mb-4 mx-auto">All Articles</SectionLabel>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="blog-card group flex flex-col border border-white/8 bg-[#141414] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_28px_rgba(84,227,69,0.35)] pixel-corner overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={getBlogImage(i)}
                  alt={blog.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              </div>

              <div className="flex flex-col flex-1 p-6">
                <p className="text-xs text-gray-400 mb-2">{formatDate(blog.date)}</p>
                <h3 className="font-black text-lg text-green-accent leading-snug mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-white/60 line-clamp-2 flex-1 leading-relaxed text-justify">
                  {blog.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-green-accent">
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
