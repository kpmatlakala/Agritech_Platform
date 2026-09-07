-- ============================================================
-- SEED DATA FOR TESTING
-- ============================================================

-- Insert an admin user
INSERT INTO users (email, password_hash, full_name, phone_number, role)
VALUES (
    'admin@agritech.com',
    '$2a$10$dummyhash',   -- replace with actual bcrypt hash (e.g., from Node)
    'System Administrator',
    '0820000000',
    'admin'
) ON CONFLICT (email) DO NOTHING;

-- Insert an agent user (password: agent123)
INSERT INTO users (email, password_hash, full_name, phone_number, role, village, district)
VALUES (
    'agent1@agritech.com',
    '$2a$10$dummyhash2',  -- bcrypt hash for 'agent123'
    'Thabo Mokoena',
    '0821234567',
    'agent',
    'Polokwane',
    'Capricorn'
) ON CONFLICT (email) DO NOTHING;

-- Insert agent record (linking to the user)
INSERT INTO agents (user_id, agent_code, organization, region)
SELECT id, 'AG-001', 'AgriTech Extension', 'Limpopo'
FROM users
WHERE email = 'agent1@agritech.com'
ON CONFLICT (user_id) DO NOTHING;

-- Insert a farmer user (password: farmer123)
INSERT INTO users (email, password_hash, full_name, phone_number, role, village, district)
VALUES (
    'farmer1@agritech.com',
    '$2a$10$dummyhash3',
    'Nomsa Mokoena',
    '0821234568',
    'farmer',
    'Ga-Mothiba',
    'Polokwane'
) ON CONFLICT (email) DO NOTHING;

-- Insert farmer record
INSERT INTO farmers (
    user_id,
    farmer_code,
    id_number,
    farm_size_ha,
    latitude,
    longitude,
    crops,
    registered_by,
    status
)
SELECT
    u.id,
    'F-0001',
    '8901234567890',
    2.5,
    -23.8900,
    29.4600,
    ARRAY['Maize', 'Sunflower'],
    (SELECT id FROM agents WHERE agent_code = 'AG-001'),
    'active'
FROM users u
WHERE u.email = 'farmer1@agritech.com'
ON CONFLICT (user_id) DO NOTHING;

-- Add a second farmer for the same agent
INSERT INTO users (email, password_hash, full_name, phone_number, role, village, district)
VALUES (
    'farmer2@agritech.com',
    '$2a$10$dummyhash4',
    'Peter Maluleke',
    '0732345678',
    'farmer',
    'Tzaneen',
    'Greater Tzaneen'
) ON CONFLICT (email) DO NOTHING;

INSERT INTO farmers (
    user_id,
    farmer_code,
    id_number,
    farm_size_ha,
    latitude,
    longitude,
    crops,
    registered_by,
    status
)
SELECT
    u.id,
    'F-0002',
    '7801234567890',
    4.0,
    -23.8300,
    30.1600,
    ARRAY['Avocado', 'Macadamia'],
    (SELECT id FROM agents WHERE agent_code = 'AG-001'),
    'active'
FROM users u
WHERE u.email = 'farmer2@agritech.com'
ON CONFLICT (user_id) DO NOTHING;