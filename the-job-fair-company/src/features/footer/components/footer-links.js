import Link from "next/link";

export default function FooterLinks() {
  return (
    <div className="flex gap-20">
      {/* Join Event Column */}
      <div className="flex flex-col">
        <h3 className="text-white font-semibold text-[16px] mb-6">
          Join Event
        </h3>
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              href="#"
              className="text-[#a3a3a3] hover:text-[#38C6CD] text-[14px] transition-colors"
            >
              Sign up
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-[#a3a3a3] hover:text-[#38C6CD] text-[14px] transition-colors"
            >
              Online RSVP
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-[#a3a3a3] hover:text-[#38C6CD] text-[14px] transition-colors"
            >
              Online Events
            </Link>
          </li>
        </ul>
      </div>

      {/* Eventick Column */}
      <div className="flex flex-col">
        <h3 className="text-white font-semibold text-[16px] mb-6">Eventick</h3>
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              href="#"
              className="text-[#a3a3a3] hover:text-[#38C6CD] text-[14px] transition-colors"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-[#a3a3a3] hover:text-[#38C6CD] text-[14px] transition-colors"
            >
              Press
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-[#a3a3a3] hover:text-[#38C6CD] text-[14px] transition-colors"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-[#a3a3a3] hover:text-[#38C6CD] text-[14px] transition-colors"
            >
              Help Center
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-[#a3a3a3] hover:text-[#38C6CD] text-[14px] transition-colors"
            >
              How it Works
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-[#a3a3a3] hover:text-[#38C6CD] text-[14px] transition-colors"
            >
              Privacy
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-[#a3a3a3] hover:text-[#38C6CD] text-[14px] transition-colors"
            >
              Terms
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
