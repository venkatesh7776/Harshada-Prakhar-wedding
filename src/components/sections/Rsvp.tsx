import { wedding } from "@/config/wedding";
import { generated } from "@/lib/assets";
import { rsvpEvents } from "@/lib/wedding-data";
import { ArchEdge, KolamTexture } from "../art/Ornaments";
import { Reveal } from "../motion/Reveal";
import { RsvpForm } from "./RsvpForm";

export function Rsvp() {
  if (!wedding.rsvp.enabled || !rsvpEvents.length) return null;
  const kalash = generated("ornament-kalash");
  const floral = generated("floral-divider");

  return (
    <section id="rsvp" className="section section--dark relative overflow-hidden">
      <ArchEdge color="var(--burgundy)" flip />
      <KolamTexture className="opacity-[0.07]" id="kolam-rsvp" />
      <div className="container-wide relative max-w-2xl">
        <Reveal className="text-center">
          {kalash && (
            <span className="mx-auto mb-5 grid h-20 w-20 place-items-center overflow-hidden rounded-full bg-ivory ring-1 ring-gold/60">
              {/* eslint-disable-next-line @next/next/no-img-element -- small decorative ornament on a medallion */}
              <img src={kalash} alt="" width={160} height={160} loading="lazy" className="h-16 w-auto" />
            </span>
          )}
          <p className="t-label text-gold">Kindly reply</p>
          <h2 className="t-h2 mt-4">RSVP</h2>
          {floral && (
            // eslint-disable-next-line @next/next/no-img-element -- decorative floral swag
            <img src={floral} alt="" width={480} height={167} loading="lazy" className="mx-auto mt-5 h-auto w-60" />
          )}
          <p className="t-lead mx-auto mt-5 max-w-[46ch] text-ivory/80">
            We&apos;d love to know if you&apos;ll be joining us. Your presence will make our celebrations even more special.
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-12">
          <div className="relative rounded-sm border border-gold/50 bg-ivory px-5 py-8 text-ink shadow-[0_30px_60px_-28px_rgba(0,0,0,0.6)] sm:px-10 sm:py-10">
            <span aria-hidden className="pointer-events-none absolute inset-2 rounded-[1px] border border-gold/25" />
            <h3 className="t-h3 mb-8 text-center !text-maroon">Please confirm your presence</h3>
            <RsvpForm maxGuests={wedding.rsvp.maxGuests} events={rsvpEvents} />
          </div>
        </Reveal>
      </div>
      <ArchEdge color="var(--burgundy)" />
    </section>
  );
}
