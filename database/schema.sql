-- ============================================
-- AGRITECH PLATFORM - DATABASE SCHEMA
-- PostgreSQL (Aiven)
-- ============================================

-- Enable PostGIS for GPS/location support
CREATE EXTENSION IF NOT EXISTS postgis;

-- ============================================
-- Table: farmers
-- ============================================
CREATE TABLE farmers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    id_number TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    village TEXT NOT NULL,
    district TEXT,
    province TEXT DEFAULT 'Limpopo',
    crop_type TEXT[] DEFAULT '{}',
    farm_size_ha DECIMAL(10,2),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    gps_accuracy DECIMAL(5,2),
    registered_at TIMESTAMP DEFAULT NOW(),
    registered_via TEXT DEFAULT 'ussd',
    digital_id TEXT,
    status TEXT DEFAULT 'active',
    created_by TEXT DEFAULT 'system',
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- Table: users (Admin accounts)
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'viewer',
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- Table: audit_logs
-- ============================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id UUID REFERENCES farmers(id),
    action TEXT NOT NULL,
    user_id UUID REFERENCES users(id),
    ip_address TEXT,
    timestamp TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- Indexes (for performance)
-- ============================================
CREATE INDEX idx_farmers_phone ON farmers(phone_number);
CREATE INDEX idx_farmers_village ON farmers(village);
CREATE INDEX idx_farmers_registered_at ON farmers(registered_at);
CREATE INDEX idx_farmers_province ON farmers(province);
CREATE INDEX idx_farmers_location ON farmers USING GIST (geography(latitude, longitude));

-- ============================================
-- Sample Data (Limpopo Farmers)
-- ============================================
INSERT INTO farmers (farmer_id, full_name, id_number, phone_number, village, district, crop_type, farm_size_ha, latitude, longitude, registered_via)
VALUES 
  ('AFAP-0001', 'Nomsa Mokoena', '8901234567890', '0821234567', 'Ga-Mothiba', 'Polokwane', ARRAY['Maize', 'Sunflower'], 2.5, -23.8900, 29.4600, 'ussd'),
  ('AFAP-0002', 'Peter Maluleke', '7801234567890', '0732345678', 'Tzaneen', 'Greater Tzaneen', ARRAY['Avocado', 'Macadamia'], 4.0, -23.8300, 30.1600, 'ussd'),
  ('AFAP-0003', 'Maria Nkosi', '9101234567890', '0713456789', 'Burgersfort', 'Sekhukhune', ARRAY['Maize', 'Groundnuts'], 3.0, -24.6800, 30.3300, 'ussd'),
  ('AFAP-0004', 'Thabo Ramaphosa', '8902345678901', '0824567890', 'Modimolle', 'Waterberg', ARRAY['Citrus', 'Vegetables'], 6.0, -24.7000, 28.4100, 'ussd'),
  ('AFAP-0005', 'Lindiwe Mokoena', '9001234567890', '0735678901', 'Giyani', 'Mopani', ARRAY['Maize', 'Sesame'], 1.5, -23.3100, 30.7000, 'ussd');

-- ============================================
-- RPC Function: Get farmer summary
-- ============================================
CREATE OR REPLACE FUNCTION get_farmer_summary(farmer_id_input TEXT)
RETURNS TABLE(
    farmer_id TEXT,
    full_name TEXT,
    village TEXT,
    crop_types TEXT[],
    farm_size DECIMAL,
    registered_date TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT f.farmer_id, f.full_name, f.village, f.crop_type, f.farm_size_ha, f.registered_at
    FROM farmers f
    WHERE f.farmer_id = farmer_id_input;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Row Level Security (RLS) - Basic
-- ============================================
ALTER TABLE farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all farmers
CREATE POLICY "Authenticated users can read farmers"
ON farmers FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to insert farmers
CREATE POLICY "Authenticated users can insert farmers"
ON farmers FOR INSERT
TO authenticated
WITH CHECK (true);
