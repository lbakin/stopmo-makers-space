"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { SITE_NAME_FALLBACK } from "./src/lib/pages";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { FIXED_TYPES, schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "default",
  title: SITE_NAME_FALLBACK,
  basePath: "/edit",
  projectId: projectId || "unset",
  dataset,
  apiVersion,
  plugins: [structureTool({ structure, title: "Edit" })],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((t) => !FIXED_TYPES.has(t.schemaType)),
  },
  document: {
    // The space and the pages exist once each: they can be edited and published,
    // never deleted or duplicated.
    actions: (actions, { schemaType }) =>
      FIXED_TYPES.has(schemaType)
        ? actions.filter(({ action }) => action === "publish" || action === "discardChanges" || action === "restore")
        : actions,
    newDocumentOptions: (options) => options.filter((o) => !FIXED_TYPES.has(o.templateId)),
  },
});
