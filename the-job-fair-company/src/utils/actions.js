"use server";

import db from "./db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { clerkClient } from "@clerk/nextjs/server";
import { Resend } from "resend";
import { nanoid } from "nanoid";
import QRCode from "qrcode";

const resend = new Resend(process.env.RESEND_API_KEY);
const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";

export async function registerCompanyForEvent(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const eventId = formData.get("eventId");
  const logoFile = formData.get("logo");

  if (!name || !email || !eventId) {
    return { success: false, error: "Please fill in all the required fields." };
  }

  if (logoFile && logoFile.size > 10 * 1024 * 1024) {
    return { success: false, error: "Logo file is too large. Please upload one smaller than 10MB." };
  }

  let logoPath = null;
  if (logoFile && logoFile.size > 0) {
    try {
      const bytes = await logoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${logoFile.name.replace(/\s+/g, "-")}`;
      const uploadDir = path.join(process.cwd(), "public/logos");
      const filePath = path.join(uploadDir, fileName);

      await mkdir(uploadDir, { recursive: true });
      await writeFile(filePath, buffer);

      logoPath = `/logos/${fileName}`;
    } catch (uploadError) {
      console.error("[LOGO_UPLOAD_ERROR]:", uploadError);
    }
  }

  const normalizedEmail = email;
  console.log("Normalized email:", normalizedEmail);

  try {
    // 1. CHECK LOCAL DATABASE FIRST
    let companyId;
    let clerkUserId = null;
    let generatedPassword = null;

    const existingCompany = await db.query(
      "SELECT id, clerk_user_id FROM public.companies WHERE email = $1",
      [normalizedEmail]
    );

    if (existingCompany.rows.length > 0) {
      companyId = existingCompany.rows[0].id;
      clerkUserId = existingCompany.rows[0].clerk_user_id;
      console.log(`[AUTH]: Existing company found in DB: ${companyId}. Skipping Clerk auth.`);

      // Update logo if a new one was provided, otherwise keep existing
      if (logoPath) {
        await db.query(
          "UPDATE public.companies SET images = $1 WHERE id = $2",
          [logoPath, companyId]
        );
      }
    } else {
      // 2. NEW COMPANY — try Clerk auth, but don't block if it fails
      try {
        const client = await clerkClient();
        const users = await client.users.getUserList({ emailAddress: [normalizedEmail] });

        if (users.data && users.data.length > 0) {
          clerkUserId = users.data[0].id;
          console.log(`[CLERK]: Existing Clerk user found: ${clerkUserId}`);
        } else {
          generatedPassword = nanoid(6).toUpperCase() + nanoid(6).toLowerCase() + "!1Aa";

          const nameParts = name.trim().split(/\s+/);
          const firstName = nameParts[0] || "Company";
          const lastName = nameParts.slice(1).join(" ") || "Admin";

          try {
            const newUser = await client.users.createUser({
              emailAddress: [normalizedEmail],
              password: generatedPassword,
              firstName,
              lastName,
              publicMetadata: { role: "company" },
            });
            clerkUserId = newUser.id;
            console.log(`[CLERK]: Created new account: ${clerkUserId}`);

            // Send welcome email only on successful account creation
            try {
              await resend.emails.send({
                from: "Job Fair <onboarding@resend.dev>",
                to: "natnaesisay4@gmail.com",
                subject: "Welcome to The Job Fair!",
                html: `
                  <div style="font-family: sans-serif; padding: 20px; color: #1a1a1a;">
                    <h1 style="color: #36B3BA;">Welcome, ${name}!</h1>
                    <p>Your company registration has been received. We have created a dashboard account for you.</p>
                    <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
                      <p><strong>Login Email:</strong> ${normalizedEmail}</p>
                      <p><strong>Temporary Password:</strong> <code style="background: #e0e0e0; padding: 2px 5px; border-radius: 4px;">${generatedPassword}</code></p>
                    </div>
                    <p style="font-size: 0.8em; color: #666;">For security, we recommend changing your password after your first login.</p>
                  </div>
                `,
              });
            } catch (emailError) {
              console.error("[RESEND_EMAIL_ERROR]:", emailError);
            }
          } catch (createError) {
            console.error("[CLERK_CREATE_USER_ERROR]:", JSON.stringify(createError.errors || createError, null, 2));
            return {
              success: false,
              error: "Account creation failed: " + (createError.errors?.[0]?.longMessage || createError.errors?.[0]?.message || "Please try a different email address."),
            };
          }
        }
      } catch (clerkError) {
        console.error("[CLERK_LOOKUP_ERROR]:", JSON.stringify(clerkError.errors || clerkError, null, 2));
        return {
          success: false,
          error: "Auth setup failed: " + (clerkError.errors?.[0]?.message || "Could not verify your account."),
        };
      }

      // 3. CREATE NEW COMPANY IN DB (always runs for new companies)
      const insertCompany = await db.query(
        "INSERT INTO public.companies (name, email, images, clerk_user_id) VALUES ($1, $2, $3, $4) RETURNING id",
        [name, normalizedEmail, logoPath, clerkUserId],
      );
      companyId = insertCompany.rows[0].id;
    }

    // 4. LINK TO EVENT
    const alreadyLinked = await db.query(
      "SELECT 1 FROM public.event_companies WHERE event_id = $1 AND company_id = $2",
      [eventId, companyId],
    );

    if (alreadyLinked.rows.length > 0) {
      return {
        success: true,
        message: "You are already registered for this event.",
      };
    }

    await db.query(
      "INSERT INTO public.event_companies (event_id, company_id) VALUES ($1, $2)",
      [eventId, companyId],
    );

    return {
      success: true,
      message: generatedPassword
        ? "Registration successful! Check your email for login details."
        : "Registration successful! Your account has been linked to this event.",
    };
  } catch (error) {
    console.error("[DATABASE_ERROR]:", error);
    return {
      success: false,
      error: "Our database is having trouble. Please try again in a few minutes.",
    };
  }
}

export async function getCandidateByEmail(email) {
  if (!email) return { success: false, error: "Email is required." };
  
  try {
    const result = await db.query(
      "SELECT first_name, last_name, email, phone, university, field_of_study, graduation_year, skills, resume_url FROM public.candidates WHERE email = $1", 
      [email]
    );
    return { success: true, data: result.rows[0] || null };
  } catch (error) {
    console.error("[GET_CANDIDATE_ERROR]:", error);
    return { success: false, error: "Technical error searching for candidate." };
  }
}

export async function getCompanyByEmail(email) {
  if (!email) return { success: false, error: "Email is required." };

  try {
    const result = await db.query(
      "SELECT name, email, images FROM public.companies WHERE email = $1",
      [email]
    );
    return { success: true, data: result.rows[0] || null };
  } catch (error) {
    console.error("[GET_COMPANY_ERROR]:", error);
    return { success: false, error: "Technical error searching for company." };
  }
}


export async function registerCandidateForEvent(formData) {
  const eventId = formData.get("eventId");
  const email = formData.get("email");
  const firstName = formData.get("first_name");
  const lastName = formData.get("last_name");
  const phone = formData.get("phone");
  const university = formData.get("university");
  const fieldOfStudy = formData.get("field_of_study");
  const graduationYear = parseInt(formData.get("graduation_year"));
  const skillsString = formData.get("skills");
  const resumeUrl = formData.get("resume_url");

  if (!email || !eventId || !firstName || !lastName) {
    return { success: false, error: "Required fields are missing." };
  }

  const skills = skillsString ? skillsString.split(",").map(s => s.trim()).filter(s => s !== "") : [];

  try {
    const eventRes = await db.query(
      "SELECT title, participants_count, available_tickets FROM public.events WHERE id = $1",
      [eventId]
    );
    
    if (eventRes.rows.length === 0) {
      return { success: false, error: "Event not found." };
    }

    const { title: eventTitle, participants_count, available_tickets } = eventRes.rows[0];
    if (participants_count >= available_tickets) {
      return { success: false, error: "Sorry, this event is already full." };
    }

    let candidateId;
    let finalQrCode;
    const existingCandidate = await db.query(
      "SELECT id, public_id, qr_code FROM public.candidates WHERE email = $1",
      [email]
    );

    if (existingCandidate.rows.length > 0) {
      candidateId = existingCandidate.rows[0].id;
      const { public_id, qr_code } = existingCandidate.rows[0];
      
      let pId = public_id;
      let qCode = qr_code;

      if (!pId) {
        pId = nanoid(10);
      }
      
      if (!qCode) {
        qCode = await QRCode.toDataURL(`${adminUrl}/api/candidate/${pId}`);
      }
      
      finalQrCode = qCode;

      await db.query(
        `UPDATE public.candidates 
         SET first_name = $1, last_name = $2, phone = $3, university = $4, 
             field_of_study = $5, graduation_year = $6, skills = $7, resume_url = $8,
             public_id = $9, qr_code = $10
         WHERE id = $11`,
        [firstName, lastName, phone, university, fieldOfStudy, graduationYear, skills, resumeUrl, pId, qCode, candidateId]
      );
    } else {
      const publicId = nanoid(10);
      const qrCode = await QRCode.toDataURL(`${adminUrl}/api/candidate/${publicId}`);
      finalQrCode = qrCode;
      
      const insertRes = await db.query(
        `INSERT INTO public.candidates 
         (first_name, last_name, email, phone, university, field_of_study, graduation_year, skills, resume_url, public_id, qr_code, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`,
        [firstName, lastName, email, phone, university, fieldOfStudy, graduationYear, skills, resumeUrl, publicId, qrCode, 'active']
      );
      candidateId = insertRes.rows[0].id;
    }

    const linkCheck = await db.query(
      "SELECT 1 FROM public.event_candidates WHERE event_id = $1 AND candidate_id = $2",
      [eventId, candidateId]
    );

    if (linkCheck.rows.length > 0) {
      return { success: false, error: "You are already registered for this event." };
    }

    await db.query("BEGIN");
    try {
      await db.query(
        "INSERT INTO public.event_candidates (event_id, candidate_id) VALUES ($1, $2)",
        [eventId, candidateId]
      );
       
      await db.query(
        "UPDATE public.events SET participants_count = participants_count + 1 WHERE id = $1",
        [eventId]
      );
      await db.query("COMMIT");

      // Send Email with QR Code
      try {
        const qrBase64 = finalQrCode.split(";base64,").pop(); // Extract raw base64

        await resend.emails.send({
          from: "Job Fair <onboarding@resend.dev>",
          to: "natnaesisay4@gmail.com", // Sending to candidate's real email
          subject: `Ticket for ${eventTitle}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #1a1a1a; max-width: 500px; margin: auto; border: 1px solid #eee; border-radius: 12px;">
              <h1 style="color: #36B3BA; text-align: center;">You're Registered!</h1>
              <p>Hi ${firstName},</p>
              <p>You have successfully registered for <strong>${eventTitle}</strong>. Here is your entry QR code:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <img src="cid:qrcode_image" alt="Entry QR Code" style="width: 200px; height: 200px; border: 4px solid #36B3BA; border-radius: 12px;" />
              </div>
              
              <p style="background: #f9f9f9; padding: 15px; border-radius: 8px; font-size: 0.9em; line-height: 1.5;">
                <strong>Event:</strong> ${eventTitle}<br/>
                <strong>Location:</strong> Please check the event page for details.
              </p>
              
              <p style="font-size: 0.8em; color: #666; text-align: center; margin-top: 20px;">
                Show this QR code at the entrance to check in.
              </p>
            </div>
          `,
          attachments: [
            {
              filename: "qrcode.png",
              content: qrBase64,
              contentId: "qrcode_image",
              disposition: "inline",
            },
          ],
        });
      } catch (emailError) {
        console.error("[CANDIDATE_EMAIL_ERROR]:", emailError);
      }

    } catch (txError) {
      await db.query("ROLLBACK");
      throw txError;
    }

    return { success: true, message: "Successfully registered! Check your email for your QR code." };
  } catch (error) {
    console.error("[REGISTER_CANDIDATE_ERROR]:", error);
    return { success: false, error: "Failed to register. Please try again later." };
  }
}
