"use client";

import { useState } from "react";
import SidebarNav from "@/features/admin-layout/components/SidebarNav";
import { UserButton } from "@clerk/nextjs";

export default function AdminLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-white/30 bg-white/80 px-6 py-8 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between mb-10 px-2">
          <div>
            <div className="bg-linear-to-r from-indigo-500 to-cyan-500 bg-clip-text text-xs font-bold uppercase tracking-widest text-transparent">
              The Job Fair Co.
            </div>
            <div className="mt-2 text-2xl font-black tracking-tight text-slate-800">
              Admin Panel
            </div>
          </div>
          <button 
            onClick={closeMobileMenu}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 active:scale-95 transition-all"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <SidebarNav onItemClick={closeMobileMenu} />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden w-54 flex-col border-r border-white/30 bg-white/40 px-6 py-8 shadow-[10px_0_40px_rgb(0,0,0,0.02)] backdrop-blur-2xl md:flex">
        <div className="mb-10 px-2">
          <div className="bg-linear-to-r from-indigo-500 to-cyan-500 bg-clip-text text-xs font-bold uppercase tracking-widest text-transparent">
            The Job Fair Co.
          </div>
          <div className="mt-2 text-2xl font-black tracking-tight text-slate-800">
            Admin Panel
          </div>
        </div>
        <SidebarNav />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/20 bg-white/40 px-6 py-5 shadow-[0_10px_30px_rgb(0,0,0,0.02)] backdrop-blur-2xl md:px-10">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={toggleMobileMenu}
              className="rounded-xl border border-white/40 bg-white/40 p-2 text-slate-600 shadow-sm backdrop-blur-md transition-all hover:bg-white/60 active:scale-95 md:hidden"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800">
                Admin Dashboard
              </h1>
              <p className="hidden mt-1 md:flex items-center text-sm font-medium text-slate-500">
                Manage your events and companies with ease.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <UserButton />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 px-4 py-8 md:px-10 relative">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </div>
      </main>
    </div>
  );
}
