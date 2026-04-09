import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiMapPin, FiBookmark } from "react-icons/fi";

export default function EventCard({
  id,
  image,
  date,
  title,
  organizer,
  type,
  audience,
  location,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col border border-[#eaeaea] h-full">
      {/* Image Container */}
      <div className="relative w-full h-48 md:h-56">
        <Image
          src={image || "/images/event.png"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Date Badge */}
        <div className="absolute -bottom-4 right-4 bg-white px-3 py-2 rounded-full shadow flex items-center gap-1">
          <FiCalendar className="text-[#36B3BA] w-4 h-4" />
          <span className="text-[#333] text-xs font-semibold">{date}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 pt-8 flex flex-col grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-[#2B2B36] text-xl font-bold leading-tight mb-1">
              {title}
            </h3>
            <p className="text-[#555] text-sm font-semibold">by {organizer}</p>
          </div>
          <span className="text-[#888] hover:text-[#36B3BA] transition-colors p-1">
            <FiBookmark className="w-5 h-5" />
          </span>
        </div>

        <div className="mt-4 mb-6 flex flex-col gap-1">
          <p className="text-[#777] text-xs flex items-center gap-1">
            <span className="text-gray-400">&gt;&gt;</span> {type}
          </p>
          <p className="text-[#777] text-xs flex items-center gap-1">
            <span className="text-gray-400">&gt;&gt;</span> {audience}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#888]">
            <FiMapPin className="w-4 h-4" />
            <span className="text-xs">{location}</span>
          </div>
          {/* See more label */}
          <Link href={`/events/${id}`} className="block">
            <span className="text-[#36B3BA] text-xs font-semibold hover:underline flex items-center">
              See more <span className="ml-0.5">&gt;</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
