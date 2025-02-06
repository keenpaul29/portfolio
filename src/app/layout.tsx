import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar';
import MouseTracker from '../components/MouseTracker';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SiNextdotjs } from 'react-icons/si';
import { FaHeart } from 'react-icons/fa';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Puspal | Full Stack Developer",
    template: "%s | Puspal"
  },
  description: "Full Stack Developer specializing in React, Next.js, and modern web technologies. Creating innovative and user-friendly digital experiences.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Portfolio",
    "Software Engineer"
  ],
  authors: [{ name: "Puspal" }],
  creator: "Puspal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "#",
    siteName: "Puspal - Full Stack Developer",
    title: "Puspal | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Creative Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Puspal | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    creator: "@paul_puspal",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon.svg"
          type="image/svg+xml"
          sizes="any"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="antialiased bg-background text-foreground relative min-h-screen flex flex-col">
        <MouseTracker />
        
        {/* Background noise effect */}
        <div className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute" 
             aria-hidden="true">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.025]"></div>
        </div>
        
        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main className="relative z-10 flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full py-6 text-center text-sm text-foreground/60 relative z-10">
          <div className="container mx-auto px-4 flex flex-col items-center">
            <p className="flex items-center gap-2 mt-2">
              Created with <FaHeart className="text-red-500" /> using <SiNextdotjs className="text-black dark:text-white" />
            </p>
          </div>
        </footer>

        {/* Radial gradient for hover effects */}
        <div 
          className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
          style={{
            background: "radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(37, 99, 235, 0.06), transparent 40%)",
          }}
        />
        
        {/* Analytics and Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
