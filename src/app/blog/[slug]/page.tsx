import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogs, getBlog } from '@/lib/data'
import { getBlogImage } from '@/lib/blog-assets'
import { formatDate } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getBlogs().map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const blog = getBlog(slug)
  if (!blog) return { title: 'Post Not Found' }
  return { title: blog.title, description: blog.excerpt }
}

function renderContent(content: string) {
  return content.split('\n\n').map((para, i) => {
    if (para.startsWith('**') && para.endsWith('**')) {
      return (
        <h3 key={i} className="mb-3 mt-8 text-xl font-black text-white">
          {para.replace(/\*\*/g, '')}
        </h3>
      )
    }
    if (para.startsWith('"') && para.endsWith('"')) {
      return (
        <blockquote
          key={i}
          className="my-6 border-l-4 border-green-accent pl-5 text-justify italic text-white/65"
        >
          {para}
        </blockquote>
      )
    }
    const lines = para.split('\n')
    if (lines.every((l) => /^\d+\./.test(l.trim()))) {
      return (
        <ol
          key={i}
          className="my-4 list-inside list-decimal space-y-2 text-justify text-white/65"
        >
          {lines.map((l, li) => (
            <li key={li}>{l.replace(/^\d+\.\s*/, '')}</li>
          ))}
        </ol>
      )
    }
    const formatted = para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    return (
      <p
        key={i}
        className="mb-4 text-justify leading-relaxed text-white/65"
        dangerouslySetInnerHTML={{ __html: formatted }}
      />
    )
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const blog = getBlog(slug)
  if (!blog) notFound()

  const allBlogs = getBlogs()
  const related = allBlogs
    .filter((b) => b.slug !== slug && b.category === blog.category)
    .slice(0, 3)
  const sidebarPosts =
    related.length > 0
      ? related
      : allBlogs.filter((b) => b.slug !== slug).slice(0, 3)
  const blogIndex = Math.max(
    allBlogs.findIndex((b) => b.slug === slug),
    0,
  )

  return (
    <article className="min-h-screen bg-black pt-24" data-no-blur-text>
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-green-accent transition-colors hover:text-white"
        >
          <Image
            src="/icons/arrow.svg"
            alt=""
            width={28}
            height={18}
            className="h-[14px] w-auto rotate-180"
          />
          Back to Blog
        </Link>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,18rem)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)] xl:gap-16">
          <div className="min-w-0">
            <h1 className="mb-3 text-[clamp(2rem,5vw,3.25rem)] font-black leading-[1.1] tracking-tight text-white">
              {blog.title}
            </h1>

            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
              {formatDate(blog.date)} · {blog.author}
            </p>

            <div className="relative mb-10 h-72 overflow-hidden border border-white/8 sm:h-96">
              <Image
                src={blog.thumbnail || getBlogImage(blogIndex)}
                alt={blog.title}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            </div>

            <div className="prose-custom">{renderContent(blog.content)}</div>

            <div className="mt-10 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {sidebarPosts.length > 0 && (
            <aside className="min-w-0 border-t border-white/10 pt-10 lg:sticky lg:top-28 lg:border-t-0 lg:pt-0">
              <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-green-accent">
                Related posts
              </h3>
              <div className="flex flex-col gap-4">
                {sidebarPosts.map((b) => {
                  const relatedIndex = Math.max(
                    allBlogs.findIndex((x) => x.id === b.id),
                    0,
                  )
                  return (
                    <Link
                      key={b.id}
                      href={`/blog/${b.slug}`}
                      className="group flex flex-col border border-white/8 bg-[#0c0c0c] transition-colors hover:border-green-accent/35"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={b.thumbnail || getBlogImage(relatedIndex)}
                          alt={b.title}
                          fill
                          sizes="(min-width: 1024px) 20rem, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h4 className="mb-2 text-sm font-black leading-snug text-white transition-colors group-hover:text-green-accent">
                          {b.title}
                        </h4>
                        <p className="mt-auto text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                          {formatDate(b.date)} · {b.author}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </aside>
          )}
        </div>
      </div>
    </article>
  )
}
