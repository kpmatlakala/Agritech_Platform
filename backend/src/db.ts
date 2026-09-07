import { Pool, QueryResult, QueryResultRow } from "pg";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const isLocal = process.env.DATABASE_URL?.includes('localhost') || 
                process.env.DATABASE_URL?.includes('127.0.0.1');
const sslConfig = isLocal ? false : { rejectUnauthorized: false };

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslConfig,
});

export const query = async <T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> => {
  return pool.query<T>(text, params);
};

/**
 * Execute SQL from a file.
 */
export async function runSqlFile(filePath: string): Promise<void> {
  const sql = fs.readFileSync(filePath, 'utf8');
  await pool.query(sql);
}

/**
 * Initialize database schema by running schema.sql.
 * We check if the `users` table exists to avoid re-running.
 */
export async function initializeDatabase() {
  try {
    // Check if users table exists
    const res = await pool.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `);
    const tableExists = res.rows[0].exists;

    if (!tableExists) {
      console.log('📦 Creating database schema...');
      const schemaPath = path.join(__dirname, '../database/schema.sql');
      await runSqlFile(schemaPath);
      console.log('✅ Database schema initialized');
    } else {
      console.log('✅ Database schema already exists, skipping creation.');
    }
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}

export default pool;