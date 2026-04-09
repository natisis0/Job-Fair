import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/images/logo.png";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src={logo}
        alt="The Job Fair Company Logo"
        className="h-[48px] w-auto object-contain"
        priority
      />
    </Link>
  );
}
