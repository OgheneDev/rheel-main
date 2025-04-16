import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rheel Estate Limited",
  description: "Discover premium real estate opportunities in Nigeria with Rheel Estate Limited. We offer property sales, leasing, investment services, and professional property management solutions.",
  keywords: "real estate, property, Nigeria, Abuja, investment, property management, real estate services, luxury homes, property sales, leasing, real estate investment",
  authors: [{ name: "Rheel Estate Limited" }],
  metadataBase: new URL('https://rheel.ng'),
  applicationName: "Rheel Estate Limited",
  generator: "Next.js",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    alternateLocale: 'en_US',
    title: 'Rheel Estate Limited',
    description: 'Your trusted partner in Nigerian real estate investment and management.',
    siteName: 'Rheel Estate Limited',
    url: 'https://rheel.ng',
    images: [
      {
        url: '/images/rheelblack.png',
        width: 1200,
        height: 630,
        alt: 'Rheel Estate Limited Logo',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rheel Estate Limited',
    description: 'Your trusted partner in Nigerian real estate investment and management.',
    creator: '@rheel_estate',
    images: ['/images/rheelblack.png'],
  },
  category: 'Real Estate',
}
