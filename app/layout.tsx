import { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "./components/layout/ClientLayout";


const manrope = Manrope({subsets: ["latin"]});

// Move metadata here and export it
export const metadata: Metadata = {
  title: {
    default: "Rheel Estate Limited | Buy, Rent & Invest in Properties",
    template: "%s | Rheel Estate Limited"
  },
  description:
    "Discover premium properties for sale and rent across Nigeria with Rheel Estate Limited. From luxury homes to affordable apartments, we simplify property transactions, maximize investments, and ensure seamless property management.",
  
  // ✅ Removed keywords because Google ignores them
  authors: [{ name: "Rheel Estate Limited" }],
  metadataBase: new URL("https://rheel.ng"),
  applicationName: "Rheel Estate Limited",
  generator: "Next.js",

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },

  openGraph: {
    type: "website",
    locale: "en_NG",
    alternateLocale: "en_US",
    title: "Rheel Estate Limited | Premium Properties in Nigeria",
    description:
      "Find your dream home with Rheel Estate Limited. Explore verified properties for sale and rent across Nigeria — from luxury houses to affordable apartments.",
    siteName: "Rheel Estate Limited",
    url: "https://rheel.ng",
    images: [
      {
        url: "https://rheel.ng/images/rheelblack.png",
        width: 1200,
        height: 630,
        alt: "Rheel Estate Limited Logo",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rheel Estate Limited | Buy, Rent & Invest in Properties",
    description:
      "Explore verified properties for sale and rent across Nigeria. Rheel Estate Limited helps you buy, rent, and invest in premium real estate easily.",
    creator: "@rheel_estate",
    images: ["https://rheel.ng/images/rheelblack.png"],
  },

  category: "Real Estate",
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