import { getMetrics } from "@/features/admin-layout/lib/getMetrics";
import EmptyState from "@/components/EmptyState";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard",
};



export default async function AdminDashboardPage() {
  const metrics = await getMetrics();

  const isEmpty = metrics.totalEvents === 0 && metrics.totalCompanies === 0;

  const cards = [
    {
      label: "Total events",
      value: metrics.totalEvents,
      caption: "All events in the system",
    },
    {
      label: "Active events",
      value: metrics.activeEvents,
      caption: "Currently active events",
    },
    {
      label: "Total companies",
      value: metrics.totalCompanies,
      caption: "Registered companies",
    },
    {
      label: "Companies attending",
      value: metrics.companiesAttending,
      caption: "Assigned to at least one event",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Overview & Insights
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          High-level view of events and companies across The Job Fair Co.
        </p>
      </div>

      {isEmpty ? (
        <EmptyState
          title="Welcome to your Portal"
          description="It looks like you haven't added any data yet. Start by creating an event or registering a company."
          icon={
            <svg className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
            </svg>
          }
          action={
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/admin/events/create"
                className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-700 active:scale-95"
              >
                Create Event
              </Link>
              <Link
                href="/admin/companies"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
              >
                Manage Companies
              </Link>
            </div>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, idx) => (
            <div
              key={card.label}
              className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
            >
              {/* Soft decorative background glow per card */}
              <div className={`absolute -right-6 -top-6 h-32 w-32 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150 ${idx % 2 === 0 ? 'bg-indigo-400/10 group-hover:bg-indigo-400/20' : 'bg-cyan-400/10 group-hover:bg-cyan-400/20'}`} />
              
              <div className="relative z-10 text-xs font-bold uppercase tracking-widest text-slate-500/80">
                {card.label}
              </div>
              <div className="relative z-10 mt-4 text-4xl font-black tracking-tighter text-slate-800">
                {card.value}
              </div>
              <div className="relative z-10 mt-2 text-xs font-medium text-slate-500">{card.caption}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

