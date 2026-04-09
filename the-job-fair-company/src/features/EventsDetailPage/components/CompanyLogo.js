import Image from "next/image";

export default function CompanyLogo({ name, images }) {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-100 hover:shadow-md hover:border-[#36B3BA]/30 transition-all h-40">
      <div className="relative w-28 h-14 mb-4">
        <Image
          src={images || "/images/companyLogo.png"}
          alt={name}
          fill
          className="object-contain"
        />
      </div>
      <p className="text-gray-500 font-medium text-xs">{name}</p>
    </div>
  );
}
