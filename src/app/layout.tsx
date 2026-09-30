import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kartik Phulwari",
  description: "Frontend-focused Computer Science undergraduate building modern web applications and exploring cybersecurity, fullstack development, and UI/UX.",
  keywords: [
    "Kartik Phulwari", "Computer Science", "Frontend Development", "Fullstack Development", 
    "Cybersecurity", "UI/UX", "React", "Next.js", "Web Development", "JavaScript", "Python"
  ],
  authors: [{ name: "Kartik Phulwari" }],
  creator: "Kartik Phulwari",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kartik Phulwari",
    description: "Frontend-focused Computer Science undergraduate building modern web applications and exploring cybersecurity, fullstack development, and UI/UX.",
    url: "/",
    siteName: "Kartik Phulwari",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kartik Phulwari Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kartik Phulwari",
    description: "Frontend-focused Computer Science undergraduate building modern web applications and exploring cybersecurity, fullstack development, and UI/UX.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kartik Phulwari",
    "url": siteUrl,
    "sameAs": [
      "https://github.com/kartikphulwari01-afk",
      "https://www.linkedin.com/in/kartik-phulwari-552337405"
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#050812] text-[#E8EEF5] font-sans selection:bg-[#00E5FF] selection:text-[#050812] overflow-x-hidden`}
      >
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
