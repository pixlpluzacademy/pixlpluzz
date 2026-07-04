import { NextRequest, NextResponse } from 'next/server'
import { getCourses, saveCourses, Course } from '@/lib/data'
import { apiError } from '@/lib/api-helpers'

function validateCourse(body: Course, isCreate: boolean) {
  if (!body.title?.trim()) return 'Title is required'
  if (!body.slug?.trim()) return 'Slug is required'
  if (!body.description?.trim()) return 'Description is required'
  const courses = getCourses()
  const duplicate = courses.find(c => c.slug === body.slug && (isCreate || c.id !== body.id))
  if (duplicate) return 'A course with this slug already exists'
  return null
}

export async function GET() {
  return NextResponse.json(getCourses())
}

export async function POST(req: NextRequest) {
  const body = await req.json() as Course
  const err = validateCourse(body, true)
  if (err) return apiError(err)

  const courses = getCourses()
  const newCourse = { ...body, id: Date.now().toString() }
  saveCourses([...courses, newCourse])
  return NextResponse.json(newCourse, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json() as Course
  if (!body.id) return apiError('Missing id')

  const err = validateCourse(body, false)
  if (err) return apiError(err)

  const courses = getCourses()
  const exists = courses.some(c => c.id === body.id)
  if (!exists) return apiError('Course not found', 404)

  saveCourses(courses.map(c => c.id === body.id ? body : c))
  return NextResponse.json(body)
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return apiError('Missing id')

  const courses = getCourses()
  if (!courses.some(c => c.id === id)) return apiError('Course not found', 404)

  saveCourses(courses.filter(c => c.id !== id))
  return NextResponse.json({ success: true })
}
