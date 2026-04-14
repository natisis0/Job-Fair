"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F8FB] p-6 text-center">
      <div className="space-y-6">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-red-50 text-red-500 shadow-sm">
          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">Something went wrong</h1>
          <p className="mx-auto max-w-md text-slate-500">
            We encountered a technical glitch. Don&apos;t worry, your network is safe. 
            Try refreshing or head back to safety.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-500/20 transition-all hover:scale-105 hover:bg-indigo-700 active:scale-95"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
