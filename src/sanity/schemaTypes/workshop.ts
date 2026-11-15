import { defineArrayMember, defineField, defineType } from "sanity";

export const workshop = defineType({
  name: "workshop",
  title: "Workshop",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Name of the workshop",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      options: { source: "title", maxLength: 60 },
      description: "Press Generate to make it from the name. Changing it later breaks old links.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "onList",
      title: "On the list",
      type: "boolean",
      initialValue: true,
      description: "Turn off to hide the workshop without deleting it.",
    }),
    defineField({
      name: "sessions",
      title: "Dates",
      type: "array",
      of: [defineArrayMember({ type: "session" })],
      description: "One row per date. Past dates drop off the site on their own.",
      validation: (rule) => rule.custom((value) => (value?.length ? true : "No dates yet. The site will say so.")).warning(),
    }),
    defineField({
      name: "summary",
      title: "One line",
      type: "string",
      description: "Under the name on the Workshops page.",
    }),
    defineField({
      name: "description",
      title: "About the workshop",
      type: "text",
      rows: 10,
      description: "A blank line starts a new paragraph.",
    }),
    defineField({ name: "photo", title: "Photo", type: "photo" }),
    defineField({ name: "length", title: "How long", type: "string", description: "Like “3 hours” or “Two Saturdays”." }),
    defineField({
      name: "cost",
      title: "Cost",
      type: "string",
      description: "Like “$60, materials included”. Leave empty to leave it off.",
    }),
    defineField({ name: "ages", title: "Ages", type: "string", description: "Like “14 and up”." }),
    defineField({ name: "groupSize", title: "Group size", type: "string", description: "Like “Up to 8 people”." }),
    defineField({ name: "teacher", title: "Taught by", type: "string" }),
    defineField({ name: "bring", title: "What to bring", type: "string" }),
  ],
  orderings: [{ title: "Name", name: "title", by: [{ field: "title", direction: "asc" }] }],
  preview: {
    select: { title: "title", onList: "onList", sessions: "sessions" },
    prepare({ title, onList, sessions }) {
      const count = Array.isArray(sessions) ? sessions.length : 0;
      const dates = count === 0 ? "No dates" : count === 1 ? "1 date" : `${count} dates`;
      return { title, subtitle: onList === false ? `Hidden, ${dates.toLowerCase()}` : dates };
    },
  },
});
