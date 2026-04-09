"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addCompanyToEvent(formData) {
  const eventId = formData.get("event_id")?.toString();
  const companyId = formData.get("company_id")?.toString();

  if (!eventId || !companyId) {
    return { error: "Missing event or company id." };
  }

  try {
    await db.query(
      `
      INSERT INTO event_companies (event_id, company_id)
      VALUES ($1, $2)
      ON CONFLICT (event_id, company_id) DO NOTHING
    `,
      [eventId, companyId],
    );

    revalidatePath(`/admin/events/${eventId}/companies`);
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error adding company to event", error);
    return { error: "Failed to add company to event." };
  }
}

