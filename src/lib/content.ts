import { cache } from "react";
import { createClient, defineQuery } from "next-sanity";
import { apiVersion, dataset, projectId, sanityConfigured } from "@/sanity/env";
import {
  sampleEvents,
  sampleLastChanged,
  sampleNotices,
  samplePages,
  sampleSettings,
  sampleWorkshops,
} from "@/content/sample";
import { PAGES, SITE_NAME_FALLBACK } from "./pages";
import { isUpcoming, todayInPortland } from "./dates";
import type {
  CalendarEntry,
  EventItem,
  Notice,
  PageDoc,
  PageKey,
  Photo,
  Session,
  Settings,
  Workshop,
} from "./types";

// Pages are rebuilt at most once a minute. The webhook at /api/revalidate makes
// a publish show up straight away.
export const REVALIDATE_SECONDS = 60;

const client = sanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" })
  : null;

async function query<T>(groq: string, params: Record<string, unknown> = {}): Promise<T> {
  if (!client) throw new Error("Sanity is not configured");
  return client.fetch<T>(groq, params, {
    next: { revalidate: REVALIDATE_SECONDS, tags: ["sanity"] },
  });
}

const PHOTO = `{ alt, caption, "url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }`;
const SESSION = `{ "key": _key, date, time, status, places, signupLink }`;

const SETTINGS_QUERY = defineQuery(`*[_id == "settings"][0]{
  name, underName, status, intro, address, mapLink, email, instagram,
  mailingList, mailingListNote, googleBlurb,
  "hours": hours[]{ "key": _key, days, times },
  "homePhoto": homePhoto${PHOTO}
}`);

const PAGES_QUERY = defineQuery(`*[_type == "page"]{
  "id": _id, title, on, contentsLine, body,
  "rows": rows[]{ "key": _key, label, detail }
}`);

const WORKSHOPS_QUERY = defineQuery(`*[_type == "workshop" && onList != false]{
  "id": _id, title, "slug": slug.current, summary, description,
  length, cost, ages, groupSize, teacher, bring,
  "photo": photo${PHOTO},
  "sessions": sessions[]${SESSION}
}`);

const EVENTS_QUERY = defineQuery(`*[_type == "event" && onList != false]{
  "id": _id, title, kind, summary, cost, link,
  "dates": dates[]${SESSION}
}`);

const NOTICES_QUERY = defineQuery(`*[_type == "notice" && (!defined(takeDownOn) || takeDownOn >= $today)]
  | order(posted desc){ "id": _id, title, posted, text, contact, "photo": photo${PHOTO} }`);

const LAST_CHANGED_QUERY = defineQuery(`*[!(_id in path("drafts.**"))] | order(_updatedAt desc)[0]._updatedAt`);

// Sanity returns null for empty fields. The pages expect undefined or a value.
type Nullable<T> = { [K in keyof T]?: T[K] | null };

function clean<T extends object>(value: Nullable<T> | null | undefined): Partial<T> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value ?? {})) if (v !== null && v !== "") out[k] = v;
  return out as Partial<T>;
}

function cleanPhoto(photo: Nullable<Photo> | null | undefined): Photo | undefined {
  if (!photo?.url || !photo.width || !photo.height) return undefined;
  return clean<Photo>(photo) as Photo;
}

function cleanSessions(list: Nullable<Session>[] | null | undefined): Session[] {
  return (list ?? []).filter((s) => s?.date).map((s) => clean<Session>(s) as Session);
}

export const getSettings = cache(async (): Promise<Settings> => {
  if (!client) return structuredClone(sampleSettings);
  const raw = await query<(Nullable<Settings> & { homePhoto?: Nullable<Photo> | null }) | null>(SETTINGS_QUERY);
  const s = clean<Settings>(raw);
  return {
    ...s,
    name: s.name || SITE_NAME_FALLBACK,
    hours: (raw?.hours ?? []).filter((h) => h?.days || h?.times).map((h) => ({
      key: h.key ?? "",
      days: h.days ?? "",
      times: h.times ?? "",
    })),
    homePhoto: cleanPhoto(raw?.homePhoto),
    mailingList: raw?.mailingList !== false,
  };
});

type PageFromCms = Nullable<Omit<PageDoc, "path" | "key">> & { id?: string | null };

