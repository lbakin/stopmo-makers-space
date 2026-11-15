"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";

// Netlify reads the form definitions in public/__forms.html at deploy time and
// takes submissions posted to that file. Every field here must also be there.
const FORMS_PATH = "/__forms.html";

type State = "idle" | "sending" | "sent" | "failed";

export function SiteForm({
  name,
  submitLabel,
  sentMessage,
  failedMessage,
  children,
}: {
  name: string;
  submitLabel: string;
  sentMessage: string;
  failedMessage: string;
  children: ReactNode;
}) {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = new URLSearchParams();
    new FormData(form).forEach((value, key) => body.append(key, String(value)));
    setState("sending");

    // Netlify Forms only exist on Netlify. Locally, pretend it went through.
    if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
      console.info(`Form "${name}" would be sent on Netlify:`, Object.fromEntries(body));
      form.reset();
      setState("sent");
      return;
    }

    try {
      const response = await fetch(FORMS_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setState("sent");
    } catch {
      setState("failed");
    }
  }

  return (
    <form name={name} method="POST" action={FORMS_PATH} onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value={name} />
      <p hidden>
        <label>
          Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      {children}
      <button type="submit" className="button" disabled={state === "sending"}>
        {state === "sending" ? "Sending" : submitLabel}
      </button>
      <p className="form-status" role="status">
        {state === "sent" && sentMessage}
        {state === "failed" && failedMessage}
      </p>
    </form>
  );
}

export function Field({
  label,
  name,
  type = "text",
  help,
  required,
  autoComplete,
  multiline,
}: {
  label: string;
  name: string;
  type?: "text" | "email";
  help?: string;
  required?: boolean;
  autoComplete?: string;
  multiline?: boolean;
}) {
  const id = useId();
  const helpId = help ? `${id}-help` : undefined;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {help && (
        <span className="help" id={helpId}>
          {help}
        </span>
      )}
      {multiline ? (
        <textarea id={id} name={name} required={required} aria-describedby={helpId} />
      ) : (
        <input id={id} name={name} type={type} required={required} autoComplete={autoComplete} aria-describedby={helpId} />
      )}
    </div>
  );
}
