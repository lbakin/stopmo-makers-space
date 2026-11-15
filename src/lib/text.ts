// Editors type into plain text fields. A blank line starts a new paragraph and a
// single line break stays a line break. Straight quotes become typographic ones
// here, so nobody has to type them.

export function smartQuotes(text: string): string {
  return text
    .replace(/(^|[\s([{—–-])"/g, "$1“")
    .replace(/"/g, "”")
    .replace(/(^|[\s([{—–-])'/g, "$1‘")
    .replace(/'/g, "’")
    .replace(/\.\.\./g, "…");
}

/** Paragraphs, each a list of lines. */
export function paragraphs(text: string | undefined): string[][] {
  if (!text) return [];
  return text
    .replace(/\r\n?/g, "\n")
    .split(/\n\s*\n/)
    .map((block) =>
      block
        .split("\n")
        .map((line) => smartQuotes(line.trim()))
        .filter(Boolean),
    )
    .filter((lines) => lines.length > 0);
}

export function lines(text: string | undefined): string[] {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map((line) => smartQuotes(line.trim()))
    .filter(Boolean);
}
