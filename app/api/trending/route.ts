import { errorResponse, tmdbFetch } from '@/lib/tmdb'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const media_type = (searchParams.get('media_type') || 'all') as 'all' | 'movie' | 'tv'
    const time_window = (searchParams.get('time_window') || 'week') as 'day' | 'week'
    const page = searchParams.get('page') || '1'
    const language = searchParams.get('language') || undefined

    const data = await tmdbFetch(`/trending/${media_type}/${time_window}`, { page, language })
    return Response.json(data, {
      headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=3600' }
    })
  } catch (e: any) {
    return errorResponse(e.message)
  }
}


