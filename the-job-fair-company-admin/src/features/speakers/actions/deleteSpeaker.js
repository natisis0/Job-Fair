"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteSpeaker(id, eventId) {
  if (!id || !eventId) {
    return { error: "Speaker ID and Event ID are required." };
  }

  try {
    const sql = `
      DELETE FROM speakers
      WHERE id = $1
    `;
    await db.query(sql, [id]);

    revalidatePath(`/admin/events/${eventId}/speakers`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting speaker:", error);
    return { error: "Failed to delete speaker. Please try again." };
  }
}
