"use client"

import { useEffect, useState } from 'react'

type LoadingSkeletonProps = {
  type?: 'hero' | 'card' | 'grid' | 'text'
  count?: number
}

export default function LoadingSkeleton({ type = 'card', count = 1 }: LoadingSkeletonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  const renderSkeleton = () => {
    switch (type) {
      case 'hero':
        return (
          <div className="relative h-[70vh] bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-20 left-8 right-8">
              <div className="h-12 bg-gray-700 rounded-lg mb-4 w-3/4 animate-pulse" />
              <div className="h-6 bg-gray-700 rounded mb-2 w-1/2 animate-pulse" />
              <div className="h-6 bg-gray-700 rounded mb-4 w-1/3 animate-pulse" />
              <div className="h-12 bg-gray-700 rounded-lg w-32 animate-pulse" />
            </div>
          </div>
        )
      
      case 'card':
        return (
          <div className="flex-shrink-0 w-48 snap-start">
            <div className="aspect-[2/3] bg-gray-800 rounded-xl animate-pulse" />
            <div className="mt-3 space-y-2">
              <div className="h-4 bg-gray-700 rounded animate-pulse" />
              <div className="h-3 bg-gray-700 rounded w-3/4 animate-pulse" />
            </div>
          </div>
        )
      
      case 'grid':
        return (
          <div className="space-y-4">
            <div className="h-8 bg-gray-700 rounded w-1/4 animate-pulse" />
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-48">
                  <div className="aspect-[2/3] bg-gray-800 rounded-xl animate-pulse" />
                  <div className="mt-3 space-y-2">
                    <div className="h-4 bg-gray-700 rounded animate-pulse" />
                    <div className="h-3 bg-gray-700 rounded w-3/4 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'text':
        return (
          <div className="space-y-2">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-700 rounded animate-pulse" style={{ width: `${Math.random() * 40 + 60}%` }} />
            ))}
          </div>
        )
      
      default:
        return <div className="h-4 bg-gray-700 rounded animate-pulse" />
    }
  }

  return (
    <div className="animate-pulse">
      {Array.from({ length: type === 'grid' ? 1 : count }).map((_, i) => (
        <div key={i}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  )
}
