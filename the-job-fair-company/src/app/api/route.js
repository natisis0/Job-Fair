import { NextResponse } from 'next/server';
import db from '@/utils/db';

export async function GET() {
  try {
    const result = await db.query('SELECT * FROM public.events ORDER BY id ASC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });

  }
}

