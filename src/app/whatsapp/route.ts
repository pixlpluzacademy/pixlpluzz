import { NextResponse } from 'next/server'

export function GET() {
  const phone = '917736060370'
  const message =
    'Hi Pixl Pluz! I would like a free consultation about your courses.'

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message,
  )}`

  return NextResponse.redirect(whatsappUrl)
}
