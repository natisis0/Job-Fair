import { FiClock, FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";

export default function EventInfoBar({
  daysToGo,
  date,
  time,
  location,
  venue,
  participants,
  tickets,
}) {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-8 -mt-10 relative z-20">
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        {/* Days To Go */}
        <div className="flex items-center gap-3 px-3">
          <FiClock className="w-5 h-5 text-gray-400 shrink-0" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-[#2B2B36]">
              {daysToGo || "0"}
            </span>
            <span className="text-gray-500 font-medium text-xs">
              days to go
            </span>
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-gray-200" />

        {/* Date & Time */}
        <div className="flex items-center gap-3 px-3">
          <FiCalendar className="w-5 h-5 text-gray-400 shrink-0" />
          <div>
            <div className="text-[#2B2B36] font-bold text-sm leading-tight">
              {date}
            </div>
            <div className="text-gray-400 text-xs mt-0.5 font-medium">
              {time}
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-gray-200" />

        {/* Location */}
        <div className="flex items-center gap-3 px-3">
          <FiMapPin className="w-5 h-5 text-gray-400 shrink-0" />
          <div>
            <div className="text-[#2B2B36] font-bold text-sm leading-tight">
              {location}
            </div>
            <div className="text-gray-400 text-xs mt-0.5 font-medium">
              {venue}
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-gray-200" />

        {/* Participants */}
        <div className="flex items-center gap-3 px-3">
          <FiUsers className="w-5 h-5 text-gray-400 shrink-0" />
          <div>
            <div className="text-[#2B2B36] font-bold text-sm leading-tight">
              {participants} Participants
            </div>
            <div className="text-gray-400 text-xs mt-0.5 font-medium">
              {tickets} left
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
