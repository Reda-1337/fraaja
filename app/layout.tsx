import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'RedaStream',
  description: 'Movies & TV streaming catalog powered by TMDB'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#05060b]">
      <body className={`${inter.variable} font-sans text-slate-100 antialiased`}>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1d2845_0%,_#07080f_60%,_#03040a_100%)]">
          {children}
        </div>
      </body>
    </html>
  )
}


