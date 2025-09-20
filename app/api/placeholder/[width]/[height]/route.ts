import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { width: string; height: string } }) {
  const { width, height } = params
  const text = req.nextUrl.searchParams.get('text') || `${width}x${height}`

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a1a1a"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#666666" font-family="sans-serif" font-size="${Math.min(parseInt(width) / 8, parseInt(height) / 4)}">
        ${text}
      </text>
    </svg>
  `

  return new NextResponse(svg, {
    headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=31536000, immutable' },
  })
}
