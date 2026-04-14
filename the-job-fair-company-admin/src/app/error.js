"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center">
      <div className="space-y-4">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-red-50 text-red-500 shadow-sm">
          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.876c1.27 0 2.091-1.364 1.455-2.433L13.456 5.433c-.636-1.07-2.176-1.07-2.812 0L3.606 17.567c-.636 1.07.184 2.433 1.455 2.433z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-800">Something went wrong</h2>
        <p className="mx-auto max-w-md text-lg font-medium text-slate-500">
          An unexpected error occurred. We have been notified and are working on it.
        </p>
        <div className="pt-6">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-500/20 transition-all hover:scale-105 hover:bg-indigo-700 active:scale-95"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
