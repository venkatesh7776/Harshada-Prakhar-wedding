"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { LIMITS, validateRsvp, type RsvpErrors } from "@/lib/rsvp";

type Status = "idle" | "submitting" | "success" | "error";
type Saved = { name: string };
type EventOption = { id: string; label: string };

const STORAGE_KEY = "rsvp-submitted";

const messages: Record<string, string> = {
  not_configured: "Online RSVPs aren't open yet, so your response was not saved. Please reply to the family directly — we're sorry for the trouble.",
  storage_failed: "We couldn't save your response just now, so it was not recorded. Please try again in a moment.",
  closed: "RSVPs are now closed. Please contact the family directly.",
  network: "We couldn't reach the server. Please check your connection and try again.",
};

export function RsvpForm({ maxGuests, events }: { maxGuests: number; events: EventOption[] }) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<RsvpErrors>({});
  const [serverError, setServerError] = useState("");
  const [saved, setSaved] = useState<Saved | null>(null);
  const requestId = useRef<string>("");
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage once on mount
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = new FormData(e.currentTarget);
    const input = {
      name: String(form.get("name") ?? ""),
      guests: String(form.get("guests") ?? ""),
      phone: String(form.get("phone") ?? ""),
      events: form.getAll("events").map(String),
    };
    const check = validateRsvp(input, { maxGuests, eventIds: events.map((ev) => ev.id) });
    if (!check.ok) {
      setErrors(check.errors);
      const first = Object.keys(check.errors)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setServerError("");
    setStatus("submitting");
    // Same id for retries of this submission so the backend can de-duplicate.
    requestId.current ||= crypto.randomUUID();

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...check.data, id: requestId.current, website: String(form.get("website") ?? "") }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        setServerError(messages[json.error] ?? messages.storage_failed);
        setStatus("error");
        return;
      }
      const record = { name: check.data.name };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      } catch {}
      setSaved(record);
      setStatus("success");
      requestId.current = "";
    } catch {
      setServerError(messages.network);
      setStatus("error");
    }
  }

  useEffect(() => {
    if (status === "success" || status === "error") statusRef.current?.focus();
  }, [status]);

  if (status === "success" && saved) {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="fade-in py-8 text-center outline-none">
        <svg aria-hidden viewBox="0 0 48 48" className="mx-auto h-14 w-14 text-gold" fill="none" stroke="currentColor" strokeWidth={1.4}>
          <circle cx="24" cy="24" r="22" pathLength={1} className="draw-line" />
          <path d="M15 24.5l6 6 12-13" pathLength={1} className="draw-line" style={{ "--d": "400ms" } as React.CSSProperties} />
        </svg>
        <h3 className="t-h3 mt-6">Thank you, {saved.name}</h3>
        <p className="mt-3 text-ink-muted">Your RSVP has been received. We can&apos;t wait to celebrate with you.</p>
      </div>
    );
  }

  const field =
    "mt-2 w-full rounded-sm border border-maroon/25 bg-ivory px-4 py-3 text-ink outline-none transition-colors duration-300 placeholder:text-ink-muted/60 focus:border-maroon focus-visible:outline-2 focus-visible:outline-gold aria-[invalid=true]:border-maroon";
  const label = "t-label text-[11px] text-maroon";
  const err = (k: keyof RsvpErrors) =>
    errors[k] && (
      <p id={`${uid}-${k}-err`} className="mt-2 text-sm text-maroon">
        {errors[k]}
      </p>
    );
  const describedBy = (k: keyof RsvpErrors) => (errors[k] ? `${uid}-${k}-err` : undefined);

  return (
    <form noValidate onSubmit={onSubmit} className="relative space-y-6 text-left" aria-busy={status === "submitting"}>
      {saved && (
        <p className="rounded-sm border border-gold/40 bg-ivory/70 px-4 py-3 text-sm text-ink-muted">
          You&apos;ve already replied as <strong className="font-medium text-ink">{saved.name}</strong>. Submit again only to update your response.
        </p>
      )}

      <div>
        <label htmlFor={`${uid}-name`} className={label}>
          Name
        </label>
        <input
          id={`${uid}-name`}
          name="name"
          autoComplete="name"
          maxLength={LIMITS.name}
          required
          aria-invalid={!!errors.name}
          aria-describedby={describedBy("name")}
          className={field}
          placeholder="Full name"
        />
        {err("name")}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-guests`} className={label}>
            Number of people
          </label>
          <select id={`${uid}-guests`} name="guests" defaultValue="1" aria-invalid={!!errors.guests} aria-describedby={describedBy("guests")} className={field}>
            {Array.from({ length: maxGuests }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          {err("guests")}
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className={label}>
            Contact number <span className="normal-case tracking-normal text-ink-muted">(optional)</span>
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            className={field}
            placeholder="+91 98765 43210"
          />
          {err("phone")}
        </div>
      </div>

      <fieldset aria-describedby={describedBy("events")}>
        <legend className={label}>Events attending</legend>
        <div className="mt-3 grid gap-3">
          {events.map((ev) => (
            <label
              key={ev.id}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border border-maroon/25 bg-ivory px-4 py-3 transition-colors duration-300 has-[:checked]:border-maroon has-[:checked]:bg-maroon has-[:checked]:text-ivory has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold"
            >
              <input type="checkbox" name="events" value={ev.id} className="h-4 w-4 accent-gold" />
              <span className="font-display text-lg [font-variant-numeric:lining-nums]">{ev.label}</span>
            </label>
          ))}
        </div>
        {err("events")}
      </fieldset>

      {/* Honeypot for bots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {serverError && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-sm border border-maroon/40 bg-rose/50 px-4 py-3 text-sm text-maroon outline-none">
          {serverError}
        </div>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn btn--maroon w-full disabled:cursor-wait disabled:opacity-80">
        {status === "submitting" ? (
          <>
            <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12 3a9 9 0 1 0 9 9" />
            </svg>
            Sending…
          </>
        ) : (
          "Confirm RSVP"
        )}
      </button>
    </form>
  );
}
