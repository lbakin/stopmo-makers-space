import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteChrome } from "@/components/SiteChrome";
import { getSettings } from "@/lib/content";
import "@/styles/globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: { default: settings.name, template: `%s · ${settings.name}` },
    description: settings.googleBlurb,
    openGraph: { siteName: settings.name, type: "website", locale: "en_US" },
  };
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
