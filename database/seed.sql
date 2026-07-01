-- Sample data already included in schema.sql
-- Run this separately if needed

INSERT INTO farmers (farmer_id, full_name, id_number, phone_number, village, district, crop_type, farm_size_ha, latitude, longitude, registered_via)
VALUES 
  ('AFAP-0006', 'David Mthombeni', '9201234567890', '0724567890', 'Malamulele', 'Collins Chabane', ARRAY['Maize', 'Peanuts'], 2.0, -23.0000, 30.5000, 'ussd'),
  ('AFAP-0007', 'Grace Ngobeni', '8801234567890', '0825678901', 'Hoedspruit', 'Maruleng', ARRAY['Citrus', 'Mango'], 5.0, -24.3500, 30.9500, 'ussd');