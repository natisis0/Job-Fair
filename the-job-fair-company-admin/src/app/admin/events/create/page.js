import EventForm from "@/features/events/components/EventForm";

export default function CreateEventPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Create New Event
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Set up a new job fair event, including date, location, and tickets.
        </p>
      </div>
      <div className="rounded-3xl border border-white/40 bg-white/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl">
        <EventForm />
      </div>
    </div>
  );
}

