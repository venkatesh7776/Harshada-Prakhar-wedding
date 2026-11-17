import { Intro } from "@/components/sections/Intro";
import { Hero } from "@/components/sections/Hero";
import { Invitation as InvitationCard } from "@/components/sections/Invitation";
import { Ceremonies } from "@/components/sections/Ceremonies";
import { Venue } from "@/components/sections/Venue";
import { Rsvp } from "@/components/sections/Rsvp";
import { Countdown } from "@/components/sections/Countdown";
import { Blessings } from "@/components/sections/Blessings";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { TapBlessings } from "@/components/motion/TapBlessings";

export default function Invitation() {
  return (
    <>
      <ScrollProgress />
      <TapBlessings />
      <main>
        {/* The intro cover lifts off the pinned hero; then the invitation card slides up over it */}
        <div className="relative">
          <Intro />
          <Hero />
          <div id="intro-spacer" aria-hidden className="h-[100svh]" />
          <InvitationCard />
        </div>
        <Ceremonies />
        <Venue />
        <Rsvp />
        <Countdown />
        <Blessings />
      </main>
    </>
  );
}
