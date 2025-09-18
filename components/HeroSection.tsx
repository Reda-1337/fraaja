"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type HeroItem = {
  id: number
  title?: string
  name?: string
  overview?: string
  backdrop_path?: string | null
  poster_path?: string | null
  release_date?: string
  first_air_date?: string
  vote_average?: number
  media_type?: 'movie' | 'tv'
}

type Props = {
  items: HeroItem[]
}

export default function HeroSection({ items }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const heroItems = items.slice(0, 5) // Show top 5 trending items

  useEffect(() => {
    if (!isAutoPlaying || heroItems.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroItems.length)
    }, 6000) // Change every 6 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, heroItems.length])

  // Reset to first item when items change
  useEffect(() => {
    setCurrentIndex(0)
  }, [heroItems.length])

  if (heroItems.length === 0) {
    return (
      <div className="relative h-[70vh] bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 text-gray-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <p className="text-gray-400 text-xl">No featured content available</p>
          </div>
        </div>
      </div>
    )
  }

  const currentItem = heroItems[currentIndex]
  const title = currentItem.title || currentItem.name || 'Untitled'
  const mediaType = currentItem.media_type || (currentItem.name ? 'tv' : 'movie')
  const backdropSrc = currentItem.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${currentItem.backdrop_path}`
    : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720"><rect width="100%" height="100%" fill="%231a1a1a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-family="Arial" font-size="48">No Image</text></svg>'
  const date = currentItem.release_date || currentItem.first_air_date || ''
  const year = date ? date.slice(0, 4) : ''
  const rating = currentItem.vote_average ? currentItem.vote_average.toFixed(1) : 'N/A'
  const watchHref = mediaType === 'movie' ? `/watch/movie/${currentItem.id}` : `/watch/tv/${currentItem.id}/1/1`

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backdropSrc}
          alt={title}
          fill
          className="object-cover scale-105 animate-[kenburns_20s_ease-in-out_infinite] transition-opacity duration-1000"
          priority={currentIndex === 0}
          key={`hero-${currentItem.id}-${currentIndex}`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720"><rect width="100%" height="100%" fill="%231a1a1a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-family="Arial" font-size="48">No Image</text></svg>';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            {/* Rating Badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-white flex items-center gap-1">
                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                {rating}
              </div>
              {year && (
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white">
                  {year}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>

            {/* Description */}
            {currentItem.overview && (
              <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-xl">
                {currentItem.overview.length > 200 
                  ? `${currentItem.overview.slice(0, 200)}...` 
                  : currentItem.overview
                }
              </p>
            )}

            {/* Watch Button */}
            <Link
              href={watchHref}
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Watch Now
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      {heroItems.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroItems.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}

      {/* Pause/Play Button */}
      {heroItems.length > 1 && (
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-8 right-8 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          {isAutoPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      )}
    </div>
  )
}
