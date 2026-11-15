"use client";

import { useSyncExternalStore } from "react";
import { COLORS_KEY as KEY } from "@/lib/head-script";

type Choice = "light" | "dark" | "device";

const listeners = new Set<() => void>();

function read(): Choice {
  const theme = document.documentElement.dataset.theme;
  return theme === "light" || theme === "dark" ? theme : "device";
}

function choose(choice: Choice) {
  const root = document.documentElement;
  try {
    if (choice === "device") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, choice);
  } catch {
    // Storage can be blocked. The choice still holds for this page.
  }
  if (choice === "device") delete root.dataset.theme;
  else root.dataset.theme = choice;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const OPTIONS: { value: Choice; label: string }[] = [
  { value: "light", label: "light" },
  { value: "dark", label: "dark" },
  { value: "device", label: "same as your device" },
];

export function ColorChoice() {
  const current = useSyncExternalStore(subscribe, read, () => "device" as Choice);
  return (
    <p className="color-choice">
      Colors:{" "}
      {OPTIONS.map((o, i) => (
        <span key={o.value}>
          {i === OPTIONS.length - 1 ? ", or " : i > 0 ? ", " : ""}
          <button type="button" className="text-button" aria-pressed={current === o.value} onClick={() => choose(o.value)}>
            {o.label}
          </button>
        </span>
      ))}
      .
    </p>
  );
}
