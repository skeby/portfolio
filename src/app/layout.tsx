import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/misc/providers";
import { syne } from "@/static";
import { Analytics } from "@vercel/analytics/next";
import { APP_URL } from "@/static";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Adeyinka Akinsanya — Software Engineer",
  description: "Software Engineer and Frontend Developer",
  generator: "nextjs",
  applicationName: "Adeyinka Akinsanya",
  keywords: [
    "freelance",
    "developer",
    "tech",
    "nigeria",
    "software",
    "portfolio",
    "frontend",
    "react",
    "nextjs",
    "creative",
    "freelance developer",
    "frontend developer",
    "frontend engineer",
    "creative developer",
    "creative engineer",
    "software developer",
    "software engineer",
    "frontend developer portfolio",
    "frontend engineer portfolio",
    "software developer portfolio",
    "software engineer portfolio",
    "creative developer portfolio",
  ],
  openGraph: {
    title: "Adeyinka Akinsanya — Software Engineer",
    description: "Software Engineer and Frontend Developer",
    url: APP_URL,
    siteName: "skeby.vercel.app",
    // images: [
    //   {
    //     url: "https://user-images.githubusercontent.com/84178696/228620835-e3cc5c9b-72fc-4f54-a628-407ef7b650f5.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Adeyinka Akinsanya — Software Engineer",
    //   },
    // ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adeyinka Akinsanya — Software Engineer",
    description: "Software Engineer and Frontend Developer",
    creator: "_skeby",
    // creatorId: "1243720976552144897",
    // images: [
    //   "https://user-images.githubusercontent.com/84178696/228620835-e3cc5c9b-72fc-4f54-a628-407ef7b650f5.png",
    // ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.className} bg-background font-sans antialiased`}>
        <Analytics />
        <SpeedInsights />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
