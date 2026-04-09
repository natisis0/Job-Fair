"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteEvent(eventId) {
  const id = eventId.toString();

  if (!id) {
    return { error: "Missing event id." };
  }

  try {
    await db.query(
      `
      DELETE FROM events
      WHERE id = $1
    `,
      [id],
    );

    revalidatePath("/admin/events");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting event", error);
    return { error: "Failed to delete event." };
  }
}

