import NewSearch from '@/components/NewSearch'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-800/50 backdrop-blur-md bg-black/40">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center gap-4 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            RedaStream
          </h1>
        </Link>
        <NewSearch />
      </div>
    </header>
  )
}


