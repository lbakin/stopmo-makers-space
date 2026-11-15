import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { headScript } from "@/lib/head-script";
import { SITE_NAME_FALLBACK } from "@/lib/pages";
import { siteUrl } from "@/lib/site-url";

// Served from this site, not a font service: the files keep Vollkorn's small
// caps and old-style figures, which hosted copies have been known to strip.
const vollkorn = localFont({
  src: [
    { path: "../fonts/Vollkorn-latin.woff2", weight: "400 900", style: "normal" },
    { path: "../fonts/Vollkorn-Italic-latin.woff2", weight: "400 900", style: "italic" },
  ],
  variable: "--font-vollkorn",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

// Faces for two of the looks on trial. Not preloaded: they're only fetched
// when a look that uses them is on.
const courierPrime = localFont({
  src: [
    { path: "../fonts/CourierPrime-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/CourierPrime-Italic-latin.woff2", weight: "400", style: "italic" },
    { path: "../fonts/CourierPrime-Bold-latin.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-courier",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

const archivo = localFont({
  src: [{ path: "../fonts/Archivo-latin.woff2", weight: "100 900", style: "normal" }],
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  variable: "--font-archivo",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

// The root layout also wraps the Studio at /edit, so it reads nothing from the
// CMS. The site's own metadata is in (site)/layout.tsx.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: SITE_NAME_FALLBACK,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#161614" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US" className={`${vollkorn.variable} ${courierPrime.variable} ${archivo.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
