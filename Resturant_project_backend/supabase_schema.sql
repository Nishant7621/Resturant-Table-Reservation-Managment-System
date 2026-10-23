-- ==========================================================
-- TableReserve - Supabase Database Schema & Initial Data
-- ==========================================================

-- 1. Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Customer Table (stores customers, restaurant owners, admins)
CREATE TABLE IF NOT EXISTS customer (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'restaurant', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Restaurant Details Table
CREATE TABLE IF NOT EXISTS restaurant_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    area TEXT NOT NULL,
    cuisine TEXT DEFAULT 'Restaurant',
    rating NUMERIC DEFAULT 4.5,
    price TEXT DEFAULT '₹₹',
    image TEXT NOT NULL,
    tables INTEGER DEFAULT 10,
    available_slots TEXT[] DEFAULT ARRAY['12:00 PM', '2:00 PM', '7:00 PM', '9:00 PM'],
    owner_name TEXT,
    email TEXT,
    phone TEXT,
    gst_number TEXT,
    fssai_number TEXT,
    approval_status TEXT DEFAULT 'approved' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
    owner_id UUID REFERENCES customer(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customer(id) ON DELETE CASCADE,
    restaurant_id UUID REFERENCES restaurant_details(id) ON DELETE CASCADE,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    guests INTEGER NOT NULL,
    booking_fee NUMERIC DEFAULT 50,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'declined')),
    payment_status TEXT DEFAULT 'not_started' CHECK (payment_status IN ('not_started', 'created', 'paid', 'failed', 'refunded')),
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customer(id) ON DELETE CASCADE,
    restaurant_id UUID REFERENCES restaurant_details(id) ON DELETE CASCADE,
    rating NUMERIC NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Enable RLS and add public read policies
ALTER TABLE customer ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow full access for backend service_role key
DROP POLICY IF EXISTS "service_role_all_customer" ON customer;
CREATE POLICY "service_role_all_customer" ON customer FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_restaurant_details" ON restaurant_details;
CREATE POLICY "service_role_all_restaurant_details" ON restaurant_details FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_reservations" ON reservations;
CREATE POLICY "service_role_all_reservations" ON reservations FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_reviews" ON reviews;
CREATE POLICY "service_role_all_reviews" ON reviews FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Allow public read of approved restaurants
DROP POLICY IF EXISTS "public_read_approved_restaurants" ON restaurant_details;
CREATE POLICY "public_read_approved_restaurants" ON restaurant_details FOR SELECT TO anon, authenticated USING (approval_status = 'approved');

-- 7. Seed Initial Restaurant Details
INSERT INTO restaurant_details (name, city, area, cuisine, rating, price, image, tables, approval_status)
VALUES
('Manohar Dairy & Restaurant', 'Bhopal', 'New Market', 'North Indian', 4.5, '₹₹', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', 18, 'approved'),
('Taste of Bhopal', 'Bhopal', 'MP Nagar', 'Indian', 4.7, '₹₹', 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80', 15, 'approved'),
('Sarafa Food Palace', 'Indore', 'Palasia', 'Street Food', 4.8, '₹', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', 12, 'approved'),
('Vijay Nagar Cafe', 'Indore', 'Vijay Nagar', 'Cafe', 4.7, '₹₹', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', 14, 'approved'),
('Barbeque Nation Nagpur', 'Nagpur', 'Dharampeth', 'BBQ', 4.7, '₹₹₹', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80', 20, 'approved'),
('Taco House', 'Pune', 'Koregaon Park', 'Mexican', 4.5, '₹₹', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80', 10, 'approved')
ON CONFLICT DO NOTHING;

-- 8. Seed Default Admin Account (password is: AdminPassword@123)
INSERT INTO customer (name, email, password, role)
VALUES ('Administrator', 'admin@example.com', '$2b$10$x9.BbvLqicPRBQhOM7.h/ebznJ8gSUf3yIRkvNjj/HWuz0.CQCvvG', 'admin')
ON CONFLICT (email) DO NOTHING;
