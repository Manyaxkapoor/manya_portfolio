import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manya Kapoor - Software Engineer & UI/UX Designer",
  description: "Third-year student at NIT Jalandhar majoring in Instrumentation & Control Engineering with a minor in Computer Science. Major CGPA 8.31, minor CGPA 9.38. Actively seeking internships and building user-centered digital products.",
  keywords: [
    "Manya Kapoor",
    "Software Engineer",
    "UI/UX Designer",
    "Frontend Developer",
    "Web Developer",
    "Internship",
    "NIT Jalandhar",
    "Instrumentation & Control Engineering",
    "Computer Science",
    "Portfolio",
  ],
  authors: [{ name: "Manya Kapoor" }],
  creator: "Manya Kapoor",
  publisher: "Manya Kapoor",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ibiimemon.com",
    title: "Manya Kapoor - Software Engineer & UI/UX Designer",
    description: "Third-year NIT Jalandhar student majoring in Instrumentation & Control Engineering with a minor in Computer Science. Actively seeking internships.",
    siteName: "Manya Kapoor Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manya Kapoor - Software Engineer & UI/UX Designer",
    description: "Third-year NIT Jalandhar student (Instrumentation & Control Engineering; minor in Computer Science). Actively seeking internships.",
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://ibiimemon.com" />
      </head>
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
