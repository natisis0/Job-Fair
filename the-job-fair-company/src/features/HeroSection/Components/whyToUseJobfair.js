import Image from "next/image";
import whyBg from "../assets/whytousegroup.png";

export default function WhyToUseJobfair() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 md:px-8 mb-20">
      <div className="relative w-full h-[400px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg flex items-end justify-center pb-12">
        {/* Background Image */}
        <Image
          src={whyBg}
          alt="Group of people talking and smiling"
          fill
          className="object-cover"
        />

        {/* Gradient Overlay for bottom text readability */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#2d1b4e]/90 via-[#2d1b4e]/50 to-transparent mix-blend-multiply"></div>

        {/* Content */}
        <div className="relative z-10 px-4 text-center">
          <h1 className="text-white text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight drop-shadow-md">
            Why to use Job Fair
          </h1>
        </div>
      </div>
    </section>
  );
}
