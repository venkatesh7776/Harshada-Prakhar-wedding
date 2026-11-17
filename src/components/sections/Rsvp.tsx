import { wedding } from "@/config/wedding";
import { rsvpEvents } from "@/lib/wedding-data";
import { LotusDivider } from "../art/Ornaments";
import { Reveal } from "../motion/Reveal";
import { RsvpForm } from "./RsvpForm";

export function Rsvp() {
  if (!wedding.rsvp.enabled || !rsvpEvents.length) return null;

  return (
    <section id="rsvp" className="section bg-blush">
      <div className="container-wide max-w-2xl">
        <Reveal className="text-center">
          <p className="t-label text-gold">Kindly reply</p>
          <h2 className="t-h2 mt-4">RSVP</h2>
          <LotusDivider className="mt-6" />
          <p className="t-lead mx-auto mt-6 max-w-[46ch] text-ink-muted">
            We&apos;d love to know if you&apos;ll be joining us. Your presence will make our celebrations even more special.
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-12">
          <div className="relative rounded-sm border border-gold/40 bg-ivory px-5 py-8 shadow-[0_24px_50px_-30px_rgba(90,20,30,0.45)] sm:px-10 sm:py-10">
            <span aria-hidden className="pointer-events-none absolute inset-2 rounded-[1px] border border-gold/20" />
            <h3 className="t-h3 mb-8 text-center">Please confirm your presence</h3>
            <RsvpForm maxGuests={wedding.rsvp.maxGuests} events={rsvpEvents} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
