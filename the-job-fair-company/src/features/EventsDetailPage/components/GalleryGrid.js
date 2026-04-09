import Image from "next/image";

export default function GalleryGrid({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
        <p className="text-gray-400 font-medium italic">No gallery images available for this event yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative rounded-2xl overflow-hidden h-56 md:h-64 hover:shadow-lg transition-all duration-300 group"
        >
          <Image
            src={item.image_url || "/images/event.png"}
            alt={item.alt || "Gallery Image"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ))}
    </div>
  );
}
