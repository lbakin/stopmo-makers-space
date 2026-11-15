"use client";

import { useSyncExternalStore } from "react";
import { isLook, LOOK_KEY, LOOKS, type Look } from "@/lib/looks";

const listeners = new Set<() => void>();

function read(): Look {
  const look = document.documentElement.dataset.look;
  return isLook(look) ? look : "plain";
}

function choose(look: Look) {
  const root = document.documentElement;
  try {
    if (look === "plain") localStorage.removeItem(LOOK_KEY);
    else localStorage.setItem(LOOK_KEY, look);
  } catch {
    // Storage can be blocked. The look still holds for this page.
  }
  if (look === "plain") delete root.dataset.look;
  else root.dataset.look = look;

  // Drop ?look= from the address, or a reload would bring the old one back.
  const url = new URL(window.location.href);
  if (url.searchParams.has(LOOK_KEY)) {
    url.searchParams.delete(LOOK_KEY);
    window.history.replaceState(window.history.state, "", url);
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** The bar at the top for switching between looks while they're being tried. */
export function LookChoice() {
  const current = useSyncExternalStore(subscribe, read, () => "plain" as Look);
  return (
    <div className="look-bar">
      <p className="look-bar-inner">
        Look:{" "}
        {LOOKS.map((l, i) => (
          <span key={l.value}>
            {i === LOOKS.length - 1 ? ", or " : i > 0 ? ", " : ""}
            <button type="button" className="look-button" aria-pressed={current === l.value} onClick={() => choose(l.value)}>
              {l.label}
            </button>
          </span>
        ))}
        .
      </p>
    </div>
  );
}
