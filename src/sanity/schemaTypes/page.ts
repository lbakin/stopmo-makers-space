import { defineField, defineType } from "sanity";

// One document per page, with fixed IDs from src/lib/pages.ts. Only the studio
// and room rental pages show a list.
const PAGES_WITH_A_LIST = ["page-studio", "page-rental"];

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "In the menu and at the top of the page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "on",
      title: "Page is on",
      type: "boolean",
      initialValue: true,
      description: "Turn off to take the page out of the menu until it’s ready.",
    }),
    defineField({
      name: "contentsLine",
      title: "Line in the contents",
      type: "string",
      description: "Under the title in the list on the home page.",
    }),
    defineField({
      name: "body",
      title: "Text",
      type: "text",
      rows: 10,
      description: "At the top of the page. A blank line starts a new paragraph.",
    }),
    defineField({
      name: "rows",
      title: "List",
      type: "array",
      of: [{ type: "row" }],
      description: "Shown under the text, one row per line. On the studio page it’s the equipment.",
      hidden: ({ document }) => !PAGES_WITH_A_LIST.includes(String(document?._id).replace(/^drafts\./, "")),
    }),
  ],
  preview: { select: { title: "title", on: "on" }, prepare: ({ title, on }) => ({ title, subtitle: on === false ? "Off" : undefined }) },
});
