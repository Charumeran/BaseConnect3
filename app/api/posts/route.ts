import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function POST(req: Request) {
  const { title, income, categories } = await req.json();

  try {
    const client = await pool.connect();
    const query = `
      INSERT INTO posts (title, income, categories)
      VALUES ($1, $2, $3)
      RETURNING *`;
    const values = [title, income, categories];

    const result = await client.query(query, values);
    client.release();

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting post:', error);
    return NextResponse.json({ error: '投稿に失敗しました' }, { status: 500 });
  }
}
