import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Break } from "@/components/Break";
import { Photo } from "@/components/Photo";
import { Prose } from "@/components/Prose";
import { getNotices, getPage } from "@/lib/content";
import { plainDate } from "@/lib/dates";
import { smartQuotes } from "@/lib/text";

export const revalidate = 60; // seconds; keep in step with REVALIDATE_SECONDS

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("notices");
  return { title: page.title, description: page.contentsLine };
}

export default async function NoticesPage() {
  const [page, notices] = await Promise.all([getPage("notices"), getNotices()]);
  if (!page.on) notFound();

  return (
    <>
      <h1 className="page-title">{page.title}</h1>
      <Prose text={page.body} />
      {notices.length === 0 && <p className="note">Nothing on the board right now.</p>}
      {notices.map((n) => (
        <article key={n.id} className="entry" aria-labelledby={n.id}>
          <Break />
          <h2 id={n.id}>{smartQuotes(n.title)}</h2>
          {n.posted && <p className="meta">Posted {plainDate(n.posted)}</p>}
          <Photo photo={n.photo} />
          <Prose text={n.text} className="note" />
          {n.contact && (
            <p className="note">
              To reply:{" "}
              {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n.contact) ? (
                <a href={`mailto:${n.contact}?subject=${encodeURIComponent(n.title)}`}>{n.contact}</a>
              ) : (
                smartQuotes(n.contact)
              )}
            </p>
          )}
        </article>
      ))}
    </>
  );
}
