import type { Metadata, Viewport } from 'next'
import { Inter, Sora, JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

// ---------------------------------------------------------------------------
// Font Configuration
// ---------------------------------------------------------------------------

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  preload: true,
  weight: ['300', '400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
  weight: ['400', '500', '600', '700'],
})

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://acos.aquacolloids.com'),
  title: {
    default: 'ACOS — Aqua Colloids Operating System',
    template: '%s | ACOS',
  },
  description:
    'AI-native Commercial Intelligence Platform for Aquagri Processing Pvt Ltd — India\'s premier hydrocolloid and carrageenan manufacturer.',
  keywords: [
    'carrageenan',
    'hydrocolloid',
    'kappa carrageenan',
    'iota carrageenan',
    'aquacolloids',
    'aquagri',
    'commercial intelligence',
    'B2B',
    'CRM',
  ],
  authors: [{ name: 'Aquagri Processing Pvt Ltd', url: 'https://aquacolloids.com' }],
  creator: 'Aquagri Processing Pvt Ltd',
  publisher: 'Aquagri Processing Pvt Ltd',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'manifest', url: '/site.webmanifest' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://acos.aquacolloids.com',
    title: 'ACOS — Aqua Colloids Operating System',
    description: 'AI-native Commercial Intelligence Platform for hydrocolloid manufacturing.',
    siteName: 'ACOS',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1117' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

// ---------------------------------------------------------------------------
// Root Layout
// ---------------------------------------------------------------------------

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster
          position="bottom-right"
          richColors
          expand
          duration={4000}
          toastOptions={{
            classNames: {
              toast: 'font-sans text-sm',
            },
          }}
        />
      </body>
    </html>
  )
}
