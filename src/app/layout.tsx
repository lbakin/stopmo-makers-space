import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { colorScript } from "@/components/ColorChoice";
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
    <html lang="en-US" className={vollkorn.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: colorScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
