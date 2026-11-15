import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Break } from "@/components/Break";
import { Prose } from "@/components/Prose";
import { getPage, getWorkshops } from "@/lib/content";
import { longDate } from "@/lib/dates";
import { smartQuotes } from "@/lib/text";

export const revalidate = 60; // seconds; keep in step with REVALIDATE_SECONDS

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("workshops");
  return { title: page.title, description: page.contentsLine };
}

export default async function WorkshopsPage() {
  const [page, workshops] = await Promise.all([getPage("workshops"), getWorkshops()]);
  if (!page.on) notFound();

  return (
    <>
      <h1 className="page-title">{page.title}</h1>
      <Prose text={page.body} />
      {workshops.length === 0 && <p>No workshops on the list yet.</p>}
      {workshops.map((w) => {
        const next = w.sessions.find((s) => s.status !== "cancelled");
        const meta = [w.length, w.groupSize, w.cost].filter(Boolean).map((m) => smartQuotes(m as string));
        return (
          <section key={w.id} className="entry" aria-labelledby={`w-${w.slug}`}>
            <Break />
            <h2 id={`w-${w.slug}`}>
              <Link href={`${page.path}/${w.slug}`}>{w.title}</Link>
            </h2>
            {w.summary && <p className="summary">{smartQuotes(w.summary)}</p>}
            <p className="meta">
              {meta.length > 0 && `${meta.join(". ")}. `}
              {next ? `Next on ${longDate(next.date)}.` : "No dates yet."}
            </p>
          </section>
        );
      })}
    </>
  );
}
