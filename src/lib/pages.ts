import type { PageKey } from "./types";

// The pages are fixed in code. Editors change their words in the CMS and can
// switch a page off, but can't add or move pages.
export const PAGES: { key: PageKey; path: string; title: string; id: string }[] = [
  { key: "workshops", path: "/workshops", title: "Workshops", id: "page-workshops" },
  { key: "calendar", path: "/calendar", title: "Calendar", id: "page-calendar" },
  { key: "studio", path: "/studio-time", title: "Studio time", id: "page-studio" },
  { key: "rental", path: "/room-rental", title: "Room rental", id: "page-rental" },
  { key: "notices", path: "/notices", title: "Notice board", id: "page-notices" },
  { key: "visit", path: "/visit", title: "Visit", id: "page-visit" },
];

export const SITE_NAME_FALLBACK = "St Johns Stop Motion";
