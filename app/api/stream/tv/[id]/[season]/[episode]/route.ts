import { getTvServers } from '@/lib/streaming'
import { errorResponse } from '@/lib/tmdb'

export async function GET(_: Request, { params }: { params: { id: string; season: string; episode: string } }) {
  try {
    const { id, season, episode } = params
    const servers = getTvServers(id, season, episode)
    return Response.json({ servers })
  } catch (e: any) {
    return errorResponse(e.message)
  }
}


