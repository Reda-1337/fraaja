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
    <footer className="mt-16 border-t border-slate-800/40 bg-[radial-gradient(circle_at_bottom,_rgba(14,165,233,0.18),_transparent_45%),_linear-gradient(180deg,_rgba(2,6,23,0.95)_0%,_rgba(2,6,23,1)_100%)]">
      <div className="mx-auto w-full max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-8 border-b border-slate-800/40 pb-12 md:grid-cols-2 lg:grid-cols-5">
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

        <div className="flex flex-col items-center justify-center gap-4 border-b border-slate-800/40 py-10 text-center">
          <span className="text-xs uppercase tracking-[0.5em] text-cyan-300">Join the universe</span>
          <h3 className="text-3xl font-bold text-white">Experience stories that light up the dark</h3>
          <Link
            href="/" className="inline-flex items-center rounded-full bg-cyan-500 px-8 py-3 text-sm font-semibold text-slate-900 shadow-[0_18px_45px_rgba(6,182,212,0.45)] transition hover:-translate-y-0.5 hover:bg-cyan-400"
          >
            RedaStream+
          </Link>
          <p className="max-w-2xl text-xs text-slate-500">
            This platform is a demo experience. We do not host any media files; all content references TMDB data and
            third-party providers.
          </p>
        </div>

        <div className="pt-8">
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
              <p className="text-gray-500 text-sm">Copyright {currentYear} RedaStream. All rights reserved.</p>
              <p className="text-gray-600 text-xs mt-1">Powered by TMDB - Built with Next.js & Tailwind CSS</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
