import Link from "next/link";
import type { ReactNode } from "react";
import { getLastChanged, getPages, getSettings } from "@/lib/content";
import { plainDate } from "@/lib/dates";
import { smartQuotes } from "@/lib/text";
import { ColorChoice } from "./ColorChoice";
import { LookChoice } from "./LookChoice";
import { LookFilters, PegBar, PencilTest } from "./LookParts";
import { Nav } from "./Nav";

export async function SiteChrome({ children }: { children: ReactNode }) {
  const [settings, pages, lastChanged] = await Promise.all([getSettings(), getPages(), getLastChanged()]);
  const links = pages.filter((p) => p.on).map((p) => ({ path: p.path, title: p.title }));
  const instagram = settings.instagram?.replace(/^@/, "");

  return (
    <>
      <a className="skip" href="#text">
        Skip to the page
      </a>
      <LookChoice />
      <LookFilters />
      <header className="masthead">
        <div className="frame">
          <PegBar />
          <Link href="/" className="name">
            {settings.name}
          </Link>
          <PencilTest />
          <Nav links={links} />
        </div>
      </header>
      <main id="text" className="frame">
        {children}
      </main>
      <footer className="colophon">
        <div className="frame">
          {settings.underName && <p>{smartQuotes(settings.underName)}</p>}
          {(settings.email || instagram) && (
            <p>
              {settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
              {settings.email && instagram && ", "}
              {instagram && (
                <>
                  Instagram <a href={`https://www.instagram.com/${instagram}/`}>@{instagram}</a>
                </>
              )}
            </p>
          )}
          <p>
            Set in <span className="face face-vollkorn">Vollkorn</span>
            <span className="face face-courier">Courier Prime</span>
            <span className="face face-archivo">Archivo</span>.{lastChanged && ` Last changed ${plainDate(lastChanged)}.`}
          </p>
          <ColorChoice />
        </div>
      </footer>
    </>
  );
}
