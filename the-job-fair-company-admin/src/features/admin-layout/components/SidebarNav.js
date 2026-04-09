"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/companies", label: "Companies" },
  { href: "/admin/candidates", label: "Candidates" },
  { href: "/admin/create-user", label: "Create a User" },
];

export default function SidebarNav({ onItemClick }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-2 text-sm font-medium">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
        
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={`group flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-300 active:scale-95 ${
              isActive 
                ? "bg-white/80 text-indigo-700 shadow-[0_8px_20px_rgb(0,0,0,0.06)] ring-1 ring-white/50" 
                : "text-slate-600 hover:-translate-y-0.5 hover:bg-white/60 hover:text-indigo-700 hover:shadow-[0_8px_20px_rgb(0,0,0,0.04)]"
            }`}
          >
            <div className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              isActive ? "bg-indigo-600 scale-125" : "bg-slate-300 group-hover:bg-indigo-500"
            }`} />
            <span className={isActive ? "font-bold" : ""}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
