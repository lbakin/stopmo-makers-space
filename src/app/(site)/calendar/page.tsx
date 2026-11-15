import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@/components/Prose";
import { getCalendar, getPage, getPagePath, getSettings } from "@/lib/content";
import { dayOfMonth, monthLabel, weekdayShort } from "@/lib/dates";
import { sessionState } from "@/lib/sessions";
import { smartQuotes } from "@/lib/text";
import type { CalendarEntry } from "@/lib/types";

export const revalidate = 60; // seconds; keep in step with REVALIDATE_SECONDS

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("calendar");
  return { title: page.title, description: page.contentsLine };
}

function byMonth(entries: CalendarEntry[]) {
  const months = new Map<string, CalendarEntry[]>();
  for (const e of entries) {
    const key = e.date.slice(0, 7);
    months.set(key, [...(months.get(key) ?? []), e]);
  }
  return [...months.entries()];
}

export default async function CalendarPage() {
  const [page, entries, settings, visitPath] = await Promise.all([
    getPage("calendar"),
    getCalendar(),
    getSettings(),
    getPagePath("visit"),
  ]);
  if (!page.on) notFound();

  return (
    <>
      <h1 className="page-title">{page.title}</h1>
      <Prose text={page.body} />

      {entries.length === 0 ? (
        <p>
          Nothing on the calendar yet.
          {settings.mailingList && visitPath && (
            <>
              {" "}
              <Link href={`${visitPath}#list`}>Join the mailing list</Link> to hear when there is.
            </>
          )}
        </p>
      ) : (
        byMonth(entries).map(([month, list]) => (
          <section key={month} className="calendar-month">
            <table className="xsheet">
              <caption>{monthLabel(`${month}-01`)}</caption>
              <thead className="visually-hidden">
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Time</th>
                  <th scope="col">What</th>
                </tr>
              </thead>
              <tbody>
                {list.map((e) => {
                  const state = sessionState(e);
                  const notes = [e.kind, state].filter(Boolean).join(". ");
                  return (
                    <tr key={e.key}>
                      <td className="day">
                        <span className="sc">{weekdayShort(e.date)}</span> {dayOfMonth(e.date)}
                      </td>
                      <td className="time">{e.time}</td>
                      <td className="what">
                        {e.href ? (
                          e.external ? (
                            <a href={e.href}>{e.title}</a>
                          ) : (
                            <Link href={e.href}>{e.title}</Link>
                          )
                        ) : (
                          e.title
                        )}
                        <span className="kind">
                          {notes}
                          {e.summary && `${notes ? ". " : ""}${smartQuotes(e.summary)}`}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        ))
      )}
    </>
  );
}
