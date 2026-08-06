import { readFile, stat } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const MIME: Record<string, string> = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.json': 'application/json',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
}

/**
 * Serves files from `/public` under `/media/*`.
 * Needed on Hostinger where Apache hijacks `/icons` and `/images`.
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: parts } = await context.params
  if (!parts?.length) {
    return new NextResponse('Not Found', { status: 404 })
  }

  if (parts.some((part) => part === '..' || part === '.' || part.includes('\0'))) {
    return new NextResponse('Not Found', { status: 404 })
  }

  const publicRoot = path.resolve(process.cwd(), 'public')
  const filePath = path.resolve(publicRoot, ...parts)

  if (!filePath.startsWith(publicRoot + path.sep) && filePath !== publicRoot) {
    return new NextResponse('Not Found', { status: 404 })
  }

  try {
    const info = await stat(filePath)
    if (!info.isFile()) {
      return new NextResponse('Not Found', { status: 404 })
    }

    const data = await readFile(filePath)
    const ext = path.extname(filePath).toLowerCase()
    const contentType = MIME[ext] || 'application/octet-stream'

    return new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': String(info.size),
      },
    })
  } catch {
    return new NextResponse('Not Found', { status: 404 })
  }
}
