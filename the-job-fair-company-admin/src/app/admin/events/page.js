import Link from "next/link";
import { getEvents } from "@/features/events/actions/getEvents";
import EventTable from "@/features/events/components/EventTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Events</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Manage upcoming and past job fair events.
          </p>
        </div>
        <Link
          href="/admin/events/create"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-linear-to-r from-indigo-500 to-cyan-500 px-6 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(99,102,241,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(99,102,241,0.4)] active:scale-95"
        >
          <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative z-10 flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Create Event
          </span>
        </Link>
      </div>
      <EventTable events={events} />
    </div>
  );
}

