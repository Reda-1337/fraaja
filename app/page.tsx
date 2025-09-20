import Header from '@/components/Header'
import EnhancedNavigation from '@/components/EnhancedNavigation'
import EnhancedFooter from '@/components/EnhancedFooter'
import EnhancedHeroSection from '@/components/EnhancedHeroSection'
import ContentSection from '@/components/ContentSection'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import ErrorBoundary from '@/components/ErrorBoundary'
import { getBaseUrl } from '@/lib/baseUrl'
import { Suspense } from 'react'

// Enhanced data fetching with better error handling
async function getTrending() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/trending?media_type=all&time_window=week`, {
      next: { revalidate: Number(process.env.CACHE_TTL_SECONDS || 300) }
    })
    if (!res.ok) throw new Error(`Trending API failed: ${res.status}`)
    return res.json()
  } catch (error) {
    console.error('Error fetching trending data:', error)
    return { results: [] as any[] }
  }
}

async function getPopularMovies() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/discover?type=movie&sort_by=popularity.desc&page=1`, {
      next: { revalidate: Number(process.env.CACHE_TTL_SECONDS || 300) }
    })
    if (!res.ok) throw new Error(`Popular Movies API failed: ${res.status}`)
    return res.json()
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    return { results: [] as any[] }
  }
}

async function getPopularTV() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/discover?type=tv&sort_by=popularity.desc&page=1`, {
      next: { revalidate: Number(process.env.CACHE_TTL_SECONDS || 300) }
    })
    if (!res.ok) throw new Error(`Popular TV API failed: ${res.status}`)
    return res.json()
  } catch (error) {
    console.error('Error fetching popular TV:', error)
    return { results: [] as any[] }
  }
}

async function getTopRatedMovies() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/discover?type=movie&sort_by=vote_average.desc&page=1`, {
      next: { revalidate: Number(process.env.CACHE_TTL_SECONDS || 300) }
    })
    if (!res.ok) throw new Error(`Top Rated Movies API failed: ${res.status}`)
    return res.json()
  } catch (error) {
    console.error('Error fetching top rated movies:', error)
    return { results: [] as any[] }
  }
}

async function getTopRatedTV() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/discover?type=tv&sort_by=vote_average.desc&page=1`, {
      next: { revalidate: Number(process.env.CACHE_TTL_SECONDS || 300) }
    })
    if (!res.ok) throw new Error(`Top Rated TV API failed: ${res.status}`)
    return res.json()
  } catch (error) {
    console.error('Error fetching top rated TV:', error)
    return { results: [] as any[] }
  }
}

async function getUpcomingMovies() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/discover?type=movie&sort_by=release_date.desc&page=1`, {
      next: { revalidate: Number(process.env.CACHE_TTL_SECONDS || 300) }
    })
    if (!res.ok) throw new Error(`Upcoming Movies API failed: ${res.status}`)
    return res.json()
  } catch (error) {
    console.error('Error fetching upcoming movies:', error)
    return { results: [] as any[] }
  }
}

export default async function HomePage() {
  const [trendingData, popularMoviesData, popularTVData, topRatedMoviesData, topRatedTVData, upcomingMoviesData] = await Promise.all([
    getTrending(),
    getPopularMovies(),
    getPopularTV(),
    getTopRatedMovies(),
    getTopRatedTV(),
    getUpcomingMovies()
  ])

  const trendingItems = Array.isArray(trendingData.results) ? trendingData.results : []
  const popularMovies = Array.isArray(popularMoviesData.results) ? popularMoviesData.results : []
  const popularTV = Array.isArray(popularTVData.results) ? popularTVData.results : []
  const topRatedMovies = Array.isArray(topRatedMoviesData.results) ? topRatedMoviesData.results : []
  const topRatedTV = Array.isArray(topRatedTVData.results) ? topRatedTVData.results : []
  const upcomingMovies = Array.isArray(upcomingMoviesData.results) ? upcomingMoviesData.results : []

  const allEmpty = [
    trendingItems.length,
    upcomingMovies.length,
    popularMovies.length,
    popularTV.length,
    topRatedMovies.length,
    topRatedTV.length,
  ].every((n) => n === 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Header />
      <EnhancedNavigation />

      <main className="relative">
        {/* Hero Section */}
        <Suspense fallback={<LoadingSkeleton type="hero" />}>
          <EnhancedHeroSection items={trendingItems} />
        </Suspense>

        {/* Content Sections */}
        <div className="space-y-16 pb-20">
          {trendingItems.length > 0 && (
            <ErrorBoundary fallback={<div className="text-center text-gray-400 py-8">Failed to load trending content</div>}>
              <ContentSection
                title="Trending Now"
                items={trendingItems.slice(0, 20)}
                viewAllHref="/"
              />
            </ErrorBoundary>
          )}

          {upcomingMovies.length > 0 && (
            <ErrorBoundary fallback={<div className="text-center text-gray-400 py-8">Failed to load upcoming movies</div>}>
              <ContentSection
                title="Coming Soon"
                items={upcomingMovies.slice(0, 20)}
                viewAllHref="/movies?sort=upcoming"
              />
            </ErrorBoundary>
          )}

          {popularMovies.length > 0 && (
            <ErrorBoundary fallback={<div className="text-center text-gray-400 py-8">Failed to load popular movies</div>}>
              <ContentSection
                title="Popular Movies"
                items={popularMovies.slice(0, 20)}
                viewAllHref="/movies"
              />
            </ErrorBoundary>
          )}

          {popularTV.length > 0 && (
            <ErrorBoundary fallback={<div className="text-center text-gray-400 py-8">Failed to load popular TV shows</div>}>
              <ContentSection
                title="Popular TV Shows"
                items={popularTV.slice(0, 20)}
                viewAllHref="/tv"
              />
            </ErrorBoundary>
          )}

          {topRatedMovies.length > 0 && (
            <ErrorBoundary fallback={<div className="text-center text-gray-400 py-8">Failed to load top rated movies</div>}>
              <ContentSection
                title="Top Rated Movies"
                items={topRatedMovies.slice(0, 20)}
                viewAllHref="/movies?sort=rating"
              />
            </ErrorBoundary>
          )}

          {topRatedTV.length > 0 && (
            <ErrorBoundary fallback={<div className="text-center text-gray-400 py-8">Failed to load top rated TV shows</div>}>
              <ContentSection
                title="Top Rated TV Shows"
                items={topRatedTV.slice(0, 20)}
                viewAllHref="/tv?sort=rating"
              />
            </ErrorBoundary>
          )}

          {allEmpty && (
            <div className="container mx-auto px-6 py-16">
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 text-center">
                <h2 className="text-2xl font-semibold text-white mb-2">No content loaded</h2>
                <p className="text-gray-400 mb-4">Add your TMDB API credentials to .env.local and restart the dev server.</p>
                <div className="text-left inline-block text-sm text-gray-300 bg-black/40 rounded-lg p-4 border border-gray-800">
                  <pre>{`# .env.local
TMDB_API_KEY=your_tmdb_api_key
# or
# TMDB_READ_TOKEN=your_tmdb_v4_bearer_token
CACHE_TTL_SECONDS=300`}</pre>
                </div>
                <p className="text-gray-500 text-sm mt-4">Health: visit /api/health for status</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <EnhancedFooter />
    </div>
  )
}

