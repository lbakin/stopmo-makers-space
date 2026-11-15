import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { Prose } from "@/components/Prose";
import { Field, SiteForm } from "@/components/SiteForm";
import { getPage, getSettings } from "@/lib/content";
import { lines, smartQuotes } from "@/lib/text";

export const revalidate = 60; // seconds; keep in step with REVALIDATE_SECONDS

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("visit");
  return { title: page.title, description: page.contentsLine };
}

export default async function VisitPage() {
  const [page, settings] = await Promise.all([getPage("visit"), getSettings()]);
  if (!page.on) notFound();

  const address = lines(settings.address);
  const instagram = settings.instagram?.replace(/^@/, "");
  const failed = settings.email
    ? `That didn’t go through. Try again, or write to ${settings.email}.`
    : "That didn’t go through. Try again in a minute.";

  return (
    <>
      <h1 className="page-title">{page.title}</h1>
      <Prose text={page.body} />

      <h2>Where</h2>
      {address.length > 0 ? (
        <address>
          {address.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </address>
      ) : (
        <p>St Johns, North Portland. The street address is still to come.</p>
      )}
      {settings.mapLink && (
        <p className="note">
          <a href={settings.mapLink}>Open in a map</a>
        </p>
      )}

      <h2>When</h2>
      {settings.hours.length > 0 ? (
        <dl className="facts">
          {settings.hours.map((h) => (
            <Fragment key={h.key}>
              <dt>{smartQuotes(h.days)}</dt>
              <dd>{smartQuotes(h.times)}</dd>
            </Fragment>
          ))}
        </dl>
      ) : (
        <p>Not open yet.</p>
      )}

      {(settings.email || instagram) && (
        <>
          <h2>Email and Instagram</h2>
          <p>
            {settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
            {settings.email && instagram && <br />}
            {instagram && (
              <a href={`https://www.instagram.com/${instagram}/`}>@{instagram} on Instagram</a>
            )}
          </p>
        </>
      )}

      <h2 id="write">Write to us</h2>
      <SiteForm name="contact" submitLabel="Send" sentMessage="Sent. We’ll write back soon." failedMessage={failed}>
        <Field label="Your name" name="name" autoComplete="name" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
        <Field label="Message" name="message" multiline required />
      </SiteForm>

      {settings.mailingList && (
        <>
          <h2 id="list">Mailing list</h2>
          {settings.mailingListNote && <p>{smartQuotes(settings.mailingListNote)}</p>}
          <SiteForm
            name="mailing-list"
            submitLabel="Sign up"
            sentMessage="You’re on the list. Thanks."
            failedMessage={failed}
          >
            <Field label="Email" name="email" type="email" autoComplete="email" required />
          </SiteForm>
        </>
      )}
    </>
  );
}
