import Link from "next/link";
import EventCard from "@/features/upcomingEvents/components/EventCard";
import { formatDate } from "@/utils/formatting";


export default function OtherEvents({otherEvents}) {
  return (
     <section className="py-20 bg-[#F8F9FB]">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[#1A1A1A] text-3xl font-bold mb-2">
              Other Events
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {otherEvents.slice(0, 3).map((e) => (
              <EventCard
                key={e.id}
                id={e.id}
                image={e.hero_image}
                title={e.title}
                organizer={e.organizer}
                location={e.location}
                date={formatDate(e.event_date, "en-US")}
                type={e.event_type}
                audience={e.eligibility}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <Link
              href="/events"
              className="border-2 border-[#36B3BA] text-[#36B3BA] px-10 py-2.5 rounded-full font-bold text-sm hover:bg-[#36B3BA] hover:text-white transition-all"
            >
              View More
            </Link>
          </div>
        </div>
      </section>
  )
}