import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Eye } from 'lucide-react'
import { getBlogs, getBlog } from '@/lib/data'
import { getBlogImage } from '@/lib/blog-assets'
import { formatDate } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getBlogs().map(b => ({ slug: b.slug }))
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
      return <h3 key={i} className="text-xl font-black text-white mt-8 mb-3">{para.replace(/\*\*/g, '')}</h3>
    }
    if (para.startsWith('"') && para.endsWith('"')) {
      return (
        <blockquote key={i} className="border-l-4 border-green-accent pl-5 my-6 italic text-white/65 text-justify">
          {para}
        </blockquote>
      )
    }
    const lines = para.split('\n')
    if (lines.every(l => /^\d+\./.test(l.trim()))) {
      return (
        <ol key={i} className="list-decimal list-inside space-y-2 my-4 text-white/65 text-justify">
          {lines.map((l, li) => <li key={li}>{l.replace(/^\d+\.\s*/, '')}</li>)}
        </ol>
      )
    }
    // Bold inline formatting
    const formatted = para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    return (
      <p key={i} className="text-white/65 leading-relaxed mb-4 text-justify"
        dangerouslySetInnerHTML={{ __html: formatted }} />
    )
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const blog = getBlog(slug)
  if (!blog) notFound()

  const allBlogs = getBlogs()
  const related = allBlogs.filter(b => b.slug !== slug && b.category === blog.category).slice(0, 3)
  const blogIndex = Math.max(allBlogs.findIndex(b => b.slug === slug), 0)

  return (
    <article className="bg-black min-h-screen pt-24">
      <div className="mx-auto max-w-3xl px-4 pb-20">

        {/* Back link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-primary dark:hover:text-green-accent transition-colors mb-8">
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="flex items-center gap-1 text-xs text-gray-400"><Calendar size={12} />{formatDate(blog.date)}</span>
          <span className="flex items-center gap-1 text-xs text-gray-400"><Eye size={12} />{blog.views} views</span>
          <span className="text-xs text-gray-400">By {blog.author}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-black text-green-accent leading-tight mb-8">
          {blog.title}
        </h1>

        {/* Hero image */}
        <div className="relative h-72 sm:h-96 pixel-corner overflow-hidden mb-10">
          <Image
            src={getBlogImage(blogIndex)}
            alt={blog.title}
            fill
            sizes="(min-width: 768px) 48rem, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="prose-custom">
          {renderContent(blog.content)}
        </div>

        {/* Tags */}
        <div className="mt-10 flex flex-wrap gap-2">
          {blog.tags.map(tag => (
            <span key={tag} className="text-xs px-3 py-1 bg-white/10 text-white/70 pixel-corner-sm">
              #{tag}
            </span>
          ))}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/10">
            <h3 className="text-2xl font-black text-white mb-6">Related Posts</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map(b => (
                <Link
                  key={b.id}
                  href={`/blog/${b.slug}`}
                  className="group p-4 border border-white/8 transition-all pixel-corner hover:shadow-[0_0_22px_rgba(84,227,69,0.3)]"
                >
                  <p className="text-xs text-gray-400 mb-1">{formatDate(b.date)}</p>
                  <h4 className="text-sm font-bold text-white group-hover:text-green-accent transition-colors leading-tight">
                    {b.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
