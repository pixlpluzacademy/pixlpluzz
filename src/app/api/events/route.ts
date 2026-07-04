import { NextRequest, NextResponse } from 'next/server'
import { getEvents, saveEvents, Event } from '@/lib/data'
import { apiError } from '@/lib/api-helpers'

function validateEvent(body: Event) {
  if (!body.title?.trim()) return 'Title is required'
  if (!body.description?.trim()) return 'Description is required'
  if (!body.date) return 'Date is required'
  if (!body.time?.trim()) return 'Time is required'
  if (!body.location?.trim()) return 'Location is required'
  if (!body.registrationUrl?.trim()) return 'Registration URL is required'
  return null
}

export async function GET() {
  return NextResponse.json(getEvents())
}

export async function POST(req: NextRequest) {
  const body = await req.json() as Event
  const err = validateEvent(body)
  if (err) return apiError(err)

  const events = getEvents()
  const newEvent = { ...body, id: Date.now().toString() }
  saveEvents([...events, newEvent])
  return NextResponse.json(newEvent, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json() as Event
  if (!body.id) return apiError('Missing id')

  const err = validateEvent(body)
  if (err) return apiError(err)

  const events = getEvents()
  if (!events.some(e => e.id === body.id)) return apiError('Event not found', 404)

  saveEvents(events.map(e => e.id === body.id ? body : e))
  return NextResponse.json(body)
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return apiError('Missing id')

  const events = getEvents()
  if (!events.some(e => e.id === id)) return apiError('Event not found', 404)

  saveEvents(events.filter(e => e.id !== id))
  return NextResponse.json({ success: true })
}
