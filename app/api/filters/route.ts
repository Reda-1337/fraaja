import { errorResponse, tmdbFetch } from '@/lib/tmdb'

export async function GET() {
  try {
    const [movieGenres, tvGenres] = await Promise.all([
      tmdbFetch('/genre/movie/list'),
      tmdbFetch('/genre/tv/list')
    ])
    const years = Array.from({ length: 80 }, (_, i) => String(new Date().getFullYear() - i))
    return Response.json({
      movieGenres: (movieGenres as any).genres || [],
      tvGenres: (tvGenres as any).genres || [],
      years
    }, { headers: { 'Cache-Control': 's-maxage=86400, stale-while-revalidate=604800' } })
  } catch (e: any) {
    return errorResponse(e.message)
  }
}


