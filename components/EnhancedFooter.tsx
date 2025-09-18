"use client"

import Link from 'next/link'
import { Heart, Github, Twitter, Instagram, Mail, ExternalLink } from 'lucide-react'

export default function EnhancedFooter() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    movies: [
      { name: 'Popular Movies', href: '/movies' },
      { name: 'Top Rated', href: '/movies?sort=rating' },
      { name: 'Coming Soon', href: '/movies?sort=upcoming' },
      { name: 'Now Playing', href: '/movies?sort=now_playing' }
    ],
    tv: [
      { name: 'Popular TV Shows', href: '/tv' },
      { name: 'Top Rated', href: '/tv?sort=rating' },
      { name: 'Airing Today', href: '/tv?sort=airing_today' },
      { name: 'On The Air', href: '/tv?sort=on_the_air' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Report Issue', href: '/report' },
      { name: 'Feedback', href: '/feedback' }
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'DMCA', href: '/dmca' }
    ]
  }

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Reda-1337', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
    { name: 'Email', href: 'mailto:support@redastream.com', icon: Mail }
  ]

  return (
    <footer className="bg-gradient-to-t from-gray-900 via-black to-gray-900 border-t border-gray-800/50">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                RedaStream
              </h3>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Discover and stream your favorite movies and TV shows with our modern, 
              user-friendly platform powered by TMDB.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Made with love for movie enthusiasts</span>
            </div>
          </div>

          {/* Movies */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Movies</h4>
            <ul className="space-y-3">
              {footerLinks.movies.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href as any}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* TV Shows */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">TV Shows</h4>
            <ul className="space-y-3">
              {footerLinks.tv.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href as any}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href as any}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href as any}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <span className="text-gray-400 text-sm">Follow us:</span>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-200 group"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm">
                © {currentYear} RedaStream. All rights reserved.
              </p>
              <p className="text-gray-600 text-xs mt-1">
                Powered by TMDB • Built with Next.js & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
