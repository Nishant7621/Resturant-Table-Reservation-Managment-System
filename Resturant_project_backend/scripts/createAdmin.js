import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../src/models/User.js";

dotenv.config();

try {
  const uri = process.argv[2] || process.env.MONGO_URI;
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!uri || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("MONGO_URI, ADMIN_EMAIL, and ADMIN_PASSWORD must be set in .env or passed as argument");
  }
  if (ADMIN_PASSWORD.length < 8) throw new Error("ADMIN_PASSWORD must be at least 8 characters");
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  const email = ADMIN_EMAIL.toLowerCase().trim();
  const existing = await User.findOne({ email });
  const password = await bcrypt.hash(ADMIN_PASSWORD, 10);
  if (existing) {
    existing.name = ADMIN_NAME || existing.name || "Administrator";
    existing.password = password;
    existing.role = "admin";
    await existing.save();
    console.log(`Updated admin account: ${email}`);
  } else {
    await User.create({ name: ADMIN_NAME || "Administrator", email, password, role: "admin" });
    console.log(`Created admin account: ${email}`);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
