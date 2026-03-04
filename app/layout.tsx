import type { Metadata } from 'next'
import './globals.css'
import AmbientBackground from '@/components/AmbientBackground'

export const metadata: Metadata = {
  title: 'After Midnight',
  description: '',
  robots: { index: false, follow: false },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-ink antialiased">
        {children}
        <AmbientBackground />
{children}
      </body>
    </html>
  )
}
