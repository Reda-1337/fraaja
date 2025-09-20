import { NextRequest, NextResponse } from 'next/server'
import { tmdbFetch, errorResponse } from '@/lib/tmdb'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    if (!id) {
      return errorResponse('Missing TV show ID', 400)
    }

    const language = req.nextUrl.searchParams.get('language') || undefined
    const appendToResponse = req.nextUrl.searchParams.get('append_to_response') || 'videos,credits,external_ids,content_ratings'

    const data = await tmdbFetch(`/tv/${id}`, { language, append_to_response: appendToResponse })
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=3600' }
    })
  } catch (e: any) {
    console.error(`Error fetching TV show ${params.id}:`, e)
    return errorResponse(e.message)
  }
}
