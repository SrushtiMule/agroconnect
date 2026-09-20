-- ==========================================================
-- AGROCONNECT SEED DATA (Realistic Indian Agriculture Data)
-- ==========================================================

USE agroconnect_db;

-- 1. USERS
INSERT INTO users (id, name, email, phone, password_hash, role, avatar_url) VALUES
('user-farmer-1', 'Rajesh Patil', 'rajesh.patil@agroconnect.in', '+919823456789', '$2a$10$wN9iL6jG50WkQ97e9yDqve8kG9N0b8/jZ3b7o6f9d9A1b2c3d4e5f', 'FARMER', 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80'),
('user-farmer-2', 'Sardar Gurpreet Singh', 'gurpreet.singh@agroconnect.in', '+919814012345', '$2a$10$wN9iL6jG50WkQ97e9yDqve8kG9N0b8/jZ3b7o6f9d9A1b2c3d4e5f', 'FARMER', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80'),
('user-buyer-1', 'Priya Sharma', 'priya.sharma@gmail.com', '+919711234567', '$2a$10$wN9iL6jG50WkQ97e9yDqve8kG9N0b8/jZ3b7o6f9d9A1b2c3d4e5f', 'BUYER', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'),
('user-wholesale-1', 'Vikram Mehta (Spice & Grain Traders)', 'procurement@mehtatraders.com', '+919898012345', '$2a$10$wN9iL6jG50WkQ97e9yDqve8kG9N0b8/jZ3b7o6f9d9A1b2c3d4e5f', 'BUYER', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'),
('user-admin-1', 'AgroConnect Operations Desk', 'admin@agroconnect.in', '+919999988888', '$2a$10$wN9iL6jG50WkQ97e9yDqve8kG9N0b8/jZ3b7o6f9d9A1b2c3d4e5f', 'ADMIN', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80');

-- 2. FARMERS
INSERT INTO farmers (id, user_id, farm_name, farm_size_acres, experience_years, farming_type, bio, state, district, village, pincode, latitude, longitude, is_verified, verification_status, rating_avg, total_reviews) VALUES
('farmer-1', 'user-farmer-1', 'Patil Organic Agri Farms', 18.50, 16, 'ORGANIC', 'Pioneer in precision drip-irrigated organic onion and grape farming in Niphad, Nashik.', 'Maharashtra', 'Nashik', 'Niphad', '422303', 20.07840000, 74.10890000, TRUE, 'VERIFIED', 4.92, 148),
('farmer-2', 'user-farmer-2', 'Golden Fields Bio-Estate', 42.00, 24, 'NATURAL', 'Certified organic Sharbati wheat and aromatic 1121 Basmati rice in Ludhiana.', 'Punjab', 'Ludhiana', 'Khanna', '141401', 30.70730000, 76.21670000, TRUE, 'VERIFIED', 4.95, 210);

-- 3. CATEGORIES
INSERT INTO categories (id, name, slug, description, image_url, item_count) VALUES
('cat-veg', 'Fresh Vegetables', 'vegetables', 'Daily farm-fresh organic vegetables.', 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=600&auto=format&fit=crop&q=80', 340),
('cat-fruits', 'Farm Fruits', 'fruits', 'Direct orchard seasonal fruits.', 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80', 210),
('cat-grains', 'Grains & Cereals', 'grains', 'Traditional golden wheat and aromatic Basmati.', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80', 185),
('cat-pulses', 'Pulses & Lentils', 'pulses', 'High-protein unpolished desi dals.', 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?w=600&auto=format&fit=crop&q=80', 140),
('cat-spices', 'Spices & Herbs', 'spices', 'Salem turmeric, Guntur chillies, and black pepper.', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80', 98),
('cat-organic', 'Organic Certified', 'organic', '100% NPOP certified produce.', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80', 260);

-- 4. PRODUCTS
INSERT INTO products (id, farmer_id, category_id, name, slug, description, price_per_unit, unit, available_quantity, min_order_quantity, quality_grade, farming_type, is_organic, harvest_date, origin_state, origin_district, is_approved, in_stock, rating_avg) VALUES
('prod-1', 'farmer-1', 'cat-veg', 'Fresh Nashik Red Onions (Grade A+)', 'nashik-red-onions-grade-a', 'Nashik pinkish-red onions cured naturally under sun sheds. 60+ days shelf life.', 28.00, 'KG', 4500.00, 10.00, 'A_PLUS', 'ORGANIC', TRUE, '2026-08-25', 'Maharashtra', 'Nashik', TRUE, TRUE, 4.94),
('prod-2', 'farmer-2', 'cat-grains', 'Punjab Sharbati Golden Wheat (Whole Grain)', 'punjab-sharbati-golden-wheat', 'Heavy golden grains with high natural gluten and protein.', 32.00, 'KG', 12000.00, 25.00, 'A_PLUS', 'NATURAL', TRUE, '2026-08-10', 'Punjab', 'Ludhiana', TRUE, TRUE, 4.98);

-- 5. MANDI PRICES
INSERT INTO market_prices (id, crop_name, market_name, state, min_price, max_price, modal_price, unit, price_change_pct, updated_date) VALUES
('mp-1', 'Red Onion (Nashik)', 'Lasalgaon APMC', 'Maharashtra', 2200.00, 3100.00, 2750.00, 'Quintal', 4.20, '2026-09-01'),
('mp-2', 'Sharbati Wheat', 'Khanna Mandi', 'Punjab', 2950.00, 3400.00, 3200.00, 'Quintal', 1.50, '2026-09-01'),
('mp-3', 'Desi Tomato', 'Solapur APMC', 'Maharashtra', 2500.00, 4200.00, 3400.00, 'Quintal', -3.80, '2026-09-01');
