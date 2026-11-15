import type { StructureResolver } from "sanity/structure";
import { PAGES } from "../lib/pages";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("The site")
    .items([
      S.listItem()
        .title("Workshops")
        .schemaType("workshop")
        .child(S.documentTypeList("workshop").title("Workshops")),
      S.listItem()
        .title("Events")
        .schemaType("event")
        .child(S.documentTypeList("event").title("Events")),
      S.listItem()
        .title("Notice board")
        .schemaType("notice")
        .child(S.documentTypeList("notice").title("Notice board")),
      S.divider(),
      S.listItem()
        .title("The space")
        .id("settings")
        .child(S.document().schemaType("settings").documentId("settings").title("The space")),
      S.listItem()
        .title("Pages")
        .id("pages")
        .child(
          S.list()
            .title("Pages")
            .items(
              PAGES.map((p) =>
                S.listItem()
                  .title(p.title)
                  .id(p.id)
                  .child(S.document().schemaType("page").documentId(p.id).title(p.title)),
              ),
            ),
        ),
    ]);
