import type { MetadataRoute } from "next";
import { getPages, getWorkshops } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const [pages, workshops] = await Promise.all([getPages(), getWorkshops()]);
  const on = pages.filter((p) => p.on);
  const workshopsPage = on.find((p) => p.key === "workshops");
  return [
    { url: `${base}/` },
    ...on.map((p) => ({ url: `${base}${p.path}` })),
    ...(workshopsPage ? workshops.map((w) => ({ url: `${base}${workshopsPage.path}/${w.slug}` })) : []),
  ];
}
