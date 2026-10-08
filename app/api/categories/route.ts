import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// READ: Fetch all categories
export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const categories = await sql`SELECT * FROM categories ORDER BY id ASC`;
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

// CREATE: Add a new category
export async function POST(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const body = await request.json();
    
    if (!body.name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const newCategory = await sql`
      INSERT INTO categories (name) 
      VALUES (${body.name}) 
      RETURNING *
    `;
    
    return NextResponse.json(newCategory[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}