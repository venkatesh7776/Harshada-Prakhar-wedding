import { generated } from "@/lib/assets";
import { venueCeremony } from "@/lib/wedding-data";
import { LotusDivider } from "../art/Ornaments";
import { Reveal } from "../motion/Reveal";

/** "Looking forward to see you" — the decorated mandap beside the venue card. */
export function Venue() {
  if (!venueCeremony) return null;
  const { venue } = venueCeremony;
  const mandap = generated("venue-mandap");

  return (
    <section id="venue" className="section">
      <div className="container-wide max-w-5xl">
        <Reveal className="text-center">
          <p className="t-label text-gold">Location</p>
          <h2 className="t-h2 mt-4 text-balance">Looking forward to seeing you</h2>
          <LotusDivider className="mt-6" />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-[1.2fr_1fr] md:gap-8">
          <Reveal variant="image" className="relative aspect-[3/2] w-full overflow-hidden rounded-sm bg-ivory-deep p-2 ring-1 ring-gold/40 md:aspect-auto md:min-h-[22rem]">
            {mandap ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element -- generated mandap artwork */}
                <img src={mandap} alt="A decorated wedding mandap stage with floral garlands and golden seating" loading="lazy" className="h-full w-full rounded-[2px] object-cover" />
                <span aria-hidden className="pointer-events-none absolute inset-2 rounded-[1px] border border-gold/40" />
              </>
            ) : (
              <span className="absolute inset-0 grid place-items-center text-ink-muted">Venue</span>
            )}
          </Reveal>

          <Reveal delay={120}>
            <div className="relative flex h-full flex-col items-center justify-center rounded-sm bg-burgundy px-6 py-12 text-center text-ivory shadow-[0_24px_50px_-30px_rgba(72,20,31,0.7)] md:items-start md:px-10 md:text-left">
              <span aria-hidden className="pointer-events-none absolute inset-2 rounded-[1px] border border-gold/30" />
              <svg aria-hidden viewBox="0 0 24 24" className="h-8 w-8 text-gold" fill="none" stroke="currentColor" strokeWidth={1.2}>
                <path d="M12 21.5s-6.5-6-6.5-11.2a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11.2-6.5 11.2Z" />
                <circle cx="12" cy="10.3" r="2.3" />
              </svg>
              <h3 className="mt-5 font-display text-[clamp(1.9rem,1.5rem+1.4vw,2.6rem)] leading-tight text-ivory">{venue.name}</h3>
              <address className="mt-3 max-w-[30ch] not-italic leading-relaxed text-ivory/80">{venue.address}</address>
              <a href={venue.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn--gold group relative mt-8">
                Get Directions
                <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={1.4}>
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
