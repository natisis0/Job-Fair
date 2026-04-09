import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/images/logo.png";
import {
  FaLinkedinIn,
  FaTelegramPlane,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

export default function FooterBrand() {
  return (
    <div className="flex flex-col max-w-[320px]">
      <Link href="/" className="mb-6">
        <Image
          src={logo}
          alt="The Job Fair Company Logo"
          className="h-16 w-auto object-contain"
          priority
        />
      </Link>

      <p className="text-[#a3a3a3] text-[14px] leading-relaxed mb-6">
        The Job Fair Company is a global self-service ticketing platform for
        live experiences that allows anyone to create, share, find and attend
        events that fuel their passions and enrich their lives.
      </p>

      <div className="flex items-center gap-4">
        <a
          href="#"
          className="bg-white text-[#2B2B36] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#38C6CD] hover:text-white transition-colors"
        >
          <FaLinkedinIn size={16} />
        </a>
        <a
          href="#"
          className="bg-white text-[#2B2B36] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#38C6CD] hover:text-white transition-colors"
        >
          <FaTelegramPlane size={16} />
        </a>
        <a
          href="#"
          className="bg-white text-[#2B2B36] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#38C6CD] hover:text-white transition-colors"
        >
          <FaTwitter size={16} />
        </a>
        <a
          href="#"
          className="bg-white text-[#2B2B36] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#38C6CD] hover:text-white transition-colors"
        >
          <FaFacebookF size={16} />
        </a>
        <a
          href="#"
          className="bg-white text-[#2B2B36] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#38C6CD] hover:text-white transition-colors"
        >
          <FaYoutube size={16} />
        </a>
      </div>
    </div>
  );
}
