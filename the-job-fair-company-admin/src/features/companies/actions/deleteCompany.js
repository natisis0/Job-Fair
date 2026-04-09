"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteCompany(companyId) {
  const id = companyId;

  if (!id) {
    return { error: "Missing company id." };
  }

  try {
    await db.query(
      `
      DELETE FROM companies
      WHERE id = $1
    `,
      [id],
    );

    revalidatePath("/admin/companies");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting company", error);
    return { error: "Failed to delete company." };
  }
}

