import { NextRequest, NextResponse } from 'next/server'
import { tmdbFetch, errorResponse } from '@/lib/tmdb'

export async function GET(req: NextRequest, { params }: { params: { id: string; seasonNumber: string } }) {
  try {
    const { id, seasonNumber } = params
    if (!id || !seasonNumber) {
      return errorResponse('Missing TV show ID or season number', 400)
    }

    const language = req.nextUrl.searchParams.get('language') || undefined

    const data = await tmdbFetch(`/tv/${id}/season/${seasonNumber}`, { language })
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=3600' }
    })
  } catch (e: any) {
    console.error(`Error fetching TV show ${params.id} season ${params.seasonNumber}:`, e)
    return errorResponse(e.message)
  }
}
