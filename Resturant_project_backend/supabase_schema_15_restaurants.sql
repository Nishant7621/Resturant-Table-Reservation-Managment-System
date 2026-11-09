-- ==========================================================
-- TableReserve - Updated 15 Restaurants & Credentials
-- (Execute this in Supabase SQL Editor to sync Supabase)
-- ==========================================================

-- 1. Ensure Table Structure
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

CREATE TABLE IF NOT EXISTS restaurant_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
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

-- 2. Seed All 15 Restaurants with Pure Veg Photos
INSERT INTO restaurant_details (name, city, area, cuisine, rating, price, image, tables, approval_status, owner_name, email, phone)
VALUES
-- Bhopal
('Manohar Dairy & Restaurant', 'Bhopal', 'New Market', 'North Indian (Pure Veg)', 4.8, '₹₹', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80', 18, 'approved', 'Manohar Sharma', 'manohar.bhopal@tablereserve.com', '+91 98260 11001'),
('Taste of Bhopal', 'Bhopal', 'MP Nagar', 'South & North Indian (Pure Veg)', 4.7, '₹₹', 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=800&q=80', 15, 'approved', 'Rajesh Verma', 'tasteofbhopal@example.com', '+91 98260 22002'),
('Lake Pearl Rooftop Dining', 'Bhopal', 'Hoshangabad Road', 'Multi-Cuisine Veg & Mocktails', 4.9, '₹₹₹', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', 22, 'approved', 'Alok Saxena', 'lakepearl.bhopal@tablereserve.com', '+91 98260 33003'),
('Green Delight Garden Bistro', 'Bhopal', 'Kolar Hills', 'Continental & North Indian Veg', 4.6, '₹₹', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', 16, 'approved', 'Sanjay Mishra', 'greendelight.kolar@tablereserve.com', '+91 98260 44004'),

-- Indore
('Sarafa Royal Palace', 'Indore', 'Palasia', 'Indori Street Gourmet (Pure Veg)', 4.9, '₹', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', 20, 'approved', 'Gopal Joshi', 'sarafaroyal.indore@tablereserve.com', '+91 98270 55005'),
('Vijay Nagar Grand Cafe', 'Indore', 'Vijay Nagar', 'Artisan Cafe & Italian Veg', 4.8, '₹₹', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80', 16, 'approved', 'Neha Chhabra', 'vijaynagar.cafe@tablereserve.com', '+91 98270 66006'),
('Chhappan Gourmet Treat', 'Indore', 'MG Road', 'Traditional Malwi & Sweets (Pure Veg)', 4.7, '₹₹', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', 14, 'approved', 'Sunil Patidar', 'chhappan.mgroad@tablereserve.com', '+91 98270 77007'),
('The Urban Terraces', 'Indore', 'Scheme No. 78', 'Pan-Asian & Indian Veg', 4.8, '₹₹₹', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', 18, 'approved', 'Kavita Agrawal', 'urbanterrace.indore@tablereserve.com', '+91 98270 88008'),

-- Nagpur
('The Veg Grill Barbeque', 'Nagpur', 'Dharampeth', 'Live Tandoori & Sizzlers (Pure Veg)', 4.8, '₹₹₹', 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80', 24, 'approved', 'Nitin Deshmukh', 'veggrill.nagpur@tablereserve.com', '+91 98280 11009'),
('Orange City Spice Garden', 'Nagpur', 'Civil Lines', 'Saoji Veg & Maharashtrian Thali', 4.7, '₹₹', 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80', 15, 'approved', 'Pradeep Kulkarni', 'spicegarden.nagpur@tablereserve.com', '+91 98280 22010'),
('Zero Mile Courtyard', 'Nagpur', 'Sadar', 'North Indian & Continental Veg', 4.6, '₹₹', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80', 18, 'approved', 'Amol Wankhede', 'zeromile.sadar@tablereserve.com', '+91 98280 33011'),

-- Pune
('Taco House & Cantina', 'Pune', 'Koregaon Park', 'Mexican & Tex-Mex (Pure Veg)', 4.7, '₹₹', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80', 14, 'approved', 'Rohan Mehta', 'tacohouse.pune@tablereserve.com', '+91 98290 44012'),
('Shabaree Peshwai Thali', 'Pune', 'FC Road', 'Authentic Maharashtrian Pure Veg', 4.9, '₹₹', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80', 22, 'approved', 'Anand Joshi', 'shabaree.fcroad@tablereserve.com', '+91 98290 55013'),
('Botanica Garden Bistro', 'Pune', 'Baner', 'Woodfired Pizza & Healthy Bowls Veg', 4.8, '₹₹₹', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', 20, 'approved', 'Tanvi Ranade', 'botanica.baner@tablereserve.com', '+91 98290 66014'),
('Viman Nagar Social Club', 'Pune', 'Viman Nagar', 'Modern Indian Veg Fusion', 4.7, '₹₹', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', 18, 'approved', 'Sameer Gupte', 'socialclub.viman@tablereserve.com', '+91 98290 77015')
ON CONFLICT (name) DO UPDATE SET
  city = EXCLUDED.city,
  area = EXCLUDED.area,
  cuisine = EXCLUDED.cuisine,
  rating = EXCLUDED.rating,
  price = EXCLUDED.price,
  image = EXCLUDED.image,
  tables = EXCLUDED.tables,
  owner_name = EXCLUDED.owner_name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  updated_at = NOW();
