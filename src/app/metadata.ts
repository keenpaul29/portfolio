import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://keenpaul29.me';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
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
    "Software Engineer",
    "JavaScript Developer",
    "Web Applications",
    "UI/UX Development"
  ],
  authors: [{ name: "Puspal" }],
  creator: "Puspal",
  publisher: "Puspal",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Puspal - Full Stack Developer",
    title: "Puspal | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Puspal - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Puspal | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    creator: "@paul_puspal",
    images: [`${baseUrl}/og-image.jpg`],
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: baseUrl,
  },
};

// Helper function to generate page-specific metadata
export function generateMetadata(
  title: string,
  description?: string,
  path?: string
): Metadata {
  const pageUrl = path ? `${baseUrl}${path}` : baseUrl;
  
  return {
    ...defaultMetadata,
    title,
    description: description || defaultMetadata.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description: description || defaultMetadata.description as string,
      url: pageUrl,
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}
