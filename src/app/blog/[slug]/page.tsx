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

const CATEGORY_COLORS: Record<string, string> = {
  Education:  'bg-blue-primary text-white',
  Marketing:  'bg-green-accent text-navy-900',
  Technology: 'bg-navy-700 text-white',
}

function renderContent(content: string) {
  return content.split('\n\n').map((para, i) => {
    if (para.startsWith('**') && para.endsWith('**')) {
      return <h3 key={i} className="text-xl font-black text-gray-900 dark:text-white mt-8 mb-3">{para.replace(/\*\*/g, '')}</h3>
    }
    if (para.startsWith('"') && para.endsWith('"')) {
      return (
        <blockquote key={i} className="border-l-4 border-blue-primary dark:border-green-accent pl-5 my-6 italic text-gray-600 dark:text-gray-400">
          {para}
        </blockquote>
      )
    }
    const lines = para.split('\n')
    if (lines.every(l => /^\d+\./.test(l.trim()))) {
      return (
        <ol key={i} className="list-decimal list-inside space-y-2 my-4 text-gray-600 dark:text-gray-400">
          {lines.map((l, li) => <li key={li}>{l.replace(/^\d+\.\s*/, '')}</li>)}
        </ol>
      )
    }
    // Bold inline formatting
    const formatted = para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    return (
      <p key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4"
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
    <article className="bg-white dark:bg-navy-950 min-h-screen pt-24">
      <div className="mx-auto max-w-3xl px-4 pb-20">

        {/* Back link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-primary dark:hover:text-green-accent transition-colors mb-8">
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        {/* Category + Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6 animate-slide-up">
          <span className={`text-xs font-bold px-3 py-1 pixel-corner-sm ${CATEGORY_COLORS[blog.category] ?? 'bg-gray-700 text-white'}`}>
            {blog.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400"><Calendar size={12} />{formatDate(blog.date)}</span>
          <span className="flex items-center gap-1 text-xs text-gray-400"><Eye size={12} />{blog.views} views</span>
          <span className="text-xs text-gray-400">By {blog.author}</span>
        </div>

        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-8 animate-slide-up"
          style={{ animationDelay: '0.08s', animationFillMode: 'backwards' }}
        >
          {blog.title}
        </h1>

        {/* Hero image */}
        <div
          className="relative h-72 sm:h-96 pixel-corner overflow-hidden mb-10 animate-slide-up"
          style={{ animationDelay: '0.16s', animationFillMode: 'backwards' }}
        >
          <Image
            src={getBlogImage(blogIndex)}
            alt={blog.title}
            fill
            sizes="(min-width: 768px) 48rem, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
        </div>

        {/* Content */}
        <div
          className="prose-custom animate-fade-in"
          style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}
        >
          {renderContent(blog.content)}
        </div>

        {/* Tags */}
        <div className="mt-10 flex flex-wrap gap-2">
          {blog.tags.map(tag => (
            <span key={tag} className="text-xs px-3 py-1 bg-gray-100 dark:bg-navy-800 text-gray-600 dark:text-gray-400 pixel-corner-sm">
              #{tag}
            </span>
          ))}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-100 dark:border-white/10">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Related Posts</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map(b => (
                <Link
                  key={b.id}
                  href={`/blog/${b.slug}`}
                  className="group p-4 border border-gray-100 dark:border-white/5 hover:border-blue-primary dark:hover:border-green-accent transition-all pixel-corner"
                >
                  <p className="text-xs text-gray-400 mb-1">{formatDate(b.date)}</p>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-primary dark:group-hover:text-green-accent transition-colors leading-tight">
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
