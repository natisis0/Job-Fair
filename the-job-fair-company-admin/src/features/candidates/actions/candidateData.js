import db from "@/lib/db";

export async function getCandidates() {
  const { rows } = await db.query(
    `
    SELECT 
      c.*,
      COALESCE(ARRAY_AGG(DISTINCT e.title) FILTER (WHERE e.title IS NOT NULL), '{}') as event_titles,
      COALESCE(ARRAY_AGG(DISTINCT comp.name) FILTER (WHERE comp.name IS NOT NULL), '{}') as company_names
    FROM candidates c
    LEFT JOIN event_candidates ec ON c.id = ec.candidate_id
    LEFT JOIN events e ON ec.event_id = e.id
    LEFT JOIN company_candidates cc ON c.id = cc.candidate_id
    LEFT JOIN companies comp ON cc.company_id = comp.id
    GROUP BY c.id
    ORDER BY c.created_at DESC
  `,
  );
  return rows;
}

export async function getCandidate(id) {
  try {
    const { rows } = await db.query(
      `
      SELECT *
      FROM candidates
      WHERE id = $1
    `,
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error("Failed to fetch candidate", error);
    return null;
  }
}