import EnhancedSearch from '@/components/EnhancedSearch'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/50 backdrop-blur-md bg-black/60">
      <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row items-center gap-6 justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-pink-400 group-hover:via-purple-400 group-hover:to-indigo-400 transition-all duration-300">
            RedaStream
          </h1>
        </Link>
        <div className="w-full lg:w-auto lg:max-w-2xl">
          <EnhancedSearch />
        </div>
      </div>
    </header>
  )
}


