"use client"

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Star, Calendar, Info, ChevronLeft, ChevronRight, Pause, Volume2, VolumeX, Heart, Share2 } from 'lucide-react'

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

export default function EnhancedHeroSection({ items }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)

  const heroItems = items.slice(0, 5)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || heroItems.length <= 1 || isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroItems.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, heroItems.length, isHovered])

  // Navigation functions
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroItems.length) % heroItems.length)
  }, [heroItems.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroItems.length)
  }, [heroItems.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev)
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
  }, [])

  const toggleFavorite = useCallback(() => {
    setIsFavorited(prev => !prev)
  }, [])

  if (heroItems.length === 0) {
    return (
      <div className="relative h-[80vh] bg-gradient-to-br from-gray-900 via-black to-gray-900">
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
  const date = currentItem.release_date || currentItem.first_air_date
  const year = date ? date.slice(0, 4) : ''
  const mediaType = currentItem.media_type || (currentItem.name ? 'tv' : 'movie')
  const rating = currentItem.vote_average ? currentItem.vote_average.toFixed(1) : 'N/A'
  const watchHref = mediaType === 'movie' 
    ? `/watch/movie/${currentItem.id}` 
    : `/watch/tv/${currentItem.id}/1/1`

  return (
    <div 
      className="relative h-[80vh] overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {currentItem.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${currentItem.backdrop_path}`}
            alt={title}
            fill
            className="object-cover transition-all duration-1000"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </div>

      {/* Navigation Arrows */}
      {heroItems.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="container mx-auto px-6 pb-20">
          <div className="max-w-3xl">
            {/* Media Type Badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                mediaType === 'movie' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' 
                  : 'bg-purple-600/20 text-purple-400 border border-purple-600/30'
              }`}>
                {mediaType === 'movie' ? '🎬 Movie' : '📺 TV Show'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>

            {/* Meta Information */}
            <div className="flex items-center gap-6 mb-6 text-lg">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">{rating}</span>
              </div>
              
              {year && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{year}</span>
                </div>
              )}
            </div>

            {/* Overview */}
            {currentItem.overview && (
              <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-2xl line-clamp-3">
                {currentItem.overview}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Link
                href={watchHref as any}
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-white/25"
              >
                <Play className="w-6 h-6" />
                Watch Now
              </Link>

              <button
                onClick={toggleFavorite}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  isFavorited 
                    ? 'bg-red-600 border-red-600 text-white' 
                    : 'bg-transparent border-gray-400 text-gray-400 hover:border-white hover:text-white'
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorited ? 'fill-current' : ''}`} />
              </button>

              <button className="p-4 rounded-xl bg-transparent border-2 border-gray-400 text-gray-400 hover:border-white hover:text-white transition-all duration-300">
                <Share2 className="w-6 h-6" />
              </button>

              <button className="p-4 rounded-xl bg-transparent border-2 border-gray-400 text-gray-400 hover:border-white hover:text-white transition-all duration-300">
                <Info className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-200"
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
        </button>

        <button
          onClick={toggleAutoPlay}
          className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-200"
        >
          {isAutoPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Dots Indicator */}
      {heroItems.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {heroItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
