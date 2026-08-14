/** Shared company / campus address — contact, footer, maps, schema. */

export const COMPANY_LEGAL_NAME = 'Pixlpluz Pvt Limited'

export const COMPANY_ADDRESS = {
  streetAddress:
    '14A Santhi Hills View, Divine Park Road, Kakkanad, Cochin Special Economic Zone',
  addressLocality: 'Ernakulam',
  addressRegion: 'Kerala',
  postalCode: '682037',
  addressCountry: 'IN',
} as const

/** Single-line for schema / maps / compact places that need one string. */
export const COMPANY_ADDRESS_SHORT =
  '14A Santhi Hills View, Divine Park Road, Kakkanad, Cochin Special Economic Zone, Ernakulam 682037, Kerala'

/**
 * Exact 3-line display (footer / contact).
 */
export const COMPANY_ADDRESS_LINES = [
  COMPANY_LEGAL_NAME,
  '14A Santhi Hills View, Divine Park Road,',
  'Kakkanad, Cochin Special Economic Zone, Ernakulam 682037, Kerala',
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
