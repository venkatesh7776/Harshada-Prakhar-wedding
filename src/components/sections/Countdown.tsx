import { celebrationsEndIso, countdownCeremony } from "@/lib/wedding-data";
import { LotusDivider } from "../art/Ornaments";
import { Reveal } from "../motion/Reveal";
import { CountdownTimer } from "./CountdownTimer";

export function Countdown() {
  if (!countdownCeremony) return null;
  return (
    <section id="countdown" className="section">
      <div className="container-wide relative text-center">
        <Reveal>
          <p className="t-label text-gold">{countdownCeremony.dateLabel}</p>
          <h2 className="t-h2 mt-4">The countdown begins</h2>
          <p className="t-lead mx-auto mt-5 max-w-[40ch] text-balance text-ink-muted">
            Our families are thrilled to have you join us in celebrating what we hope will be one of the happiest days of our lives!
          </p>
          <LotusDivider className="mt-8" />
        </Reveal>
        {celebrationsEndIso && (
          <Reveal delay={150} className="mx-auto mt-10 max-w-3xl">
            <CountdownTimer targetIso={countdownCeremony.startIso} endIso={celebrationsEndIso} />
          </Reveal>
        )}
      </div>
    </section>
  );
}
