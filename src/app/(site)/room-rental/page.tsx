import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { Prose } from "@/components/Prose";
import { Field, SiteForm } from "@/components/SiteForm";
import { getPage, getSettings } from "@/lib/content";
import { smartQuotes } from "@/lib/text";

export const revalidate = 60; // seconds; keep in step with REVALIDATE_SECONDS

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("rental");
  return { title: page.title, description: page.contentsLine };
}

export default async function RoomRentalPage() {
  const [page, settings] = await Promise.all([getPage("rental"), getSettings()]);
  if (!page.on) notFound();

  return (
    <>
      <h1 className="page-title">{page.title}</h1>
      <Prose text={page.body} />

      {page.rows.length > 0 && (
        <dl className="facts">
          {page.rows.map((row) => (
            <Fragment key={row.key}>
              <dt>{smartQuotes(row.label)}</dt>
              <dd>{row.detail ? smartQuotes(row.detail) : ""}</dd>
            </Fragment>
          ))}
        </dl>
      )}

      <h2 id="ask">Ask about a date</h2>
      <SiteForm
        name="room-rental"
        submitLabel="Send"
        sentMessage="Got it, thanks. We’ll write back soon."
        failedMessage={
          settings.email
            ? `That didn’t go through. Try again, or write to ${settings.email}.`
            : "That didn’t go through. Try again in a minute."
        }
      >
        <Field label="Your name" name="name" autoComplete="name" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
        <Field label="Date" name="date" help="Or a few dates that would work." />
        <Field label="How many people" name="people" />
        <Field label="What’s the event?" name="event" multiline />
      </SiteForm>
    </>
  );
}
