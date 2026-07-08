import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === "production";
const hasSslModeInUrl = /[?&]sslmode=/i.test(databaseUrl || "");
const forceSsl = process.env.PG_SSL === "true";
const sslEnabled = Boolean(forceSsl || isProduction || hasSslModeInUrl);
const rejectUnauthorized = process.env.PG_SSL_REJECT_UNAUTHORIZED
  ? process.env.PG_SSL_REJECT_UNAUTHORIZED === "true"
  : isProduction;

function getConnectionString(): string | undefined {
  if (!databaseUrl) {
    return databaseUrl;
  }

  // For local/dev with managed DBs that use self-signed chains, force the
  // URL sslmode to no-verify so pg's parser won't override our SSL intent.
  if (!rejectUnauthorized) {
    try {
      const parsed = new URL(databaseUrl);
      parsed.searchParams.set("sslmode", "no-verify");
      return parsed.toString();
    } catch {
      return databaseUrl;
    }
  }

  return databaseUrl;
}

// Use DATABASE_URL from Aiven or fallback to individual env vars for local dev
const pool = new Pool({
  connectionString: getConnectionString(),
  ssl: sslEnabled ? { rejectUnauthorized } : false,
});

// Initialize database schema on startup
export async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS agents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        agent_id TEXT UNIQUE NOT NULL,
        phone_number TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        email TEXT,
        village TEXT,
        district TEXT,
        province TEXT DEFAULT 'Limpopo',
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS farmers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        farmer_id TEXT UNIQUE NOT NULL,
        phone_number TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        id_number TEXT NOT NULL,
        village TEXT NOT NULL,
        district TEXT,
        province TEXT DEFAULT 'Limpopo',
        crop_types TEXT[] DEFAULT '{}',
        farm_size_ha DECIMAL(10,2),
        latitude DECIMAL(10,8),
        longitude DECIMAL(11,8),
        gps_accuracy DECIMAL(5,2),
        photo_url TEXT,
        registered_at TIMESTAMP DEFAULT NOW(),
        registered_via TEXT DEFAULT 'agent',
        status TEXT DEFAULT 'active',
        created_by TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        phone_number TEXT UNIQUE NOT NULL,
        password_hash TEXT,
        role TEXT NOT NULL CHECK (role IN ('agent', 'farmer')),
        role_id UUID,
        pin TEXT,
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      );

      -- Backward compatibility for legacy schemas that predate these columns
      ALTER TABLE agents ADD COLUMN IF NOT EXISTS agent_id TEXT;
      ALTER TABLE agents ADD COLUMN IF NOT EXISTS phone_number TEXT;

      ALTER TABLE farmers ADD COLUMN IF NOT EXISTS farmer_id TEXT;
      ALTER TABLE farmers ADD COLUMN IF NOT EXISTS phone_number TEXT;
      ALTER TABLE farmers ADD COLUMN IF NOT EXISTS created_by TEXT;

      ALTER TABLE users ADD COLUMN IF NOT EXISTS phone_number TEXT;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT;

      CREATE INDEX IF NOT EXISTS idx_agents_agent_id ON agents(agent_id);
      CREATE INDEX IF NOT EXISTS idx_agents_phone ON agents(phone_number);
      CREATE INDEX IF NOT EXISTS idx_farmers_farmer_id ON farmers(farmer_id);
      CREATE INDEX IF NOT EXISTS idx_farmers_phone ON farmers(phone_number);
      CREATE INDEX IF NOT EXISTS idx_farmers_created_by ON farmers(created_by);
      CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number);
      CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
    `);

    console.log("✅ Database schema initialized");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    throw error;
  }
}

export async function getAgentNumber(): Promise<number> {
  const result = await pool.query(
    "SELECT COUNT(*) as count FROM agents WHERE agent_id LIKE 'AG-%'"
  );
  return result.rows[0].count + 1;
}

export async function getFarmerNumber(): Promise<number> {
  const result = await pool.query(
    "SELECT COUNT(*) as count FROM farmers WHERE farmer_id LIKE 'AFAP-%'"
  );
  return result.rows[0].count + 1;
}

export default pool;
