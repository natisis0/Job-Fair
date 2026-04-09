export default function CompanyStats({ stats }) {
  const cards = [
    {
      label: "Events Joined",
      value: stats.eventsJoined,
      color: "from-indigo-500 to-violet-500",
      iconColor: "text-indigo-600",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Candidates Scanned",
      value: stats.candidatesScanned,
      color: "from-emerald-500 to-teal-500",
      iconColor: "text-emerald-600",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="group relative overflow-hidden bg-white/60 backdrop-blur-xl p-8 rounded-4xl border border-white/40 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
        >
          <div
            className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-bl ${card.color} opacity-[0.04] rounded-bl-full group-hover:scale-150 transition-transform duration-700`}
          />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest">
              {card.label}
            </h3>
            <span className={card.iconColor}>{card.icon}</span>
          </div>
          <div className="text-4xl font-black text-slate-800 tracking-tighter">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}
