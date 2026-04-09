"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteCandidate(candidateId) {
  const id = candidateId;

  if (!id) {
    return { error: "Missing candidate id." };
  }

  try {
    await db.query(
      `
      DELETE FROM candidates
      WHERE id = $1
    `,
      [id],
    );

    revalidatePath("/admin/candidates");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting candidate", error);
    return { error: "Failed to delete candidate." };
  }
}
