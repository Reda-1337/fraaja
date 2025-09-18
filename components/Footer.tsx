import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-800/50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">R</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                RedaStream
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Discover and stream your favorite movies and TV shows. Powered by TMDB for accurate metadata and recommendations.
            </p>
            <div className="text-xs text-gray-500">
              <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
              <Link href="https://www.themoviedb.org" target="_blank" className="inline-block mt-2 hover:opacity-80 transition-opacity">
                <img 
                  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
                  alt="TMDb" 
                  className="h-6"
                />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Browse</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/movies" className="hover:text-purple-400 transition-colors">Popular Movies</Link></li>
              <li><Link href="/tv" className="hover:text-purple-400 transition-colors">Popular TV Shows</Link></li>
              <li><Link href="/" className="hover:text-purple-400 transition-colors">Trending</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">DMCA</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800/50 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; 2024 RedaStream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

