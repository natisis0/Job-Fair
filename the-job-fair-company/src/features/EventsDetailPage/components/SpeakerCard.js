import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function SpeakerCard({ name, title, image_url , instagram,linkedin}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col group h-full shadow-sm hover:shadow-md transition-shadow">
      {/* Photo */}
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={image_url || "/images/speaker.png"}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      {/* Info */}
      <div className="p-5 text-center flex flex-col items-center">
        <p className="text-gray-400 text-[10px] font-medium mb-1 uppercase tracking-tight">{title}</p>
        <h4 className="text-[#1A1A1A] font-bold text-sm mb-4 leading-tight">{name}</h4>
        {/* Social Icons */}
        <div className="flex justify-center gap-4">
          <Link href={linkedin} target="_blank" rel="noopener noreferrer">
            <span className="text-[#36B3BA] hover:text-[#2fa1a6] cursor-pointer transition-colors text-sm">
              <FaLinkedinIn />
            </span>
          </Link>
          <Link href={instagram} target="_blank" rel="noopener noreferrer">
            <span className="text-[#36B3BA] hover:text-[#2fa1a6] cursor-pointer transition-colors text-sm">
              <FaInstagram />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
