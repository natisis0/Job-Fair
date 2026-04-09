import db from "@/lib/db";

export async function getMetrics() {
  const [eventsTotal, eventsActive, companiesTotal, companiesAttending] =
    await Promise.all([
      db.query("SELECT COUNT(*) AS count FROM events"),
      db.query(
        "SELECT COUNT(*) AS count FROM events WHERE status = 'active'",
      ),
      db.query("SELECT COUNT(*) AS count FROM companies"),
      db.query(
        "SELECT COUNT(DISTINCT company_id) AS count FROM event_companies",
      ),
    ]);

  return {
    totalEvents: Number(eventsTotal.rows[0]?.count || 0),
    activeEvents: Number(eventsActive.rows[0]?.count || 0),
    totalCompanies: Number(companiesTotal.rows[0]?.count || 0),
    companiesAttending: Number(companiesAttending.rows[0]?.count || 0),
  };
}