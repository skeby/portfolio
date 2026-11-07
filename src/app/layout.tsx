import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/misc/providers";
import { Analytics } from "@vercel/analytics/next";
import {
  APP_URL,
  DEFAULT_PALETTE,
  PALETTE_STORAGE_KEY,
  palettes,
} from "@/static";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Snowfall from "@/components/ui/snowfall";
import { Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";

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
    siteName: "adeyinkaakinsanya.com",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/devlinks-skeby.appspot.com/o/users%2FCgs3zjzDzMfkOdPfmBQGDkO2OPW2%2Fprofile.jpg?alt=media&token=c2197f44-4620-49be-acd8-3e35eb5e6a6a",
        width: 600,
        height: 600,
        alt: "Adeyinka Akinsanya — Software Engineer",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Adeyinka Akinsanya — Software Engineer",
    description: "Software Engineer and Frontend Developer",
    creator: "_skeby",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/devlinks-skeby.appspot.com/o/users%2FCgs3zjzDzMfkOdPfmBQGDkO2OPW2%2Fprofile.jpg?alt=media&token=c2197f44-4620-49be-acd8-3e35eb5e6a6a",
    ],
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

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  axes: ["opsz"],
});

// Applies the saved palette before first paint so there is no flash.
const paletteScript = `try{var p=localStorage.getItem(${JSON.stringify(PALETTE_STORAGE_KEY)});if(${JSON.stringify(palettes.map((p) => p.id))}.indexOf(p)>-1)document.documentElement.dataset.palette=p}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-palette={DEFAULT_PALETTE}
      className={bricolage.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: paletteScript }} />
      </head>
      <body className="antialiased">
        <Snowfall />
        <Analytics />
        <SpeedInsights />
        <Providers>{children}</Providers>
        <div
          // data-no-blobity
          data-checkmeout-support-widget
          data-username="skeby"
        ></div>
        <Script
          // data-no-blobity
          src="https://www.checkmeout.me/embed/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
