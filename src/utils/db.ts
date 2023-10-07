import pg from 'pg';

const pool = await new pg.Pool({
  connectionString: import.meta.env.DATABASE_URL,
  ssl: true,
});

const db = await pool.connect();

export async function query(query: string, values: any[]) {
  const data = await db.query(query, values);

  return data.rows;
}

export async function queryOne(q: string, values: string[]) {
  const rows = await query(q, values);

  return rows.at(0);
}
