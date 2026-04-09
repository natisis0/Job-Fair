import Link from "next/link";
import { getEvents } from "@/utils/dataService";
import { FiChevronDown, FiSearch, FiGrid, FiList } from "react-icons/fi";
import { formatDate } from "@/utils/formatting";
import { formatTime } from "@/utils/formatting";






export default async function EventsPage({ filter = "weekdays" }) {
  const events = await getEvents(filter);

  const getButtonStyles = (type) => {
    if (filter === type) {
      return "border-[#36B3BA] bg-[#D9F2F3] text-[#333]";
    }
    return "border-[#E0E0E0] bg-white text-[#333] hover:border-[#36B3BA]";
  };

  // Group events by month
  const groupedEvents = events.reduce((acc, event) => {
    const month = new Date(event.event_date).toLocaleDateString("en-US", {
      month: "long",
    });
    if (!acc[month]) acc[month] = [];
    acc[month].push(event);
    return acc;
  }, {});

  const months = Object.keys(groupedEvents);

  return (
    <div className="bg-[#F8F9FB] min-h-screen py-16 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-[#1A1A1A] text-4xl md:text-5xl font-bold text-center mb-12">
          Upcoming Events
        </h1>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/events?filter=weekdays"
              scroll={false}
              className={`flex items-center gap-2 border rounded-full px-5 py-2 text-sm font-medium transition-colors ${getButtonStyles(
                "weekdays",
              )}`}
            >
              Weekdays{" "}
              <FiChevronDown
                className={
                  filter === "weekdays" ? "text-[#36B3BA]" : "text-gray-400"
                }
              />
            </Link>
            <Link
              href="/events?filter=popular"
              scroll={false}
              className={`flex items-center gap-2 border rounded-full px-5 py-2 text-sm font-medium transition-colors ${getButtonStyles(
                "popular",
              )}`}
            >
              Popular{" "}
              <FiChevronDown
                className={
                  filter === "popular" ? "text-[#36B3BA]" : "text-gray-400"
                }
              />
            </Link>
            <Link
              href="/events?filter=latest"
              scroll={false}
              className={`flex items-center gap-2 border rounded-full px-5 py-2 text-sm font-medium transition-colors ${getButtonStyles(
                "latest",
              )}`}
            >
              Latest{" "}
              <FiChevronDown
                className={
                  filter === "latest" ? "text-[#36B3BA]" : "text-gray-400"
                }
              />
            </Link>
          </div>

          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-white border border-[#E0E0E0] rounded-full px-12 py-2 text-sm focus:outline-none focus:border-[#36B3BA] transition-colors shadow-sm"
              />
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-[#36B3BA] transition-colors">
                <FiGrid className="w-5 h-5" />
              </button>
              <button className="p-2 text-[#36B3BA] bg-white shadow-sm border border-[#36B3BA] rounded-lg">
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="space-y-6">
          {/* Table Header Row */}
          <div className="bg-[#D9F2F3] rounded-xl px-8 py-3 hidden md:grid grid-cols-5 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider">
            <div>Location</div>
            <div>Date</div>
            <div>Venue</div>
            <div>Time</div>
            <div className="text-right">Enquiry Today</div>
          </div>

          {events.length === 0 && (
            <div className="text-center py-20 text-gray-500 font-medium">
              No upcoming events found at the moment.
            </div>
          )}

          {months.map((month) => (
            <div key={month} className="space-y-4">
              {/* Month Header Row */}
              <div className="bg-[#B0A6D1] rounded-xl px-8 py-2 text-white text-sm font-bold shadow-sm">
                {month}
              </div>

              {/* Event Rows */}
              <div className="space-y-3">
                {groupedEvents[month].map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl p-6 md:px-8 md:py-5 border border-transparent hover:border-[#36B3BA] hover:shadow-lg transition-all shadow-sm grid grid-cols-1 md:grid-cols-5 items-center gap-4"
                  >
                    <div className="text-[#333] font-semibold text-sm">
                      {event.location}
                    </div>
                    <div className="text-[#555] text-sm">
                      {formatDate(event.event_date)}
                    </div>
                    <div className="text-[#555] text-sm font-medium">
                      {event.venue}
                    </div>
                    <div className="text-[#555] text-sm">
                      {formatTime(event.event_time)}
                    </div>
                    <div className="text-right">
                      <Link
                        href={`/events/${event.id}`}
                        className="text-[#36B3BA] text-sm font-bold hover:underline"
                      >
                        More Info+
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {events.length > 0 && (
          <div className="flex justify-center mt-12 pb-12">
            <button className="flex items-center gap-2 border-2 border-[#36B3BA] text-[#36B3BA] rounded-full px-8 py-3 text-sm font-bold hover:bg-[#36B3BA] hover:text-white transition-all transform hover:scale-105">
              Show More <FiChevronDown />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
