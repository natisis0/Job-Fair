import Image from "next/image";
import connectBg from "../assets/Connectgroupphoto.png";

export default function Connect() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 md:px-8 mt-4 mb-20">
      <div className="relative w-full rounded-3xl overflow-hidden shadow-lg flex items-center justify-center text-center">
        {/* Background Image */}
        <Image
          src={connectBg}
          alt="Group of people connecting"
          className="w-full h-[400px] md:h-auto object-cover"
          priority
        />

        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-[#2d1b4e]/60 mix-blend-multiply"></div>

        {/* Content */}
        <div className="absolute inset-0 z-10 px-4 flex flex-col items-center justify-center pt-4 md:pt-12">
          <h1 className="text-white w-full max-w-4xl text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight mb-4 md:mb-6">
            Connect. Network. Succeed.
          </h1>
          <p className="text-white/90 text-[15px] md:text-[17px] font-medium leading-relaxed max-w-[500px]">
            The premier platform connecting talented professionals with leading
            employers at career expos nationwide.
          </p>
        </div>
      </div>
    </section>
  );
}
