'use server';

import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createAntojito(formData: FormData) {
  const name = formData.get('name') as string;
  const region = formData.get('region') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  // Get the URL string instead of a File object
  const image_url = formData.get('image_url') as string; 

  const sql = neon(process.env.DATABASE_URL!);
  
  await sql`
    INSERT INTO antojitos (name, region, category, description, image_url)
    VALUES (${name}, ${region}, ${category}, ${description}, ${image_url})
  `;

  revalidatePath('/dashboard');
  revalidatePath('/');
  redirect('/dashboard');
}

export async function deleteAntojito(id: string) {
  const sql = neon(process.env.DATABASE_URL!);
  
  try {
    await sql`DELETE FROM antojitos WHERE id = ${id}`;
    revalidatePath('/dashboard');
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to delete antojito:', error);
    throw new Error('Failed to delete antojito.');
  }
}

export async function updateAntojito(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const region = formData.get('region') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const image_url = formData.get('image_url') as string;

  const sql = neon(process.env.DATABASE_URL!);
  
  try {
    await sql`
      UPDATE antojitos
      SET 
        name = ${name}, 
        region = ${region}, 
        category = ${category}, 
        description = ${description}, 
        image_url = ${image_url}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update antojito.');
  }

  revalidatePath('/dashboard');
  revalidatePath('/');
  redirect('/dashboard');
}