export const getPages = cache(async (): Promise<PageDoc[]> => {
  const docs: PageFromCms[] = client
    ? await query<PageFromCms[]>(PAGES_QUERY)
    : samplePages.map((p) => ({ ...structuredClone(p), id: PAGES.find((d) => d.key === p.key)?.id }));
  return PAGES.map((def) => {
    const doc = docs.find((d) => d.id === def.id);
    const c = clean<PageDoc>(doc);
    return {
      key: def.key,
      path: def.path,
      title: c.title || def.title,
      on: doc?.on !== false,
      contentsLine: c.contentsLine,
      body: c.body,
      rows: (doc?.rows ?? []).filter((r) => r?.label).map((r) => clean(r) as PageDoc["rows"][number]),
    };
  });
});

export async function getPage(key: PageKey): Promise<PageDoc> {
  const page = (await getPages()).find((p) => p.key === key);
  if (!page) throw new Error(`Unknown page ${key}`);
  return page;
}

export async function getPagePath(key: PageKey): Promise<string | null> {
  const page = await getPage(key);
  return page.on ? page.path : null;
}

function nextDate(sessions: Session[], today: string): string | undefined {
  return sessions
    .filter((s) => isUpcoming(s.date, today) && s.status !== "cancelled")
    .map((s) => s.date)
    .sort()[0];
}

export const getWorkshops = cache(async (): Promise<Workshop[]> => {
  const today = todayInPortland();
  const raw: Nullable<Workshop>[] = client
    ? await query<Nullable<Workshop>[]>(WORKSHOPS_QUERY)
    : structuredClone(sampleWorkshops);
  const workshops = raw
    .filter((w) => w.title && w.slug)
    .map((w) => {
      const c = clean<Workshop>(w) as Workshop;
      return {
        ...c,
        photo: cleanPhoto(w.photo as Nullable<Photo>),
        sessions: cleanSessions(w.sessions as Nullable<Session>[])
          .filter((s) => isUpcoming(s.date, today))
          .sort((a, b) => a.date.localeCompare(b.date)),
      };
    });
  // Soonest first; workshops with no dates go to the end.
  return workshops.sort((a, b) => {
    const na = nextDate(a.sessions, today) ?? "9999";
    const nb = nextDate(b.sessions, today) ?? "9999";
    return na.localeCompare(nb) || a.title.localeCompare(b.title);
  });
});

export async function getWorkshop(slug: string): Promise<Workshop | undefined> {
  return (await getWorkshops()).find((w) => w.slug === slug);
}

export const getEvents = cache(async (): Promise<EventItem[]> => {
  const today = todayInPortland();
  const raw: Nullable<EventItem>[] = client
    ? await query<Nullable<EventItem>[]>(EVENTS_QUERY)
    : structuredClone(sampleEvents);
  return raw
    .filter((e) => e.title)
    .map((e) => ({
      ...(clean<EventItem>(e) as EventItem),
      dates: cleanSessions(e.dates as Nullable<Session>[]).filter((d) => isUpcoming(d.date, today)),
    }));
});

export const getNotices = cache(async (): Promise<Notice[]> => {
  if (!client) return structuredClone(sampleNotices);
  const raw = await query<Nullable<Notice>[]>(NOTICES_QUERY, { today: todayInPortland() });
  return raw
    .filter((n) => n.title)
    .map((n) => ({ ...(clean<Notice>(n) as Notice), photo: cleanPhoto(n.photo as Nullable<Photo>) }));
});

export const getLastChanged = cache(async (): Promise<string | undefined> => {
  if (!client) return sampleLastChanged;
  const stamp = await query<string | null>(LAST_CHANGED_QUERY);
  return stamp ? stamp.slice(0, 10) : undefined;
});

/** Every upcoming workshop session and event date, soonest first. */
export async function getCalendar(): Promise<CalendarEntry[]> {
  const [workshops, events] = await Promise.all([getWorkshops(), getEvents()]);
  const workshopsPath = await getPagePath("workshops");
  const entries: CalendarEntry[] = [];
  for (const w of workshops) {
    for (const s of w.sessions) {
      entries.push({
        key: `${w.id}-${s.key}`,
        date: s.date,
        time: s.time,
        title: w.title,
        href: workshopsPath ? `${workshopsPath}/${w.slug}` : undefined,
        source: "workshop",
        kind: "Workshop",
        places: s.places,
        status: s.status,
      });
    }
  }
  for (const e of events) {
    for (const d of e.dates) {
      entries.push({
        key: `${e.id}-${d.key}`,
        date: d.date,
        time: d.time,
        title: e.title,
        href: d.signupLink || e.link,
        external: Boolean(d.signupLink || e.link),
        source: "event",
        kind: e.kind || "Event",
        summary: e.summary,
        places: d.places,
        status: d.status,
      });
    }
  }
  return entries.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
}
