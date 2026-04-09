"use client";

import Link from "next/link";

export default function AddCandidateButton() {
  return (
    <Link
      href="/admin/candidates/create"
      className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-tr from-indigo-500 to-cyan-500 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(99,102,241,0.3)] active:translate-y-0"
    >
      <svg
        className="h-5 w-5 transition-transform group-hover:rotate-90"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      Add Candidate
    </Link>
  );
}
