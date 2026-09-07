-- ============================================================
-- AGRITECH PLATFORM – GENERAL SCHEMA
-- (No PostGIS dependency)
-- ============================================================

-- ============================================================
-- USERS (central authentication)
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone_number TEXT,
    role TEXT NOT NULL CHECK (role IN ('admin', 'agent', 'farmer')),
    village TEXT,
    district TEXT,
    province TEXT,
    country TEXT DEFAULT 'South Africa',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- AGENTS (extension of users with role='agent')
-- ============================================================
CREATE TABLE IF NOT EXISTS agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    agent_code TEXT UNIQUE,
    organization TEXT,
    region TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- FARMERS (extension of users with role='farmer')
-- ============================================================
CREATE TABLE IF NOT EXISTS farmers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    farmer_code TEXT UNIQUE,
    id_number TEXT,
    farm_size_ha DECIMAL(10,2),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    gps_accuracy DECIMAL(5,2),
    photo_url TEXT,
    crops TEXT[] DEFAULT '{}',
    registered_by UUID REFERENCES agents(id) ON DELETE SET NULL,
    registered_at TIMESTAMP DEFAULT NOW(),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended')),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- AUDIT LOGS
-- ============================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    farmer_id UUID REFERENCES farmers(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    ip_address TEXT,
    details JSONB,
    timestamp TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number);
CREATE INDEX IF NOT EXISTS idx_agents_user_id ON agents(user_id);
CREATE INDEX IF NOT EXISTS idx_agents_code ON agents(agent_code);
CREATE INDEX IF NOT EXISTS idx_farmers_user_id ON farmers(user_id);
CREATE INDEX IF NOT EXISTS idx_farmers_code ON farmers(farmer_code);
CREATE INDEX IF NOT EXISTS idx_farmers_registered_by ON farmers(registered_by);
CREATE INDEX IF NOT EXISTS idx_farmers_status ON farmers(status);
CREATE INDEX IF NOT EXISTS idx_audit_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_farmer_id ON audit_logs(farmer_id);
CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_logs(timestamp);

-- ============================================================
-- VIEWS
-- ============================================================
CREATE OR REPLACE VIEW vw_farmer_details AS
SELECT
    f.id AS farmer_id,
    u.email,
    u.full_name,
    u.phone_number,
    u.village,
    u.district,
    u.province,
    f.farm_size_ha,
    f.latitude,
    f.longitude,
    f.crops,
    f.status,
    f.registered_at,
    a.agent_code AS registered_by_code,
    a.organization AS agent_organization,
    agu.full_name AS agent_name
FROM farmers f
JOIN users u ON f.user_id = u.id
LEFT JOIN agents a ON f.registered_by = a.id
LEFT JOIN users agu ON a.user_id = agu.id;

-- ============================================================
-- RPC FUNCTIONS
-- ============================================================
CREATE OR REPLACE FUNCTION get_farmer_summary(farmer_id_input UUID)
RETURNS TABLE(
    farmer_id UUID,
    email TEXT,
    full_name TEXT,
    village TEXT,
    crops TEXT[],
    farm_size DECIMAL,
    registered_date TIMESTAMP,
    status TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT f.id, u.email, u.full_name, u.village, f.crops, f.farm_size_ha, f.registered_at, f.status
    FROM farmers f
    JOIN users u ON f.user_id = u.id
    WHERE f.id = farmer_id_input;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- TRIGGERS (auto-update updated_at)
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_agents_updated_at BEFORE UPDATE ON agents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_farmers_updated_at BEFORE UPDATE ON farmers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();