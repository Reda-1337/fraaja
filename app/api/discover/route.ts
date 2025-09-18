import { errorResponse, tmdbFetch } from '@/lib/tmdb'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const type = (searchParams.get('type') || 'movie') as 'movie' | 'tv'
    const page = searchParams.get('page') || '1'
    const sort_by = searchParams.get('sort_by') || 'popularity.desc'
    const with_genres = searchParams.get('with_genres') || undefined
    const with_original_language = searchParams.get('with_original_language') || undefined
    const region = searchParams.get('region') || undefined
    const language = searchParams.get('language') || undefined
    const year = searchParams.get('year') || undefined

    const yearKey = type === 'movie' ? 'primary_release_year' : 'first_air_date_year'

    const data = await tmdbFetch(`/discover/${type}`, {
      page,
      sort_by,
      with_genres,
      with_original_language,
      region,
      language,
      [yearKey]: year
    })
    return Response.json(data, {
      headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=3600' }
    })
  } catch (e: any) {
    return errorResponse(e.message)
  }
}


