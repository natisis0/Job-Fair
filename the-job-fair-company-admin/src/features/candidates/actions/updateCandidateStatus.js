"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateCandidateStatus(formData) {
  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString().trim();

  if (!id || !status) {
    return { error: "Missing candidate id or status." };
  }

  try {
    await db.query(
      `
      UPDATE candidates
      SET status = $1
      WHERE id = $2
    `,
      [status, id],
    );

    revalidatePath("/admin/candidates");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error updating candidate status", error);
    return { error: "Failed to update candidate status." };
  }
}
