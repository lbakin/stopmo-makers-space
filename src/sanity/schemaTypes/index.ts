import { event } from "./event";
import { notice } from "./notice";
import { hoursRow, photo, row, session } from "./objects";
import { page } from "./page";
import { settings } from "./settings";
import { workshop } from "./workshop";

export const schemaTypes = [settings, page, workshop, event, notice, photo, session, row, hoursRow];

// Documents that exist once, at a fixed ID. Editors can't create or delete them.
export const FIXED_TYPES = new Set(["settings", "page"]);
