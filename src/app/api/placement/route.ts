import { NextRequest, NextResponse } from 'next/server'
import { getPlacement, savePlacement, PlacementStudent } from '@/lib/data'
import { apiError } from '@/lib/api-helpers'

function validatePlacement(body: PlacementStudent) {
  if (!body.name?.trim()) return 'Student name is required'
  if (!body.course?.trim()) return 'Course is required'
  if (!body.company?.trim()) return 'Company is required'
  if (!body.role?.trim()) return 'Role is required'
  return null
}

export async function GET() {
  return NextResponse.json(getPlacement())
}

export async function POST(req: NextRequest) {
  const body = await req.json() as PlacementStudent
  const err = validatePlacement(body)
  if (err) return apiError(err)

  const placement = getPlacement()
  const newStudent = { ...body, id: Date.now().toString() }
  savePlacement([...placement, newStudent])
  return NextResponse.json(newStudent, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json() as PlacementStudent
  if (!body.id) return apiError('Missing id')

  const err = validatePlacement(body)
  if (err) return apiError(err)

  const placement = getPlacement()
  if (!placement.some(s => s.id === body.id)) return apiError('Student not found', 404)

  savePlacement(placement.map(s => s.id === body.id ? body : s))
  return NextResponse.json(body)
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return apiError('Missing id')

  const placement = getPlacement()
  if (!placement.some(s => s.id === id)) return apiError('Student not found', 404)

  savePlacement(placement.filter(s => s.id !== id))
  return NextResponse.json({ success: true })
}
