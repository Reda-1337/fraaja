"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Trending', icon: '🔥' },
  { href: '/movies', label: 'Movies', icon: '🎬' },
  { href: '/tv', label: 'TV Shows', icon: '📺' },
]

export default function Navigation() {
  const pathname = usePathname()
  
  return (
    <nav className="border-b border-gray-800/50 backdrop-blur-sm bg-black/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

