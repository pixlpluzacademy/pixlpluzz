/** Shared company / campus address — contact, footer, maps, schema. */

export const COMPANY_LEGAL_NAME = 'Pixlpluz Pvt Limited'

export const COMPANY_ADDRESS = {
  line1: 'No.14A Santhi Hills View, Divine Park Road, Kakkanad',
  line2: 'Cochin Special Economic Zone, Ernakulam 682037, Kerala',
  streetAddress:
    'No.14A Santhi Hills View, Divine Park Road, Kakkanad, Cochin Special Economic Zone',
  addressLocality: 'Ernakulam',
  addressRegion: 'Kerala',
  postalCode: '682037',
  addressCountry: 'IN',
} as const

/** Single-line for cards / compact UI. */
export const COMPANY_ADDRESS_SHORT =
  'No.14A Santhi Hills View, Divine Park Road, Kakkanad, Ernakulam 682037, Kerala'

/** Multi-line display (footer / contact). */
export const COMPANY_ADDRESS_LINES = [
  COMPANY_LEGAL_NAME,
  COMPANY_ADDRESS.line1,
  COMPANY_ADDRESS.line2,
] as const

const MAPS_QUERY = [
  COMPANY_LEGAL_NAME,
  COMPANY_ADDRESS.streetAddress,
  'Ernakulam',
  COMPANY_ADDRESS.postalCode,
  'Kerala',
  'India',
].join(', ')

export const COMPANY_MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=16&hl=en&output=embed`

export const COMPANY_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`
