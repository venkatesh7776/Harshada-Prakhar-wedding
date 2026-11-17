import { wedding } from "@/config/wedding";
import { LotusDivider, Mandala } from "../art/Ornaments";
import { Reveal } from "../motion/Reveal";

/** The invitation card: the hosting family's request, the couple, and the bride's parents. No portraits. */
export function Invitation() {
  const { invitationCard, groom, bride, invocation } = wedding;
  const brideParents = bride.parents;

  return (
    <section
      id="invitation"
      className="section relative z-10 overflow-hidden rounded-t-[2rem] bg-ivory shadow-[0_-24px_60px_-24px_rgba(48,39,35,0.45)] sm:rounded-t-[3rem]"
    >
      <Mandala className="pointer-events-none absolute left-1/2 top-1/2 w-[min(1100px,160vw)] -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.07]" />

      <Reveal className="relative mx-auto max-w-2xl">
        {/* arched card with a double gold frame */}
        <div className="rounded-t-[min(20rem,45vw)] rounded-b-md bg-blush p-2.5 shadow-[0_30px_70px_-34px_rgba(72,20,31,0.5)]">
          <div className="relative rounded-t-[min(19.4rem,44vw)] rounded-b-sm border-[1.5px] border-gold px-6 pb-14 pt-[clamp(4rem,10vw,6.5rem)] text-center sm:px-14">
            <span aria-hidden className="pointer-events-none absolute inset-2 rounded-t-[min(19rem,43vw)] rounded-b-[2px] border border-gold/35" />

            {/* eslint-disable-next-line @next/next/no-img-element -- small decorative icon */}
            <img src="/images/intro/ganesha.webp" alt="Lord Ganesha" width={320} height={417} loading="lazy" className="mx-auto h-16 w-auto drop-shadow-[0_6px_10px_rgba(72,20,31,0.18)]" />
            <p className="mt-3 font-display text-base italic tracking-wide text-[#9A7535]">{invocation}</p>

            <p className="mt-10 text-balance font-display text-[clamp(1.5rem,1.25rem+1vw,2rem)] font-medium leading-tight text-maroon">{invitationCard.hosts}</p>
            <p className="t-lead mx-auto mt-4 max-w-[38ch] text-balance text-ink-muted">{invitationCard.request}</p>

            <h2 className="t-names mt-10 text-maroon">
              <span className="block">{groom.firstName ?? groom.name}</span>
              <span className="my-2 block font-display text-[0.5em] italic leading-none text-gold">And</span>
              <span className="block">{bride.firstName ?? bride.name}</span>
            </h2>

            {brideParents && (
              <>
                <LotusDivider className="mt-10" />
                <p className="mt-6 font-display text-lg italic text-ink-muted">{brideParents.relation}</p>
                <p className="mt-1 text-balance font-display text-[clamp(1.4rem,1.2rem+0.8vw,1.8rem)] font-medium leading-tight text-maroon">
                  {brideParents.names.join(" and ")}
                </p>
              </>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
