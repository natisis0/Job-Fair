import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Candidate ID is required" }, { status: 400 });
  }

  try {
    const result = await db.query(
      "SELECT * FROM candidates WHERE public_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    const candidate = result.rows[0];

    return NextResponse.json(candidate);
  } catch (error) {
    console.error("Error fetching candidate", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
