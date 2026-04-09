import ButtonsInHeroSection from "./buttonsInHeroSection";
import { formatDate } from "@/utils/formatting";

function HeroSection({ event, eventId }) {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8">
      <div className="relative h-[380px] w-full flex items-end justify-center overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${event.hero_image || "/images/event.png"})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="relative z-10 text-center px-6 pb-14 max-w-2xl mb-10">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-2 tracking-tight leading-tight">
            {event.title}
          </h1>
          <p className="text-white text-xs md:text-sm font-medium mb-7 opacity-80 tracking-wide">
            {formatDate(event.event_date)} &nbsp;&bull;&nbsp; {event.location}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonsInHeroSection event={event} eventId={eventId} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
