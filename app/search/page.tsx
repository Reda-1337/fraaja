import { Suspense } from 'react'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import MediaGrid from '@/components/MediaGrid'
import Footer from '@/components/Footer'
import { getBaseUrl } from '@/lib/baseUrl'

async function getSearchResults(query: string, page: string = '1') {
  const res = await fetch(`${getBaseUrl()}/api/search?q=${encodeURIComponent(query)}&page=${page}`, {
    next: { revalidate: Number(process.env.CACHE_TTL_SECONDS || 300) }
  })
  if (!res.ok) return { results: [] as any[], total_pages: 0 }
  return res.json()
}

type Props = {
  searchParams: { q?: string; page?: string }
}

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams.q || ''
  const page = searchParams.page || '1'
  
  if (!query) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <Navigation />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Search Movies & TV Shows</h1>
            <p className="text-gray-400">Enter a search term to find your favorite content</p>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }

  const searchData = await getSearchResults(query, page)
  const results = Array.isArray(searchData.results) ? searchData.results : []
  const totalPages = searchData.total_pages || 0

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-400">
            {results.length > 0 
              ? `Found ${results.length} result${results.length === 1 ? '' : 's'}`
              : 'No results found'
            }
          </p>
        </div>

        {results.length > 0 ? (
          <Suspense fallback={
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="aspect-[2/3] bg-gray-900 rounded-xl skeleton"></div>
              ))}
            </div>
          }>
            <MediaGrid items={results} />
          </Suspense>
        ) : (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h2 className="text-xl font-semibold text-white mb-2">No results found</h2>
            <p className="text-gray-400 mb-6">Try searching with different keywords</p>
            <a 
              href="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Back to Home
            </a>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            {parseInt(page) > 1 && (
              <a
                href={`/search?q=${encodeURIComponent(query)}&page=${parseInt(page) - 1}`}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Previous
              </a>
            )}
            
            <span className="text-gray-400">
              Page {page} of {totalPages}
            </span>
            
            {parseInt(page) < totalPages && (
              <a
                href={`/search?q=${encodeURIComponent(query)}&page=${parseInt(page) + 1}`}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Next
              </a>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}
