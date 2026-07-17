'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { formatDate } from '@/lib/utils'
import { getBlogImage } from '@/lib/blog-assets'
import type { Blog } from '@/lib/data'

const CATEGORY_COLORS: Record<string, string> = {
  Education:  'bg-blue-primary/20 text-blue-primary border border-blue-primary/35',
  Marketing:  'bg-butter-glow/15 text-butter-glow border border-butter-glow/30',
  Technology: 'bg-[#1a1a1a] text-white border border-white/10',
}

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
        <div className="text-center mb-14">
          <AnimatedSection variant="fadeUp">
            <SectionLabel className="mb-4 mx-auto">Our Latest Posts</SectionLabel>
          </AnimatedSection>
          <h2 className="text-4xl sm:text-4xl font-black text-green-accent mb-4">
            Learn More About Digital<br />Marketing & Career Growth
          </h2>
          <AnimatedSection variant="fadeUp" delay={0.1}>
            <p className="max-w-2xl mx-auto text-center text-gray-400">
              Read our latest articles, student guides, career tips, course updates, and industry insights
              to understand the skills needed for the future of digital marketing and online business.
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
            <motion.div key={blog.id} variants={blogCardVariants} transition={{ duration: 0.55, ease: 'easeOut' as const }}>
              <Link
                href={`/blog/${blog.slug}`}
                className="group flex flex-col overflow-hidden border border-white/8 bg-[#141414] hover:border-green-accent/40 hover:shadow-lg hover:shadow-green-accent/10 hover:-translate-y-1 transition-all duration-300 pixel-corner"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={getBlogImage(i)}
                    alt={blog.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 ${
                        CATEGORY_COLORS[blog.category] ?? 'bg-gray-700 text-white'
                      }`}
                    >
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <p className="text-xs text-gray-400 mb-2">
                    {formatDate(blog.date)} &bull; {blog.author}
                  </p>
                  <h3 className="font-black text-green-accent leading-tight mb-2">
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
