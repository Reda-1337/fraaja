import { errorResponse, tmdbFetch } from '@/lib/tmdb'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('q') || ''
    const page = searchParams.get('page') || '1'
    const language = searchParams.get('language') || undefined
    if (!q || q.length < 2) return errorResponse('Query too short', 400)
    const data = await tmdbFetch('/search/multi', { query: q, page, language })
    // Filter out people
    if (Array.isArray((data as any).results)) {
      ;(data as any).results = (data as any).results.filter((r: any) => r.media_type !== 'person')
    }
    return Response.json(data, {
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=600' }
    })
  } catch (e: any) {
    return errorResponse(e.message)
  }
}


