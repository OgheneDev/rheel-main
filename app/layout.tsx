'use client'
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactPopup from './components/general/ContactPopup';
import { useEffect, useState } from 'react';

const manrope = Manrope({subsets: ["latin"]});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showPopup, setShowPopup] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);

  useEffect(() => {
    const hasShownPopup = localStorage.getItem('hasShownPopup');
    
    if (hasShownPopup) {
      setIsReturningUser(true);
      setShowPopup(true); // This will show the minimized version immediately
      return;
    }

    // Only for first-time visitors
    const timer = setTimeout(() => {
      setShowPopup(true);
      localStorage.setItem('hasShownPopup', 'true');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
        <Navbar />
        {children}
        <Footer />
        <ContactPopup 
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          defaultMinimized={isReturningUser}
        />
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
