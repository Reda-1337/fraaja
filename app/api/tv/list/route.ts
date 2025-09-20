export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { tmdbFetch, errorResponse } from '@/lib/tmdb'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = searchParams.get('page') || '1'
    const language = searchParams.get('language') || undefined
    const sortBy = searchParams.get('sort_by') || 'popularity.desc'
    const withGenres = searchParams.get('with_genres') || undefined

    const data = await tmdbFetch('/discover/tv', { page, language, sort_by: sortBy, with_genres: withGenres })

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=3600' }
    })
  } catch (e: any) {
    console.error('Error fetching TV shows:', e)
    return errorResponse(e.message)
  }
}
