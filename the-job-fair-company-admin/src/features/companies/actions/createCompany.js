"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export async function createCompany(formData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim() || null;
  const boothSlot = formData.get("booth_slot")?.toString().trim() || "available";
  const logoFile = formData.get("logo");

  if (!name) {
    return { error: "Company name is required." };
  }

  if (logoFile && logoFile.size > 5 * 1024 * 1024) {
    return { error: "Logo file size must be less than 5MB." };
  }

  let logoPath = null;
  if (logoFile && logoFile.size > 0 && logoFile.name !== "undefined") {
    try {
      const bytes = await logoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Unique filename
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename = `${uniqueSuffix}-${logoFile.name}`;
      
      const uploadDir = "c:/Users/Administrator/Desktop/Projects/Job Fair/the-job-fair-company/public/images/CompaniesLogo";
      const filePath = path.join(uploadDir, filename);

      await fs.writeFile(filePath, buffer);
      
      // Store relative path for frontend usage
      logoPath = `/images/CompaniesLogo/${filename}`;
    } catch (err) {
      console.error("Error uploading logo", err);
      return { error: "Failed to upload company logo." };
    }
  }

  try {
    await db.query(
      `
      INSERT INTO companies (name, email, booth_slot, images)
      VALUES ($1, $2, $3, $4)
    `,
      [name, email, boothSlot, logoPath],
    );

    revalidatePath("/admin/companies");
    return { success: true };
  } catch (error) {
    console.error("Error creating company", error);
    return { error: "Failed to create company. Please try again." };
  }
}

