export default function CompanyEventsTable({ events }) {
  if (!events || events.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        You haven&apos;t been assigned to any events yet.
      </div>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return "TBD";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":");
    const h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase() || "inactive";
    const styles = {
      active: {
        badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
        dot: "bg-emerald-400 animate-pulse",
      },
      inactive: {
        badge: "bg-slate-50 text-slate-600 border-slate-100",
        dot: "bg-slate-400",
      },
    };
    return styles[s] || styles.inactive;
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200/50 text-sm">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Event
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Date & Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Capacity
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/50 bg-transparent">
            {events.map((event) => (
              <tr
                key={event.id}
                className="group transition-all hover:bg-white/90 hover:shadow-md"
              >
                <td className="px-6 py-5 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-100 to-cyan-100 text-indigo-700 font-bold border border-white/60 shadow-sm">
                      {event.title?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">
                        {event.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 capitalize">
                        {event.event_type?.replace("_", " ")}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 align-middle">
                  <div className="text-sm font-medium text-slate-700">
                    {formatDate(event.event_date)}
                  </div>
                  {event.event_time && (
                    <div className="text-xs text-slate-500 mt-0.5">
                      {formatTime(event.event_time)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-5 align-middle">
                  <div className="text-sm font-medium text-slate-700">
                    {event.location || "—"}
                  </div>
                  {event.venue && (
                    <div className="text-xs text-slate-500 mt-0.5">
                      {event.venue}
                    </div>
                  )}
                </td>
                <td className="px-6 py-5 align-middle">
                  <div className="text-sm font-medium text-slate-700">
                    {event.participants_count ?? 0}{" "}
                    <span className="text-slate-400 font-normal">
                      / {event.available_tickets ?? "∞"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5 align-middle">
                  {(() => {
                    const { badge, dot } = getStatusBadge(event.status);
                    return (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm border capitalize ${badge}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                        {event.status}
                      </span>
                    );
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
