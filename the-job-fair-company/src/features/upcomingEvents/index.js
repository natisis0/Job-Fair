import { FiChevronDown } from "react-icons/fi";
import EventCard from "./components/EventCard";
import { getLatestEvents } from "@/utils/dataService";
import Link from "next/link";
import { formatDate } from "@/utils/formatting";






export default async function UpcomingEvents({ filter = "latest" }) {
  const events = await getLatestEvents(filter);

  const getButtonStyles = (type) => {
    if (filter === type) {
      return "border-[#36B3BA] bg-cyan-50 text-[#333]";
    }
    return "border-[#eaeaea] bg-white shadow-sm text-[#333] hover:bg-gray-50";
  };

  return (
    <section className="bg-[#F8F9FB] w-full py-20 pb-28">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Header section w/ Title & Filters */}

        <div className="flex flex-col items-center mb-12">
          <h2 className="text-[#1A1A1A] text-4xl md:text-[42px] font-bold mb-8">
            Upcoming Events
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Link
              href="/?filter=weekdays"
              scroll={false}
              className={`flex items-center gap-2 border rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${getButtonStyles(
                "weekdays",
              )}`}
            >
              Weekdays <FiChevronDown className="w-4 h-4 text-[#888]" />
            </Link>
            <Link
              href="/?filter=popular"
              scroll={false}
              className={`flex items-center gap-2 border rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${getButtonStyles(
                "popular",
              )}`}
            >
              Popular <FiChevronDown className="w-4 h-4 text-[#888]" />
            </Link>
            <Link
              href="/?filter=latest"
              scroll={false}
              className={`flex items-center gap-2 border rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${getButtonStyles(
                "latest",
              )}`}
            >
              Latest <FiChevronDown className="w-4 h-4 text-[#888]" />
            </Link>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                image={event.hero_image}
                date={formatDate(event.event_date, "en-US")}
                title={event.title}
                organizer={event.organizer}
                type={event.event_type}
                audience={event.eligibility}
                location={event.location}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No upcoming events found.
            </div>
          )}
        </div>

        {/* See All Events Button */}
        <Link href="/events">
          <div className="flex justify-center">
            <button className="border-2 border-[#36B3BA] text-[#36B3BA] rounded-full px-8 py-3 text-sm font-semibold hover:bg-[#36B3BA] hover:text-white transition-colors tracking-wide">
              See All Events
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
}
