import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Restaurant from "../models/Restaurant.js";
import supabaseService from "../services/supabaseService.js";

const shouldUseSupabase = () => process.env.USE_SUPABASE === "true" || mongoose.connection.readyState !== 1;

// ================= Register User =================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role = "customer", phone, restaurantName, ownerName, fssaiNumber, city, area, image } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }
    if (!["customer", "restaurant"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid account type" });
    }
    if (role === "restaurant" && (!restaurantName || !ownerName || !city || !area || !phone || !image)) {
      return res.status(400).json({ success: false, message: "All restaurant registration fields are required" });
    }

    if (shouldUseSupabase()) {
      try {
        const existing = await supabaseService.findUserByEmail(email);
        if (existing) {
          return res.status(400).json({ success: false, message: "User already exists" });
        }
        const user = await supabaseService.createUser({ name, email, password, phone, role });

        // Dual-write to MongoDB if connected
        if (mongoose.connection.readyState === 1) {
          try {
            await User.create({ name, email, password: user.password, role, phone });
          } catch (mErr) {
            console.warn("MongoDB sync notice:", mErr.message);
          }
        }

        return res.status(201).json({
          success: true,
          message: role === "restaurant"
            ? "Registration submitted. Your restaurant will remain hidden until an admin approves it"
            : "User registered successfully",
          user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
      } catch (err) {
        console.warn("Supabase register error, falling back to MongoDB:", err.message);
      }
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
    });

    if (role === "restaurant") {
      await Restaurant.create({
        owner: user._id,
        name: restaurantName,
        ownerName,
        email: user.email,
        phone,
        fssaiNumber: fssaiNumber || undefined,
        city,
        area,
        image,
        approvalStatus: "pending",
      });
    }

    res.status(201).json({
      success: true,
      message: role === "restaurant"
        ? "Registration submitted. Your restaurant will remain hidden until an admin approves it"
        : "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Login User =================
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    let user = null;

    if (shouldUseSupabase()) {
      try {
        user = await supabaseService.findUserByEmail(email);
      } catch (err) {
        console.warn("Supabase findUserByEmail error:", err.message);
      }
    }

    if (!user) {
      // Find user
      user = await User.findOne({ email: email.toLowerCase().trim() });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (role && user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `This account is registered as a ${user.role}. Please choose the correct login type.`,
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id || user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Change Password =================
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 12) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 12 characters",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    const currentPasswordMatches = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!currentPasswordMatches) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const passwordIsUnchanged = await bcrypt.compare(
      newPassword,
      user.password,
    );

    if (passwordIsUnchanged) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from your current password",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to change password right now",
    });
  }
};
