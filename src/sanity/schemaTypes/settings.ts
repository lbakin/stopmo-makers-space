import { defineField, defineType } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "The space",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name of the space",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "underName",
      title: "Line under the name",
      type: "string",
      description: "On the home page and in the footer.",
    }),
    defineField({
      name: "status",
      title: "Status line",
      type: "string",
      description: "Like “Opening soon.” or “Open Thursday to Sunday.”",
    }),
    defineField({
      name: "intro",
      title: "Home page note",
      type: "text",
      rows: 8,
      description: "A blank line starts a new paragraph.",
    }),
    defineField({
      name: "homePhoto",
      title: "Home page photo",
      type: "photo",
      description: "Until there’s a photo, the home page shows an empty frame.",
    }),
    defineField({
      name: "address",
      title: "Street address",
      type: "text",
      rows: 3,
      description: "Leave empty until there’s a street address. One line per line on the site.",
    }),
    defineField({
      name: "mapLink",
      title: "Map link",
      type: "url",
      description: "Paste the share link from Google Maps or Apple Maps.",
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "array",
      of: [{ type: "hoursRow" }],
      description: "Leave empty until opening. One row per line on the site.",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) =>
        rule.custom((value?: string) =>
          !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? true : "That doesn’t look like an email address.",
        ),
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      type: "string",
      description: "Without the @.",
      validation: (rule) =>
        rule.custom((value?: string) => (value?.startsWith("@") ? "Leave off the @." : true)),
    }),
    defineField({
      name: "mailingList",
      title: "Mailing list sign-up",
      type: "boolean",
      initialValue: true,
      description: "Shows the sign-up on the Visit page.",
    }),
    defineField({
      name: "mailingListNote",
      title: "Line above the mailing list sign-up",
      type: "string",
    }),
    defineField({
      name: "googleBlurb",
      title: "Google blurb",
      type: "text",
      rows: 2,
      description: "The line or two Google shows under the name in search results.",
      validation: (rule) => rule.max(160).warning("Google cuts it off after about 160 characters."),
    }),
  ],
  preview: { prepare: () => ({ title: "The space" }) },
});
