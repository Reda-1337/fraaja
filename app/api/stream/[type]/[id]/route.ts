import { getMovieServers } from '@/lib/streaming'
import { errorResponse } from '@/lib/tmdb'

export async function GET(_: Request, { params }: { params: { type: 'movie' | 'tv'; id: string } }) {
  try {
    const { type, id } = params
    if (type !== 'movie') return errorResponse('Use episode route for TV', 400)
    const servers = getMovieServers(id)
    return Response.json({ servers })
  } catch (e: any) {
    return errorResponse(e.message)
  }
}


