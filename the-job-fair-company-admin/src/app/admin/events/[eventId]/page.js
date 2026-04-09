import { getEvent } from "@/features/events/actions/getEvent";
import EventForm from "@/features/events/components/EventForm";
import { notFound } from "next/navigation";

export default async function EditEventPage({ params }) {
  const { eventId } = await params;
  const event = await getEvent(eventId);

  if (!event) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">Edit Event</h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Update the details for &quot;{event.title}&quot;.
        </p>
      </div>

      <div className="rounded-3xl border border-white/40 bg-white/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl">
        <EventForm initialData={event} />
      </div>
    </div>
  );
}
