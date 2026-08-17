import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Montserrat, Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { PWAProvider } from '@/components/pwa-provider';
import { GoogleAnalytics } from '@/components/google-analytics';
import { JsonLd } from '@/components/json-ld';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hsturs.org';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'HSTU Research Society | Analyze, Strategize, Improvise',
    template: '%s | HSTU Research Society',
  },
  description:
    'Official platform of Hajee Mohammad Danesh Science and Technology University Research Society (HSTURS). Empowering future researchers through scientific innovation, academic publications, workshops, and global collaboration.',
  keywords: [
    'HSTU Research Society',
    'HSTURS',
    'HSTU',
    'Hajee Mohammad Danesh Science and Technology University',
    'Research Society Bangladesh',
    'Academic Research',
    'Scientific Publications',
    'Undergraduate Research',
    'University Research Society',
    'Dinajpur Research',
    'ELSEPA',
    'STEM Research Bangladesh',
  ],
  authors: [{ name: 'HSTU Research Society', url: siteUrl }],
  creator: 'HSTU Research Society',
  publisher: 'HSTU Research Society',
  applicationName: 'HSTU Research Society',
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: '/',
  },
  category: 'education',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'HSTU Research Society | Analyze, Strategize, Improvise',
    description:
      'Official platform of Hajee Mohammad Danesh Science and Technology University Research Society. Empowering student researchers, publishing scientific journals, and organizing workshops.',
    siteName: 'HSTU Research Society',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'HSTU Research Society Official Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HSTU Research Society',
    description:
      'Empowering the next generation of researchers at Hajee Mohammad Danesh Science and Technology University.',
    site: '@hsturesearch',
    creator: '@hsturesearch',
    images: ['/logo.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HSTU RS',
  },
  icons: {
    icon: [
      { url: '/logo.png?v=3', sizes: '192x192', type: 'image/png' },
      { url: '/logo.png?v=3', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png?v=3', sizes: '192x192', type: 'image/png' },
    ],
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  other: {
    'geo.region': 'BD-C',
    'geo.placename': 'Dinajpur',
    'geo.position': '25.6279;88.6332',
    'ICBM': '25.6279, 88.6332',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaMeasurementId =
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
    process.env.GA_MEASUREMENT_ID ||
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
    process.env.FIREBASE_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/logo.png?v=3" />
        <link rel="icon" href="/logo.png?v=3" />
        <meta name="mobile-web-app-capable" content="yes" />
        <JsonLd />
      </head>
      <body suppressHydrationWarning className="antialiased font-sans overflow-x-hidden transition-colors duration-500">
        <Suspense fallback={null}>
          <GoogleAnalytics measurementId={gaMeasurementId} />
        </Suspense>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20"></div>
          <Navbar />
          <main className="min-h-screen pt-[100px]">
            {children}
          </main>
          <Footer />
          <PWAProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
