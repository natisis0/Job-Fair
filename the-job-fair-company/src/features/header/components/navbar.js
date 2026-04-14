import Link from "next/link";

export default function Navbar() {
  return (
     <div className="flex items-center gap-12">
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              href="/events"
              className="text-[14px] font-[500] text-[#333] hover:text-[#38C6CD] transition-colors"
            >
              Events
            </Link>
            <Link
              href="/why-to-use-job-fair"
              className="text-[14px] font-[500] text-[#333] hover:text-[#38C6CD] transition-colors"
            >
              Why to use Job Fair
            </Link>
          </nav>
        </div>
  )
}
