// The looks being tried on this branch. Each is one stylesheet in
// src/styles/looks/, switched on by data-look on the html element.
export const LOOKS = [
  { value: "plain", label: "plain" },
  { value: "boil", label: "boil" },
  { value: "lighttable", label: "light table" },
  { value: "stripboard", label: "stripboard" },
  { value: "cutout", label: "cut-out" },
] as const;

export type Look = (typeof LOOKS)[number]["value"];

export const LOOK_KEY = "look";

export function isLook(value: unknown): value is Look {
  return LOOKS.some((l) => l.value === value);
}
