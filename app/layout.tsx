import { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "./components/layout/ClientLayout";


const manrope = Manrope({subsets: ["latin"]});

// Move metadata here and export it
export const metadata: Metadata = {
  title: "Rheel Estate Limited",
  description: "At Rheel Estate Limited, we provide comprehensive real estate solutions designed to simplify property transactions, maximize investment opportunities, and ensure seamless property management.",
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
    description: 'At Rheel Estate Limited, we provide comprehensive real estate solutions designed to simplify property transactions, maximize investment opportunities, and ensure seamless property management.',
    siteName: 'Rheel Estate Limited',
    url: 'https://rheel.ng',
    images: [
      {
        url: 'https://rheel.ng/images/rheelblack.png', // Use absolute URL
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
    description: 'At Rheel Estate Limited, we provide comprehensive real estate solutions designed to simplify property transactions, maximize investment opportunities, and ensure seamless property management.',
    creator: '@rheel_estate',
    images: ['https://rheel.ng/images/rheelblack.png'], // Use absolute URL
  },
  category: 'Real Estate',
};



// Server component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script 
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KMRRRWFW');`
          }}
        />
      </head>
      <body className={manrope.className}>
        <ClientLayout>{children}</ClientLayout>
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-KMRRRWFW"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      </body>
    </html>
  );
}