"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function removeCompanyFromEvent(formData) {
  const eventId = formData.get("event_id")?.toString();
  const companyId = formData.get("company_id")?.toString();

  if (!eventId || !companyId) {
    return { error: "Missing event or company id." };
  }

  try {
    await db.query(
      `
      DELETE FROM event_companies
      WHERE event_id = $1 AND company_id = $2
    `,
      [eventId, companyId],
    );

    revalidatePath(`/admin/events/${eventId}/companies`);
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error removing company from event", error);
    return { error: "Failed to remove company from event." };
  }
}

