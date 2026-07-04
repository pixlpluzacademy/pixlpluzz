import { NextRequest, NextResponse } from 'next/server'
import { getCareers, saveCareer, Career } from '@/lib/data'
import { apiError } from '@/lib/api-helpers'

function validateCareer(body: Career) {
  if (!body.title?.trim()) return 'Job title is required'
  if (!body.description?.trim()) return 'Description is required'
  if (!body.location?.trim()) return 'Location is required'
  if (!body.deadline) return 'Application deadline is required'
  if (!body.postedDate) return 'Posted date is required'
  return null
}

export async function GET() {
  return NextResponse.json(getCareers())
}

export async function POST(req: NextRequest) {
  const body = await req.json() as Career
  const err = validateCareer(body)
  if (err) return apiError(err)

  const careers = getCareers()
  const newCareer = { ...body, id: Date.now().toString() }
  saveCareer([...careers, newCareer])
  return NextResponse.json(newCareer, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json() as Career
  if (!body.id) return apiError('Missing id')

  const err = validateCareer(body)
  if (err) return apiError(err)

  const careers = getCareers()
  if (!careers.some(c => c.id === body.id)) return apiError('Career listing not found', 404)

  saveCareer(careers.map(c => c.id === body.id ? body : c))
  return NextResponse.json(body)
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return apiError('Missing id')

  const careers = getCareers()
  if (!careers.some(c => c.id === id)) return apiError('Career listing not found', 404)

  saveCareer(careers.filter(c => c.id !== id))
  return NextResponse.json({ success: true })
}
