import { getMetrics } from "@/features/admin-layout/lib/getMetrics";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard",
};



export default async function AdminDashboardPage() {
  const metrics = await getMetrics();

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
    </div>
  );
}

