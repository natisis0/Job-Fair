"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";


export async function updateCandidate(formData) {
  const id = formData.get("id")?.toString();
  const firstName = formData.get("first_name")?.toString().trim();
  const lastName = formData.get("last_name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();

  if (!id || !firstName || !lastName || !email) {
    return { error: "ID, first name, last name, and email are required." };
  }

  const phone = formData.get("phone")?.toString().trim() || null;
  const university = formData.get("university")?.toString().trim() || null;
  const fieldOfStudy = formData.get("field_of_study")?.toString().trim() || null;
  const graduationYear = formData.get("graduation_year") ? parseInt(formData.get("graduation_year").toString()) : null;
  const resumeUrl = formData.get("resume_url")?.toString().trim() || null;
  const status = formData.get("status")?.toString().trim() || "active";

  const skillsString = formData.get("skills")?.toString().trim() || "";
  const skillsArray = skillsString ? skillsString.split(",").map(s => s.trim()).filter(Boolean) : [];

  try {

    await db.query(
      `
      UPDATE candidates 
      SET 
        first_name = $1, 
        last_name = $2, 
        email = $3, 
        phone = $4, 
        university = $5, 
        field_of_study = $6, 
        graduation_year = $7, 
        skills = $8, 
        resume_url = $9, 
        status = $10
      WHERE id = $11
    `,
      [
        firstName, lastName, email, phone,
        university, fieldOfStudy, graduationYear,
        skillsArray, resumeUrl, status,
        id
      ]
    );

    revalidatePath("/admin/candidates");
    return { success: true };
  } catch (error) {
    console.error("Error updating candidate", error);
    if (error.code === '23505') { // Unique constraint violation
      return { error: "Another candidate with this email already exists." };
    }
    return { error: "Failed to update candidate. Please try again." };
  }
}
