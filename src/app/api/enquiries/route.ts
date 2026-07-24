import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

const SOURCES = new Set(['contact', 'home'])

function clean(s: unknown, max = 500) {
  if (typeof s !== 'string') return ''
  return s.trim().slice(0, max)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Honeypot
    if (clean(body.website)) {
      return NextResponse.json({ ok: true })
    }

    const source = clean(body.source, 20)
    const full_name = clean(body.full_name, 120)
    const email = clean(body.email, 160).toLowerCase()
    const phone = clean(body.phone, 40)
    const city = clean(body.city, 80)
    const interest = clean(body.interest, 80)
    const message = clean(body.message, 4000)

    if (!SOURCES.has(source)) {
      return NextResponse.json({ error: 'Invalid source' }, { status: 400 })
    }
    if (!full_name || !email || !phone || !city) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('enquiries')
      .insert({
        source,
        full_name,
        email,
        phone,
        city,
        interest,
        message,
        status: 'new',
      })
      .select('id')
      .single()

    if (error) {
      console.error('enquiry insert', error)
      return NextResponse.json({ error: 'Failed to save enquiry' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, id: data.id })
  } catch (err) {
    console.error('enquiry api', err)
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
