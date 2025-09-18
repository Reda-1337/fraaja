import { errorResponse, tmdbFetch } from '@/lib/tmdb'

export async function GET(_: Request, { params }: { params: { id: string; season: string } }) {
  try {
    const { id, season } = params
    const data = await tmdbFetch(`/tv/${id}/season/${season}`)
    return Response.json(data, {
      headers: { 'Cache-Control': 's-maxage=600, stale-while-revalidate=3600' }
    })
  } catch (e: any) {
    return errorResponse(e.message)
  }
}


