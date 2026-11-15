import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import "@/styles/globals.css";

export default function NotFound() {
  return (
    <SiteChrome>
      <h1 className="page-title">Nothing here.</h1>
      <p>
        The page may have moved or been taken down. Everything on the site is listed on the{" "}
        <Link href="/">home page</Link>.
      </p>
    </SiteChrome>
  );
}
