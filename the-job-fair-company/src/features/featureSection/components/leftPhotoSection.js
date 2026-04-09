import Image from "next/image";

export default function LeftPhotoSection({ title, description, image }) {
  return (
    <section className="w-full bg-[#52467C] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Image (Left) */}
        <div className="w-full md:w-1/2 flex justify-start">
          <div className="relative w-full max-w-[450px] aspect-[4/3] rounded-xl overflow-hidden shadow-md">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
        </div>

        {/* Text Details (Right) */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-white text-3xl md:text-[34px] font-bold leading-tight">
            {title}
          </h2>
          <p className="text-white/80 text-[14px] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
