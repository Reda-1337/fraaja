import { NextResponse } from 'next/server'
import { tmdbFetch, errorResponse } from '@/lib/tmdb'

export async function GET() {
  try {
    const data = await tmdbFetch('/genre/tv/list')
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=3600' }
    })
  } catch (e: any) {
    console.error('Error fetching TV genres:', e)
    return errorResponse(e.message)
  }
}
