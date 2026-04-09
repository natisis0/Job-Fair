"use client";

import Link from "next/link";

export default function CompanyCandidatesTable({ candidates }) {
  if (!candidates || candidates.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        No candidates scanned yet. Use the QR scanner to start scanning.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200/50 text-sm">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Candidate
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Education
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Skills
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Scanned At
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Resume
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/50 bg-transparent">
            {candidates.map((candidate) => (
              <tr
                key={candidate.id}
                className="group transition-all hover:bg-white/90 hover:shadow-md"
              >
                <td className="px-6 py-5 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-tr from-emerald-100 to-teal-100 text-emerald-700 font-bold border border-white/60 shadow-sm">
                      {candidate.first_name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">
                        {candidate.first_name} {candidate.last_name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 align-middle">
                  <div className="text-sm font-medium text-slate-700">
                    {candidate.email}
                  </div>
                  {candidate.phone && (
                    <div className="text-xs text-slate-500 mt-0.5">
                      {candidate.phone}
                    </div>
                  )}
                </td>
                <td className="px-6 py-5 align-middle">
                  <div className="text-sm font-medium text-slate-700">
                    {candidate.university || (
                      <span className="text-slate-400 italic">N/A</span>
                    )}
                  </div>
                  {candidate.field_of_study && (
                    <div className="text-xs text-slate-500 mt-0.5">
                      {candidate.field_of_study}
                      {candidate.graduation_year &&
                        ` • '${candidate.graduation_year.toString().slice(2)}`}
                    </div>
                  )}
                </td>
                <td className="px-6 py-5 align-middle">
                  <div className="flex flex-wrap gap-1 max-w-48">
                    {candidate.skills && candidate.skills.length > 0 ? (
                      candidate.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400 italic text-xs">
                        No skills listed
                      </span>
                    )}
                    {candidate.skills && candidate.skills.length > 3 && (
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                        +{candidate.skills.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5 align-middle">
                  <div className="text-sm font-medium text-slate-700">
                    {candidate.scanned_at
                      ? new Date(candidate.scanned_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : "—"}
                  </div>
                  {candidate.scanned_at && (
                    <div className="text-xs text-slate-500 mt-0.5">
                      {new Date(candidate.scanned_at).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </div>
                  )}
                </td>
                <td className="px-6 py-5 align-middle">
                  {candidate.resume_url ? (
                    <Link
                      href={candidate.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-white px-3 py-1.5 text-xs font-bold text-indigo-600 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-300"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Resume
                    </Link>
                  ) : (
                    <span className="text-slate-400 italic text-xs">None</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
