import {
  getCurrentCompany,
  getCompanyStats,
} from "@/features/company-dashboard/actions/companyData";
import CompanyStats from "@/features/company-dashboard/components/CompanyStats";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard | Company Portal",
};

export default async function CompanyDashboardPage() {
  const company = await getCurrentCompany();

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="h-20 w-20 rounded-3xl bg-linear-to-tr from-red-100 to-orange-100 flex items-center justify-center mb-6 shadow-sm">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-700 tracking-tight mb-2">
          Company Not Found
        </h2>
        <p className="text-slate-500 max-w-sm">
          Your account is not linked to a company profile. Please contact an
          administrator to set up your company.
        </p>
      </div>
    );
  }

  const stats = await getCompanyStats(company.id);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            Welcome back,{" "}
            <span className="text-indigo-600">{company.name}</span>
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Here&apos;s an overview of your job fair activity.
          </p>
        </div>
        <Link
          href="/company/scan"
          className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
          Scan QR Code
        </Link>
      </div>

      {/* Stats */}
      <CompanyStats stats={stats} />

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          href="/company/events"
          className="group relative overflow-hidden bg-white/60 backdrop-blur-xl p-8 rounded-4xl border border-white/40 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-indigo-500 to-violet-500 opacity-[0.04] rounded-bl-full group-hover:scale-150 transition-transform duration-700" />
          <div className="flex items-center gap-4 mb-3">
            <div className="h-12 w-12 rounded-2xl bg-linear-to-tr from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-600 shadow-sm">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                View Events
              </h3>
              <p className="text-sm text-slate-500">
                See all events you&apos;re participating in.
              </p>
            </div>
          </div>
          <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest flex items-center gap-1 mt-4">
            Go to Events
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>

        <Link
          href="/company/candidates"
          className="group relative overflow-hidden bg-white/60 backdrop-blur-xl p-8 rounded-4xl border border-white/40 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-emerald-500 to-teal-500 opacity-[0.04] rounded-bl-full group-hover:scale-150 transition-transform duration-700" />
          <div className="flex items-center gap-4 mb-3">
            <div className="h-12 w-12 rounded-2xl bg-linear-to-tr from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-600 shadow-sm">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                View Candidates
              </h3>
              <p className="text-sm text-slate-500">
                Browse all candidates you&apos;ve scanned.
              </p>
            </div>
          </div>
          <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1 mt-4">
            Go to Candidates
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}