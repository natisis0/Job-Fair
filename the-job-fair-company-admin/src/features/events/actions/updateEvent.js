"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export async function updateEvent(formData) {
  const id = formData.get("id")?.toString();
  if (!id) {
    return { error: "Missing event id." };
  }

  const title = formData.get("title")?.toString().trim();
  const organizer = formData.get("organizer")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const eventType = formData.get("event_type")?.toString().trim();
  const eligibility = formData.get("eligibility")?.toString().trim();
  const location = formData.get("location")?.toString().trim();
  const venue = formData.get("venue")?.toString().trim();
  const eventDate = formData.get("event_date")?.toString();
  const eventTime = formData.get("event_time")?.toString();
  const availableTickets = formData.get("available_tickets")?.toString();
  const status = formData.get("status")?.toString().trim();
  const heroImageFile = formData.get("hero_image_file");
  let finalHeroImage = formData.get("hero_image")?.toString().trim();

  // Handle Photos
  const photoFiles = formData.getAll("photos");
  const validPhotos = photoFiles.filter(file => file instanceof File && file.name !== "undefined" && file.size > 0);

  // File size validation (5MB limit)
  if (heroImageFile && heroImageFile.size > 5 * 1024 * 1024) {
    return { error: "Hero image must be less than 5MB." };
  }

  for (const photo of validPhotos) {
    if (photo && photo.size > 5 * 1024 * 1024) {
      return { error: "Each photo must be less than 5MB." };
    }
  }

  // Handle Hero Image Upload
  if (heroImageFile && heroImageFile instanceof File && heroImageFile.name !== "undefined" && heroImageFile.size > 0) {
    try {
      const baseDir = "c:\\Users\\Administrator\\Desktop\\Projects\\Job Fair\\the-job-fair-company\\public\\images";
      if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
      }

      const timestamp = Date.now();
      const fileName = `hero-${timestamp}-${heroImageFile.name.replace(/\s+/g, '_')}`;
      const filePath = path.join(baseDir, fileName);

      const bytes = await heroImageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fs.writeFileSync(filePath, buffer);

      finalHeroImage = `/images/${fileName}`;
    } catch (err) {
      console.error("Error uploading hero image:", err);
    }
  }

  const fields = [];
  const values = [];

  function addField(column, value) {
    if (value !== undefined && value !== null && value !== "") {
      fields.push(`${column} = $${fields.length + 1}`);
      values.push(column === "available_tickets" ? Number(value) : value);
    }
  }

  addField("title", title);
  addField("organizer", organizer);
  addField("description", description);
  addField("event_type", eventType);
  addField("eligibility", eligibility);
  addField("location", location);
  addField("venue", venue);
  addField("event_date", eventDate);
  addField("event_time", eventTime);
  addField("hero_image", finalHeroImage);
  addField("available_tickets", availableTickets);
  addField("status", status);

  try {
    // 1. Update Event Details if there are fields to update
    if (fields.length > 0) {
      const sql = `
        UPDATE events
        SET ${fields.join(", ")}
        WHERE id = $${fields.length + 1}
      `;
      values.push(id);
      await db.query(sql, values);
    }

    // 2. Handle Photo Uploads
    if (validPhotos.length > 0) {
      // The path to store images in the main app
      const baseDir = "c:\\Users\\Administrator\\Desktop\\Projects\\Job Fair\\the-job-fair-company\\public\\images";
      // Sanitize title for folder name (remove problematic characters)
      const sanitizedTitle = title.replace(/[<>:"/\\|?*]/g, '_');
      const eventDir = path.join(baseDir, sanitizedTitle);

      if (!fs.existsSync(eventDir)) {
        fs.mkdirSync(eventDir, { recursive: true });
      }

      for (const file of validPhotos) {
        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.name.replace(/\s+/g, '_')}`;
        const filePath = path.join(eventDir, fileName);
        
        // Read file content
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Save to filesystem
        fs.writeFileSync(filePath, buffer);

        // Store in DB - relative path for use in web app
        const relativePath = `/images/${sanitizedTitle}/${fileName}`;
        await db.query(
          "INSERT INTO event_photos (event_id, image_url) VALUES ($1, $2)",
          [id, relativePath]
        );
      }
    }

    revalidatePath("/admin/events");
    revalidatePath(`/admin/events/${id}`);
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error updating event", error);
    return { error: "Failed to update event. Please try again." };
  }
}

