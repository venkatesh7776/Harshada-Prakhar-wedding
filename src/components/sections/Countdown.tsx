import { generated } from "@/lib/assets";
import { celebrationsEndIso, countdownCeremony } from "@/lib/wedding-data";
import { LotusDivider } from "../art/Ornaments";
import { Reveal } from "../motion/Reveal";
import { CountdownTimer } from "./CountdownTimer";

export function Countdown() {
  if (!countdownCeremony) return null;
  const bg = generated("countdown-garden-desktop");
  const bgMobile = generated("countdown-garden-mobile");

  return (
    <section id="countdown" className={`section relative isolate overflow-hidden ${bg ? "!py-0 text-center" : "text-center"}`}>
      {bg && (
        <div aria-hidden className="absolute inset-0 -z-10">
          <picture>
            {bgMobile && <source media="(orientation: portrait)" srcSet={bgMobile} />}
            {/* eslint-disable-next-line @next/next/no-img-element -- generated garden backdrop */}
            <img src={bg} alt="" className="h-full w-full object-cover object-bottom" />
          </picture>
          {/* lift the whole upper band to ivory so the heading and timer always read clearly over the scenery */}
          <span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(250,245,236,0.96) 0%, rgba(250,245,236,0.9) 34%, rgba(250,245,236,0.6) 52%, rgba(250,245,236,0) 74%)",
            }}
          />
        </div>
      )}

      <div className={`container-wide relative ${bg ? "flex min-h-[32rem] flex-col items-center justify-start pt-[clamp(3.5rem,7vw,6rem)] pb-[clamp(11rem,26vw,17rem)] sm:min-h-[40rem]" : ""}`}>
        {/* soft focused ivory halo directly behind the text block */}
        {bg && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[clamp(2rem,6vw,5rem)] -z-[1] h-[20rem] w-[130%] max-w-[52rem] -translate-x-1/2 blur-xl"
            style={{ background: "radial-gradient(60% 50% at 50% 42%, rgba(250,245,236,0.92), rgba(250,245,236,0.5) 48%, transparent 76%)" }}
          />
        )}
        <Reveal>
          <p className="t-label text-gold">{countdownCeremony.dateLabel}</p>
          <h2 className="t-h2 mt-4">The countdown begins</h2>
          <LotusDivider className="mt-6" />
        </Reveal>
        {celebrationsEndIso && (
          <Reveal delay={150} className="mx-auto mt-10 w-full max-w-3xl">
            <CountdownTimer targetIso={countdownCeremony.startIso} endIso={celebrationsEndIso} />
          </Reveal>
        )}
      </div>
    </section>
  );
}
