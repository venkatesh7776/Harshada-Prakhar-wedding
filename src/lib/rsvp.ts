export type RsvpPayload = {
  id: string;
  name: string;
  guests: number;
  phone: string;
  /** Ids of the events the guest will attend */
  events: string[];
};

export type RsvpErrors = Partial<Record<"name" | "guests" | "phone" | "events", string>>;

export const LIMITS = { name: 80, phone: 20 };

/** Shared by the form and the API route so both enforce identical rules. */
export function validateRsvp(
  input: Partial<Record<keyof RsvpPayload, unknown>>,
  opts: { maxGuests: number; eventIds: string[] },
): { ok: true; data: RsvpPayload } | { ok: false; errors: RsvpErrors } {
  const errors: RsvpErrors = {};
  const name = typeof input.name === "string" ? input.name.trim().replace(/\s+/g, " ") : "";
  const phone = typeof input.phone === "string" ? input.phone.trim() : "";
  const guests = Number(input.guests);
  const rawEvents = Array.isArray(input.events) ? input.events : [];
  const events = opts.eventIds.filter((id) => rawEvents.includes(id));

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (!Number.isInteger(guests) || guests < 1 || guests > opts.maxGuests)
    errors.guests = `Please choose between 1 and ${opts.maxGuests} people.`;

  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (phone.length > LIMITS.phone || !/^\+?[\d\s()-]+$/.test(phone) || digits.length < 7 || digits.length > 15)
      errors.phone = "Please enter a valid phone number, or leave it blank.";
  }

  if (!events.length) errors.events = "Please choose at least one event.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    data: { id: typeof input.id === "string" ? input.id.slice(0, 64) : "", name, guests, phone, events },
  };
}
