import { defineArrayMember, defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  description: "Anything on the calendar that isn’t a workshop.",
  fields: [
    defineField({
      name: "title",
      title: "What it is",
      type: "string",
      description: "Like “Open studio” or “Screening: films made here”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      description: "A word or two under the name on the calendar, like “Screening” or “Meetup”.",
    }),
    defineField({
      name: "onList",
      title: "On the calendar",
      type: "boolean",
      initialValue: true,
      description: "Turn off to hide it without deleting it.",
    }),
    defineField({
      name: "dates",
      title: "Dates",
      type: "array",
      of: [defineArrayMember({ type: "session" })],
      description: "One row per date. Past dates drop off the site on their own.",
    }),
    defineField({
      name: "summary",
      title: "One line",
      type: "string",
      description: "Shown on the calendar under the name.",
    }),
    defineField({ name: "cost", title: "Cost", type: "string", description: "Leave empty if it’s free or not decided." }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      description: "Optional. For tickets or more about it.",
    }),
  ],
  preview: { select: { title: "title", subtitle: "kind" } },
});
