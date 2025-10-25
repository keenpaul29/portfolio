'use client';


import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.css";
import Navbar from '../components/Navbar';
import MouseTracker from '../components/MouseTracker';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SiNextdotjs } from 'react-icons/si';
import { FaHeart } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import ThreeBackground from "../components/ThreeBackground";
import PageTransition from "../components/PageTransition";
import Image from 'next/image';

// Move fonts outside the component since they need to be initialized at build time
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



function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <html 
      lang="en" 
      className={`dark ${geistSans.variable} ${geistMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link
          rel="icon"
          href="/icon.svg"
          type="image/svg+xml"
          sizes="any"
        />
        <meta name="google-adsense-account" content="ca-pub-3488548212651964"></meta>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" type="image/png" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-MXR6Y58WB8" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MXR6Y58WB8');
        `}
        </Script>

      </head>
      <body className="antialiased bg-background text-foreground relative min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <MouseTracker />
          {/* Site-wide Starry Night background (no cropping) */}
          <div className="pointer-events-none fixed inset-0 -z-20">
            <Image
              fill
              src="/starry-night.jpg"
              alt="Starry Night background"
              className="object-cover bg-black filter blur-[0.5px] md:blur-[1px]"
            />
          </div>
          {/* Animated aurora gradient overlay (between painting and WebGL) */}
          <div className="pointer-events-none fixed inset-0 z-[-15]">
            <div className="aurora-overlay" />
          </div>
          {/* WebGL Background */}
          <ThreeBackground />
          
          {/* Background noise effect */}
          <div className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute" 
               aria-hidden="true">
            <div className={`absolute inset-0 ${
              theme === 'dark' ? 'bg-[url("/noise2.png")]' : 'bg-[url("/noise.png")]'
            } mix-blend-soft-light opacity-[0.15] dark:opacity-[0.03]`}></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
          </div>
          
          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main className="relative z-10 flex-grow">
            <PageTransition>
              {children}
            </PageTransition>
          </main>

          {/* Footer */}
          <footer className="w-full py-6 text-center text-sm text-foreground/60 relative z-10">
            <div className="container mx-auto px-4 flex flex-col items-center">
              <p className="flex items-center gap-2 mt-2">
                Engineered with <FaHeart className="text-red-500" /> using <SiNextdotjs className="text-black dark:text-white" /> Next.js
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
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
