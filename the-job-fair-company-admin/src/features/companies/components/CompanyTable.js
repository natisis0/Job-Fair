"use client";

import { useState } from "react";
import { updateCompanyStatus } from "@/features/companies/actions/updateCompanyStatus";
import { deleteCompany } from "@/features/companies/actions/deleteCompany";
import CompanyModal from "./CompanyModal";
import toast from "react-hot-toast";

export default function CompanyTable({ companies }) {
  const [editingCompany, setEditingCompany] = useState(null);

  const handleDeleteCompany = async (e, companyId) => {
    e.stopPropagation();
    toast((t) => (
      <div className="flex flex-col gap-3 p-1">
        <span className="text-sm font-medium text-slate-800">
          Are you sure you want to delete this company?
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
              const result = await deleteCompany(companyId);
              if (result?.error) {
                toast.error(result.error);
              } else {
                toast.success("Company deleted successfully");
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

  const [expandedEvents, setExpandedEvents] = useState({});

  const toggleEvents = (e, companyId) => {
    e.stopPropagation();
    setExpandedEvents(prev => ({
      ...prev,
      [companyId]: !prev[companyId]
    }));
  };

  if (!companies || companies.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        No companies yet. Add a company to get started.
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
                Company Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Booth Slot
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Events
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
            {companies.map((company) => (
              <tr
                key={company.id}
                onClick={() => setEditingCompany(company)}
                className="group cursor-pointer transition-all hover:bg-white/90 hover:shadow-md"
              >
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
                  {company.email || (
                    <span className="text-slate-400 italic">Not provided</span>
                  )}
                </td>
                <td className="px-6 py-5 align-middle text-sm">
                  <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {company.booth_slot || "available"}
                  </span>
                </td>
                <td className="px-6 py-5 align-middle">
                  {company.events_count > 0 ? (
                    <div className="max-w-40 transition-all">
                      <div className="mb-1 flex items-center gap-1.5 flex-wrap">
                        <span className="inline-flex rounded-lg bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600 border border-indigo-100/50">
                          {company.events_count}{" "}
                          {company.events_count === 1 ? "Event" : "Events"}
                        </span>
                        {(company.events_count > 1 || company.event_titles.length > 12) && (
                          <button
                            onClick={(e) => toggleEvents(e, company.id)}
                            className="text-[10px] font-bold text-indigo-500 hover:text-indigo-700 underline decoration-indigo-200 underline-offset-2 transition-colors"
                          >
                            {expandedEvents[company.id] ? "Show less" : "Show"}
                          </button>
                        )}
                      </div>
                      <div 
                        className={`text-xs font-medium text-slate-500 ${expandedEvents[company.id] ? "whitespace-pre-line" : "truncate"}`}
                        title={!expandedEvents[company.id] ? company.event_titles : ""}
                      >
                        {expandedEvents[company.id] 
                          ? company.event_titles.split(", ").join("\n") 
                          : company.event_titles.length > 12 
                            ? company.event_titles.slice(0, 12) + "..."
                            : company.event_titles
                        }
                      </div>
                    </div>
                  ) : (
                    <span className="inline-flex rounded-lg bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-600 border border-orange-100/50">
                      Unregistered
                    </span>
                  )}
                </td>
                <td className="px-6 py-5 align-middle">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                      company.status === "active"
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${company.status === "active" ? "bg-emerald-500" : "bg-slate-400"}`}
                    />
                    {company.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td 
                  className="px-6 py-5 align-middle text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-end gap-2">
                    <form action={updateCompanyStatus}>
                      <input type="hidden" name="id" value={company.id} />
                      <input
                        type="hidden"
                        name="status"
                        value={
                          company.status === "active" ? "inactive" : "active"
                        }
                      />
                      <button
                        type="submit"
                        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md"
                      >
                        {company.status === "active"
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    </form>
                    <button
                      onClick={(e) => handleDeleteCompany(e, company.id)}
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

      <CompanyModal
        key={editingCompany?.id || "new"}
        company={editingCompany}
        isOpen={!!editingCompany}
        onClose={() => setEditingCompany(null)}
      />
    </div>
  );
}
