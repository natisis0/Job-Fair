"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateCompanyStatus(formData) {
  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString().trim();

  if (!id || !status) {
    return { error: "Missing company id or status." };
  }

  try {
    await db.query(
      `
      UPDATE companies
      SET status = $1
      WHERE id = $2
    `,
      [status, id],
    );

    revalidatePath("/admin/companies");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error updating company status", error);
    return { error: "Failed to update company status." };
  }
}

