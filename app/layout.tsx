import type React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque, DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Weather Now - Real-time Weather Forecast",
  description:
    "Get accurate weather forecasts and current conditions for any city worldwide. Features hourly and daily forecasts, weather alerts, and more.",
  keywords: ["weather", "forecast", "temperature", "climate", "weather app"],
  authors: [{ name: "Weather Now" }],
  creator: "Weather Now",
  publisher: "Weather Now",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://weather-now.vercel.app"),
  openGraph: {
    title: "Weather Now - Real-time Weather Forecast",
    description: "Get accurate weather forecasts and current conditions for any city worldwide.",
    url: "https://weather-now.vercel.app",
    siteName: "Weather Now",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Weather Now - Real-time Weather Forecast",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather Now - Real-time Weather Forecast",
    description: "Get accurate weather forecasts and current conditions for any city worldwide.",
    images: ["/og-image.png"],
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
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${bricolageGrotesque.variable} ${dmSans.variable}`}>
        {/* <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange> */}
          <Suspense fallback={null}>{children}</Suspense>
        {/* </ThemeProvider> */}
        <Analytics />
      </body>
    </html>
  )
}
