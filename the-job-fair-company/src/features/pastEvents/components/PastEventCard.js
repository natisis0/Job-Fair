import Image from "next/image";

export default function PastEventCard({ image, title, description, date }) {
  return (
    <div className="bg-white rounded-[20px] shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full border border-gray-100">
      {/* Image Container */}
      <div className="relative w-full h-48 sm:h-52">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Content Container */}
      <div className="p-6 pt-5 flex flex-col grow">
        <h3 className="text-[#1A1A1A] text-lg font-bold leading-tight mb-3">
          {title}
        </h3>
        <p className="text-[#555] text-[13px] leading-relaxed mb-6">
          {description}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-[#888] text-[11px] font-medium tracking-wide">
            {date}
          </span>
          <button className="text-[#36B3BA] text-xs font-bold hover:underline">
            See more &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
