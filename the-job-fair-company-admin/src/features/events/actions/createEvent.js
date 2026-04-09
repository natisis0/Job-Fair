"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

import fs from "fs";
import path from "path";

export async function createEvent(formData) {
  const title = formData.get("title")?.toString().trim();
  const organizer = formData.get("organizer")?.toString().trim() || null;
  const description = formData.get("description")?.toString().trim() || null;
  const eventType = formData.get("event_type")?.toString().trim() || null;
  const eligibility = formData.get("eligibility")?.toString().trim() || null;
  const location = formData.get("location")?.toString().trim() || null;
  const venue = formData.get("venue")?.toString().trim() || null;
  const eventDate = formData.get("event_date")?.toString();
  const eventTime = formData.get("event_time")?.toString() || null;
  const availableTickets = Number(formData.get("available_tickets") || 100);
  
  const heroImageFile = formData.get("hero_image_file");
  let heroImage = formData.get("hero_image")?.toString().trim() || "/images/event.png";

  if (!title || !eventDate) {
    return { error: "Title and event date are required." };
  }

  // File size validation (5MB limit)
  if (heroImageFile && heroImageFile.size > 5 * 1024 * 1024) {
    return { error: "Hero image must be less than 5MB." };
  }

  const galleryPhotos = formData.getAll("photos");
  for (const photo of galleryPhotos) {
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

      heroImage = `/images/${fileName}`;
    } catch (err) {
      console.error("Error uploading hero image:", err);
    }
  }

  // Handle Photos
  const photoFiles = formData.getAll("photos");
  const validPhotos = photoFiles.filter(file => file instanceof File && file.name !== "undefined" && file.size > 0);

  try {
    const { rows: eventRows } = await db.query(
      `
      INSERT INTO events (
        title,
        organizer,
        description,
        event_type,
        eligibility,
        location,
        venue,
        event_date,
        event_time,
        hero_image,
        available_tickets
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING id
    `,
      [
        title,
        organizer,
        description,
        eventType,
        eligibility,
        location,
        venue,
        eventDate,
        eventTime,
        heroImage,
        availableTickets,
      ],
    );

    const newEventId = eventRows[0].id;

    // Handle Gallery Photo Uploads
    if (validPhotos.length > 0) {
      const baseDir = "c:\\Users\\Administrator\\Desktop\\Projects\\Job Fair\\the-job-fair-company\\public\\images";
      const sanitizedTitle = title.replace(/[<>:"/\\|?*]/g, '_');
      const eventDir = path.join(baseDir, sanitizedTitle);

      if (!fs.existsSync(eventDir)) {
        fs.mkdirSync(eventDir, { recursive: true });
      }

      for (const file of validPhotos) {
        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.name.replace(/\s+/g, '_')}`;
        const filePath = path.join(eventDir, fileName);
        
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        fs.writeFileSync(filePath, buffer);

        const relativePath = `/images/${sanitizedTitle}/${fileName}`;
        await db.query(
          "INSERT INTO event_photos (event_id, image_url) VALUES ($1, $2)",
          [newEventId, relativePath]
        );
      }
    }

    revalidatePath("/admin/events");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error creating event", error);
    return { error: "Failed to create event. Please try again." };
  }
}

