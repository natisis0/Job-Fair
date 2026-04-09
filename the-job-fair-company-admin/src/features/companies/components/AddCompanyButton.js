"use client";

import { useState } from "react";
import CompanyModal from "./CompanyModal";

export default function AddCompanyButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-linear-to-r from-indigo-500 to-cyan-500 px-6 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(99,102,241,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(99,102,241,0.4)] active:scale-95"
      >
        <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative z-10 flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Company
        </span>
      </button>

      <CompanyModal
        key={isOpen}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
