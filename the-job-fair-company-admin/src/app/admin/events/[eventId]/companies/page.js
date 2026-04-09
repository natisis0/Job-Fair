import db from "@/lib/db";
import EventCompaniesTable from "@/features/eventCompanies/components/EventCompaniesTable";

export const dynamic = "force-dynamic";

async function getEventAndCompanies(eventIdRaw) {
  const eventId =
    Array.isArray(eventIdRaw) && eventIdRaw.length > 0
      ? eventIdRaw[0]
      : String(eventIdRaw);

  const eventResult = await db.query(
    `
    SELECT *
    FROM events
    WHERE id::text = $1
  `,
    [eventId],
  );
  const event = eventResult.rows[0] || null;

  const allCompaniesResult = await db.query(
    `
    SELECT *
    FROM companies
    ORDER BY created_at DESC
  `,
  );
  const allCompanies = allCompaniesResult.rows;

  const assignedResult = await db.query(
    `
    SELECT c.*
    FROM companies c
    INNER JOIN event_companies ec ON ec.company_id = c.id
    WHERE ec.event_id::text = $1
  `,
    [eventId],
  );
  const assigned = assignedResult.rows;

  const assignedIds = new Set(assigned.map((c) => c.id));
  const available = allCompanies.filter((c) => !assignedIds.has(c.id));

  return { event, assigned, available };
}



export default async function EventCompaniesPage({ params }) {
  const { eventId } = await params;
  const { event, assigned, available } = await getEventAndCompanies(eventId);

  if (!event) {
    return (
      <div className="rounded-xl border border-dashed border-red-100 bg-red-50 p-6 text-sm text-red-700">
        Event not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Companies attending
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Manage companies assigned to{" "}
          <span className="font-bold text-indigo-600">{event.title}</span>.
        </p>
      </div>

      <EventCompaniesTable
        eventId={eventId}
        assigned={assigned}
        availableCompanies={available}
      />
    </div>
  );
}

