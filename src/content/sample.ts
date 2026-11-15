// Sample content. The site shows this when no Sanity project is connected, and
// `npm run seed` copies it into an empty Sanity dataset as a starting point.
// Lorem ipsum marks every place where the real words are still to be written.
//
// Imports here stay relative so the seed script can load this file outside Next.

import type { EventItem, Notice, PageDoc, Settings, Workshop } from "../lib/types";

const LOREM_1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const LOREM_2 =
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const LOREM_SHORT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

export const sampleSettings: Settings = {
  name: "St Johns Stop Motion",
  underName: "A makers space for stop motion animation in St Johns, Portland, Oregon.",
  status: "Opening soon.",
  intro: [
    "We’re setting up a room in St Johns where anyone can make stop motion films.",
    "If you’ve never animated anything, start with a workshop. No experience needed. If you already make stop motion, book studio time and use the cameras and lights for your own projects. The room is also for rent when you need somewhere to hold an event.",
  ].join("\n\n"),
  address: "",
  mapLink: "",
  hours: [],
  email: "",
  instagram: "",
  mailingList: true,
  mailingListNote: "Leave your email to hear when we open and when new workshops go on the calendar.",
  googleBlurb:
    "A makers space for stop motion animation in St Johns, Portland, with workshops for beginners and studio time for animators.",
};

export const samplePages: Omit<PageDoc, "path">[] = [
  {
    key: "workshops",
    title: "Workshops",
    on: true,
    contentsLine: "Learn stop motion with your hands. No experience needed.",
    body: [
      "Workshops are for people who want to try stop motion with their own hands. No experience needed.",
      LOREM_1,
    ].join("\n\n"),
    rows: [],
  },
  {
    key: "calendar",
    title: "Calendar",
    on: true,
    contentsLine: "Everything coming up, by date.",
    body: "",
    rows: [],
  },
  {
    key: "studio",
    title: "Studio time",
    on: true,
    contentsLine: "Book the cameras and lights for your own projects.",
    body: [
      "Studio time is for Portland’s stop motion animators to work on their own projects with the cameras, lights and tools here.",
      LOREM_2,
    ].join("\n\n"),
    rows: [
      { key: "cameras", label: "Camera stations" },
      { key: "lights", label: "Lights and stands" },
      { key: "rigs", label: "Rigs and tie-downs" },
      { key: "armatures", label: "Armature and sculpting tools" },
      { key: "bench", label: "Set-building bench" },
      { key: "editing", label: "Editing computers" },
    ],
  },
  {
    key: "rental",
    title: "Room rental",
    on: true,
    contentsLine: "Rent the room for an event.",
    body: ["You can rent the room for events.", LOREM_1].join("\n\n"),
    rows: [],
  },
  {
    key: "notices",
    title: "Notice board",
    on: true,
    contentsLine: "Screenings, crew calls, gear for sale and swaps from Portland’s stop motion people.",
    body: "This board is for Portland’s stop motion people. To put something up, write to us.",
    rows: [],
  },
  {
    key: "visit",
    title: "Visit",
    on: true,
    contentsLine: "Where we are and how to get in touch.",
    body: "",
    rows: [],
  },
];

export const sampleWorkshops: Workshop[] = [
  {
    id: "workshop-clay-animation",
    title: "Clay animation",
    slug: "clay-animation",
    summary: LOREM_SHORT,
    description: [LOREM_1, LOREM_2].join("\n\n"),
    length: "3 hours",
    groupSize: "Up to 8 people",
    sessions: [
      { key: "s1", date: "2026-12-05", time: "1–4pm", status: "open", places: "8 places" },
      { key: "s2", date: "2027-01-09", time: "1–4pm", status: "open", places: "8 places" },
      { key: "s3", date: "2027-02-06", time: "1–4pm", status: "open", places: "8 places" },
    ],
  },
  {
    id: "workshop-paper-cut-out",
    title: "Paper cut-out animation",
    slug: "paper-cut-out-animation",
    summary: LOREM_SHORT,
    description: LOREM_1,
    length: "3 hours",
    groupSize: "Up to 10 people",
    sessions: [
      { key: "s1", date: "2026-12-17", time: "6–9pm", status: "full", places: "Full" },
      { key: "s2", date: "2027-01-21", time: "6–9pm", status: "open", places: "10 places" },
    ],
  },
  {
    id: "workshop-wire-armatures",
    title: "Wire armatures",
    slug: "wire-armatures",
    summary: LOREM_SHORT,
    description: [LOREM_2, LOREM_1].join("\n\n"),
    length: "Two evenings",
    groupSize: "Up to 6 people",
    sessions: [],
  },
];

export const sampleEvents: EventItem[] = [
  {
    id: "event-open-house",
    title: "Open house",
    kind: "Event",
    summary: LOREM_SHORT,
    dates: [{ key: "d1", date: "2026-12-12", time: "4–8pm", status: "open" }],
  },
  {
    id: "event-open-studio",
    title: "Open studio",
    kind: "Studio night",
    summary: LOREM_SHORT,
    dates: [
      { key: "d1", date: "2027-01-14", time: "6–10pm", status: "open" },
      { key: "d2", date: "2027-01-28", time: "6–10pm", status: "open" },
      { key: "d3", date: "2027-02-11", time: "6–10pm", status: "open" },
    ],
  },
];

export const sampleNotices: Notice[] = [
  {
    id: "notice-1",
    title: "Lorem ipsum dolor sit amet",
    posted: "2026-11-10",
    text: LOREM_1,
    contact: "lorem@example.com",
  },
  {
    id: "notice-2",
    title: "Consectetur adipiscing elit",
    posted: "2026-11-02",
    text: LOREM_2,
    contact: "Lorem ipsum",
  },
];

export const sampleLastChanged = "2026-11-14";
