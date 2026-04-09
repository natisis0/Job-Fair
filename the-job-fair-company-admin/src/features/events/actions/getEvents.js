 "use server";

import db from "@/lib/db";

export async function getEvents() {
  const sql = `
    SELECT
      e.*,
      COALESCE(COUNT(ec.company_id), 0) AS companies_count
    FROM events e
    LEFT JOIN event_companies ec ON ec.event_id = e.id
    GROUP BY e.id
    ORDER BY e.event_date DESC, e.created_at DESC
  `;

  const { rows } = await db.query(sql);
  return rows;
}

