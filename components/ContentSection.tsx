"use client"

import { useState, useRef } from 'react'
import Link from 'next/link'
import MediaCard from './MediaCard'

type ContentItem = {
  id: number
  title?: string
  name?: string
  poster_path?: string | null
  release_date?: string
  first_air_date?: string
  vote_average?: number
  media_type?: 'movie' | 'tv'
}

type Props = {
  title: string
  items: ContentItem[]
  viewAllHref: string
  icon?: string
}

export default function ContentSection({ title, items, viewAllHref, icon }: Props) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const scrollAmount = 400
    const newPosition = direction === 'left' 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    })
    setScrollPosition(newPosition)
  }

  if (items.length === 0) return null

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') scroll('left')
    if (e.key === 'ArrowRight') scroll('right')
  }

  return (
    <div className="relative">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 px-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {icon && <span className="text-2xl">{icon}</span>}
            {title}
          </h2>
        </div>
        <Link
          href={viewAllHref as any}
          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
        >
          View All →
        </Link>
      </div>

      {/* Scrollable Content */}
      <div className="relative">
        {/* Left Scroll Button */}
        {scrollPosition > 0 && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
        )}

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        {/* Content Grid */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-4 scroll-smooth snap-x snap-mandatory"
          tabIndex={0}
          onKeyDown={onKeyDown}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => {
            const title = item.title || item.name || 'Untitled'
            const mediaType = item.media_type || (item.name ? 'tv' : 'movie')
            const date = item.release_date || item.first_air_date || ''
            const year = date ? date.slice(0, 4) : ''
            const rating = item.vote_average || 0

            return (
              <div key={`${mediaType}-${item.id}`} className="flex-shrink-0 w-48 snap-start">
                <MediaCard
                  id={item.id}
                  title={title}
                  posterPath={item.poster_path || null}
                  year={year}
                  rating={rating}
                  mediaType={mediaType}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
