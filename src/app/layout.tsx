import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Jugnu's Salon & Studio — Luxury Beauty & Bridal, Islamabad",
  description:
    "Jugnu's Salon & Studio, F-7 Markaz Islamabad. Premium hair, makeup, bridal, nails, skin & waxing services. 4.3★ rated, 1,200+ reviews.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- this
            is the root layout (applies to every route), not a single page;
            next/font/google is unavailable here due to a Turbopack loader
            issue in this environment (missing @vercel/turbopack-next). */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col font-sans text-ink">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
