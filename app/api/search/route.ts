import { errorResponse, tmdbFetch } from '@/lib/tmdb'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('q') || searchParams.get('query') || ''
    const page = searchParams.get('page') || '1'
    const language = searchParams.get('language') || undefined
    const typeParam = (searchParams.get('type') || 'multi').toLowerCase()
    const type: 'multi' | 'movie' | 'tv' =
      typeParam === 'movie' || typeParam === 'tv' ? (typeParam as any) : 'multi'

    if (!q || q.trim().length < 2) return errorResponse('Query too short', 400)

    const path = type === 'multi' ? '/search/multi' : type === 'movie' ? '/search/movie' : '/search/tv'
    const data = await tmdbFetch(path, {
      query: q,
      page,
      language,
      include_adult: 'false'
    })

    if (Array.isArray((data as any).results) && type === 'multi') {
      ;(data as any).results = (data as any).results.filter((r: any) => r.media_type !== 'person')
    }

    return Response.json(data, {
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=600' }
    })
  } catch (e: any) {
    return errorResponse(e.message)
  }
}


