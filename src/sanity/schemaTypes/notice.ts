import { defineField, defineType } from "sanity";

export const notice = defineType({
  name: "notice",
  title: "Notice",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Headline", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "posted",
      title: "Posted",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
    defineField({
      name: "takeDownOn",
      title: "Take down on",
      type: "date",
      description: "It comes off the board on this day. Leave empty to keep it up.",
    }),
    defineField({ name: "text", title: "Notice", type: "text", rows: 6, description: "A blank line starts a new paragraph." }),
    defineField({
      name: "contact",
      title: "How to reply",
      type: "string",
      description: "Like an email address, or “Ask at the front desk”.",
    }),
    defineField({ name: "photo", title: "Photo", type: "photo" }),
  ],
  orderings: [{ title: "Newest first", name: "posted", by: [{ field: "posted", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "posted" } },
});
