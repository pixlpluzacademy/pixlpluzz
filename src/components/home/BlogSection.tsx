'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { PixelTrail } from '@/components/ui/PixelTrail'
import { formatDate } from '@/lib/utils'
import { getBlogImage } from '@/lib/blog-assets'
import type { Blog } from '@/lib/data'

const blogContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const blogCardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export function BlogSection({ blogs }: { blogs: Blog[] }) {
  return (
    <section className="relative bg-[#0a0a0a] py-16 sm:py-24 px-4 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 70% 20%, rgba(21, 62, 144, 0.1) 0%, transparent 55%)',
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-14">
          <h2 className="relative mb-4 font-black uppercase leading-[1.12] tracking-tight text-[clamp(2rem,7vw,3.75rem)]">
            <PixelTrail />
            <span className="text-green-accent">AI Latest </span>
            <span className="text-white">Updates</span>
          </h2>
          <AnimatedSection variant="fadeUp" delay={0.1}>
            <p className="mx-auto max-w-2xl text-justify text-gray-400 sm:text-center">
              New articles on AI tools, course news, and digital skills fresh guidance from Pixl Pluz
              so you stay current with what the industry is using now.
            </p>
          </AnimatedSection>
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          variants={blogContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.id}
              variants={blogCardVariants}
              transition={{ duration: 0.55, ease: 'easeOut' as const }}
              className="transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(84,227,69,0.35)]"
            >
              <Link
                href={`/blog/${blog.slug}`}
                className="group flex flex-col overflow-hidden border border-white/8 bg-[#141414] pixel-corner"
              >
                {/* Thumbnail — no hover scale (avoids bottom-edge flicker) */}
                <div className="p-4 pb-0">
                  <div className="relative h-44 overflow-hidden sm:h-48">
                    <Image
                      src={blog.thumbnail || getBlogImage(i)}
                      alt={blog.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <p className="text-xs text-gray-400 mb-2">
                    {formatDate(blog.date)} &bull; {blog.author}
                  </p>
                  <h3 className="font-black text-green-accent leading-tight mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-justify text-gray-400 line-clamp-2 flex-1">
                    {blog.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-green-accent">
                    Read More
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRight size={12} />
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection variant="fadeUp" delay={0.2} className="text-center">
          <Link
            href="/blog"
            className="btn-glaze btn-outline-bright inline-flex items-center gap-2 border-2 px-8 py-3 text-sm font-bold uppercase tracking-wide transition-all pixel-corner-sm"
          >
            View All Posts <ArrowRight size={14} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
