import { defineField, defineType } from "sanity";

export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "image",
  fields: [
    defineField({
      name: "alt",
      title: "What’s in the photo",
      type: "string",
      description: "For people who can’t see it. Like “Two clay figures on a tabletop set”.",
      validation: (rule) =>
        rule.custom((alt, context) => {
          const parent = context.parent as { asset?: unknown } | undefined;
          if (parent?.asset && !alt) return "Say what’s in the photo.";
          return true;
        }),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional. Shown under the photo.",
    }),
  ],
});

export const session = defineType({
  name: "session",
  title: "Date",
  type: "object",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "dddd, MMMM D, YYYY" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
      description: "Like “1–4pm”.",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "open",
      options: {
        list: [
          { title: "Open", value: "open" },
          { title: "Full", value: "full" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({
      name: "places",
      title: "Places left",
      type: "string",
      description: "Like “8 places” or “2 left”. Leave empty to leave it off.",
      hidden: ({ parent }) => parent?.status && parent.status !== "open",
    }),
    defineField({
      name: "signupLink",
      title: "Sign-up link",
      type: "url",
      description: "Where people book. Leave empty and the site asks them to write to you.",
      hidden: ({ parent }) => parent?.status && parent.status !== "open",
    }),
  ],
  preview: {
    select: { date: "date", time: "time", status: "status", places: "places" },
    prepare({ date, time, status, places }) {
      const when = date
        ? new Intl.DateTimeFormat("en-US", {
            timeZone: "UTC",
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          }).format(new Date(`${date}T00:00:00Z`))
        : "No date";
      const state = status === "full" ? "Full" : status === "cancelled" ? "Cancelled" : places;
      return { title: [when, time].filter(Boolean).join(", "), subtitle: state };
    },
  },
});

export const row = defineType({
  name: "row",
  title: "Row",
  type: "object",
  fields: [
    defineField({ name: "label", title: "What", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "detail",
      title: "Detail",
      type: "string",
      description: "Optional. Like “Four, each with its own lights”.",
    }),
  ],
  preview: { select: { title: "label", subtitle: "detail" } },
});

export const hoursRow = defineType({
  name: "hoursRow",
  title: "Hours",
  type: "object",
  fields: [
    defineField({ name: "days", title: "Days", type: "string", description: "Like “Thu–Sun”." }),
    defineField({ name: "times", title: "Hours", type: "string", description: "Like “Noon–8pm” or “Closed”." }),
  ],
  preview: { select: { title: "days", subtitle: "times" } },
});
