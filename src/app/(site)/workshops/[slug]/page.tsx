import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { Photo } from "@/components/Photo";
import { Prose } from "@/components/Prose";
import { getPage, getPagePath, getSettings, getWorkshop, getWorkshops } from "@/lib/content";
import { longDate } from "@/lib/dates";
import { isBookable, sessionState } from "@/lib/sessions";
import { smartQuotes } from "@/lib/text";

export const revalidate = 60; // seconds; keep in step with REVALIDATE_SECONDS

export async function generateStaticParams() {
  return (await getWorkshops()).map((w) => ({ slug: w.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const workshop = await getWorkshop((await params).slug);
  return workshop ? { title: workshop.title, description: workshop.summary } : {};
}

export default async function WorkshopPage({ params }: Props) {
  const { slug } = await params;
  const [page, workshop, settings, visitPath] = await Promise.all([
    getPage("workshops"),
    getWorkshop(slug),
    getSettings(),
    getPagePath("visit"),
  ]);
  if (!page.on || !workshop) notFound();

  const details = [
    ["How long", workshop.length],
    ["Cost", workshop.cost],
    ["Ages", workshop.ages],
    ["Group size", workshop.groupSize],
    ["Taught by", workshop.teacher],
    ["What to bring", workshop.bring],
  ].filter(([, value]) => value) as [string, string][];

  const needsWriting = workshop.sessions.some((s) => isBookable(s) && !s.signupLink);

  return (
    <>
      <p className="small back">
        <Link href={page.path}>All workshops</Link>
      </p>
      <h1 className="page-title">{workshop.title}</h1>
      {workshop.summary && <p className="lead">{smartQuotes(workshop.summary)}</p>}
      <Photo photo={workshop.photo} />
      <Prose text={workshop.description} />

      {details.length > 0 && (
        <dl className="facts">
          {details.map(([label, value]) => (
            <Fragment key={label}>
              <dt>{label}</dt>
              <dd>{smartQuotes(value)}</dd>
            </Fragment>
          ))}
        </dl>
      )}

      <h2>Dates</h2>
      {workshop.sessions.length === 0 ? (
        <p>
          No dates yet.
          {settings.mailingList && visitPath && (
            <>
              {" "}
              <Link href={`${visitPath}#list`}>Join the mailing list</Link> to hear when there are.
            </>
          )}
        </p>
      ) : (
        <>
          <ul className="dates">
            {workshop.sessions.map((s) => {
              const state = sessionState(s);
              return (
                <li key={s.key} data-status={s.status ?? "open"}>
                  <span>
                    {longDate(s.date)}
                    {s.time && `, ${s.time}`}
                  </span>
                  <span className="state">
                    {state}
                    {isBookable(s) && s.signupLink && (
                      <>
                        {state && ". "}
                        <a href={s.signupLink}>Sign up</a>
                      </>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
          {needsWriting && (
            <p className="note">
              To save a place,{" "}
              {settings.email ? (
                <>
                  write to <a href={`mailto:${settings.email}?subject=${encodeURIComponent(workshop.title)}`}>{settings.email}</a>
                </>
              ) : visitPath ? (
                <Link href={`${visitPath}#write`}>write to us</Link>
              ) : (
                "write to us"
              )}{" "}
              with the date you want.
            </p>
          )}
        </>
      )}
    </>
  );
}
