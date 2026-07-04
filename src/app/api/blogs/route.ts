import { NextRequest, NextResponse } from 'next/server'
import { getBlogs, saveBlogs, Blog } from '@/lib/data'
import { apiError } from '@/lib/api-helpers'

function validateBlog(body: Blog, isCreate: boolean) {
  if (!body.title?.trim()) return 'Title is required'
  if (!body.slug?.trim()) return 'Slug is required'
  if (!body.content?.trim()) return 'Content is required'
  if (!body.excerpt?.trim()) return 'Excerpt is required'
  const blogs = getBlogs()
  const duplicate = blogs.find(b => b.slug === body.slug && (isCreate || b.id !== body.id))
  if (duplicate) return 'A blog post with this slug already exists'
  return null
}

export async function GET() {
  return NextResponse.json(getBlogs())
}

export async function POST(req: NextRequest) {
  const body = await req.json() as Blog
  const err = validateBlog(body, true)
  if (err) return apiError(err)

  const blogs = getBlogs()
  const newBlog = { ...body, id: Date.now().toString(), views: 0 }
  saveBlogs([...blogs, newBlog])
  return NextResponse.json(newBlog, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json() as Blog
  if (!body.id) return apiError('Missing id')

  const err = validateBlog(body, false)
  if (err) return apiError(err)

  const blogs = getBlogs()
  if (!blogs.some(b => b.id === body.id)) return apiError('Blog post not found', 404)

  saveBlogs(blogs.map(b => b.id === body.id ? body : b))
  return NextResponse.json(body)
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return apiError('Missing id')

  const blogs = getBlogs()
  if (!blogs.some(b => b.id === id)) return apiError('Blog post not found', 404)

  saveBlogs(blogs.filter(b => b.id !== id))
  return NextResponse.json({ success: true })
}
