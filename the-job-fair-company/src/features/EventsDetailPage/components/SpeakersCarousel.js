"use client";

import { useRef, useState, useEffect } from "react";
import SpeakerCard from "./SpeakerCard";

export default function SpeakersCarousel({ speakers }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  if (!speakers || speakers.length === 0) {
    return null;
  }

  // Group speakers into chunks of 4 for pagination
  const speakerGroups = [];
  for (let i = 0; i < speakers.length; i += 4) {
    speakerGroups.push(speakers.slice(i, i + 4));
  }

  const numDots = speakerGroups.length;

  const scrollToSection = (index) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: index * clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 bg-[#AE9FCD]">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
         <div className="text-center mb-12">
            <h2 className="text-white text-3xl font-bold mb-2">Speakers</h2>
            <p className="text-white/80 text-sm">Part of lorem ipsum dolor</p>
          </div>
        <div className="w-full">
          {/* Carousel Container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-8 mb-10 pb-4 no-scrollbar snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {speakerGroups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="min-w-full snap-start grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {group.map((s, i) => (
                  <div key={i}>
                    <SpeakerCard {...s} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          {numDots > 1 && (
            <div className="flex justify-center items-center gap-2">
              {Array.from({ length: numDots }).map((_, i) => (
                <div
                  key={i}
                  onClick={() => scrollToSection(i)}
                  className={`transition-all duration-300 cursor-pointer rounded-full ${
                    activeIndex === i
                      ? "w-3 h-3 bg-[#36B3BA] shadow-[0_0_10px_rgba(54,179,186,0.5)]"
                      : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
