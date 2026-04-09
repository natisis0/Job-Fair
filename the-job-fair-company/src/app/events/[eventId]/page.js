import Countdown from "@/features/EventsDetailPage/components/Countdown";
import EventInfoBar from "@/features/EventsDetailPage/components/EventInfoBar";
import SpeakersCarousel from "@/features/EventsDetailPage/components/SpeakersCarousel";
import Footer from "@/features/footer";
import Header from "@/features/header";
import {
  getCompaniesByEventId,
  getEventById,
  getEventPhotosByEventId,
  getLatestEvents,
  getSpeakersByEventId,
} from "@/utils/dataService";
import { formatDate, formatTime } from "@/utils/formatting";

import AttendingCompanies from "@/features/EventsDetailPage/components/AttendingCompanies";
import Gallery from "@/features/EventsDetailPage/components/Gallery";
import HeroSection from "@/features/EventsDetailPage/components/HeroSection";
import OtherEvents from "@/features/EventsDetailPage/components/OtherEvents";
import OverviewSection from "@/features/EventsDetailPage/components/OverviewSection";
import { calculateDaysToGo } from "@/utils/formatting";
import { notFound } from "next/navigation";

export default async function EventDetailPage({ params }) {
  const { eventId } = await params;
  const event = await getEventById(eventId);
  const otherEvents = await getLatestEvents();

  if (!event) {
    notFound();
  }

  const attendingCompanies = await getCompaniesByEventId(eventId);
  const speakers = await getSpeakersByEventId(eventId);
  const galleryItems = await getEventPhotosByEventId(eventId);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection event={event} eventId={eventId} />

      <EventInfoBar
        daysToGo={calculateDaysToGo(event.event_date)}
        date={formatDate(event.event_date, "en-US")}
        time={formatTime(event.event_time)}
        location={event.location}
        venue={event.venue}
        participants={event.participants_count || "300"}
        tickets={event.available_tickets || "150 thickets"}
      />

      <OverviewSection event={event} />
      <Countdown targetDate={event.event_date} />
      <AttendingCompanies companies={attendingCompanies} />
      <SpeakersCarousel speakers={speakers} />
      <Gallery galleryItems={galleryItems} />
      <OtherEvents otherEvents={otherEvents} />
      <Footer />
    </div>
  );
}
