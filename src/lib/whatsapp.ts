/** WhatsApp business contact — digits only, with country code. */
export const WHATSAPP_NUMBER = '919999900000'

export const WHATSAPP_MESSAGE =
  'Hi Pixl Pluz! I would like a free consultation about your courses.'

export function getWhatsAppUrl(message: string = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
