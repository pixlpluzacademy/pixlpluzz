/**
 * Hostinger’s Apache layer intercepts `/icons` and `/images` before Node,
 * so those URLs 404 even though files exist in `public/`.
 * Serve them through `/media/...`, which reaches the Next.js server.
 */
export function asset(path: string): string {
  if (!path) return path
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('/_next/') ||
    path.startsWith('/media/') ||
    path.startsWith('data:')
  ) {
    return path
  }
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `/media${normalized}`
}
