import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
const ITEMS_PER_PAGE = 6;

export async function getAntojitos(query: string = '', currentPage: number = 1) {
  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const rows = await sql`
      SELECT * FROM antojitos
      WHERE name ILIKE ${searchTerm} 
         OR category ILIKE ${searchTerm}
         OR region ILIKE ${searchTerm}
      ORDER BY name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch antojitos data.');
  }
}

export async function getAntojitoById(id: string) {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    const result = await sql`SELECT * FROM antojitos WHERE id = ${id}`;
    return result[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch antojito.');
  }
}