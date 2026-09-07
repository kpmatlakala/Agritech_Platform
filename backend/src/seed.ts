import bcrypt from 'bcryptjs';
import { query } from './db';

async function seed() {
  console.log('🌱 Seeding test users...');

  // 1. Admin (email login)
  await query(
    `INSERT INTO users (email, password_hash, full_name, phone_number, role)
     VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO NOTHING`,
    ['admin@agritech.com', await bcrypt.hash('admin123', 10), 'System Admin', '0820000000', 'admin']
  );

  // 2. Agent
  const agentUser = await query(
    `INSERT INTO users (email, password_hash, full_name, phone_number, role, village, district)
     VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (email) DO NOTHING RETURNING *`,
    ['agent1@agritech.com', await bcrypt.hash('agent123', 10), 'Thabo Mokoena', '0821234567', 'agent', 'Polokwane', 'Capricorn']
  );

  let agentId: string | null = null;
  if (agentUser.rows.length > 0) {
    const agent = await query(
      `INSERT INTO agents (user_id, agent_code, organization)
       VALUES ($1, $2, $3) ON CONFLICT (user_id) DO NOTHING RETURNING id`,
      [agentUser.rows[0].id, 'AG-001', 'AgriTech Extension']
    );
    if (agent.rows.length > 0) {
      agentId = agent.rows[0].id;
    }
  }

  // 3. Farmer (linked to agent)
  if (agentId) {
    const farmerUser = await query(
      `INSERT INTO users (email, password_hash, full_name, phone_number, role, village, district)
       VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (email) DO NOTHING RETURNING *`,
      ['farmer1@agritech.com', await bcrypt.hash('farmer123', 10), 'Nomsa Mokoena', '0821234568', 'farmer', 'Ga-Mothiba', 'Polokwane']
    );

    if (farmerUser.rows.length > 0) {
      await query(
        `INSERT INTO farmers (user_id, farmer_code, id_number, farm_size_ha, latitude, longitude, crops, registered_by, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (user_id) DO NOTHING`,
        [farmerUser.rows[0].id, 'F-0001', '8901234567890', 2.5, -23.89, 29.46, ['Maize', 'Sunflower'], agentId, 'active']
      );
    }

    // Add a second farmer
    const farmerUser2 = await query(
      `INSERT INTO users (email, password_hash, full_name, phone_number, role, village, district)
       VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (email) DO NOTHING RETURNING *`,
      ['farmer2@agritech.com', await bcrypt.hash('farmer123', 10), 'Peter Maluleke', '0732345678', 'farmer', 'Tzaneen', 'Greater Tzaneen']
    );

    if (farmerUser2.rows.length > 0) {
      await query(
        `INSERT INTO farmers (user_id, farmer_code, id_number, farm_size_ha, latitude, longitude, crops, registered_by, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (user_id) DO NOTHING`,
        [farmerUser2.rows[0].id, 'F-0002', '7801234567890', 4.0, -23.83, 30.16, ['Avocado', 'Macadamia'], agentId, 'active']
      );
    }
  }

  console.log('✅ Seed complete!');
  process.exit();
}

seed();