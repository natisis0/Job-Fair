"use client";

import { updateCandidateStatus } from "@/features/candidates/actions/updateCandidateStatus";
import { deleteCandidate } from "@/features/candidates/actions/deleteCandidate";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EmptyState from "@/components/EmptyState";

function ExpandableTags({ items, colorClasses, emptyMessage }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const limit = 4;

  if (!items || items.length === 0) {
    return <span className="text-slate-400 italic text-xs">{emptyMessage}</span>;
  }

  const displayedItems = isExpanded ? items : items.slice(0, limit);
  const hasMore = items.length > limit;

  return (
    <div className="flex flex-wrap gap-1 max-w-48">
      {displayedItems.map((item, idx) => (
        <span key={idx} className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold border ${colorClasses}`}>
          {item}
        </span>
      ))}
      {hasMore && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="text-[10px] font-bold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          {isExpanded ? "Show less" : `+${items.length - limit} more`}
        </button>
      )}
    </div>
  );
}

export default function CandidateTable({ candidates }) {
  const router = useRouter();

  const handleDeleteCandidate = async (e, candidateId) => {
    e.stopPropagation();
    toast((t) => (
      <div className="flex flex-col gap-3 p-1">
        <span className="text-sm font-medium text-slate-800">
          Are you sure you want to delete this candidate?
        </span>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const result = await deleteCandidate(candidateId);
              if (result?.error) {
                toast.error(result.error);
              } else {
                toast.success("Candidate deleted successfully");
              }
            }}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
      position: "top-center",
    });
  };

  if (!candidates || candidates.length === 0) {
    return (
      <EmptyState 
        title="No candidates found" 
        description="There are no candidates in the registry yet. Add your first candidate to start managing them."
        icon={
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        }
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200/50 text-sm">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Candidate Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Contact Info
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Registered Events
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Company Scans
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/50 bg-transparent">
            {candidates.map((candidate) => (
              <tr
                key={candidate.id}
                onClick={() => router.push(`/admin/candidates/${candidate.id}/edit`)}
                className="group cursor-pointer transition-all hover:bg-white/90 hover:shadow-md"
              >
                <td className="px-6 py-5 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-100 to-cyan-100 text-indigo-700 font-bold border border-white/60 shadow-sm transition-transform group-hover:scale-110">
                      {candidate.first_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {candidate.first_name} {candidate.last_name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Added {new Date(candidate.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 align-middle">
                  <div className="text-sm font-medium text-slate-700">
                    {candidate.email}
                  </div>
                  {candidate.phone && (
                    <div className="text-xs text-slate-500 mt-1">
                      {candidate.phone}
                    </div>
                  )}
                </td>
                <td className="px-6 py-5 align-middle">
                  <ExpandableTags 
                    items={candidate.event_titles} 
                    colorClasses="bg-indigo-50 text-indigo-700 border-indigo-100" 
                    emptyMessage="No registrations" 
                  />
                </td>
                <td className="px-6 py-5 align-middle">
                  <ExpandableTags 
                    items={candidate.company_names} 
                    colorClasses="bg-emerald-50 text-emerald-700 border-emerald-100" 
                    emptyMessage="No company scans" 
                  />
                </td>
                <td className="px-6 py-5 align-middle">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                      candidate.status === "active"
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${candidate.status === "active" ? "bg-emerald-500" : "bg-slate-400"}`}
                    />
                    {candidate.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td 
                  className="px-6 py-5 align-middle text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-end gap-2">
                    <form action={updateCandidateStatus}>
                      <input type="hidden" name="id" value={candidate.id} />
                      <input
                        type="hidden"
                        name="status"
                        value={
                          candidate.status === "active" ? "inactive" : "active"
                        }
                      />
                      <button
                        type="submit"
                        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md"
                      >
                        {candidate.status === "active"
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    </form>
                    <button
                      onClick={(e) => handleDeleteCandidate(e, candidate.id)}
                      className="rounded-xl border border-red-100 bg-white px-3 py-1.5 text-xs font-bold text-red-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 hover:shadow-md"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
