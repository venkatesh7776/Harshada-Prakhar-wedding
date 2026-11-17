import { wedding } from "@/config/wedding";
import { generated } from "@/lib/assets";
import { LotusDivider, Mandala } from "../art/Ornaments";
import { Reveal } from "../motion/Reveal";

/** A small gold filigree tucked into each corner of the card, like printed foil. */
function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" aria-hidden>
      <path d="M4 20 C4 11 11 4 20 4" />
      <path d="M4 27 C4 14 14 4 27 4" strokeOpacity={0.55} />
      <path d="M9 9 C14 11 16 14 16 19 M9 9 C11 14 14 16 19 16" strokeOpacity={0.7} />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** The invitation card: the hosting family's request, the couple, and the bride's parents. No portraits. */
export function Invitation() {
  const { invitationCard, groom, bride, invocation } = wedding;
  const brideParents = bride.parents;
  const floral = generated("floral-divider");

  return (
    <section
      id="invitation"
      className="section relative z-10 overflow-hidden rounded-t-[2rem] bg-ivory shadow-[0_-24px_60px_-24px_rgba(48,39,35,0.45)] sm:rounded-t-[3rem]"
    >
      <Mandala className="pointer-events-none absolute left-1/2 top-1/2 w-[min(1100px,160vw)] -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.07]" />

      <Reveal className="relative mx-auto max-w-2xl">
        {/* arched invitation card — deep red with a gold foil frame, like a printed card */}
        <div
          className="rounded-t-[min(20rem,45vw)] rounded-b-md p-[3px] shadow-[0_46px_90px_-30px_rgba(38,9,15,0.72)]"
          style={{ background: "linear-gradient(135deg,#e8ce8d 0%,#b2843b 38%,#f0dba1 55%,#a4762f 100%)" }}
        >
          <div
            className="relative overflow-hidden rounded-t-[min(19.6rem,44vw)] rounded-b-[5px] border border-gold/50 px-6 pb-14 pt-[clamp(4rem,10vw,6.5rem)] text-center sm:px-14"
            style={{ background: "radial-gradient(135% 95% at 50% -8%, #73273a 0%, #5d1d2a 42%, #4a1522 72%, #3f1019 100%)" }}
          >
            {/* gold mandala pressed into the card like a watermark */}
            <Mandala className="pointer-events-none absolute left-1/2 top-1/2 w-[165%] -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.06]" />
            {/* soft foil sheen + inner gold hairline */}
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(255,244,222,0.09),transparent_34%)]" />
            <span aria-hidden className="pointer-events-none absolute inset-2 rounded-t-[min(19rem,43vw)] rounded-b-[3px] border border-gold/40" />
            <CornerFlourish className="pointer-events-none absolute left-3.5 top-3.5 h-9 w-9 text-gold/70" />
            <CornerFlourish className="pointer-events-none absolute right-3.5 top-3.5 h-9 w-9 -scale-x-100 text-gold/70" />
            <CornerFlourish className="pointer-events-none absolute bottom-3.5 left-3.5 h-9 w-9 -scale-y-100 text-gold/70" />
            <CornerFlourish className="pointer-events-none absolute bottom-3.5 right-3.5 h-9 w-9 -scale-100 text-gold/70" />

            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element -- small decorative icon */}
              <img src="/images/intro/ganesha.webp" alt="Lord Ganesha" width={320} height={417} loading="lazy" className="mx-auto h-16 w-auto drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]" />
              <p className="mt-3 font-display text-base italic tracking-wide text-gold-muted">{invocation}</p>

              {floral && (
                // eslint-disable-next-line @next/next/no-img-element -- decorative floral swag
                <img src={floral} alt="" width={520} height={181} loading="lazy" className="mx-auto mt-6 h-auto w-64 sm:w-72" />
              )}

              <p className="mt-8 text-balance font-display text-[clamp(1.5rem,1.25rem+1vw,2rem)] font-medium leading-tight text-gold-muted">{invitationCard.hosts}</p>
              <p className="t-lead mx-auto mt-4 max-w-[38ch] text-balance text-ivory/75">{invitationCard.request}</p>

              <h2 className="t-names mt-10 text-gold-muted [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
                <span className="block">{groom.firstName ?? groom.name}</span>
                <span className="my-2 block font-display text-[0.5em] italic leading-none text-gold">And</span>
                <span className="block">{bride.firstName ?? bride.name}</span>
              </h2>

              {brideParents && (
                <>
                  <LotusDivider className="mt-10" />
                  <p className="mt-6 font-display text-lg italic text-ivory/70">{brideParents.relation}</p>
                  <p className="mt-1 text-balance font-display text-[clamp(1.4rem,1.2rem+0.8vw,1.8rem)] font-medium leading-tight text-gold-muted">
                    {brideParents.names.join(" and ")}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
