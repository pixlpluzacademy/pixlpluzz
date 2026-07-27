import nodemailer from 'nodemailer'
import { formatEnquiryText, type EnquiryPayload } from '@/lib/enquiry-delivery'

const ENQUIRY_TO = 'pixlpluz@gmail.com'

export async function sendEnquiryEmail(payload: EnquiryPayload) {
  const user = process.env.GMAIL_USER?.trim()
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '')

  if (!user || !pass) {
    throw new Error('Missing GMAIL_USER or GMAIL_APP_PASSWORD')
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })

  const text = formatEnquiryText(payload)

  await transporter.sendMail({
    from: `"Pixl Pluz Website" <${user}>`,
    to: ENQUIRY_TO,
    replyTo: payload.email,
    subject: `New enquiry from ${payload.full_name}`,
    text,
    html: `
      <h2 style="margin:0 0 12px;font-family:Arial,sans-serif;">New website enquiry</h2>
      <p style="margin:0 0 8px;font-family:Arial,sans-serif;"><strong>Source:</strong> ${escapeHtml(payload.source)}</p>
      <p style="margin:0 0 8px;font-family:Arial,sans-serif;"><strong>Name:</strong> ${escapeHtml(payload.full_name)}</p>
      <p style="margin:0 0 8px;font-family:Arial,sans-serif;"><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p style="margin:0 0 8px;font-family:Arial,sans-serif;"><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
      <p style="margin:0 0 8px;font-family:Arial,sans-serif;"><strong>City:</strong> ${escapeHtml(payload.city)}</p>
      <p style="margin:0 0 8px;font-family:Arial,sans-serif;"><strong>Interest:</strong> ${escapeHtml(payload.interest || '—')}</p>
      <p style="margin:0 0 8px;font-family:Arial,sans-serif;"><strong>Message:</strong></p>
      <p style="margin:0;font-family:Arial,sans-serif;white-space:pre-wrap;">${escapeHtml(payload.message || '—')}</p>
    `,
  })
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}
