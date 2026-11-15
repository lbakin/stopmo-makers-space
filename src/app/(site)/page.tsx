import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Prose } from "@/components/Prose";
import { getCalendar, getPages, getSettings } from "@/lib/content";
import { longDate } from "@/lib/dates";
import { smartQuotes } from "@/lib/text";

export const revalidate = 60; // seconds; keep in step with REVALIDATE_SECONDS

export default async function Home() {
  const [settings, pages, calendar] = await Promise.all([getSettings(), getPages(), getCalendar()]);
  const contents = pages.filter((p) => p.on);
  const calendarOn = contents.some((p) => p.key === "calendar");
  const next = calendar.find((entry) => entry.status !== "cancelled");

  return (
    <>
      <section className="title-page" aria-labelledby="site-name">
        <h1 id="site-name">{settings.name}</h1>
        {settings.underName && <p className="under">{smartQuotes(settings.underName)}</p>}
        {settings.status && <p className="status">{smartQuotes(settings.status)}</p>}
      </section>

      <Prose text={settings.intro} />

      {next && calendarOn && (
        <p className="note">
          Next on the calendar:{" "}
          {next.href ? <a href={next.href}>{next.title}</a> : next.title}, {longDate(next.date)}
          {next.time ? `, ${next.time}` : ""}.
        </p>
      )}

      <Photo photo={settings.homePhoto} missing="Photo to come: the room." />

      <h2 id="contents">Contents</h2>
      <ul className="contents" aria-labelledby="contents">
        {contents.map((page) => (
          <li key={page.key}>
            <Link href={page.path}>{page.title}</Link>
            {page.contentsLine && <span className="line">{smartQuotes(page.contentsLine)}</span>}
          </li>
        ))}
      </ul>
    </>
  );
}
