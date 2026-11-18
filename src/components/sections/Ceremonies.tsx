import { wedding } from "@/config/wedding";
import { generated } from "@/lib/assets";
import { ceremonies, type CeremonyView } from "@/lib/wedding-data";
import { ArchEdge, KolamTexture } from "../art/Ornaments";
import { Reveal } from "../motion/Reveal";

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 12 12" className={`h-3 w-3 ${className}`} fill="currentColor">
      <path d="M6 0 C6.6 4 8 5.4 12 6 C8 6.6 6.6 8 6 12 C5.4 8 4 6.6 0 6 C4 5.4 5.4 4 6 0 Z" />
    </svg>
  );
}

/** Half sunburst that sits at the foot of each card. */
function Sunburst({ className = "" }: { className?: string }) {
  const rays = 13;
  return (
    <svg aria-hidden viewBox="0 0 120 44" className={className} fill="none" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round">
      <path d="M4 2 H116" />
      {Array.from({ length: rays }, (_, k) => {
        const a = Math.PI * (0.08 + (0.84 * k) / (rays - 1));
        return <path key={k} d={`M60 2 L${(60 + Math.cos(a) * 58).toFixed(1)} ${(2 + Math.sin(a) * 40).toFixed(1)}`} />;
      })}
    </svg>
  );
}

function EventCard({ c, delay }: { c: CeremonyView; delay: number }) {
  const image = generated(`ceremony-${c.motif}`);
  return (
    <Reveal variant="card" delay={delay} className="h-full">
      <article className="relative mx-auto flex h-full max-w-[17rem] flex-col rounded-t-[9rem] rounded-b-[1.25rem] bg-ivory p-2 text-center shadow-[0_26px_50px_-24px_rgba(0,0,0,0.6)]">
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-t-[8.5rem] rounded-b-[0.9rem] border-[1.5px] border-gold">
          {image && (
            <div className="relative w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element -- generated ceremony artwork */}
              <img src={image} alt="" loading="lazy" className="block aspect-[4/5] w-full object-cover" />
              {/* melt the foot of the image into the ivory details below */}
              <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ivory via-ivory/70 to-transparent" />
            </div>
          )}
          <div className={`relative flex flex-1 flex-col items-center px-5 pb-4 ${image ? "-mt-6 pt-0" : "pt-10"}`}>
            <Sparkle className="text-gold" />
            <h3 className="mt-3 text-balance font-display text-[1.85rem] leading-[1.05] text-maroon">{c.name}</h3>
            {c.subtitle && <p className="t-deva mt-2 text-[0.95rem] leading-snug text-maroon/80">({c.subtitle})</p>}
            <dl className="mt-3 space-y-0.5 font-display [font-variant-numeric:lining-nums] text-[1.1rem] leading-snug text-ink">
              <div>
                <dt className="sr-only">Date</dt>
                <dd>{c.cardDateLabel}</dd>
              </div>
              {c.place && (
                <div>
                  <dt className="sr-only">Place</dt>
                  <dd>{c.place}</dd>
                </div>
              )}
              <div>
                <dt className="sr-only">Time</dt>
                <dd>{c.cardTimeLabel}</dd>
              </div>
              {c.theme && (
                <div className="pt-2">
                  <dt className="inline font-semibold text-maroon">Theme · </dt>
                  <dd className="inline font-semibold text-maroon">{c.theme}</dd>
                </div>
              )}
            </dl>
            <div className="mt-auto w-full pt-5">
              <div className="flex items-end justify-between text-gold">
                <Sparkle className="mb-6" />
                <Sunburst className="h-9 w-28" />
                <Sparkle className="mb-6" />
              </div>
            </div>
          </div>
          <span aria-hidden className="pointer-events-none absolute inset-1.5 rounded-t-[8.2rem] rounded-b-[0.7rem] border border-gold/35" />
        </div>
      </article>
    </Reveal>
  );
}

export function Ceremonies() {
  if (!wedding.ceremonies.length) return null;
  return (
    <section id="ceremonies" className="section section--dark z-20 overflow-x-clip">
      <ArchEdge color="var(--burgundy)" flip />
      <KolamTexture className="opacity-[0.06]" id="kolam-timeline" />
      <div className="container-wide relative">
        <Reveal className="text-center">
          <p className="t-label text-gold">Mark your calendars</p>
          <h2 className="t-h2 mt-4 text-balance">Wedding Celebration Timeline</h2>
          <p className="t-lead mt-4 text-gold-muted">We can&apos;t wait to celebrate</p>
        </Reveal>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {ceremonies.map((c, i) => (
            <EventCard key={c.id} c={c} delay={i * 120} />
          ))}
        </div>
      </div>
      <ArchEdge color="var(--burgundy)" />
    </section>
  );
}
