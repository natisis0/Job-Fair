"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export async function updateSpeaker(formData) {
  const id = formData.get("id")?.toString();
  const eventId = formData.get("event_id")?.toString();
  const name = formData.get("name")?.toString().trim();
  const title = formData.get("title")?.toString().trim();
  const instagram = formData.get("instagram")?.toString().trim();
  const linkedin = formData.get("linkedin")?.toString().trim();
  const imageFile = formData.get("image_file");

  if (!id || !eventId) {
    return { error: "Speaker ID and Event ID are required." };
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
      console.error("Error updating speaker image:", err);
    }
  }

  try {
    const fields = ["name = $1", "title = $2", "image_url = $3", "instagram = $4", "linkedin = $5"];
    const values = [name, title, imageUrl, instagram, linkedin, id];

    const sql = `
      UPDATE speakers
      SET ${fields.join(", ")}
      WHERE id = $6
    `;
    await db.query(sql, values);

    revalidatePath(`/admin/events/${eventId}/speakers`);
    return { success: true };
  } catch (error) {
    console.error("Error updating speaker:", error);
    return { error: "Failed to update speaker. Please try again." };
  }
}
