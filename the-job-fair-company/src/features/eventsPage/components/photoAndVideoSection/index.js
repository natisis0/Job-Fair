import React from "react";
import Image from "next/image";

import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";
import img3 from "./assets/img3.png";
import img4 from "./assets/img4.png";
import img5 from "./assets/img5.png";
import img6 from "./assets/img6.png";

export default function PhotoAndVideoSection() {
  return (
    <section className="py-20 relative w-full overflow-hidden bg-[#fbfdfd]">
      {/* Background Waves */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-0 pointer-events-none">
        <Image
          src="/images/waves.png"
          alt="Waves background"
          width={1920}
          height={800}
          className="w-full h-auto object-cover opacity-60"
        />
      </div>

      <div className="container relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        {/* Header Tabs */}
        <div className="flex justify-center items-center gap-6 mb-12">
          <h2 className="text-3xl md:text-[34px] font-bold text-gray-900 border-b-[3px] border-gray-900 pb-1 cursor-pointer">
            Photos
          </h2>
          <h2 className="text-3xl md:text-[34px] font-bold text-gray-300 pb-1 cursor-pointer hover:text-gray-400 transition-colors">
            Videos
          </h2>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            <div className="w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Image
                src={img1}
                alt="Event Audience"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Image
                src={img4}
                alt="Working on tablet"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            <div className="w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Image
                src={img2}
                alt="Networking"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Image
                src={img5}
                alt="Microphone"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            <div className="w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Image
                src={img3}
                alt="Cameraman"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Image
                src={img6}
                alt="Event Hall"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
