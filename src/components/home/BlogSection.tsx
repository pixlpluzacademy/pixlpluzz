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
  Education: 'bg-blue-primary text-white',
  Marketing:  'bg-green-accent text-navy-900',
  Technology: 'bg-navy-700 text-white',
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
    <section className="bg-white dark:bg-navy-950 py-16 sm:py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <AnimatedSection variant="fadeUp">
            <SectionLabel className="mb-4 mx-auto">Our Latest Posts</SectionLabel>
          </AnimatedSection>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Learn More About Digital<br />Marketing & Career Growth
          </h2>
          <AnimatedSection variant="fadeUp" delay={0.1}>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
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
                className="group flex flex-col overflow-hidden border border-gray-100 dark:border-white/5 hover:border-blue-primary dark:hover:border-green-accent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 pixel-corner"
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
                  <div className="absolute inset-0 bg-linear-to-t from-navy-950/70 to-transparent" />
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
                  <h3 className="font-black text-gray-900 dark:text-white leading-tight group-hover:text-blue-primary dark:group-hover:text-green-accent transition-colors mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">
                    {blog.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-primary dark:text-green-accent">
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
            className="inline-flex items-center gap-2 border-2 border-blue-primary dark:border-white text-blue-primary dark:text-white px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-blue-primary hover:text-white dark:hover:bg-white dark:hover:text-navy-900 transition-all pixel-corner-sm"
          >
            View All Posts <ArrowRight size={14} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
