import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RedaStream',
  description: 'Movies & TV streaming catalog powered by TMDB'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#0a0a0a]">
      <body className="text-white">
        {children}
      </body>
    </html>
  )
}


