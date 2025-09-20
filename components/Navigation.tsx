"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TrendingUp, Film, Tv } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Trending', Icon: TrendingUp },
  { href: '/movies', label: 'Movies', Icon: Film },
  { href: '/tv', label: 'TV Shows', Icon: Tv }
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-gray-800/50 backdrop-blur-sm bg-black/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.Icon

            return (
              <Link
                key={item.href}
                href={item.href as any}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

