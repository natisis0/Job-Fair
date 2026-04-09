"use server";

import db from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";

/**
 * Get the current company from the authenticated Clerk user.
 */
export async function getCurrentCompany() {
  const { userId } = await auth();
  if (!userId) return null;

  const { rows } = await db.query(
    "SELECT * FROM companies WHERE clerk_user_id = $1",
    [userId]
  );

  return rows[0] || null;
}

/**
 * Get all events the company is registered to participate in.
 */
export async function getCompanyEvents(companyId) {
  const { rows } = await db.query(
    `
    SELECT 
      e.id, e.title, e.event_date, e.event_time, e.location, e.venue,
      e.status, e.participants_count, e.available_tickets, e.event_type
    FROM event_companies ec
    JOIN events e ON ec.event_id = e.id
    WHERE ec.company_id = $1
    ORDER BY e.event_date DESC
    `,
    [companyId]
  );
  return rows;
}

/**
 * Get all candidates scanned by the company.
 */
export async function getCompanyCandidates(companyId) {
  const { rows } = await db.query(
    `
    SELECT 
      c.id, c.first_name, c.last_name, c.email, c.phone,
      c.university, c.field_of_study, c.graduation_year,
      c.skills, c.resume_url, c.status,
      cc.scanned_at
    FROM company_candidates cc
    JOIN candidates c ON cc.candidate_id = c.id
    WHERE cc.company_id = $1
    ORDER BY cc.scanned_at DESC
    `,
    [companyId]
  );
  return rows;
}

/**
 * Get dashboard stats for the company.
 */
export async function getCompanyStats(companyId) {
  const eventsResult = await db.query(
    "SELECT COUNT(*) as count FROM event_companies WHERE company_id = $1",
    [companyId]
  );

  const candidatesResult = await db.query(
    "SELECT COUNT(*) as count FROM company_candidates WHERE company_id = $1",
    [companyId]
  );

  return {
    eventsJoined: parseInt(eventsResult.rows[0].count),
    candidatesScanned: parseInt(candidatesResult.rows[0].count),
  };
}

/**
 * Scan a candidate by their public_id and register them under this company.
 */
export async function scanCandidate(companyId, publicId) {
  // 1. Find the candidate by public_id
  const candidateResult = await db.query(
    "SELECT * FROM candidates WHERE public_id = $1",
    [publicId]
  );

  if (candidateResult.rows.length === 0) {
    return { error: "Candidate not found. The QR code may be invalid." };
  }

  const candidate = candidateResult.rows[0];

  // 2. Check if already scanned
  const existingResult = await db.query(
    "SELECT id FROM company_candidates WHERE company_id = $1 AND candidate_id = $2",
    [companyId, candidate.id]
  );

  if (existingResult.rows.length > 0) {
    return {
      error: "This candidate has already been scanned.",
      candidate: {
        first_name: candidate.first_name,
        last_name: candidate.last_name,
        email: candidate.email,
      },
    };
  }

  // 3. Insert the scan record
  await db.query(
    "INSERT INTO company_candidates (id, company_id, candidate_id, scanned_at) VALUES (gen_random_uuid(), $1, $2, NOW())",
    [companyId, candidate.id]
  );

  return {
    success: true,
    candidate: {
      first_name: candidate.first_name,
      last_name: candidate.last_name,
      email: candidate.email,
      phone: candidate.phone,
      university: candidate.university,
      field_of_study: candidate.field_of_study,
      skills: candidate.skills,
    },
  };
}
