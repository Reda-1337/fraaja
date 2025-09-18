import { errorResponse, tmdbFetch } from '@/lib/tmdb'

export async function GET(_: Request, { params }: { params: { type: 'movie' | 'tv'; id: string } }) {
  try {
    const { type, id } = params
    const append = 'videos,images,credits,recommendations,release_dates,content_ratings,external_ids'
    const data = await tmdbFetch(`/${type}/${id}`, { append_to_response: append })
    return Response.json(data, {
      headers: { 'Cache-Control': 's-maxage=600, stale-while-revalidate=3600' }
    })
  } catch (e: any) {
    return errorResponse(e.message)
  }
}


