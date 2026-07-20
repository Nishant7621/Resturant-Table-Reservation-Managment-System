import dotenv from "dotenv";
import mongoose from "mongoose";
import Restaurant from "../src/models/Restaurant.js";

dotenv.config();

const restaurants = [
  { name: "Manohar Dairy & Restaurant", city: "Bhopal", area: "New Market", cuisine: "North Indian", rating: 4.5, price: "₹₹", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", tables: 18 },
  { name: "Taste of Bhopal", city: "Bhopal", area: "MP Nagar", cuisine: "Indian", rating: 4.7, price: "₹₹", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80", tables: 15 },
  { name: "Sarafa Food Palace", city: "Indore", area: "Palasia", cuisine: "Street Food", rating: 4.8, price: "₹", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", tables: 12 },
  { name: "Vijay Nagar Cafe", city: "Indore", area: "Vijay Nagar", cuisine: "Cafe", rating: 4.7, price: "₹₹", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", tables: 14 },
  { name: "Barbeque Nation Nagpur", city: "Nagpur", area: "Dharampeth", cuisine: "BBQ", rating: 4.7, price: "₹₹₹", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80", tables: 20 },
  { name: "Taco House", city: "Pune", area: "Koregaon Park", cuisine: "Mexican", rating: 4.5, price: "₹₹", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80", tables: 10 },
];

try {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing. Create .env from .env.example first.");
  await mongoose.connect(process.env.MONGO_URI);
  const count = await Restaurant.countDocuments();
  if (count === 0) { await Restaurant.insertMany(restaurants); console.log("Seeded restaurants."); }
  else console.log("Restaurants already exist; no data was changed.");
} catch (error) { console.error(error.message); process.exitCode = 1; }
finally { await mongoose.disconnect(); }
