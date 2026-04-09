"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import QRCode from "qrcode";
import { nanoid } from "nanoid";

export async function createCandidate(formData) {
  const firstName = formData.get("first_name")?.toString().trim();
  const lastName = formData.get("last_name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  
  if (!firstName || !lastName || !email) {
    return { error: "First name, last name, and email are required." };
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
    // Generate a secure public ID with nanoid
    const publicId = "cand_" + nanoid(10);

    // 1. Insert candidate and get the generated ID
    const result = await db.query(
      `
      INSERT INTO candidates (
        first_name, last_name, email, phone, 
        university, field_of_study, graduation_year, 
        skills, resume_url, status, public_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id
    `,
      [
        firstName, lastName, email, phone, 
        university, fieldOfStudy, graduationYear, 
        skillsArray, resumeUrl, status, publicId
      ]
    );
    

    const candidateId = result.rows[0].id;

    // 2. Generate QR code pointing to the admin API using publicId
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const qrCodeUrl = `${baseUrl}/api/candidate/${publicId}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrCodeUrl);

    // 3. Update the candidate with the generated QR code
    await db.query(
      `UPDATE candidates SET qr_code = $1 WHERE id = $2`,
      [qrCodeDataUrl, candidateId]
    );

    revalidatePath("/admin/candidates");
    return { success: true };
  } catch (error) {
    console.error("Error creating candidate", error);
    if (error.code === '23505') { // Unique constraint violation (likely email)
      return { error: "A candidate with this email already exists." };
    }
    return { error: "Failed to create candidate. Please try again." };
  }
}
