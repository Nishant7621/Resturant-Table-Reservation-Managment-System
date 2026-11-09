import fs from "fs";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { RESTAURANTS_DATA } from "./restaurantSeedData.js";
import User from "../src/models/User.js";
import Restaurant from "../src/models/Restaurant.js";
import supabase from "../src/config/supabase.js";

dotenv.config();

function generateExcelCsv(restaurants) {
  const headers = [
    "S.No",
    "Restaurant Name",
    "City",
    "Area",
    "Cuisine",
    "Rating",
    "Price Tier",
    "Available Tables",
    "Owner Name",
    "Phone Number",
    "Login Email / User ID",
    "Login Password (Plaintext)"
  ];

  const rows = [headers.join(",")];
  restaurants.forEach((r, idx) => {
    const values = [
      idx + 1,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.city}"`,
      `"${r.area}"`,
      `"${r.cuisine.replace(/"/g, '""')}"`,
      r.rating,
      `"${r.price}"`,
      r.tables,
      `"${r.ownerName}"`,
      `"${r.phone}"`,
      `"${r.email}"`,
      `"${r.rawPassword}"`
    ];
    rows.push(values.join(","));
  });

  return rows.join("\r\n");
}

async function runSeed() {
  console.log("🚀 Starting restaurant database reset & sync...");

  // 1. Generate & Write Separate Excel/CSV Sheet for User
  const csvContent = generateExcelCsv(RESTAURANTS_DATA);
  fs.writeFileSync("../Restaurant_Credentials_Sheet.csv", csvContent, "utf8");
  console.log("✅ Generated 'Restaurant_Credentials_Sheet.csv' with all names, cities, logins, and plaintext passwords!");

  // 2. Sync to MongoDB (Local and/or Atlas)
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/restaurant_reservation";
  try {
    console.log(`Connecting to MongoDB (${mongoUri.includes("127.0.0.1") ? "Local" : "Atlas"})...`);
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 6000 });

    // Clean existing restaurant accounts & listings
    const ownerEmails = RESTAURANTS_DATA.map((r) => r.email);
    await User.deleteMany({ email: { $in: ownerEmails } });
    await Restaurant.deleteMany({});

    for (const r of RESTAURANTS_DATA) {
      const hashedPassword = await bcrypt.hash(r.rawPassword, 10);
      const user = await User.create({
        name: r.ownerName,
        email: r.email,
        password: hashedPassword,
        phone: r.phone,
        role: "restaurant",
      });

      await Restaurant.create({
        owner: user._id,
        name: r.name,
        city: r.city,
        area: r.area,
        cuisine: r.cuisine,
        rating: r.rating,
        price: r.price,
        image: r.image,
        tables: r.tables,
        availableSlots: r.availableSlots,
        ownerName: r.ownerName,
        email: r.email,
        phone: r.phone,
        approvalStatus: "approved",
      });
    }

    console.log(`✅ MongoDB: Successfully seeded ${RESTAURANTS_DATA.length} restaurants across Bhopal, Indore, Nagpur, Pune!`);
    await mongoose.disconnect();
  } catch (mErr) {
    console.warn("⚠️ MongoDB Sync Notice:", mErr.message);
  }

  // 3. Sync to Supabase if reachable
  if (supabase) {
    try {
      console.log("Checking Supabase connection with timeout...");
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const checkReq = await fetch(`${process.env.SUPABASE_URL}/rest/v1/restaurant_details?limit=1`, {
        headers: {
          apikey: process.env.SUPABASE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
        },
        signal: controller.signal,
      }).catch((e) => null);

      clearTimeout(timeoutId);

      if (!checkReq || !checkReq.ok) {
        console.warn("⚠️ Supabase project appears paused or unreachable; skipped Supabase write.");
      } else {
        for (const r of RESTAURANTS_DATA) {
          const hashedPassword = await bcrypt.hash(r.rawPassword, 10);
          
          let { data: user } = await supabase.from("customer").select("id").eq("email", r.email).maybeSingle();
          if (!user) {
            const { data: newUser } = await supabase.from("customer").insert({
              name: r.ownerName,
              email: r.email,
              password: hashedPassword,
              phone: r.phone,
              role: "restaurant",
            }).select().single();
            user = newUser;
          }

          const ownerId = user ? user.id : null;

          await supabase.from("restaurant_details").upsert({
            name: r.name,
            city: r.city,
            area: r.area,
            cuisine: r.cuisine,
            rating: r.rating,
            price: r.price,
            image: r.image,
            tables: r.tables,
            available_slots: r.availableSlots,
            owner_name: r.ownerName,
            email: r.email,
            phone: r.phone,
            approval_status: "approved",
            owner_id: ownerId,
            updated_at: new Date().toISOString(),
          }, { onConflict: "name" });
        }
        console.log("✅ Supabase: Synced restaurant listings & credentials!");
      }
    } catch (sErr) {
      console.warn("⚠️ Supabase Sync Notice:", sErr.message);
    }
  }

  console.log("🎉 Reset complete! All restaurants mapped by City & Area.");
}

runSeed();
