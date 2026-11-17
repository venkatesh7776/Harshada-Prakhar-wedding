import { wedding } from "@/config/wedding";
import { formatDate, formatTime, zonedToDate, zoneLabel } from "./time";

const tz = wedding.timeZone;

/** Bride first, as on the printed invitation. */
export const coupleNames = `${wedding.bride.name} & ${wedding.groom.name}`;

export const weddingDate = wedding.weddingStart ? zonedToDate(wedding.weddingStart, tz) : undefined;

export const weddingDateLabel = weddingDate
  ? formatDate(weddingDate, tz, { weekday: "long" })
  : "Date to be announced";

const tz2 = wedding.secondaryTimeZone;
const dayKey = (d: Date, zone: string) => formatDate(d, zone, { day: "numeric", month: "numeric", year: "numeric" });

/** The same time in the secondary zone, e.g. "8:00 am EST" — with the date when it falls on a different day. */
function altTimeLabel(start: Date, end?: Date) {
  if (!tz2) return undefined;
  const range = `${formatTime(start, tz2)}${end ? ` – ${formatTime(end, tz2)}` : " onwards"} ${zoneLabel(start, tz2)}`;
  return dayKey(start, tz2) === dayKey(start, tz)
    ? range
    : `${range}, ${formatDate(start, tz2, { weekday: "short", day: "numeric", month: "short", year: undefined })}`;
}

const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
};

/** "19th Jan 2027", as written on the printed card. */
function cardDate(d: Date) {
  const day = Number(formatDate(d, tz, { day: "numeric", month: undefined, year: undefined }));
  return `${ordinal(day)} ${formatDate(d, tz, { day: undefined, month: "short", year: "numeric" })}`;
}

const venueById = new Map(wedding.venues.map((v) => [v.id, v]));

/** Ceremonies with real instants, their venue and display strings, in the configured display order. */
export const ceremonies = wedding.ceremonies
  .map((c) => {
    const start = zonedToDate(c.start, tz);
    const end = c.end ? zonedToDate(c.end, tz) : undefined;
    const venue = venueById.get(c.venueId);
    if (!venue) throw new Error(`Ceremony "${c.id}" references unknown venue "${c.venueId}"`);
    return {
      ...c,
      venue,
      startIso: start.toISOString(),
      // Calendars need an end; default to 3 hours when none is supplied.
      endIso: (end ?? new Date(start.getTime() + 3 * 3600_000)).toISOString(),
      dateLabel: formatDate(start, tz, { weekday: "long" }),
      cardDateLabel: cardDate(start),
      cardTimeLabel: `${formatTime(start, tz)}${end ? ` – ${formatTime(end, tz)}` : " onwards"}`,
      /** e.g. "19 Jan, 10 am" — used for the RSVP event choices */
      shortLabel: `${formatDate(start, tz, { month: "short", year: undefined })}, ${formatTime(start, tz).replace(":00", "")}`,
      timeLabel: `${formatTime(start, tz)}${end ? ` – ${formatTime(end, tz)}` : " onwards"} ${zoneLabel(start, tz)}`,
      altTimeLabel: c.showSecondaryTime === false ? undefined : altTimeLabel(start, end),
    };
  });

export type CeremonyView = (typeof ceremonies)[number];

/** The ceremony featured in the venue section (the Wedding). */
export const venueCeremony = ceremonies.find((c) => c.id === wedding.venueCeremonyId);

/** The ceremony the countdown targets (the Wedding). */
export const countdownCeremony = ceremonies.find((c) => c.id === wedding.countdownCeremonyId);

/** Events guests can choose on the RSVP form. */
export const rsvpEvents = ceremonies.filter((c) => c.rsvp).map((c) => ({ id: c.id, label: `${c.name.split("/")[0]} (${c.shortLabel})` }));

/**
 * The countdown switches to "Today is the day!" when the wedding starts and stays there until
 * the end of that day (IST) or the last ceremony, whichever is later; then it shows a thank-you.
 */
export const celebrationsEndIso = (() => {
  if (!countdownCeremony) return undefined;
  const endOfDay = zonedToDate(`${wedding.ceremonies.find((c) => c.id === countdownCeremony.id)!.start.split("T")[0]}T23:59`, tz).toISOString();
  return [endOfDay, ...ceremonies.map((c) => c.endIso)].sort().at(-1);
})();
