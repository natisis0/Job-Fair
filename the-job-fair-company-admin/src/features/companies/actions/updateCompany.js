"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export async function updateCompany(formData) {
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim() || null;
  const boothSlot = formData.get("booth_slot")?.toString().trim() || "available";
  const logoFile = formData.get("logo");
  const existingLogo = formData.get("existing_logo")?.toString();

  if (!id || !name) {
    return { error: "Company ID and name are required." };
  }

  if (logoFile && logoFile.size > 5 * 1024 * 1024) {
    return { error: "Logo file size must be less than 5MB." };
  }

  let finalLogoPath = existingLogo || null;

  if (logoFile && logoFile.size > 0 && logoFile.name !== "undefined") {
    try {
      const bytes = await logoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename = `${uniqueSuffix}-${logoFile.name}`;
      
      const uploadDir = "c:/Users/Administrator/Desktop/Projects/Job Fair/the-job-fair-company/public/images/CompaniesLogo";
      const filePath = path.join(uploadDir, filename);

      await fs.writeFile(filePath, buffer);
      
      finalLogoPath = `/images/CompaniesLogo/${filename}`;
    } catch (err) {
      console.error("Error uploading logo", err);
      return { error: "Failed to upload company logo." };
    }
  }

  try {
    await db.query(
      `
      UPDATE companies 
      SET name = $1, email = $2, booth_slot = $3, images = $4
      WHERE id = $5
    `,
      [name, email, boothSlot, finalLogoPath, id],
    );

    revalidatePath("/admin/companies");
    return { success: true };
  } catch (error) {
    console.error("Error updating company", error);
    return { error: "Failed to update company. Please try again." };
  }
}
