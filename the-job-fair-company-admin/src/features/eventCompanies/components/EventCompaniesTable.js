"use client";

import { useState, useRef, useEffect } from "react";
import { addCompanyToEvent } from "@/features/eventCompanies/actions/addCompanyToEvent";
import { removeCompanyFromEvent } from "@/features/eventCompanies/actions/removeCompanyFromEvent";
import EmptyState from "@/components/EmptyState";

export default function EventCompaniesTable({
  eventId,
  assigned,
  availableCompanies,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-8">
      {/* Add Company Section */}
      <div className={`transition-all duration-300 ${isOpen ? "relative z-40" : "relative z-0"} rounded-3xl border border-white/40 bg-white/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl`}>
        <form className="flex flex-col gap-4 md:flex-row md:items-end w-full">
          <div className="flex-1 space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Assign Company to Event
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition-all hover:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              >
                <span className={selectedCompany ? "text-slate-800" : "text-slate-400"}>
                  {selectedCompany ? selectedCompany.name : "Select a company from the registry..."}
                </span>
                <svg
                  className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/40 bg-white/80 p-1.5 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in duration-200 origin-top">
                  <div className="max-h-60 overflow-y-auto custom-scrollbar">
                    {availableCompanies.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-slate-500 text-center">
                        No companies available to add
                      </div>
                    ) : (
                      availableCompanies.map((company) => (
                        <button
                          key={company.id}
                          type="button"
                          onClick={() => {
                            setSelectedCompany(company);
                            setIsOpen(false);
                          }}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all hover:bg-indigo-50 group"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-100 to-cyan-100 text-indigo-700 font-bold border border-white shadow-sm transition-transform group-hover:scale-105">
                            {company.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-900 leading-tight">
                              {company.name}
                            </span>
                            {company.email && (
                              <span className="text-[11px] font-medium text-slate-500 group-hover:text-slate-600">
                                {company.email}
                              </span>
                            )}
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <input type="hidden" name="company_id" value={selectedCompany?.id || ""} />
          <input type="hidden" name="event_id" value={eventId} />
          <button
            formAction={addCompanyToEvent}
            type="submit"
            disabled={!selectedCompany}
            className="group relative inline-flex h-[46px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 text-sm font-bold text-white shadow-[0_8px_20px_rgba(99,102,241,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(99,102,241,0.4)] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 md:self-auto w-full md:w-auto mt-2 md:mt-0"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10">Add to Event</span>
          </button>
        </form>
      </div>

      {/* Assigned Companies Table */}
      <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200/50 text-sm">
            <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Company Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Booth Slot
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/50 bg-transparent">
            {assigned.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-0">
                  <div className="border-t border-slate-100 bg-white/50 py-12">
                    <EmptyState 
                      title="No companies assigned" 
                      description="No companies have been assigned to this specific event yet. Select a company above to add it."
                      icon={
                        <svg className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V8.11m12.442-2.418l.33-1.066a.75.75 0 011.015-.45l1.97.88a.75.75 0 01.421.827l-.39 1.769m-5.348-1.95a3.5 3.5 0 11-4.173 4.41l-.014.045m1.332-5.467l.7 2.228m3.326-2.228l-.138 1.268M5.132 15.703l.44-1.202m-.754 3.736l.5-1.026" />
                        </svg>
                      }
                    />
                  </div>
                </td>
              </tr>
            ) : (
              assigned.map((company) => (
                <tr key={company.id} className="group transition-colors hover:bg-white/80">
                  <td className="px-6 py-5 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-100 to-cyan-100 text-indigo-700 font-bold border border-white/60 shadow-sm transition-transform group-hover:scale-110">
                        {company.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-sm font-bold text-slate-800">
                        {company.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 align-middle text-sm font-medium text-slate-600">
                    {company.email || <span className="text-slate-400 italic">Not provided</span>}
                  </td>
                  <td className="px-6 py-5 align-middle text-sm">
                    <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {company.booth_slot || "available"}
                    </span>
                  </td>
                  <td className="px-6 py-5 align-middle">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                        company.status === "active"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${company.status === "active" ? "bg-emerald-500" : "bg-slate-400"}`} />
                      {company.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-5 align-middle text-right">
                    <div className="flex items-center justify-end gap-2">
                      <form action={removeCompanyFromEvent}>
                        <input
                          type="hidden"
                          name="event_id"
                          value={eventId}
                        />
                        <input
                          type="hidden"
                          name="company_id"
                          value={company.id}
                        />
                        <button
                          type="submit"
                          className="rounded-xl border border-red-100 bg-white px-3 py-1.5 text-xs font-bold text-red-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 hover:shadow-md"
                        >
                          Remove
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

