import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import MediaGrid from '@/components/MediaGrid'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import ContentSection from '@/components/ContentSection'
import { getBaseUrl } from '@/lib/baseUrl'

async function getTrending() {
  const res = await fetch(`${getBaseUrl()}/api/trending?media_type=all&time_window=week`, {
    next: { revalidate: Number(process.env.CACHE_TTL_SECONDS || 300) }
  })
  if (!res.ok) return { results: [] as any[] }
  return res.json()
}

async function getPopularMovies() {
  const res = await fetch(`${getBaseUrl()}/api/discover?type=movie&sort_by=popularity.desc&page=1`, {
    next: { revalidate: Number(process.env.CACHE_TTL_SECONDS || 300) }
  })
  if (!res.ok) return { results: [] as any[] }
  return res.json()
}

async function getPopularTV() {
  const res = await fetch(`${getBaseUrl()}/api/discover?type=tv&sort_by=popularity.desc&page=1`, {
    next: { revalidate: Number(process.env.CACHE_TTL_SECONDS || 300) }
  })
  if (!res.ok) return { results: [] as any[] }
  return res.json()
}

async function getTopRatedMovies() {
  const res = await fetch(`${getBaseUrl()}/api/discover?type=movie&sort_by=vote_average.desc&page=1`, {
    next: { revalidate: Number(process.env.CACHE_TTL_SECONDS || 300) }
  })
  if (!res.ok) return { results: [] as any[] }
  return res.json()
}

async function getTopRatedTV() {
  const res = await fetch(`${getBaseUrl()}/api/discover?type=tv&sort_by=vote_average.desc&page=1`, {
    next: { revalidate: Number(process.env.CACHE_TTL_SECONDS || 300) }
  })
  if (!res.ok) return { results: [] as any[] }
  return res.json()
}

export default async function HomePage() {
  const [trendingData, popularMoviesData, popularTVData, topRatedMoviesData, topRatedTVData] = await Promise.all([
    getTrending(),
    getPopularMovies(),
    getPopularTV(),
    getTopRatedMovies(),
    getTopRatedTV()
  ])

  const trendingItems = Array.isArray(trendingData.results) ? trendingData.results : []
  const popularMovies = Array.isArray(popularMoviesData.results) ? popularMoviesData.results : []
  const popularTV = Array.isArray(popularTVData.results) ? popularTVData.results : []
  const topRatedMovies = Array.isArray(topRatedMoviesData.results) ? topRatedMoviesData.results : []
  const topRatedTV = Array.isArray(topRatedTVData.results) ? topRatedTVData.results : []
  
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <HeroSection items={trendingItems} />
        
        {/* Content Sections */}
        <div className="space-y-12 pb-20">
          {trendingItems.length > 0 && (
            <ContentSection 
              title="Trending Now" 
              items={trendingItems.slice(0, 20)} 
              viewAllHref="/"
            />
          )}
          
          {popularMovies.length > 0 && (
            <ContentSection 
              title="Popular Movies" 
              items={popularMovies.slice(0, 20)} 
              viewAllHref="/movies"
            />
          )}
          
          {popularTV.length > 0 && (
            <ContentSection 
              title="Popular TV Shows" 
              items={popularTV.slice(0, 20)} 
              viewAllHref="/tv"
            />
          )}
          
          {topRatedMovies.length > 0 && (
            <ContentSection 
              title="Top Rated Movies" 
              items={topRatedMovies.slice(0, 20)} 
              viewAllHref="/movies?sort=rating"
            />
          )}
          
          {topRatedTV.length > 0 && (
            <ContentSection 
              title="Top Rated TV Shows" 
              items={topRatedTV.slice(0, 20)} 
              viewAllHref="/tv?sort=rating"
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}


