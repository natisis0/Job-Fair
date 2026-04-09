import PastEventCard from "./PastEventCard";

import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";

const PAST_EVENTS = [
  {
    id: 1,
    image: img1,
    title: "6 Strategies to Find Your Conference Keynote and Other Speakers",
    description:
      "Sekarang, kamu bisa produksi tiket fisik untuk eventmu bersama Bostiketbos. Hanya perlu mengikuti beberapa langkah mudah.",
    date: "12 Mar - Jhon Doe",
  },
  {
    id: 2,
    image: img2,
    title: "6 Strategies to Find Your Conference Keynote and Other Speakers",
    description:
      "Sekarang, kamu bisa produksi tiket fisik untuk eventmu bersama Bostiketbos. Hanya perlu mengikuti beberapa langkah mudah.",
    date: "12 Mar - Jhon Doe",
  },
  {
    id: 3,
    image: img3,
    title: "6 Strategies to Find Your Conference Keynote and Other Speakers",
    description:
      "Sekarang, kamu bisa produksi tiket fisik untuk eventmu bersama Bostiketbos. Hanya perlu mengikuti beberapa langkah mudah.",
    date: "12 Mar - Jhon Doe",
  },
];

export default function PastEventCards() {
  return (
    <>
      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full mb-16">
        {PAST_EVENTS.map((event) => (
          <PastEventCard
            key={event.id}
            image={event.image}
            title={event.title}
            description={event.description}
            date={event.date}
          />
        ))}
      </div>

      {/* View More Button */}
      <button className="border-2 border-white text-white rounded-full px-10 py-3 text-sm font-semibold hover:bg-white hover:text-[#36B3BA] transition-colors">
        View More
      </button>
    </>
  );
}
