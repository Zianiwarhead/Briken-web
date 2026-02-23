import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { QuoteProvider } from "@/contexts/QuoteContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://briken.co.ke"),
  title: {
    default: "Briken Fire Engineering | Fire Safety Solutions Kenya",
    template: "%s | Briken Fire Engineering",
  },
  description:
    "Premium fire safety equipment supplier in Kenya. Certified fire suppression systems, extinguishers, sprinklers, and safety training. NFPA & KEBS compliant. Nairobi-based company serving East Africa.",
  keywords: [
    "fire safety",
    "fire engineering",
    "fire extinguishers",
    "fire suppression systems",
    "sprinkler systems",
    "smoke detectors",
    "fire safety Kenya",
    "Nairobi fire equipment",
    "NFPA compliant",
    "fire safety training",
    "fire hydrants",
    "emergency lighting",
  ],
  authors: [{ name: "Briken Fire Engineering" }],
  creator: "Briken Fire Engineering",
  publisher: "Briken Fire Engineering",
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
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://briken.co.ke",
    siteName: "Briken Fire Engineering",
    title: "Briken Fire Engineering | Fire Safety Solutions Kenya",
    description:
      "Premium fire safety equipment supplier in Kenya. Certified fire suppression systems, extinguishers, sprinklers, and safety training.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Briken Fire Engineering - Fire Safety Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Briken Fire Engineering | Fire Safety Solutions Kenya",
    description:
      "Premium fire safety equipment supplier in Kenya. Certified fire suppression systems, extinguishers, sprinklers, and safety training.",
    images: ["/og-image.jpg"],
    creator: "@briken",
  },
  category: "Fire Safety",
  classification: "Business",
  other: {
    "geo.region": "KE",
    "geo.placename": "Nairobi, Kenya",
    "og:locality": "Nairobi",
    "og:region": "Nairobi County",
    "og:country-name": "Kenya",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://briken.co.ke" />
        <meta name="theme-color" content="#F4F4F0" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Briken Fire Engineering",
              url: "https://briken.co.ke",
              logo: "https://briken.co.ke/logo.png",
              description:
                "Premium fire safety equipment supplier in Kenya. Certified fire suppression systems, extinguishers, sprinklers, and safety training.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Star House, Ngara",
                addressLocality: "Nairobi",
                addressCountry: "KE",
                postalCode: "00200",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+254-799-347-535",
                contactType: "customer service",
                availableLanguage: "English",
              },
              sameAs: [
                "https://www.linkedin.com/company/briken",
                "https://twitter.com/briken",
                "https://www.facebook.com/briken",
              ],
              areaServed: "Kenya",
              foundingDate: "2020",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Briken Fire Engineering",
              image: "https://briken.co.ke/hero.jpg",
              telephone: "+254-799-347-535",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Star House, Ngara",
                addressLocality: "Nairobi",
                addressCountry: "KE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "-1.2921",
                longitude: "36.8219",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "08:00",
                closes: "17:00",
              },
              priceRange: "$$$",
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QuoteProvider>
          <Navbar />
          {children}
          <Footer />
        </QuoteProvider>
      </body>
    </html>
  );
}
