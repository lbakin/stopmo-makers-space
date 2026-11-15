// Copies the sample content into the Sanity dataset as a starting point.
// Run with: npm run seed  (after `npx sanity login`)
// Documents that already exist are left alone, so running it twice is safe.

import { getCliClient } from "sanity/cli";
import {
  sampleEvents,
  sampleNotices,
  samplePages,
  sampleSettings,
  sampleWorkshops,
} from "../src/content/sample";
import { PAGES } from "../src/lib/pages";
import type { Session } from "../src/lib/types";

const client = getCliClient({ apiVersion: "2026-10-01" });

function sessions(list: Session[]) {
  return list.map(({ key, ...rest }) => ({ _key: key, _type: "session", ...rest }));
}

const { hours, homePhoto, ...settings } = sampleSettings;
void homePhoto;

type Doc = { _id: string; _type: string; [field: string]: unknown };

const docs: Doc[] = [
  {
    _id: "settings",
    _type: "settings",
    ...settings,
    hours: hours.map(({ key, ...rest }) => ({ _key: key, _type: "hoursRow", ...rest })),
  },
  ...samplePages.map(({ key, rows, ...rest }) => ({
    _id: PAGES.find((p) => p.key === key)!.id,
    _type: "page",
    ...rest,
    rows: rows.map(({ key: rowKey, ...row }) => ({ _key: rowKey, _type: "row", ...row })),
  })),
  ...sampleWorkshops.map(({ id, slug, sessions: list, photo, ...rest }) => {
    void photo;
    return {
      _id: id,
      _type: "workshop",
      onList: true,
      ...rest,
      slug: { _type: "slug", current: slug },
      sessions: sessions(list),
    };
  }),
  ...sampleEvents.map(({ id, dates, ...rest }) => ({
    _id: id,
    _type: "event",
    onList: true,
    ...rest,
    dates: sessions(dates),
  })),
  ...sampleNotices.map(({ id, photo, ...rest }) => {
    void photo;
    return { _id: id, _type: "notice", ...rest };
  }),
];

async function main() {
  const tx = client.transaction();
  for (const doc of docs) tx.createIfNotExists(doc);
  await tx.commit();
  console.log(`Done. ${docs.length} documents checked; any that were missing have been added.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
