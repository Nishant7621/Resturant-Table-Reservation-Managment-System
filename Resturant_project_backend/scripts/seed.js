import dotenv from "dotenv";
import mongoose from "mongoose";
import Restaurant from "../src/models/Restaurant.js";

dotenv.config();

const restaurants = [
  { name: "Manohar Dairy & Restaurant", city: "Bhopal", area: "New Market", cuisine: "North Indian (Pure Veg)", rating: 4.5, price: "₹₹", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80", tables: 18 },
  { name: "Taste of Bhopal", city: "Bhopal", area: "MP Nagar", cuisine: "South & North Indian (Pure Veg)", rating: 4.7, price: "₹₹", image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=800&q=80", tables: 15 },
  { name: "Sarafa Food Palace", city: "Indore", area: "Palasia", cuisine: "Indori Street Food (Pure Veg)", rating: 4.8, price: "₹", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", tables: 12 },
  { name: "Vijay Nagar Cafe", city: "Indore", area: "Vijay Nagar", cuisine: "Cafe & Bakery", rating: 4.7, price: "₹₹", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80", tables: 14 },
  { name: "The Veg Grill Barbeque", city: "Nagpur", area: "Dharampeth", cuisine: "Tandoori & Veg Barbecue", rating: 4.7, price: "₹₹₹", image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80", tables: 20 },
  { name: "Taco House (Pure Veg)", city: "Pune", area: "Koregaon Park", cuisine: "Mexican (Pure Veg)", rating: 4.5, price: "₹₹", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80", tables: 10 },
];


const uri = process.argv[2] || process.env.MONGO_URI;

try {
  if (!uri) throw new Error("MONGO_URI is missing. Provide it as an argument or in .env (e.g. node scripts/seed.js <MONGO_URI>)");
  console.log("Connecting to database...");
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  const count = await Restaurant.countDocuments();
  if (count === 0) {
    await Restaurant.insertMany(restaurants.map((restaurant) => ({ ...restaurant, approvalStatus: "approved" })));
    console.log("✅ Seeded restaurants successfully.");
  }
  else console.log(`✅ ${count} restaurants already exist in the database.`);
} catch (error) { console.error("❌ Seeding error:", error.message); process.exitCode = 1; }
finally { await mongoose.disconnect(); }
