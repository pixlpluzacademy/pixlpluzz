/** Enquiry delivery — WhatsApp + Gmail (academy DB storage paused). */

export const ENQUIRY_EMAIL = 'pixlpluz@gmail.com'
/** Digits only, with country code (India). */
export const ENQUIRY_WHATSAPP = '919895501234'

export type EnquiryPayload = {
  source: 'home' | 'contact' | string
  full_name: string
  email: string
  phone: string
  city: string
  interest: string
  message: string
}

export function formatEnquiryText(p: EnquiryPayload) {
  return [
    `New website enquiry (${p.source})`,
    '',
    `Name: ${p.full_name}`,
    `Email: ${p.email}`,
    `Phone: ${p.phone}`,
    `City: ${p.city}`,
    `Interest: ${p.interest || '—'}`,
    `Message: ${p.message || '—'}`,
  ].join('\n')
}

export function getEnquiryWhatsAppUrl(p: EnquiryPayload) {
  return `https://wa.me/${ENQUIRY_WHATSAPP}?text=${encodeURIComponent(formatEnquiryText(p))}`
}

export function getEnquiryMailtoUrl(p: EnquiryPayload) {
  const subject = `Website enquiry — ${p.full_name}`
  return `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    formatEnquiryText(p),
  )}`
}

/** Opens WhatsApp (new tab) and Gmail/mail client with the enquiry details. */
export function openEnquiryChannels(p: EnquiryPayload) {
  const wa = getEnquiryWhatsAppUrl(p)
  const mail = getEnquiryMailtoUrl(p)
  window.open(wa, '_blank', 'noopener,noreferrer')
  // Slight delay so WhatsApp tab isn’t blocked; mailto opens mail app / Gmail
  window.setTimeout(() => {
    window.location.href = mail
  }, 250)
}
