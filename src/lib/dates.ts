// Dates are stored as plain YYYY-MM-DD strings in Portland time. They are read as
// UTC midnight and formatted in UTC so that a server in another time zone can't
// move them by a day.

const PORTLAND = "America/Los_Angeles";

export function todayInPortland(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PORTLAND,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function asDate(isoDate: string): Date {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function format(isoDate: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...options }).format(asDate(isoDate));
}

/** "Saturday, January 9", with the year added when it isn't this year. */
export function longDate(isoDate: string): string {
  const sameYear = isoDate.slice(0, 4) === todayInPortland().slice(0, 4);
  return format(isoDate, {
    weekday: "long",
    month: "long",
    day: "numeric",
    ...(sameYear ? {} : { year: "numeric" }),
  });
}

/** "November 2, 2026" */
export function plainDate(isoDate: string): string {
  return format(isoDate, { month: "long", day: "numeric", year: "numeric" });
}

export function weekdayShort(isoDate: string): string {
  return format(isoDate, { weekday: "short" });
}

export function dayOfMonth(isoDate: string): string {
  return String(Number(isoDate.slice(8, 10)));
}

/** "January 2027" */
export function monthLabel(isoDate: string): string {
  return format(isoDate, { month: "long", year: "numeric" });
}

export function isUpcoming(isoDate: string | undefined, today = todayInPortland()): boolean {
  return Boolean(isoDate) && (isoDate as string) >= today;
}
