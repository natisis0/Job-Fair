import db from "@/lib/db";

export async function getSpeakers(eventId) {
  if (!eventId) return [];

  try {
    const sql = `
      SELECT *
      FROM speakers
      WHERE event_id = $1
      ORDER BY id ASC
    `;
    const { rows } = await db.query(sql, [eventId]);
    return rows;
  } catch (error) {
    console.error("Error fetching speakers:", error);
    return [];
  }
}
