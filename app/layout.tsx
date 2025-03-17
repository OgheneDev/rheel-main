import type { Metadata } from "next";
import {  Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const manrope = Manrope({subsets: ["latin"]});


export const metadata: Metadata = {
  title: "Rheel Estate Limited",
  description: "Rheel Estate Limited's official website.",
  icons: {
    icon: '/favicon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={manrope.className}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
