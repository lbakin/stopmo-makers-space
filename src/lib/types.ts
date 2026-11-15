export type Photo = {
  url: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

export type SessionStatus = "open" | "full" | "cancelled";

export type Session = {
  key: string;
  date: string; // YYYY-MM-DD, Portland time
  time?: string;
  status?: SessionStatus;
  places?: string;
  signupLink?: string;
};

export type Workshop = {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  description?: string;
  length?: string;
  cost?: string;
  ages?: string;
  groupSize?: string;
  teacher?: string;
  bring?: string;
  photo?: Photo;
  sessions: Session[];
};

export type EventItem = {
  id: string;
  title: string;
  kind?: string;
  summary?: string;
  cost?: string;
  link?: string;
  dates: Session[];
};

export type Notice = {
  id: string;
  title: string;
  posted?: string;
  text?: string;
  contact?: string;
  photo?: Photo;
};

export type Row = { key: string; label: string; detail?: string };

export type HoursRow = { key: string; days: string; times: string };

export type Settings = {
  name: string;
  underName?: string;
  status?: string;
  intro?: string;
  homePhoto?: Photo;
  address?: string;
  mapLink?: string;
  hours: HoursRow[];
  email?: string;
  instagram?: string;
  mailingList: boolean;
  mailingListNote?: string;
  googleBlurb?: string;
};

export type PageKey = "workshops" | "calendar" | "studio" | "rental" | "notices" | "visit";

export type PageDoc = {
  key: PageKey;
  path: string;
  title: string;
  on: boolean;
  contentsLine?: string;
  body?: string;
  rows: Row[];
};

export type CalendarEntry = {
  key: string;
  date: string;
  time?: string;
  title: string;
  href?: string;
  external?: boolean;
  source: "workshop" | "event";
  kind: string;
  summary?: string;
  places?: string;
  status?: SessionStatus;
};
