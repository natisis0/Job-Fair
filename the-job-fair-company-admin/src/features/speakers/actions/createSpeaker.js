"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export async function createSpeaker(formData) {
  const eventId = formData.get("event_id")?.toString();
  const name = formData.get("name")?.toString().trim();
  const title = formData.get("title")?.toString().trim();
  const instagram = formData.get("instagram")?.toString().trim();
  const linkedin = formData.get("linkedin")?.toString().trim();
  const imageFile = formData.get("image_file");

  if (!eventId || !name) {
    return { error: "Event ID and speaker name are required." };
  }

  let imageUrl = formData.get("image_url")?.toString().trim();

  // Handle Image Upload
  if (imageFile && imageFile instanceof File && imageFile.name !== "undefined" && imageFile.size > 0) {
    try {
      const baseDir = "c:\\Users\\Administrator\\Desktop\\Projects\\Job Fair\\the-job-fair-company\\public\\images\\speakers";
      if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
      }

      const timestamp = Date.now();
      const fileName = `${timestamp}-${imageFile.name.replace(/\s+/g, '_')}`;
      const filePath = path.join(baseDir, fileName);

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fs.writeFileSync(filePath, buffer);

      imageUrl = `/images/speakers/${fileName}`;
    } catch (err) {
      console.error("Error uploading speaker image:", err);
    }
  }

  try {
    const sql = `
      INSERT INTO speakers (
        event_id,
        name,
        title,
        image_url,
        instagram,
        linkedin
      )
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    await db.query(sql, [eventId, name, title, imageUrl, instagram, linkedin]);

    revalidatePath(`/admin/events/${eventId}/speakers`);
    return { success: true };
  } catch (error) {
    console.error("Error creating speaker:", error);
    return { error: "Failed to create speaker. Please try again." };
  }
}
