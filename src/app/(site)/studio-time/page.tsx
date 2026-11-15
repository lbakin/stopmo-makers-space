import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@/components/Prose";
import { getPage, getPagePath, getSettings } from "@/lib/content";
import { smartQuotes } from "@/lib/text";

export const revalidate = 60; // seconds; keep in step with REVALIDATE_SECONDS

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("studio");
  return { title: page.title, description: page.contentsLine };
}

export default async function StudioTimePage() {
  const [page, settings, visitPath] = await Promise.all([getPage("studio"), getSettings(), getPagePath("visit")]);
  if (!page.on) notFound();

  return (
    <>
      <h1 className="page-title">{page.title}</h1>
      <Prose text={page.body} />

      {page.rows.length > 0 && (
        <>
          <h2>What’s in the studio</h2>
          <ul className="ruled">
            {page.rows.map((row) => (
              <li key={row.key}>
                {smartQuotes(row.label)}
                {row.detail && <span className="detail">: {smartQuotes(row.detail)}</span>}
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="note">
        To ask about studio time,{" "}
        {settings.email ? (
          <>
            write to <a href={`mailto:${settings.email}?subject=Studio%20time`}>{settings.email}</a>.
          </>
        ) : visitPath ? (
          <>
            <Link href={`${visitPath}#write`}>write to us</Link>.
          </>
        ) : (
          "write to us."
        )}
      </p>
    </>
  );
}
