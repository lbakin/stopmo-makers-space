import type { Session } from "./types";

/** "Full", "Cancelled", or whatever the editor wrote under places left. */
export function sessionState(session: Pick<Session, "status" | "places">): string | undefined {
  if (session.status === "full") return "Full";
  if (session.status === "cancelled") return "Cancelled";
  return session.places;
}

export function isBookable(session: Session): boolean {
  return session.status !== "full" && session.status !== "cancelled";
}
