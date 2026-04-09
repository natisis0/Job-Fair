import { getSpeakers } from "@/features/speakers/actions/getSpeakers";
import { getEvent } from "@/features/events/actions/getEvent";
import SpeakersClient from "@/features/speakers/components/SpeakersClient";

export const metadata = {
  title: "Manage Speakers",
};

export default async function SpeakersPage({ params }) {
  const { eventId } = await params;
  const [speakers, event] = await Promise.all([
    getSpeakers(eventId),
    getEvent(eventId)
  ]);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Speakers Management
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Manage keynote speakers and guests for <span className="text-indigo-600 font-bold">{event?.title}</span>
          </p>
        </div>
      </div>

      <SpeakersClient eventId={eventId} initialSpeakers={speakers} />
    </div>
  );
}
