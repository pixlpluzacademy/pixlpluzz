import { NextResponse } from 'next/server'

export function apiError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

export function requireParam(value: string | null, name: string) {
  if (!value) return apiError(`Missing ${name}`, 400)
  return null
}
