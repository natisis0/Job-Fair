"use server";

import db from "@/lib/db";

export async function getEvent(id) {
  if (!id) return null;

  try {
    const eventSql = `
      SELECT *
      FROM events
      WHERE id = $1
    `;
    const photoSql = `
      SELECT *
      FROM event_photos
      WHERE event_id = $1
      ORDER BY id ASC
    `;
    
    const [{ rows: eventRows }, { rows: photoRows }] = await Promise.all([
      db.query(eventSql, [id]),
      db.query(photoSql, [id])
    ]);

    if (eventRows.length === 0) return null;

    return {
      ...eventRows[0],
      photos: photoRows
    };
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}
